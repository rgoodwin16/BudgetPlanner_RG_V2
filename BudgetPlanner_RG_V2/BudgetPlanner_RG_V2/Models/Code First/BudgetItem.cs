﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPlanner_RG_V2.Models
{
    public class BudgetItem
    {
        public int id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public bool isExpense { get; set; }

        public int HouseHoldId { get; set; }
        public int CategoryId { get; set; }

        public int Frequency { get; set; }

        [JsonIgnore]
        public virtual HouseHold HouseHold { get; set; }

        public virtual Category Category { get; set; }



    }
}