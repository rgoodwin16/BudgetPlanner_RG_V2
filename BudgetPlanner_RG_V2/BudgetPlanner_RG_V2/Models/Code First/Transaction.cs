﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner_RG_V2.Models
{
    public class Transaction
    {
        public int id { get; set; }
        public string Description { get; set; }
        public bool isDebit { get; set; }

        public decimal Amount { get; set; }
        public System.DateTimeOffset Created { get; set; }
        public Nullable<System.DateTimeOffset> Updated { get; set; }

        public bool Reconcile { get; set; }
        public int CategoryId { get; set; }
        public int HouseHoldAccountId { get; set; }

        public bool isArchived { get; set; }

        
        public virtual Category Category { get; set; }
        [JsonIgnore]
        public virtual HouseHoldAccount HouseHoldAccount { get; set; }

    }
}