'use strict';
angular.module('budget_planner').controller('householdBeginCtrl', ['$state','houseSvc', function ($state,houseSvc) {
    var self = this;

    self.$state = $state;
    this.name = '';
    this.model = {};

    //CREATE HOUSE
    this.create = function () {
        houseSvc.create(self.name).then(function (result) {
            $state.go('household.details')
        })
    }

    //JOIN HOUSE
    this.join = function () {
        houseSvc.join(self.model).then(function (result) {
            console.log(self.model)
            $state.go('household.details')
        })
    }

}])