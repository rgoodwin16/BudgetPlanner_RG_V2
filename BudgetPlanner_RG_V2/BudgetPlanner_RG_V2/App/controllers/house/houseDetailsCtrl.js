'use strict';
angular.module('budget_planner').controller('houseDetailsCtrl', ['authSvc','houseSvc', '$state', 'household', 'validationSvc', function (authSvc,houseSvc, $state, household, validationSvc) {
    var self = this;

    this.display = household;
    this.inviteEmail = '';
    this.inviteToggle = 0;
    this.sidepanel = 'i';
    this.mainpanel = 'm';

    //MAINPANEL NEW INVITE
    this.mainPanelInvite = function () {
        self.mainpanel = 'i';
    }

    //MAINPANEL CONFIRM LEAVE
    this.mainPanelLeave = function () {
        self.mainpanel = 'l';
    }

    //MAINPANEL MEMBERS
    this.mainPanelMembers = function () {
        self.mainpanel = 'm';
    }

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
            authSvc.refresh().then(function (success) {
                
                $state.go('household_begin');
            })
        })
    }

}])

