var crossModule=angular.module("crossModule",['ngRoute','chart.js']);

crossModule.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/homepage/:sessionid', {
        templateUrl: 'homepage.html',
        controller: 'homeCtrl'
    }).
    when('/login', {
        templateUrl: 'login.html',
        controller: 'crossCtrl'
    }).
    otherwise({
        redirectTo: '/login'
    });
}]);

crossModule.controller("indexCtrl",function($scope){
      
});

crossModule.controller("crossCtrl",function($scope,$http){  
      $scope.user='';
      $scope.password="";
      
      $scope.login=function(){
         return $http.get("http://localhost:8080/login?username="+$scope.user+"&password="+$scope.pass)
          .success(function(data){              
              if(!data.loginSucceeded){
                  alert("Incorrect Login Credentials");
              }
              else{                  
                  location.href="#homepage/"+data.sessionId;
              }
          });
      };
});


crossModule.controller("homeCtrl",function($scope,$http,$routeParams){
     $scope.session_id = $routeParams.sessionid;
     
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
});