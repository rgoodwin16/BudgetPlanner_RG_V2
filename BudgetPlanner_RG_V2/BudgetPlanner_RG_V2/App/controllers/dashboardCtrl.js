'use strict';
angular.module('budget_planner').controller('dashboardCtrl', ['$state', '$http', 'dashboardSvc', 'currentMonth', 'currentValues', 'yearlyValues', 'account', 'transactions', function ($state, $http, dashboardSvc, currentMonth, currentValues, yearlyValues, account, transactions) {

    var self = this;
    this.dates = currentMonth;
    this.account = account;
    this.transactions = transactions;

    self.currentValues = currentValues;
    self.yearlyValues = yearlyValues;

    self.model = {};

    self.currentOptions = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            transitionDuration: 500
        }
    }

    self.yearlyOptions = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            transitionDuration: 500
        }
    }


}])