'use strict';
angular.module('budget_planner').controller('accountCtrl', ['houseAccountSvc', '$state', '$stateParams', function (houseAccountSvc, $state, $stateParams) {

    var self = this;

    this.display = {};

    this.archiveAccount = function () {
        houseAccountSvc.archive()
    }

}])
