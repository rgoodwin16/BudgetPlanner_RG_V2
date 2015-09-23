'use strict';
angular.module('budget_planner').controller('dashboardCtrl', ['$state', '$http', 'dashboardSvc', 'currentMonth', 'currentValues', 'account','transactions',function ($state, $http, dashboardSvc,currentMonth, currentValues,account,transactions) {

    var self = this;
    this.dates = currentMonth;
    this.account = account;
    this.transactions = transactions;

    self.testValues = [];
    self.allValues = [];
    self.currentValues = currentValues;

    self.model = {};


    self.testOptions = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            transitionDuration: 500
        }
    }


    self.allOptions = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            transitionDuration: 500
        }
    }

    self.currentOptions = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            transitionDuration: 500
        }
    }


    this.getTestValues = function () {
        $http.post('/api/Dashboard/Test').then(function (response) {
            self.testValues = response.data;
        });
    }

    this.getAllValues = function (model) {
        $http.post('/api/Dashboard/Index', self.model).then(function (response) {
            self.allValues = response.data;
        });
    }



}])