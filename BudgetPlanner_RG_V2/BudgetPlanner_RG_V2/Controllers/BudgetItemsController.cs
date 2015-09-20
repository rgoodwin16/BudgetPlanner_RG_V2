using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BudgetPlanner_RG_V2.Models;
using Microsoft.AspNet.Identity;
using BudgetPlanner_RG_V2.Libraries;

namespace BudgetPlanner_RG_V2.Controllers
{
    [Authorize]
    [RoutePrefix("api/BudgetItems")]
    public class BudgetItemsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // POST: api/BudgetItems - GET ALL BUDGET ITEMS FOR THIS HOUSEHOLD
        [HttpPost,Route("Index")]
        public IHttpActionResult Index()
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            try
            {
                var bItems = user.HouseHold.BudgetItems.ToList();
                return Ok(bItems);
            }

            catch (NullReferenceException)
            {
                return BadRequest("No Budget Items found.");
            }
            
        }

        // POST: api/BudgetItems - CREATE BUDGET ITEM
        [ResponseType(typeof(BudgetItem))]
        [HttpPost, Route("Create")]
        public async Task<IHttpActionResult> Create(BudgetItem model)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var cats = user.HouseHold.Categories;

            if (!cats.Any(c => c.Name == model.Category.Name))
            {
                var newCat = new Category()
                {
                    HouseHoldId = user.HouseHoldId,
                    Name = model.Category.Name
                };

                db.Categories.Add(newCat);
                await db.SaveChangesAsync();
                model.Category.id = newCat.id;
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var budgetItemExits = user.HouseHold.BudgetItems.Any(bi => bi.Name == model.Name);

            if (budgetItemExits) 
            {
                return BadRequest("You already have a budget item called: " + model.Name + " . Please chose another name.");
            }

            else
            {
                model.HouseHoldId = (int)user.HouseHoldId;
                model.CategoryId = model.Category.id;
                model.Category = null;
                db.BudgetItems.Add(model);
                await db.SaveChangesAsync();

                return Ok();
            }

        }

        // GET: api/BudgetItems/5 - GET BUDGET ITEM
        [ResponseType(typeof(BudgetItem))]
        [HttpPost,Route("Details")]
        public IHttpActionResult Details(int id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var budgetItem = user.HouseHold.BudgetItems.FirstOrDefault(bi => bi.id == id);

            if (budgetItem == null)
            {
                return BadRequest("No Budget Item Found");
            }

            return Ok(budgetItem);
        }

        // PUT: api/BudgetItems/5 - EDIT BUDGET ITEM
        [ResponseType(typeof(void))]
        [HttpPost,Route("Edit")]
        public async Task<IHttpActionResult> Edit(BudgetItem model)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var cats = user.HouseHold.Categories;

            if (!cats.Any(c => c.Name == model.Category.Name))
            {
                var newCat = new Category()
                {
                    HouseHoldId = user.HouseHoldId,
                    Name = model.Category.Name
                };

                db.Categories.Add(newCat);
                await db.SaveChangesAsync();
                model.CategoryId = newCat.id;
            }
            else
            {
                model.CategoryId = model.Category.id;
                model.Category = null;
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Update<BudgetItem>(model, "Amount", "Name", "Frequency", "isExpense","CategoryId");
            await db.SaveChangesAsync();

            return Ok();

        }

        // DELETE: api/BudgetItems/5 - DELETE BUDGET ITEM
        [ResponseType(typeof(BudgetItem))]
        [HttpPost,Route("Delete")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            BudgetItem budgetItem = await db.BudgetItems.FindAsync(id);
            if (budgetItem == null)
            {
                return NotFound();
            }

            db.BudgetItems.Remove(budgetItem);
            await db.SaveChangesAsync();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BudgetItemExists(int id)
        {
            return db.BudgetItems.Count(e => e.id == id) > 0;
        }
    }
}