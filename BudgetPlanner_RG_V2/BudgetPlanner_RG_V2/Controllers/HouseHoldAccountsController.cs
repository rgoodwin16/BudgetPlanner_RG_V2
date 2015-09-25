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
using WebApiContrib.ModelBinders;
using BudgetPlanner_RG_V2.Libraries;

namespace BudgetPlanner_RG_V2.Controllers
{

    [Authorize]
    [RoutePrefix("api/HouseHoldAccounts")]
    public class HouseHoldAccountsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // POST: api/HouseHoldAccounts - LIST ALL ACCOUNTS FOR THIS USER'S HOUSEHOLD
        [HttpPost,Route("Index")]
        public IHttpActionResult Index()
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var accounts = user.HouseHold.HouseHoldAccounts.Where(a => a.isArchived == false).ToList();

            if (accounts == null)
            {
                return BadRequest("No Accounts Found");
            }

            else
            {
                var returnAccount = new HouseHoldAccountVM()
                {
                    Accounts = user.HouseHold.HouseHoldAccounts.Where(a => a.isArchived == false).ToList(),
                    
                };
                return Ok(returnAccount);
            }

        }

        // POST: api/HouseHoldAccounts - CREATE ACCOUNT
        [ResponseType(typeof(HouseHoldAccount))]
        [HttpPost, Route("Create")]
        public async Task<IHttpActionResult> Create(HouseHoldAccount model)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            else
            {
                var account = new HouseHoldAccount()
                {
                    Name = model.Name,
                    Balance = model.Balance,
                    ReconciledBalance = model.Balance,
                    HouseHoldId = (int)user.HouseHoldId
                };

                db.HouseHoldAccounts.Add(account);

                var trans = new Transaction()
                {
                    Description = "New Account: " + model.Name + " created.",
                    Amount = model.Balance,
                    Reconcile = true,
                    HouseHoldAccountId = model.HouseHoldId,
                    CategoryId = user.HouseHold.Categories.First(c=> c.Name == "New Account Created").id,
                    Created = DateTimeOffset.Now,

                };

                db.Transactions.Add(trans);

                await db.SaveChangesAsync();

                return Ok(account);
            }
            
        }

        // POST: api/HouseHoldAccounts/5 - GET ACCOUNT
        [ResponseType(typeof(HouseHoldAccount))]
        [HttpPost, Route("Details")]
        public IHttpActionResult Details(int id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var account = user.HouseHold.HouseHoldAccounts.Where(a => a.id == id && !a.isArchived).FirstOrDefault();

            if (account == null)
            {
                return BadRequest("No account found");
            }

            return Ok(account);
        }

        // POST: api/HouseHoldAccounts/5 - EDIT ACCOUNT

        [HttpPost, Route("Edit")]
        public async Task<IHttpActionResult> Edit(HouseHoldAccount model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.Find(User.Identity.GetUserId());
            var oldAccount = db.HouseHoldAccounts.FirstOrDefault(a => a.id == model.id);

            if (oldAccount.Name != model.Name)
            {
                oldAccount.Name = model.Name;
            }

            //check balance
            if (oldAccount.Balance != model.Balance)
            {
                var adjBal = oldAccount.Balance - model.Balance;
                
                db.Transactions.Add(new Transaction()
                {
                    Description = "User Adjusted Balance",
                    Amount = adjBal,
                    Reconcile = true,
                    CategoryId = user.HouseHold.Categories.First(c => c.Name == "User Adjusted Balance").id,
                    Created = DateTimeOffset.Now,
                    HouseHoldAccountId = model.id
                });

                oldAccount.Balance -= adjBal;
                oldAccount.ReconciledBalance -= adjBal;
            }
      
            await db.SaveChangesAsync();
            return Ok();
        
        }

        // POST: api/HouseHoldAccounts/5 - ARCHIVE ACCOUNT
        [ResponseType(typeof(HouseHoldAccount))]
        [HttpPost, Route("Archive")]
        public async Task<IHttpActionResult> Archive(int id)
        {

            var user = db.Users.Find(User.Identity.GetUserId());
            var account = user.HouseHold.HouseHoldAccounts.FirstOrDefault(a => a.id == id);

            if (account == null)
            {
                return BadRequest("No account found");
            }

            account.isArchived = true;

            foreach (var trans in account.Transactions)
            {
                trans.isArchived = true;
            }
            
            await db.SaveChangesAsync();

            return Ok("The account: " + account.Name + " has been archived.");
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HouseHoldAccountExists(int id)
        {
            return db.HouseHoldAccounts.Count(e => e.id == id) > 0;
        }
    }
}