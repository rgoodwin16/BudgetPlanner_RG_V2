'use strict';
angular.module('budget_planner').controller('layoutCtrl', ['$state','authSvc', function ($state,authSvc) {
    var self = this;

    self.$state = $state;
    console.log(self.$state)

    this.isCollapsed = false;
    
    this.collaspe = function () {
        self.isCollapsed = true;
    }

    this.logout = function () {
        authSvc.logout();
        $state.go('login.signin');
    }


}])