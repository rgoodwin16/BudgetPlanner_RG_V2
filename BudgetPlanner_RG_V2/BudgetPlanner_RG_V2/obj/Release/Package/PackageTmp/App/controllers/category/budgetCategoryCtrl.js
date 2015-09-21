'use strict';
angular.module('budget_planner').controller('budgetCategoryCtrl', ['categorySvc', '$state', 'category', function (categorySvc, $state, category) {

    var self = this;
    this.display = category;

    this.createCategory = function () {
        categorySvc.create()
    }

    this.editCategory = function () {
        categorySvc.edit()
    }

    this.delete = function () {
        categorySvc.delete()
    }


}])