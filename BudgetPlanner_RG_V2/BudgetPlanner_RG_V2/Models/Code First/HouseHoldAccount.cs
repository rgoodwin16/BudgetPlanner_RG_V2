using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner_RG_V2.Models
{
    public class HouseHoldAccount
    {
        public HouseHoldAccount()
        {
            this.Transactions = new HashSet<Transaction>();
        }
        
        public int id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set;}
        public decimal ReconciledBalance { get; set; }
        public int HouseHoldId { get; set; }
        public bool isArchived { get; set; }

        public virtual ICollection<Transaction> Transactions { get; set; }

        [JsonIgnore]
        public virtual HouseHold HouseHold { get; set; }
    }
}