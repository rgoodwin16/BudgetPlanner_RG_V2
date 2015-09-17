'use strict';
angular.module('budget_planner').controller('houseDetailsCtrl', ['houseSvc', '$state', 'household','$modal', function (houseSvc, $state, household, $modal) {
    var self = this;

    this.display = household;
    this.inviteEmail = '';
    this.inviteToggle = 0;


    this.confirmLeave = function () {
        $modal.open({
            templateUrl: 'App/templates/modals/leave.house.html',
            controller: 'modalCtrl as modal',
            size: 'small'
        });
    }

    this.createInvite = function () {
        houseSvc.invite(self.inviteEmail)
        self.inviteToggle = 1;
    }

}])

