(function () {
    angular.module('budget_planner')
    .factory('dashboardSvc', ['$http', function ($http) {
        var f = {};

        f.dates = function () {
            return $http.post('api/dashboard/dates').then(function (response) {
                return response.data
            })
        }

        f.cValues = function () {
            return $http.post('/api/Dashboard/Current').then(function (response) {
                return response.data
            })
        }

        f.yValues = function () {
            return $http.post('api/Dashboard/Yearly').then(function (response) {
                return response.data
            })
        }

        return f;
    }])
})();