/*jslint es6 */
/*global angular, console*/
"use strict";

let myApp = angular.module('myApp', ['blockUI']);

myApp.controller('myAppController', ['$scope', '$http', function ($scope, $http) {
    $scope.infoMessage = "";
    $scope.appInfo = {};
    $scope.copyrightYears = "2016-2020";
    $scope.copyrightCompany = "Company Name";


    $scope.showInfoBar = false;
    // info message
    $scope.infoMsg = function (message) {
        $scope.infoMessage = message;
        $scope.showInfoBar = true;

    };

    /// remove  info message
    $scope.removeInfoBar = function() {
        $scope.showInfoBar = false;
    }
    $scope.serviceData = {};
    $scope.serviceData.payloadData = '{"title": "foo","body": "bar","userId": 1}';
    $scope.serviceData.limit = 10;
    $scope.serviceData.iterations = 10;
    $scope.serviceData.methodType = "post";
    $scope.serviceData.headers = '{"uuid":1234}';
    $scope.serviceData.url = "http://jsonplaceholder.typicode.com/posts";
    $scope.submitClick = function () {      
        let requestObj = $scope.serviceData;
        let req = {
            method: 'POST',
            url: '/v1/benchMark',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                requestObj: requestObj
            }
        };
        $scope.showInfoBar = false;
        $scope.resp = null;
        $http(req).then(function(response) {

            $scope.infoMsg(":: Service completed successfully :: ");
            $scope.resp = response.data;
        }, function(response) {
            console.log(response);
            $scope.infoMsg(":: Service failed ::");
        });

    };
}]);