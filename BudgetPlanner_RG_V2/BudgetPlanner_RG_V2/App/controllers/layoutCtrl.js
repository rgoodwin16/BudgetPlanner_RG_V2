'use strict';
angular.module('budget_planner').controller('layoutCtrl', ['$state', function ($state) {
    var self = this;

    self.$state = $state;
    console.log(self.$state)

    this.isCollapsed = false;
    
    this.collaspe = function () {
        self.isCollapsed = true;
    }

}])