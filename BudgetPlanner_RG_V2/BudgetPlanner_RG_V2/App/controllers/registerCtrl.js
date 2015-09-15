'use strict';
angular.module('budget_planner').controller('registerCtrl', ['authSvc', '$state', function (authSvc, $state) {
    var self = this;

    self.DisplayName = '';
    self.Email = '';
    self.Password = '';
    self.ConfirmPassword = '';
    self.inviteCode = '';
    self.inviteEmail = '';

    self.errors = null;

    //REGISTER FORM SUBMIT - NO INVITE CODE
    //REGISTER FORM SUBMIT - NO CODE
    //self.register_noCode = function () {
    //    authSvc.register(model).then(function (success) {
    //        $state.go('household.create');
    //    }, function (error) {
    //        self.errors = error.data;
    //    });
    //}
}])