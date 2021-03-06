﻿'use strict';
angular.module('budget_planner').controller('loginCtrl', ['authSvc', '$state', '$stateParams',  function (authSvc, $state, $stateParams) {
    var self = this;

    self.username = '';
    self.password = '';
    

    

    self.isNew = $stateParams.isNew === true;
    self.errors = null;

    //USE EXISTING ACCOUNT BUTTON
    //self.goSignIn = function () {
    //    $state.go('login.signin');
    //}
    ////CREATE NEW ACCOUNT BUTTON
    //self.goRegister = function () {
    //    $state.go('login.register');
    //}

    //LOGIN FORM SUBMIT - EXISTING USER
    self.login = function () {
        authSvc.login(self.username, self.password).then(function (success) {
            $state.go('dashboard');
        }, function (error) {
            self.errors = error;
        });
    }


}])