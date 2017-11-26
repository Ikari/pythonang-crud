var genreApp = angular.module('genreApp', []);

function genreController($scope, $http){

    $scope.editGenre = function(genreId){

        console.log(genreId)
        //$window.location.href = '/genero.html';
    };

    $scope.genres = [];
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
        })
        ;
    }
}