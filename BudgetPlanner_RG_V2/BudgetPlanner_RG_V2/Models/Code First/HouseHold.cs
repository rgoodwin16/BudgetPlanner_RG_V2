using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner_RG_V2.Models
{
    public class HouseHold
    {
        public HouseHold()
        {
            this.HouseHoldAccounts = new HashSet<HouseHoldAccount>();
            this.BudgetItems = new HashSet<BudgetItem>();
            this.Users = new HashSet<ApplicationUser>();
            this.Categories = new HashSet<Category>();
        } 

        
        public int id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<HouseHoldAccount> HouseHoldAccounts { get; set; }
        [JsonIgnore]
        public virtual ICollection<BudgetItem> BudgetItems { get; set; }
        [JsonIgnore]
        public virtual ICollection<ApplicationUser> Users { get; set; }
        [JsonIgnore]
        public virtual ICollection<Category> Categories { get; set; }
    }
}