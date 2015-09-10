using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner_RG_V2.Models
{
    public class Category
    {
        public Category()
        {
            this.BudgetItems = new HashSet<BudgetItem>();
            this.Transactions = new HashSet<Transaction>();
        }
        
        public int id { get; set; }
        public string Name { get; set; }
        public int? HouseHoldId { get; set; }

        public virtual ICollection<BudgetItem> BudgetItems { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }

        public virtual HouseHold HouseHold { get; set; }
    }
}