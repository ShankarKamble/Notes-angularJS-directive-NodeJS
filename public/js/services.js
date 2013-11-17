/**************************************************************
    This file contains all the services used by the
    application.

    Module: wearTestWebApp
***************************************************************/

'use strict';



//This service provides a key-value store for when you want to store a value for a directive
//that is many levels deep
app.factory('store', [function() {
    var store = {};

    return {
        get: function (key) {
            return store[key];
        },

        set: function (key, value) {
            store[key] = value;
        }
    }
}]);

//Returns a unique ID each time it is called
app.factory('uniqueIds', function () {
    var delim = "-";

    function S4 () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return {
        generate: function () {
            return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
        }
    };
});


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
app.factory('debounce', function ($timeout, $q) {
    return function (func, wait, immediate) {
        var timeout;
        var deferred = $q.defer();
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) {
                    deferred.resolve(func.apply(context, args));
                    deferred = $q.defer();
                }
            };
            var callNow = immediate && !timeout;
            if (timeout) {
                $timeout.cancel(timeout);
            }
            timeout = $timeout(later, wait);
            if (callNow) {
                deferred.resolve(func.apply(context, args));
                deferred = $q.defer();
            }
            return deferred.promise;
        };
    };
});




app.factory('httpRequestInterceptorCacheBuster', ['$q', function ($q) {
    return {
        request: function (request) {
            if (request) {
                if (request.method === "GET" && request.url.indexOf('.html') === -1) {
                    var sep = request.url.indexOf('?') === -1 ? '?' : '&';
                    request.url = request.url + sep + 'cacheSlayer=' + new Date().getTime();
                }
            }

            return request || $q.when(request);
        }
    };
}]);

