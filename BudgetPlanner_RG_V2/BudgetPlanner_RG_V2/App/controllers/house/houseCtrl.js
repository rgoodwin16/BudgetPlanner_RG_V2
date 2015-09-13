'use strict';
angular.module('budget_planner').controller('houseCtrl', ['houseSvc', '$state',  function (houseSvc, $state) {

    var self = this;
    this.userDisplayName = "";


    this.getUser = function (name) {
        houseSvc.getUser().then(function (data){
            self.userDisplayName = data;
        })
    }

    this.createHouse = function (name) {
        houseSvc.create(name).then(function (data) {
            $state.go('household.details');
        })
    }

    this.createInvite = function (email) {
        houseSvc.invite(email)
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
