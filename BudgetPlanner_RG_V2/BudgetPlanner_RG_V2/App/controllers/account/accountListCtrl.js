'use strict';
angular.module('budget_planner').controller('accountListCtrl', ['houseAccountSvc', '$state','account', function (houseAccountSvc, $state,account) {

    var self = this;

    this.display = account;
    console.log(account)
    
    this.model = {};

    this.sidepanel = 'c';

    //CREATE ACCOUNT / REFRESH STATE
    this.createAccount = function () {
        houseAccountSvc.create(self.model).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }

    //EDIT ACCOUNT - SEND INFO TO FORM
    this.beginEdit = function (id) {
        houseAccountSvc.details(id).then(function (result) {
            self.model = result;
            self.sidepanel = 'e';
        })
    }

    //EDIT ACCOUNT - EDIT ACCOUNT / REFRESH STATE
    this.editAccount = function () {
        houseAccountSvc.edit(self.model).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }


}])
