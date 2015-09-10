var app = angular.module('budget_planner', ['ui.router', 'LocalStorageModule']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
      .state('login', {
          url: "/login",
          templateUrl: "/app/templates/login.html",
          controller: "loginCtrl as login"
      })
      .state('home', {
          url: "/home",
          templateUrl: "/app/templates/home.html",
          controller: "homeCtrl as home"
      })

        //HOUSEHOLD STATES
      .state('household', {
          url: "/household",
          templateUrl: "/app/templates/household/household.html",
          abstract: true,
          controller: 'houseCtrl as house'
      })
      .state('household.details', {
          url: "",
          templateUrl: "/app/templates/household/household.details.html",
          resolve: {
              household: function (houseSvc) {
                  return houseSvc.details();
              }
          },
          controller: "houseDetailsCtrl as houseDetails",
      })
      .state('household.create', {
          url: "/create",
          templateUrl: "/app/templates/household/household.create.html",
          controller: "houseCtrl as house",
          resolve: {
              household: ['houseSvc', function (houseSvc) {
                  return houseSvc.details();
              }]
          },
          controller: "houseCreateCtrl as houseCreate",
      })

      .state('household.join', {
          url: "/join",
          templateUrl: "/app/templates/household/household.join.html",
          controller: "houseCtrl as house",
          resolve: {
              household: ['houseSvc', function (houseSvc) {
                  return houseSvc.details();
              }]
          },
          controller: "houseJoinCtrl as houseJoin",
      })

      //ACCOUNT STATES
      .state('accounts', {
          url: "/accounts",
          templateUrl: "/app/templates/accounts/accounts.html",
          abstract:true,
          controller: "accountCtrl as account"
      })
      .state('accounts.list', {
          url: "",
          templateUrl: "/app/templates/accounts/accounts.list.html",
          resolve: {
              account: function (houseAccountSvc) {
                return houseAccountSvc.list();
            }
          },
          controller: "accountListCtrl as accountList",
      })
      .state('accounts.details', {
          url: "/details",
          templateUrl: "/app/templates/accounts/accounts.details.html",
          controller: "accountDetailsCtrl as accountDetails"
      })
      .state('accounts.details.transactions', {
          url: "/transactions",
          templateUrl: "/app/templates/accounts/accounts.details.html",
          controller: "accountTransactionsCtrl as accountTransaction"
      })
     //BUDGET STATES
      .state('budget', {
          url: "/budget",
          templateUrl: "/app/templates/budget/budget.html",
          resolve: {
              budget: function (budgetItemSvc) {
                  return budgetItemSvc.list();
              }
          },
          controller: "budgetCtrl as budget"
      })


});

var serviceBase = 'http://localhost:60632/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorSvc');
});

app.run(['authSvc', function (authService) {
    authService.fillAuthData();
}]);