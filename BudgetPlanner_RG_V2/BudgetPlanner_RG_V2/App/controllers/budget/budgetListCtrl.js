'use strict';
angular.module('budget_planner').controller('budgetListCtrl', ['budgetItemSvc', '$state','budget', function (budgetItemSvc, $state, budget) {
    var self = this;

    this.display = budget;
    console.log(budget)
    this.id = "";

}])