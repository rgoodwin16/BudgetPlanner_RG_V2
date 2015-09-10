'use strict';
angular.module('budget_planner').controller('houseJoinCtrl', ['houseSvc', '$state', 'household', function (houseSvc, $state, household) {
    var self = this;

    this.display = household;
    this.inviteEmail = '';
}])
