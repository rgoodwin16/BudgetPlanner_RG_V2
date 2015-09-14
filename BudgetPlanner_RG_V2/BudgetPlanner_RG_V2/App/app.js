﻿var app = angular.module('budget_planner', ['ui.router','ui.bootstrap', 'LocalStorageModule']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider

        //LOGIN STATES

      .state('login', {
          url: "/login",
          templateUrl: "/app/templates/login.html",
          abstract:true,
          controller: "loginCtrl as user"
      })

      .state('login.signin', {
          url: "",
          templateUrl: "/app/templates/login/login.signin.html",
          controller: "loginCtrl as user"
      })

      .state('login.register', {
          url: "/register",
          templateUrl: "/app/templates/login/login.register.html",
          controller: "loginCtrl as user"
      })

      .state('login.forgot', {
          url: "/forgot_password",
          templateUrl: "/app/templates/login/login.forgot.html",
          controller: "loginCtrl as user"
      })


        //HOME STATES
      .state('home', {
          url: "/home",
          templateUrl: "/app/templates/home.html",
          abstract:true,
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

      .state('accounts.list.create', {
          url: "",
          templateUrl: "/app/templates/accounts/accounts.list.create.html",
          controller: "accountListCtrl as accountList",
      })
      .state('accounts.details', {
          url: "/details/:id",
          templateUrl: "/app/templates/accounts/accounts.details.html",
          controller: "accountDetailsCtrl as accountDetails",
          resolve: {
              account: ['houseAccountSvc', '$stateParams', function (houseAccountSvc, $stateParams) {
                  console.log($stateParams)
                  return houseAccountSvc.details($stateParams.id)
              }]
          }
      })
      .state('accounts.details.transactions', {
          url: "/transactions",
          templateUrl: "/app/templates/accounts/accounts.details.transactions.html",
          controller: "accountTransactionsCtrl as accountTransaction"
      })

      .state('accounts.details.transactions.categories', {
          url: "/categories",
          templateUrl: "/app/templates/accounts/accounts.details.transactions.categories.html",
          resolve: {
              category: function (categorySvc) {
                  return categorySvc.list();
              }
          },
          controller: "transactionCategoryCtrl as category"
      })

     //BUDGET STATES
      .state('budget', {
          url: "/budget",
          templateUrl: "/app/templates/budget/budget.html",
          abstract: true,
          controller: "budgetCtrl as budget"
      })

      .state('budget.list', {
          url: "",
          templateUrl: "/app/templates/budget/budget.list.html",
          resolve: {
              budget: function (budgetItemSvc) {
                  return budgetItemSvc.list();
              }
          },
          controller: "budgetListCtrl as budgetList"
      })

      .state('budget.categories', {
          url: "/categories",
          templateUrl: "/app/templates/budget/budget.categories.html",
          resolve: {
              category: function (categorySvc) {
                  return categorySvc.list();
              }
          },
          controller: "budgetCategoryCtrl as category"
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