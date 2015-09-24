'use strict';
angular.module('budget_planner').controller('forgotCtrl', ['authSvc', '$state', '$stateParams',  function (authSvc, $state, $stateParams) {
    var self = this;

    self.username = '';
    self.password = '';

    //self.isNew = $stateParams.isNew === true;
    //self.errors = null;

    //USE EXISTING ACCOUNT BUTTON
    //self.goSignIn = function () {
    //    $state.go('login.signin');
    //}
    ////CREATE NEW ACCOUNT BUTTON
    //self.goRegister = function () {
    //    $state.go('login.register');
    //}

    //FORGOT PASSWORD SUBMIT
    this.sendCode = function () {
        authSvc.
    }


}])