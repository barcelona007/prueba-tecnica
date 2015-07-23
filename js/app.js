var crossModule=angular.module("crossModule",['ngRoute','chart.js','ui.grid']);

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
    when('/totalsales/:sessionid', {
        templateUrl: 'totalsales.html',
        controller: 'totalsales'
    }).
    when('/salesmonth/:sessionid', {
        templateUrl: 'salesmonth.html',
        controller: 'salesmonth'
    }).
    when('/toporder/:sessionid', {
        templateUrl: 'toporder.html',
        controller: 'toporder'
    }).
    when('/topsale/:sessionid', {
        templateUrl: 'topsale.html',
        controller: 'topsale'
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

crossModule.controller("totalsales",function($scope,$http,$routeParams,shareService){
    $scope.session_id = $routeParams.sessionid;       
     shareService.session_id=$scope.session_id;  
    $scope.salesmandata=function(){
         return $http.get("http://localhost:8080/salesmandata?sessionid="+shareService.session_id)
          .success(function(data){
              if(data.resultDescription==="SUCCESS"){                    
                  var salesman=[],quantity=[];
                  angular.forEach(data.data, function(value, key) {
                      salesman.push(value[0]);
                      quantity.push(value[1]);
                  }); 
                     $scope.labels = salesman;
                     $scope.data = quantity;                       
                }
          });
      };
      $scope.salesmandata();
});

crossModule.controller("salesmonth",function($scope,$http,$routeParams,shareService){
    $scope.session_id = $routeParams.sessionid;       
     shareService.session_id=$scope.session_id; 
    $scope.lastyeardata=function(){
         return $http.get("http://localhost:8080/lastyeardata?sessionid="+shareService.session_id)
          .success(function(data){
              var month=[],quantity=[];
                  angular.forEach(data.data, function(value, key) {                      
                      month.push(value[0]);
                      quantity.push(value[1]);
                  }); 
              if(data.resultDescription==="SUCCESS"){                   
                    $scope.labels = month;
                    $scope.series = ['Months'];

                    $scope.data = [
                      quantity                    
                    ];     
                }
          });
      };   
      $scope.lastyeardata();
});

crossModule.controller("toporder",function($scope,$http,$routeParams,shareService){
    $scope.session_id = $routeParams.sessionid;       
     shareService.session_id=$scope.session_id; 
  $scope.toporder=function(){
         return $http.get("http://localhost:8080/topsalesorders?sessionid="+shareService.session_id)
          .success(function(data){              
              if(data.resultDescription==="SUCCESS"){                   
                    $scope.myData=data.data;
               }
          });
      };   
      $scope.toporder();
});


crossModule.controller("topsale",function($scope,$http,shareService){
   $scope.topsale=function(){
         return $http.get("http://localhost:8080/topsalesmen?sessionid="+shareService.session_id)
          .success(function(data){
              var rows=[];
                  angular.forEach(data.data, function(value, key) {                      
                      var aux={};
                      aux.name=value[0];
                      aux.quantity=value[1];   
                      rows.push(aux);
                  }); 
              if(data.resultDescription==="SUCCESS"){                   
                    $scope.topsalesmen=rows;
               }
          });
      };   
      $scope.topsale();
});


