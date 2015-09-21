'use strict';
angular.module('budget_planner').controller('dashboardCtrl', ['authSvc','houseSvc', '$state', '$http', function (authSvc, houseSvc ,$state, $http) {

    var self = this;

    this.getUser = function () {
        houseSvc.getUser().then(function (data) {
            self.user = data;
        })
    }

    this.getUser();

}])