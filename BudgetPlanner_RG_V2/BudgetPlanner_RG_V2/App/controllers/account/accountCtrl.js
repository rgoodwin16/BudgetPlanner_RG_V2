'use strict';
angular.module('budget_planner').controller('accountCtrl', ['houseAccountSvc', '$state', function (houseAccountSvc, $state) {

    var self = this;

    this.display = {};
    this.id = "";

    this.createAccount = function (newAccount) {
        houseAccountSvc.create(newAccount).then(function (result) {
            //need to reload page, sir
            console.log('hi')
        })
    }

    this.editAccount = function (model) {
        houseAccountSvc.edit(model).then(function (result) {
            //need to reload page, sir!
        })
    }

    this.archiveAccount = function () {
        houseAccountSvc.archive()
    }

}])
