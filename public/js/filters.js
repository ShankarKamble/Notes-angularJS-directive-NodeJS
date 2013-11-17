/**************************************************************
    This file contains all the filters used by the
    application.

    Module: amcSilkApp
***************************************************************/

//This filter capitalizes the first character of the supplied string
app.filter('capitalize', function () {
    return function (input, scope) {
        var capitalizedString = "";

        if (angular.isUndefined(input) || input.length < 2) {
            return;
        }

        //Capitalize the first letter
        capitalizedString = input.substring(0, 1).toUpperCase();

        //Concatenate with the rest of the string without capitalization
        capitalizedString = capitalizedString + input.substring(1);

        return capitalizedString;
    };
});


app.filter('UTCDate', function($filter) {
    return function(date, format) {
        if (!date) {
            return "";
        }

        if (typeof date === 'string') {
            date = new Date(date);
        }

        if (!format) {
            format = 'MM/dd/yyyy';
        }

        var now = date;
        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

        var formatedUTCDate =   now_utc + "/" + date.getUTCDate();
        return $filter('date')(now_utc, format);
  };
 });

app.filter('startFrom', function() {
    return function(input, idx) {
        if(angular.isUndefined(input)){
            return;
        }
        var i=idx, len=input.length, result = [];
        for (; i<len; i++)
            result.push(input[i]);
        return result;
    };
});

app.filter('truncate', function () {
    return function (text, length, end) {
        if(angular.isUndefined(text)){
            return "";
        }

        if(angular.isUndefined(length)){
            return text;
        }

        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
});


