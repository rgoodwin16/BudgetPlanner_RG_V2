'use strict';
angular.module('budget_planner').controller('accountDetailsCtrl', ['houseAccountSvc', '$stateParams', 'account','$modal','categories','transactionSvc','$state', function (houseAccountSvc, $stateParams,account,$modal,categories,transactionSvc,$state) {

    var self = this;

    this.account = account;
    this.id = $stateParams.id;
    this.categories = categories;

    this.sidepanel = 'c';
    this.selected = '';

    this.enabled = '';
    this.model = {
        HouseholdAccountId : account.id
    };

    console.log(this.account)
    console.log(this.categories)

    //EDIT ACCOUNT - MODAL
    //this.beginEdit = function (id) {
    //    $modal.open({
    //        templateUrl: 'App/templates/modals/edit.account.html',
    //        controller: 'modalCtrl as modal',
    //        size: 'small',
    //        resolve: {
    //            account1: function () {
    //             return houseAccountSvc.details(self.id)
    //            },
               
    //        }
    //    });
    //    console.log(account);
    //}

    //CLEAR FORM
    this.clear = function () {
        $state.go($state.current, null, { reload: true })
    }


    //CREATE TRANSACTION - CLEAR FORM
    this.beginNew = function () {
        $state.go($state.current, null, { reload: true })
    }


    //CREATE TRANSACTION
    this.createTrans = function () {
        transactionSvc.create(self.model).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }

    //EDIT TRANSACTION - SEND INFO TO FORM
    this.beginEdit = function (id) {
        transactionSvc.details(id).then(function (result) {
            self.model = result;
            console.log(result)
            self.sidepanel = 'e';
        })
    }

    //EDIT TRANSACTION - CONFRIM EDIT
    this.editTrans = function () {
        transactionSvc.edit(self.model).then(function (result) {
            $state.go($state.current,null,{ reload: true })
        })
    }
    
    //DELETE TRANSACTION - SEND INFO TO FORM
    this.beginDelete = function (id) {
        transactionSvc.details(id).then(function (result) {
            self.model = result;
            self.sidepanel = 'd';
        })
    }

    //DELETE TRANSACTION - CONFIRM DELETE
    this.deleteTrans = function () {
        transactionSvc.delete(self.model.id).then(function (result) {
            $state.go($state.current, null, { reload: true })
        })
    }

}])
