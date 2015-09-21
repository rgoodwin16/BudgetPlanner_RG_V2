(function () {
    angular.module('budget_planner')
    .factory('transactionSvc', ['$http', function ($http) {
        var f = {};

        f.index = function () {
            return $http.post('api/HouseHoldAccounts/Transactions/Index').then(function (response) {
                return response.data
            })
        }

        f.create = function (transaction) {
            return $http.post('api/HouseHoldAccounts/Transactions/Create',transaction).then(function (response) {
                return response.data
            })
        }

        f.details = function (id) {
            return $http.post('api/HouseHoldAccounts/Transactions/Details?id=' + id).then(function (response) {
                return response.data
            })
        }

        f.edit = function (transaction) {
            return $http.post('api/HouseHoldAccounts/Transactions/Edit',transaction).then(function (response) {
                return response.data
            })
        }

        f.delete = function (id) {
            return $http.post('api/HouseHoldAccounts/Transactions/Delete?id=' + id).then(function (response) {
                return response.data
            })
        }

        return f;
    }])
})();