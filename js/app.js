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

crossModule.service("shareService",function(){
  this.session_id="";  
});

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


crossModule.controller("homeCtrl",function($scope,$http,$routeParams,shareService){
     $scope.session_id = $routeParams.sessionid;       
     shareService.session_id=$scope.session_id;    
});

crossModule.controller("totalsales",function($scope,shareService){
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
});

crossModule.controller("salesmonth",function($scope,shareService){
   $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
});

crossModule.controller("toporder",function($scope,shareService){
   $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
});


crossModule.controller("topsale",function($scope,shareService){
   $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
});


