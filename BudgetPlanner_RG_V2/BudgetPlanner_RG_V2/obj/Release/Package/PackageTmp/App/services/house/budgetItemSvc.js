(function () {
    angular.module('budget_planner')
    .factory('budgetItemSvc', ['$http', function ($http) {
        var f = {};

        f.list = function () {
            return $http.post('api/BudgetItems/Index').then(function (response) {
                return response.data
            })
        }

        f.details = function (id) {
            return $http.post('api/BudgetItems/Details?id=' + id).then(function (response) {
                return response.data
            })
        }

        f.create = function (model) {
            return $http.post('api/BudgetItems/Create',model).then(function (response) {
                return response.data
            })
        }

        f.edit = function (model) {
            return $http.post('api/BudgetItems/Edit',model).then(function (response) {
                return response.data
            })
        }

        f.delete = function (id) {
            return $http.post('api/BudgetItems/Delete?id=' + id).then(function (response) {
                return response.data
            })
        }

        return f;

    }])
})();