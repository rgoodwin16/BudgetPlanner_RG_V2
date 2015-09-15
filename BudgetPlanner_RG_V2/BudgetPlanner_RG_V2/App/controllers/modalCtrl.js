'use strict';
angular.module('budget_planner').controller('modalCtrl', ['houseSvc', '$state', '$modal', '$modalInstance', 'houseAccountSvc', 'account1', function (houseSvc, $state, $modal, $modalInstance, houseAccountSvc, account1) {

    var self = this;
    this.model = account1;
    //this.model.id = $stateParams.id;
    
    //GENERIC CANCEL - DISMISSES MODAL
    this.cancel = function () {
        $modalInstance.dismiss();
        
    }

    //GENERIC OK - CLOSE MODAL
    this.ok = function () {
        $modalInstance.close();
    }

    //CONFIRM MODAL - LEAVE HOUSEHOLD
    this.leaveHouse = function () {
        houseSvc.leave().then(function (data) {
            $state.go('household.create');
            self.ok();
        })
    }

    //CONFIRM MODAL - EDIT ACCOUNT / REFRESH STATE
    this.editAccount = function () {
        houseAccountSvc.edit(self.model).then(function (result) {
            self.ok();
            $state.go($state.current, null, { reload: true })
        })
    }

}])