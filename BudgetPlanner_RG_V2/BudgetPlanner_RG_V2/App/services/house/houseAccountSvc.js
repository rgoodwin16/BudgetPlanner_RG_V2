(function () {
    angular.module('budget_planner')
    .factory('houseAccountSvc', ['$http', function ($http) {
        var f = {};

        f.list = function () {
            return $http.post('api/HouseHoldAccounts/Index').then(function (response) {
                return response.data
            })
        }

        f.create = function (account) {
            return $http.post('api/HouseHoldAccounts/Create', account).then(function (response) {
                return response.data
            })
        }

        f.details = function (id) {
            return $http.post('api/HouseHoldAccounts/Details?id='+ id ).then(function (response) {
                return response.data
            })
        }

        f.edit = function (account) {
            return $http.post('api/HouseHoldAccounts/Edit', account).then(function (response) {
                return response.data
            })
        }

        f.archive = function (id) {
            return $http.post('api/HouseHoldAccounts/Archive?id=' + id).then(function (response) {
                return response.data
            })
        }

        return f;

    }])
})();