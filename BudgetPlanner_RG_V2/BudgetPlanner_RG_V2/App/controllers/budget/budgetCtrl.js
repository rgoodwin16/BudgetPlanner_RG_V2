'use strict';
angular.module('budget_planner').controller('budgetCtrl', ['budgetItemSvc', '$state', function (budgetItemSvc, $state) {
    var self = this;
    this.display = {};
    this.id = "";

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