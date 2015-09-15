'use strict';
angular.module('budget_planner').controller('accountCtrl', ['houseAccountSvc', '$state', '$stateParams', function (houseAccountSvc, $state, $stateParams) {

    var self = this;

    this.display = {};
    //this.id = ;
    //this.model = {
    //    Id: 0,
    //    Name: "",
    //    Balance: 0,
    //}

    //this.createAccount = function (newAccount) {
    //    houseAccountSvc.create(newAccount).then(function (result) {
    //        //need to reload page, sir
    //        console.log('hi')
    //    })
    //}

    //this.editAccount = function () {
    //    houseAccountSvc.edit(self.model).then(function (result) {
    //        $state.go($state.current, null, { reload: true })
    //    })
    //}

    this.archiveAccount = function () {
        houseAccountSvc.archive()
    }

}])
