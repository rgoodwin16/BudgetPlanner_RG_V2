﻿(function () {
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
            return $http.post('api/Account/createhousehold?name=' + name).then(function (response) {
                return response.data
            })
        }

        f.invite = function (inviteEmail) {
            return $http.post('api/Account/CreateInvite?inviteEmail=' + inviteEmail).then(function (response) {
                return response.data
            })
        }

        f.join = function (model) {
            return $http.post('api/Account/JoinHouse', model).then(function (response) {
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