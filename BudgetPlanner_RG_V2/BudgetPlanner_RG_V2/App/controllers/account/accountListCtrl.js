'use strict';
angular.module('budget_planner').controller('accountListCtrl',['houseAccountSvc','$state','account',function (houseAccountSvc,$state,account) {

    var self = this;

    this.display = account;
    this.$state = $state;

    console.log(account)

    this.model = {};
    this.mainpanel = 'list';
    this.sidepanel = 'c';

    //CLEAR FORM
    this.clear = function () {
        $state.go($state.current, null, { reload: true })
    }

    //MAINPANEL ACCOUNT LIST
    this.mainPanelList = function () {
        self.mainpanel = 'list';
    }

    //MAINPANEL CREATE ACCOUNT
    this.mainPanelCreate = function () {
        self.mainpanel = 'create';
    }

    //MAINPANEL EDIT ACCOUNT - SEND INFO TO FORM
    this.mainPanelBeginEdit = function (id) {
        houseAccountSvc.details(id).then(function (result) {
            self.model = result;
            self.mainpanel = 'edit';
        })
    }

    //MAINPANEL ARCHIVE ACCOUNT - SEND INFO TO FORM
    this.mainPanelBeginArchive = function (id) {
        houseAccountSvc.details(id).then(function (result) {
            self.model = result;
            self.mainpanel = 'archive';
        })
    }

    //CREATE ACCOUNT / REFRESH STATE
    this.createAccount = function () {
        houseAccountSvc.create(self.model).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }

    //SIDEPANEL EDIT ACCOUNT - SEND INFO TO FORM
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


    //SIDEPANEL ARCHIVE ACCOUNT - SEND INFO TO FORM
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
