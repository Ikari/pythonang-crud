var app = angular.module('genresApp', ['ngRoute', 'genresApp.controllers']);

app.config([
    '$routeProvider',
    function($routeProvider){
        //$routeProvider.when('/genre-detail', { templateUrl:'views/detail.html', controller: 'genreController' });
        $routeProvider.when('/genres', { templateUrl:'views/list.html', controller: 'genresController' });
        $routeProvider.otherwise({ redirectTo: "/genres" });
    }
]);

app.run();