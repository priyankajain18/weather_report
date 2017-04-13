var app = angular.module('Weather', ['ngSanitize']);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

app.run(function(){
    if(location.href.split(location.host)[1] === "/weather-report/search-station/?success=true"){
        $('#message-modal').modal('show');
    }
});