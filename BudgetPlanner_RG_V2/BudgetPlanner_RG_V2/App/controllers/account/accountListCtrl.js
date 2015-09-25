'use strict';
angular.module('budget_planner').controller('accountListCtrl',['houseAccountSvc','$state','account',function (houseAccountSvc,$state,account) {

    var self = this;

    this.display = account;
    this.$state = $state;

    console.log(account)

    this.model = {};

    this.sidepanel = 'c';

    //CLEAR FORM
    this.clear = function () {
        $state.go($state.current, null, { reload: true })
    }

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

    //EDIT ACCOUNT - CONFIRM EDIT
    this.editAccount = function () {
        houseAccountSvc.edit(self.model).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }


    //ARCHIVE ACCOUNT - SEND INFO TO FORM
    this.beginArchive = function (id) {
        houseAccountSvc.details(id).then(function (result) {
            self.model = result;
            self.sidepanel = 'a';
        })
    }

    //ARCHIVE ACCOUNT - CONFIRM ARCHIVE
    this.archiveAccount = function () {
        houseAccountSvc.archive(self.model.id).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }

}])
