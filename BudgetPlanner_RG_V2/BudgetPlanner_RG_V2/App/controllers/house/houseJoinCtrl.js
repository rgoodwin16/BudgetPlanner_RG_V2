'use strict';
angular.module('budget_planner').controller('houseJoinCtrl', ['houseSvc', '$state', function (houseSvc, $state) {
    var self = this;

    this.goCreate = function () {
        $state.go('household.create');
    }
}])
