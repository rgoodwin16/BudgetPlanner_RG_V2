var app = angular.module('budget_planner', ['ui.router', 'ui.bootstrap', 'LocalStorageModule', 'uiSwitch', 'trNgGrid','nvd3']);

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
          params: {'isNew' : false},
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



//=================================================================================//

        //LANDING PAGE STATES
        .state('home', {
            url: "/home",
            templateUrl: "/app/templates/home/home.html",
            controller: "homeCtrl as home"
        })

//=================================================================================//

        //DASHBOARD STATES
      .state('dashboard', {
          url: "/dashboard",
          templateUrl: "/app/templates/dashboard.html",
          controller: "dashboardCtrl as dashboard",
          resolve: {
              currentMonth: function (dashboardSvc) {
                  console.log('resolving')
                  return dashboardSvc.dates();
              },
              currentValues: function (dashboardSvc) {
                  return dashboardSvc.cValues();
              },
              account: function (houseAccountSvc) {
                  return houseAccountSvc.list();
              },
              transactions: function (transactionSvc) {
                  return transactionSvc.recent();
              }
          }
      })
//=================================================================================//

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

//=================================================================================//

        //HOUSEHOLD BEGIN
        .state('household_begin', {
            url: "/household_begin",
            templateUrl: "/app/templates/household/household.begin.html",
            controller: "householdBeginCtrl as houseBegin",
        })

//=================================================================================//

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
          url: "/details/:id",
          templateUrl: "/app/templates/accounts/accounts.details.html",
          controller: "accountDetailsCtrl as accountDetails",
          resolve: {
              account: ['houseAccountSvc', '$stateParams', function (houseAccountSvc, $stateParams) {
                  console.log($stateParams)
                  return houseAccountSvc.details($stateParams.id)
              }],
              categories: function (categorySvc) {
                  return categorySvc.list();
              }
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
//=================================================================================//

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
              },
              categories: function (categorySvc) {
                  return categorySvc.list();
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

//var serviceBase = 'http://rgoodwin-budget.azurewebsites.net/';
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