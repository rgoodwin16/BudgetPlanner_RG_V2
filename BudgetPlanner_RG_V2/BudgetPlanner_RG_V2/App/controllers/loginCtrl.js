'use strict';
angular.module('budget_planner').controller('loginCtrl', ['authSvc', '$state', function (authSvc, $state) {
    var self = this;

    self.username = '';
    self.password = '';
    self.confirmPassword = '';
    self.displayName = '';
    self.inviteCode = '';
    self.inviteEmail = '';

    self.errors = null;
    
    //USE EXISTING ACCOUNT BUTTON
    self.goSignIn = function () {
        $state.go('login.signin');
    }
    //CREATE NEW ACCOUNT BUTTON
    self.goRegister = function () {
        $state.go('login.register');
    }


    //LOGIN FORM SUBMIT
    self.login = function () {
        authSvc.login(self.username, self.password).then(function (success) {
            $state.go('household.details');
        }, function (error) {
            self.errors = error.data;
        });
    }

    ////REGISTER FORM SUBMIT - NO CODE
    //.self.register_noCode = function () {
    //    authSvc.register(self.displayName,self.username, self.password, self.confirmPassword).then(function (success) {
    //        $state.go('household.create');
    //    }, function (error) {
    //        self.errors = error.data;
    //    });
    //}

        //REGISTER FORM SUBMIT - WITH CODE
    //.self.register_withCode = function () {
    //    authSvc.register(self.displayName, self.username, self.password, self.confirmPassword, self.inviteCode, self.inviteEmail).then(function (success) {
    //        $state.go('household.details');
    //    }, function (error) {
    //        self.errors = error.data;
    //    });
    //}

}])