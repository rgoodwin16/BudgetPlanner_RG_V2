(function () {
    angular.module('budget_planner')
    .factory('categorySvc', ['$http', function ($http) {
        var f = {};

        f.list = function () {
            return $http.post('api/HouseHold/Categories/Index').then(function (response) {
                return response.data
            })
        }

        f.create = function () {
            return $http.post('api/HouseHold/Categories/Create').then(function (response) {
                return response.data
            })
        }

        f.edit = function () {
            return $http.post('api/HouseHold/Categories/Edit').then(function (response) {
                return response.data
            })
        }

        f.delete = function () {
            return $http.post('api/HouseHold/Categories/Delete').then(function (response) {
                return response.data
            })
        }

        return f;

    }])
})();