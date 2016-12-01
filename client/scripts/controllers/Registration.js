StuckAppRegistration.controller('RegistrationController',  ['$scope', '$log', '$http', '$window', 'RegisterService', function($scope, $log, $http, $window, RegisterService) {
  //Independent Variables
  console.log(RegisterService)
  $scope.username_register;
  $scope.password_register;


  $scope.submit = function(username, password){
    console.log("Register Button Works");
    RegisterService.postData(username, password);
  }
}]);
