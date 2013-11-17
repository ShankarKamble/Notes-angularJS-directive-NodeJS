/*********************************************************************
    This file contains the declaration and definition of modules.
**********************************************************************/

'use strict';

//Module for noteApp
var noteApp = angular.module('noteApp', ['$strap.directives']);

//Main module - one module to rule them all, one module to bind them
var app = angular.module('cmcSilkApp', ['ui.bootstrap',  'noteApp']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
           templateUrl: '/partials/cs-app.html',
           controller: 'cmcNotesAppSilkCtrl'
        })
        .when('/note', {
            templateUrl: '/partials/cs-app.html',
            controller: 'cmcNotesAppSilkCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptorCacheBuster');
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.responseInterceptors.push(function ($q, $location) {
        return function (promise) {
            return promise.then(
                //Success: Just return the response
                function (response) {
                    return response;
                },
                //Error: check the error status to identify unauthorized access
                function (response) {
                    if (response.status === 401) {
                        docCookies.setItem('redirectTo', $location.url());
                        $location.url('/login');
                    }

                    return $q.reject(response);
                }
            );
        };
    });
}]);

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
}]);

