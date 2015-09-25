'use strict';
angular.module('budget_planner').controller('userManageCtrl', ['authSvc', '$state','$http', function (authSvc, $state,$http) {
    var self = this;

    this.toggle = 0;
    this.model = {};
    this.$state = $state;

    self.errors = null;

    //CHANGE PASSWORD
    this.changePassword = function (model) {
        return $http.post('api/Account/ChangePassword', self.model).then(function (response) {
            $state.go($state.current, null, { reload: true })
        })
    }

}])