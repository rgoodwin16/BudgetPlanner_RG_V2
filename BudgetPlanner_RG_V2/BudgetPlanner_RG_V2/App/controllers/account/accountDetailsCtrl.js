'use strict';
angular.module('budget_planner').controller('accountDetailsCtrl', ['houseAccountSvc', '$stateParams', 'account','$modal', function (houseAccountSvc, $stateParams, account,$modal) {

    var self = this;

    this.account = account;
    this.id = $stateParams.id;

    this.sidepanel = 'c';
    

    console.log(this.account)

    this.beginEdit = function (id) {
        $modal.open({
            templateUrl: 'App/templates/modals/edit.account.html',
            controller: 'modalCtrl as modal',
            size: 'small',
            resolve: {
                account1: function () {
                 return houseAccountSvc.details(self.id)
                },
               
            }
        });
        console.log(account);
    }

}])
