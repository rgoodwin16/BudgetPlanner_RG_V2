'use strict';
angular.module('budget_planner').controller('accountCtrl', ['houseAccountSvc', '$state', function (houseAccountSvc, $state) {

    var self = this;

    this.display = {};
    this.id = "";


    this.getAccount = function () {
        houseAccountSvc.details().then(function (data) {
            self.display = data;
        })
    }

    this.createAccount = function () {
        houseAccountSvc.create()
    }

    this.editAccount = function () {
        houseAccountSvc.edit()
    }

    this.archiveAccount = function () {
        houseAccountSvc.archive()
    }



}])
