'use strict';
angular.module('budget_planner').controller('budgetListCtrl', ['budgetItemSvc', '$state','budget','categories', function (budgetItemSvc, $state, budget,categories) {
    var self = this;

    this.display = budget;
    console.log(budget)
    this.categories = categories;

    this.sidepanel = 'c';
    this.enabled = '';
    this.model = {};

    //CLEAR FORM
    this.clear = function () {
        $state.go($state.current, null, { reload: true })
    }


    //CREATE BUDGET ITEM
    this.createItem = function () {
        budgetItemSvc.create(self.model).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }

    //EDIT BUDGET ITEM - SEND INFO TO FORM
    this.beginEdit = function (id) {
        budgetItemSvc.details(id).then(function (result) {
            self.model = result;
            console.log(result)
            self.sidepanel = 'e';
        })
    }

    //EDIT BUDGET ITEM - CONFIRM EDIT
    this.editItem = function () {
        budgetItemSvc.edit(self.model).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }

    //DELETE BUDGET ITEM - SEND INFO TO FORM
    this.beginDelete = function (id) {
        budgetItemSvc.details(id).then(function (result) {
            self.model = result;
            console.log(result)
            self.sidepanel = 'd';
        })
    }

    //DELETE BUDGET ITEM - CONFIRM DELETE
    this.deleteItem = function () {
        budgetItemSvc.delete(self.model.id).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }

}])