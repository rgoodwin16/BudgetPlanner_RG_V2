'use strict';
angular.module('budget_planner').controller('accountDetailsCtrl', ['houseAccountSvc', '$stateParams', 'account', function (houseAccountSvc, $stateParams, account) {

    var self = this;

    this.account = account;

    this.id = $stateParams.id;

    console.log(this.account)

}])
