(function(){
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

    $scope.lista = '';
    $scope.message = "";

    $scope.verifyToMuch = function (){
        const array = $scope.lista.split(",");
        const size = array.length;
        console.log(size);
        if ( $scope.lista === "" )
        {
            $scope.message = "Please enter data first";
        }
        else if ( size <= 3 )
        {
            $scope.message = "Enjoy!";
        }
        else
        {
            $scope.message = "Too Much!";
        }
    };

}

})();