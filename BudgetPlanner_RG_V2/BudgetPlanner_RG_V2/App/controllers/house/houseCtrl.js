'use strict';
angular.module('budget_planner').controller('houseCtrl', ['houseSvc', '$state',  function (houseSvc, $state) {

    var self = this;
    
    this.user = '';


    this.getUser = function () {
        houseSvc.getUser().then(function (data){
            self.user = data;
        })
    }

    this.joinHouse = function () {
        houseSvc.join().then(function (data) {
            $state.go('household.details');
        })
    }

    this.leaveHouse = function () {
        houseSvc.leave().then(function (data) {
            $state.go('household.create');
        })
    }

    this.getUser();
   

}])
