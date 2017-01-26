// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'app.data-service'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '/root',
        abstract: true,
        templateUrl: 'menu.html',
        controller: 'SideMenuController'
      })
      .state('root.page2', {
        url: '/page2',
        views: {
          contentView: {
            templateUrl: 'page2.html',
            controller: 'Page2Controller'
          }
        }
      })
      .state('root.page2.profil', {
        url: '/profil',
        views: {
          profilContent: {
            templateUrl: 'profil.html',
            controller: 'PageFootballController'
          }
        }
      })
      .state('root.page2.addPicture', {
        url: '/addPicture',
        views: {
          uploadContent: {
            templateUrl: 'addPicture.html',
            controller: 'PageTennisController'
          }
        }
      })

      .state('root.page2.listeLikes', {
        url: '/listeLikes/:postId',
        views: {
          uploadContent: {
            templateUrl: 'listeLikes.html',
            controller: 'PageLikesController'
          }
        }
      })

      .state('root.page2.listeComments', {
        url: '/listeComments/:postId',
        views: {
          uploadContent: {
            templateUrl: 'listeComments.html',
            controller: 'PageCommentsController'
          }
        }
      })

      .state('root.page2.home', {
        url: '/home',
        views: {
          homeContent: {
            templateUrl: 'home.html',
            controller: 'PageHomeController'
          }
        }

      });

    $urlRouterProvider.otherwise('/root/page2/home')

  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }).controller('SideMenuController', function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('home.html', {}).then(function (modalView) {
    $scope.loginModal = modalView;
  });

  $scope.showLoginModal = function () {
    $scope.loginModal.show();
  }
})

  .controller('Page1Controller', function ($scope) {

  })

  .controller('Page2Controller', function ($scope) {

  })

  .controller('Page3Controller', function ($scope) {
    $scope.listItems = [1, 2, 3, 4, 5];

    $scope.deleteItem = function (index) {
      $scope.listItems.splice(index, 1);
    }

    $scope.moveItem = function (item, fromIndex, toIndex) {
      $scope.listItems.splice(fromIndex, 1);
      $scope.listItems.splice(toIndex, 0, 1);
    }
  })

  .controller('Page4Controller', function ($scope) {

  })
  .controller('PageFootballController', function ($scope) {

  })
  .controller('PageTennisController', function ($scope) {

  })
  .controller('PageLikesController', function ($scope, $stateParams, dataService) {
    dataService.getLikes($stateParams.postId).then(function (response) {
      $scope.likes = response;
      console.log($scope.likes);
    }, function (error) {
      console.log(error);
    })
  })

  .controller('PageCommentsController', function ($scope, $stateParams, dataService) {
    dataService.getComments($stateParams.postId).then(function (response) {
      $scope.comments = response;
      console.log($scope.comments);
    }, function (error) {
      console.log(error);
    })
  })

  .controller('PageHomeController', function ($scope, dataService) {
    // Connexion
    dataService.autoLogin();
    dataService.getCurrentUser();

    // On récupère les posts
    dataService.getPosts().then(function (response) {
      $scope.posts = response;
    }, function (error) {
      console.log(error);
    })


  })
