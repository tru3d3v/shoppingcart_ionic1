// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','starter.controllers','ionic-material','ionMdInput']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {



  // Turn off caching for demo simplicity's sake
  $ionicConfigProvider.views.maxCache(0);

  /*
  // Turn off back button text
  $ionicConfigProvider.backButton.previousTitleText(false);
  */


  $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
  })
  .state('app.products', {
    url: '/products',
    views: {
        'menuContent': {
            templateUrl: 'templates/products.html',
            controller: 'ProductsCtrl'
        },
        'fabContent': {
            template: ''
        }
    }
}).
state('app.detail', {
  url: '/detail/:id',
  views: {
      'menuContent': {
          templateUrl: 'templates/detail.html',
          controller: 'DetailCtrl'
      },
      'fabContent': {
          template: ''
      }
  }
})
;


// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/app/products');



});
