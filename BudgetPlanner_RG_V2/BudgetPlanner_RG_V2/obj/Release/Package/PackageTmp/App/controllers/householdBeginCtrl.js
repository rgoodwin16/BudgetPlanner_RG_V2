'use strict';
angular.module('budget_planner').controller('householdBeginCtrl', ['authSvc','$state','houseSvc', function (authSvc,$state,houseSvc) {
    var self = this;

    self.$state = $state;
    this.name = '';
    this.model = {};

    //CREATE HOUSE
    this.create = function () {
        houseSvc.create(self.name).then(function (result) {
            authSvc.refresh().then(function (success) {
                $state.go('budget.list')
            })
        })
    }

    //JOIN HOUSE
    this.join = function () {
        houseSvc.join(self.model).then(function (result) {
            authSvc.refresh().then(function (response) {
                $state.go('household.details')
            })
            
        })
    }

}])