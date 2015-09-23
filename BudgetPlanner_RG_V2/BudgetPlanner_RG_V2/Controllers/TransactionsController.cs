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
    [RoutePrefix("api/HouseHoldAccounts/Transactions")]
    public class TransactionsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/HouseHoldAccounts/Transactions - GET ALL TRANSACTIONS FOR THIS HOUSEHOLD ACCOUNT
        [HttpPost, Route("Index")]
        public IHttpActionResult Index(int id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            try
            {
                var transactions = db.HouseHoldAccounts.Where(a => a.HouseHoldId == user.HouseHoldId && a.id == id).FirstOrDefault().Transactions;
                return Ok(transactions);
            }

            catch(NullReferenceException)
            {
                return Ok("No transactions found.");
            }
 
        }

        //GET: api/HouseholdAccounts/Transactions - GET RECENT TRANSACTIONS FOR ALL HOUSEHOLD ACCOUNTS
        [HttpPost, Route("Recent")]
        public IHttpActionResult GetRecentTransactions()
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var date = DateTimeOffset.Now;
            var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            var transactions = db.Transactions.Where(t => t.HouseHoldAccount.HouseHoldId == user.HouseHoldId).Take(10).OrderByDescending(c => c.Created <= lastDayOfMonth).ToArray();
            var models = new List<object>();

            foreach (var item in transactions)
            {
                models.Add(new
                {
                    AccountName = item.HouseHoldAccount.Name,
                    TransactionCategory = item.Category.Name,
                    TransactionDesc = item.Description,
                    TransactionAmount = item.Amount,
                    TransactionCreated = item.Created
                });
            }

            return Ok(models);

        }

        // POST: api/HouseHoldAccounts/Transactions - CREATE TRANSACTION
        [ResponseType(typeof(Transaction))]
        [HttpPost, Route("Create")]
        public async Task<IHttpActionResult> Create(Transaction model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (model.isDebit)
            {
                if (model.Amount > 0)
                {
                    model.Amount *= -1;
                }

            }
            else
                if (model.Amount < 0)
                {
                    model.Amount *= -1;
                }

            var account = db.HouseHoldAccounts.Find(model.HouseHoldAccountId);

            account.Balance += model.Amount;
            model.Created = DateTimeOffset.Now;

            model.CategoryId = model.Category.id;
            model.Category = null;

            db.Transactions.Add(model);
            await db.SaveChangesAsync();

            return Ok();
        }

        // GET: api/HouseHoldAccounts/Transactions/5 - GET TRANSACTION
        [ResponseType(typeof(Transaction))]
        [HttpPost, Route("Details")]
        public async Task<IHttpActionResult> Details(int id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var transaction = await db.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        //POST: api/HouseHoldAccounts/Transactions/5 - EDIT TRANSACTION
        [HttpPost, Route("Edit")]
        public async Task<IHttpActionResult> Edit(Transaction model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var oldTrans = db.Transactions.AsNoTracking().FirstOrDefault(t => t.id == model.id);

            if (model.isDebit)
            {
                if (model.Amount > 0)
                {
                    model.Amount *= -1;
                }
                   
            }
            else
                if (model.Amount < 0)
                {
                    model.Amount *= -1;
                }
                   

            var account = db.HouseHoldAccounts.FirstOrDefault(a => a.id == model.HouseHoldAccountId);

            //check if the amount/isDebit has changed
            if (oldTrans.Amount != model.Amount)
            {
                account.Balance -= oldTrans.Amount;
                account.Balance += model.Amount;
            }

            model.CategoryId = model.Category.id;
            model.Category = null;

            var arr = new List<string>(){"Amount", "Reconcile", "CategoryId", "Description", "isDebit"};

            db.Update<Transaction>(model, arr.ToArray());

            model.Updated = DateTimeOffset.Now;
            await db.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Transactions/5 - DELETE TRANSACTION
        [ResponseType(typeof(Transaction))]
        [HttpPost, Route("Delete")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var transaction = await db.Transactions.FindAsync(id);
            
            if (transaction == null)
            {
                return BadRequest("No transaction found.");
            }

            var user = db.Users.Find(User.Identity.GetUserId());
            var account = user.HouseHold.HouseHoldAccounts.FirstOrDefault(a => a.id == transaction.HouseHoldAccountId);

            account.Balance = account.Balance - transaction.Amount;
            
            db.Transactions.Remove(transaction);
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

        private bool TransactionExists(int id)
        {
            return db.Transactions.Count(e => e.id == id) > 0;
        }
    }
}