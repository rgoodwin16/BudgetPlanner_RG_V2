'use strict';
angular.module('budget_planner').controller('accountListCtrl',['houseAccountSvc','$state','account','$modal',function (houseAccountSvc,$state,account,$modal) {

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

    //EDIT ACCOUNT - CONFIRM EDIT
    this.editAccount = function () {
        houseAccountSvc.edit(self.model).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }

    //ARCHIVE ACCOUNT - OPEN MODAL
    this.beginArchive = function (id) {
        $modal.open({
            templateUrl: 'App/templates/modals/archive.account.html',
            controller: 'modalCtrl as modal',
            size: 'small',
            resolve: {
                acc: function (houseAccountSvc) {
                    return houseAccountSvc.details(id);
                }
            }
        });
    }

    //ARCHIVE ACCOUNT - CONFIRM MODAL
    //this.archiveAccount = function () {
    //    houseAccountSvc.archive(id).then(function (data) {
    //        $state.go($state.current, null, { reload: true })
    //    })
    //}

}])
