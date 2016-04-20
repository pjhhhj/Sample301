
define(["angularAMD", "angular", "ui-router"], function (angularAMD) {

  var app = angular.module('app', ["ui.router"]);

  var controllerNameByParams = function($stateParams)
  {
    // naive example of dynamic controller name mining
    // from incoming state params

    var controller = "OtherCtrl";

    if ($stateParams.id === 1) {
      controller = "DefaultCtrl";
    }

    return controller;
  }

  app.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider)
    {
      $stateProvider
        .state("default", angularAMD.route({
          url: "/{id:int}",
          templateProvider: function($stateParams)
          {
            if ($stateParams.id === 1)
            {
              return "<div>ONE - Hallo {{title}}</div>";
            }
            return "<div>TWO - Hallo {{title}}</div>";
          },
          resolve: {
            loadController: ['$q', '$stateParams',
              function ($q, $stateParams)
              {
                // get the controller name === here as a path to Controller_Name.js
                // which is set in main.js path {}
                var controllerName = controllerNameByParams($stateParams);

                var deferred = $q.defer();
                require([controllerName], function () { deferred.resolve(); });
                return deferred.promise;
              }]
          },
          controllerProvider: function ($stateParams)
          {
            // get the controller name === here as a dynamic controller Name
            var controllerName = controllerNameByParams($stateParams);
            return controllerName;
          },
        }));

      $urlRouterProvider
        .otherwise("/1");
    }
  ]);

  return angularAMD.bootstrap(app);
})
