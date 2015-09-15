'use strict';
angular.module('budget_planner').controller('houseCreateCtrl', ['houseSvc', '$state', function (houseSvc, $state) {
    var self = this;

    this.create = function (name) {
        houseSvc.create(name).then(function (data) {
            $state.go('household.details');
        })
    }

    this.goJoin = function () {
        $state.go('household.join');
    }

}])
