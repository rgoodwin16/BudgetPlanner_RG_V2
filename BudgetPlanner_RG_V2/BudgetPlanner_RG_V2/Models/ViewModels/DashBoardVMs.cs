﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner_RG_V2.Models
{
    public class HouseHoldVM
    {
        public string Name { get; set; }
        public List<HouseHoldAccount> Accounts { get; set; }
        public List<BudgetItem> BudgetItems { get; set; }
        public List<ApplicationUser> Users { get; set; }
    }

    public class HouseHoldAccountVM
    {
        
        public List<HouseHoldAccount> Accounts { get; set; }
        
    }

    public class TransactionsVM
    {
        public string Description { get; set; }
        public string Status { get; set; }

        public decimal Amount { get; set; }
        public System.DateTimeOffset Created { get; set; }
        public Nullable<System.DateTimeOffset> Updated { get; set; }

        public bool Reconcile { get; set; }
        public int CategoryId { get; set; }
    }
}