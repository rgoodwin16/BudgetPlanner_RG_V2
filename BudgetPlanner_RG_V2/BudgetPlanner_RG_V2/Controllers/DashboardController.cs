using BudgetPlanner_RG_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace BudgetPlanner_RG_V2.Controllers
{
    [Authorize]
    [RoutePrefix("api/Dashboard")]
    public class DashboardController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public class Chart
        {
            public string startDate { get; set; }
            public string endDate { get; set; }
        }

        //POST: api/Dashboard - GET ALL BUDGET ITEMS/TRANSACTIONS FOR CHART
        [HttpPost,Route("Test")]
        public IHttpActionResult Get()
        {
            var r = new Random();

            return Ok(new dynamic[]
            {
                new
                {
                    key = "Actual",
                    color = "#51A351",
                    values = Enumerable.Range(0, 10).Select(i =>
                    new
                    {
                        x = (char)('A' + i),
                        y = r.Next(100, 5000),

                    })
                
                },
                new
                {
                    key = "Budgeted",
                    color = "#BD362F",
                    values = Enumerable.Range(0, 10).Select(i =>
                    new
                    {
                        x = (char)('A' + i),
                        y = r.Next(100, 5000),

                    })
                }
            });
        }

        [HttpPost,Route("Index")]
        public IHttpActionResult All(Chart model)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var household = user.HouseHold;

            var startDate = model.startDate;
            var endDate = model.endDate;

            var sD = Convert.ToDateTime(startDate);
            var eD = Convert.ToDateTime(endDate);

            return Ok(new dynamic[]
            {
                new
                {
                    key = "Actual",
                    color = "#FF931E",
                    values = from b in household.BudgetItems.Where(bi=> bi.isExpense == true)
                             select new 
                             {
                                x = b.Category.Name,
                                y = b.Category.Transactions.Where(t=> t.Created >= sD && t.Created <= eD).Select(t=> t.Amount).DefaultIfEmpty().Sum() * -1,
                             }
                },

                new 
                {
                    key = "Budgeted",
                    color = "#00acac",
                    values = from b in household.BudgetItems.Where(bi=> bi.isExpense == true)
                             select new 
                             {
                                 x = b.Category.Name,
                                 y = b.Amount //* (b.isExpense ? -1 : 1)
                             }
                }
            
            });
        }

        [HttpPost, Route("Current")]
        public IHttpActionResult All()
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var household = user.HouseHold;

            var date = DateTimeOffset.Now;

            return Ok(new dynamic[]
            {
                new
                {
                    key = "Actual",
                    color = "#FF931E",
                    values = from b in household.BudgetItems.Where(bi=> bi.isExpense == true)
                             select new 
                             {
                                x = b.Category.Name,
                                y = b.Category.Transactions.Where(t=> t.Created.Month == date.Month).Select(t=> t.Amount).DefaultIfEmpty().Sum() * -1,
                             }
                },

                new 
                {
                    key = "Budgeted",
                    color = "#00acac",
                    values = from b in household.BudgetItems.Where(bi=> bi.isExpense == true)
                             select new 
                             {
                                 x = b.Category.Name,
                                 y = b.Amount //* (b.isExpense ? -1 : 1)
                             }
                }
            
            });
        }

        [HttpPost,Route("Dates")]
        public IHttpActionResult GetDates()
        {

            var date = DateTimeOffset.Now;
            var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
            var dates = new { Begin = firstDayOfMonth, End = lastDayOfMonth };

            return Ok(dates);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}
