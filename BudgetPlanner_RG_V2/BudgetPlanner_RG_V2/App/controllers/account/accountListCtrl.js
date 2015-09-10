'use strict';
angular.module('budget_planner').controller('accountListCtrl', ['houseAccountSvc', '$state','account', function (houseAccountSvc, $state,account) {

    var self = this;

    this.display = account;
    console.log(account)
    this.id = "";



}])
