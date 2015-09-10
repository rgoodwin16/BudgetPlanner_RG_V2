'use strict';
angular.module('budget_planner').controller('budgetCtrl', ['budgetItemSvc', '$state','budget', function (budgetItemSvc, $state, budget) {
    var self = this;

    this.display = budget;

    this.createItem = function () {
        budgetItemSvc.create()
    }

    this.editItem = function () {
        budgetItemSvc.edit()
    }

    this.delete = function () {
        budgetItemSvc.delete()
    }

}])