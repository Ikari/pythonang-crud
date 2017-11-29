var app = angular.module('genresApp.controllers', []);

app.controller('genresController', 
[
    '$scope', 
    '$http',
    '$location',
    function($scope, $http, $location){

        $scope.genres = [];

        $scope.editGenre = function(genreId){ $location.path = '/genre-detail/' + genreId };
        $scope.deleteGenre = function(genreId){ console.log(genreId) };            
        $scope.loadGenres = function(name){    
            $http
            .get("http://127.0.0.1:5002/genres")
            .success(
                function(data){
                    if (data != null && data.genres.length > 0)
                        data.genres.map(g => $scope.genres.push({ GenreId: g.GenreId, Name: g.Name }))
                }
            )
            .error(function(err){
                console.log(err);
            });
        }
    }
]);