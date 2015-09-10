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
    [RoutePrefix("api/Accounts/Categories")]
    public class CategoriesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

         //POST: api/BudgetItems - GET ALL CATEGORIES FOR THIS HOUSEHOLD
        [HttpPost, Route("Index")]
        public IHttpActionResult Index()
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            try
            {
                var cats = user.HouseHold.Categories.Where(c => c.Name != "New Account Created" && c.Name != "User Adjusted Balance");
                return Ok(cats);
            }

            catch (NullReferenceException)
            {
                return BadRequest("No Budget Items found.");
            }

        }

        // POST: api/BudgetItems - CREATE CATEGORY
        [ResponseType(typeof(Category))]
        [HttpPost, Route("Create")]
        public async Task<IHttpActionResult> Create(Category model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.Find(User.Identity.GetUserId());
            var categoryExists = user.HouseHold.Categories.Any(c => c.Name == model.Name);

            if (categoryExists)
            {
                return BadRequest("You already have a category called: " + model.Name + " . Please chose another name.");
            }

            else
            {
                var category = new Category()
                {
                    Name = model.Name,
                    HouseHoldId = (int)user.HouseHoldId
                };

                db.Categories.Add(category);
                await db.SaveChangesAsync();

                return Ok(category);
            }

        }

        // GET: api/Categories/5 - GET CATEGORY
        [ResponseType(typeof(Category))]
        [HttpPost, Route("Details")]
        public IHttpActionResult Details(int id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var category = user.HouseHold.Categories.FirstOrDefault(c => c.id == id);
            
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // PUT: api/Categories/5
        [ResponseType(typeof(void))]
        [HttpPost, Route("Edit")]
        public async Task<IHttpActionResult> Edit(int id, Category model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model.id)
            {
                return BadRequest();
            }

            var user = db.Users.Find(User.Identity.GetUserId());
            var oldCategory = user.HouseHold.Categories.FirstOrDefault(c => c.id == id);

            db.Update<Category>(model, "Name");

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(oldCategory);
        }



        // DELETE: api/Categories/5
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> DeleteCategory(int id)
        {
            Category category = await db.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(category);
            await db.SaveChangesAsync();

            return Ok(category);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return db.Categories.Count(e => e.id == id) > 0;
        }
    }
}