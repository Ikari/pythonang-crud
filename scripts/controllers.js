var app = angular.module('genresApp.controllers', []);

app.controller('genresController', 
[
    '$scope', 
    '$http',
    '$location',
    function($scope, $http, $location){

        $scope.genres = [];
   
        $scope.loadGenres = function(name){    
            $http
            .get("http://127.0.0.1:5002/genres")
            .success(
                function(data){
                    if (data != null && data.genres.length > 0){
                        $scope.genres = [];
                        data.genres.map(g => $scope.genres.push({ GenreId: g.GenreId, Name: g.Name }))
                    }
                }
            )
            .error(function(err){
                console.log(err);
            });
        }

        $scope.deleteGenre = function(genreId){ 
            $http
            .delete("http://127.0.0.1:5002/genres_delete/" + genreId)
            .success($scope.loadGenres)
            .error(function(err){
                console.log(err);
            });
        };        
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
                    if (data != null && data.genre != null && data.genre.length > 0)
                        $scope.genre = data.genre[0];
                }
            )
            .error(function(err){
                console.log(err);
            });
        }

        $scope.editGenre = function(){ 

            var data = { 'Name': $scope.genre.Name, 'GenreId': $scope.genre.GenreId };

            $http
            .put("http://127.0.0.1:5002/genre_update", data)
            .success(
                function(data){
                    $location.path("#genres");   
                }
            )
            .error(function(err){
                console.log(err);
            });
        };
    }
]);

app.controller('newgenreController', 
[
    '$scope', 
    '$route',
    '$http',
    '$location',
    function($scope, $route, $http, $location){

        $scope.genre;

        $scope.newGenre = function(){ 

            console.log("cheguei")

            var data = { 'Name': $scope.genre.Name };

            $http
            .post("http://127.0.0.1:5002/genres_insert", data)
            .success(
                function(data){
                    $location.path("#genres");
                }
            )
            .error(function(err){
                console.log(err);
            });
        };
    }
]);