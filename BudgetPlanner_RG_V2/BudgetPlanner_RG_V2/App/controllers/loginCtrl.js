'use strict';
angular.module('budget_planner').controller('loginCtrl', ['authSvc', '$state', function (authSvc, $state) {
    var self = this;

    self.username = '';
    self.password = '';


    self.errors = null;

    self.login= function () {
        authSvc.login(self.username, self.password).then(function (success) {
            $state.go('household.details');
        }, function (error) {
            self.errors = error.data;
        });
    }

}])