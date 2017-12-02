var app = angular.module('genresApp.controllers', []);

app.controller('genresController', 
[
    '$scope', 
    '$http',
    '$location',
    function($scope, $http, $location){

        $scope.genres = [];

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

app.controller('genreController', 
[
    '$scope', 
    '$route',
    '$http',
    '$location',
    function($scope, $route, $http, $location){

        $scope.genre;

        $scope.loadGenre = function(){   
            
            $http
            .get("http://127.0.0.1:5002/genres/" + $route.current.params.id)
            .success(
                function(data){
                    console.log(data.data[0])
                    if (data != null && data.data != null && data.data.length > 0)
                        console.log(data.data[0])
                        $scope.genre = data.data[0];
                }
            )
            .error(function(err){
                console.log(err);
            });
        }


        $scope.editGenre = function(){ 
            $http
            .post("http://127.0.0.1:5002/genres/" + $scope.genre.GenreId)
            .success(
                function(data){
                    console.log(data.data[0])
                    alert("sucesso!");
                }
            )
            .error(function(err){
                console.log(err);
            });
        };
    }
]);