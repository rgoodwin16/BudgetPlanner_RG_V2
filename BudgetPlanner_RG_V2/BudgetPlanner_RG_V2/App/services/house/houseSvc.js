(function () {
    angular.module('budget_planner')
    .factory('houseSvc', ['$http', function ($http) {
        var f = {};

        f.getUser = function () {
            return $http.post('api/account/household/user').then(function (response) {
                return response.data
            })
        }

        f.details = function () {
            return $http.post('/api/account/household').then(function (response) {
                return response.data
            })
        }

        f.create = function (name) {
            return $http.post('api/Account/CreateHouseHold', new { Name: name }).then(function (response) {
                return response.data
            })
        }

        f.invite = function (inviteEmail) {
            return $http.post('api/Account/CreateInvite?inviteEmail=' + inviteEmail).then(function (response) {
                return response.data
            })
        }

        f.join = function (inviteCode, inviteEmail) {
            return $http.post('api/Account/JoinHouseHold', new { inviteCode: inviteCode, inviteEmail: inviteEmail }).then(function (response) {
                return response.data
            })
        }

        f.leave = function () {
            return $http.post('api/Account/LeaveHouseHold').then(function (response) {
                return response.data
            })
        }

        return f;
    }])
})();