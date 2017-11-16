app.controller('indexController',['$scope','$uibModal',function($scope, $uibModal){
        $scope.user = "";
        $scope.password = "";
        $scope.login = function(){
            alert($scope.user);
        };
}]);


