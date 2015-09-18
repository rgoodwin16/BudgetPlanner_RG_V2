'use strict';
angular.module('budget_planner').controller('houseDetailsCtrl', ['houseSvc', '$state', 'household', 'validationSvc', function (houseSvc, $state, household, validationSvc) {
    var self = this;

    this.display = household;
    this.inviteEmail = '';
    this.inviteToggle = 0;
    this.sidepanel = 'i';


    //VALIDATE EMAIL FORM
    this.isValidEmail = function () {
        return validationSvc.isEmail(self.inviteEmail);
    }

    //CLEAR FORM
    this.clear = function () {
        $state.go($state.current, null, { reload: true })
    }


    //CREATE INVITE
    this.createInvite = function () {
        houseSvc.invite(self.inviteEmail)
        self.inviteToggle = 1;
 
    }

    //LEAVE HOUSEHOLD - SEND CONFIRM MESSAGE TO FORM
    this.beginLeave = function () {
        self.sidepanel = 'l';
    }

    //LEAVE HOUSEHOLD - CONFIRM LEAVE
    this.leaveHouse = function () {
        houseSvc.leave().then(function (result) {
            $state.go('household.create');
        })
    }

}])

