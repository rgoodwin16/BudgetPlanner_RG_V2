'use strict';
angular.module('budget_planner').controller('householdBeginCtrl', ['authSvc','$state','houseSvc', function (authSvc,$state,houseSvc) {
    var self = this;

    self.$state = $state;
    this.name = '';
    this.model = {};
    this.cErrors = null;
    this.jErrors = null;

    //CREATE HOUSE
    this.create = function () {
        houseSvc.create(self.name).then(function (success) {
            authSvc.refresh().then(function (response) {
                $state.go($state.current, null, { reload: true })
                $state.go('budget.list');
            })
           
        }, function (error) {
            self.cErrors = error;
        })
    }

    //JOIN HOUSE
    this.join = function () {
        houseSvc.join(self.model).then(function (result) {
            authSvc.refresh().then(function (response) {
                $state.go($state.current, null, { reload: true })
                $state.go('household.details')
            })
            
        }, function (error) {
            self.jErrors = error;
        })
    }

}])