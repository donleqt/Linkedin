/**
 * Created by don on 4/27/16.
 */
(function (angular) {
    
    var myApp = angular.module("myApp",[]);
    
    myApp.controller ("MainController",function ($scope,$http) {
        $scope.data= [];
        $scope.title = "Don Le";

        // Get data from json file
        $http.get("data/mydata.json").then(function (res) {
            $scope.data = res.data;
        }, function (err) {
            console.log(err.statusText);
        })
    });
})(window.angular);