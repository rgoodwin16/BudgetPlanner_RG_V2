'use strict';
angular.module('budget_planner').controller('layoutCtrl', ['$state','authSvc','houseSvc', function ($state,authSvc,houseSvc) {
    var self = this;

    self.$state = $state;
    

    this.isCollapsed = false;
    
    this.collaspe = function () {
        self.isCollapsed = true;
    }

    this.logout = function () {
        authSvc.logout();
        $state.go('login.signin');
    }

    //this.getUser = function () {
    //    houseSvc.getUser().then(function (data) {
    //        self.user = data;
    //    })
    //}

    //this.getUser();

}])