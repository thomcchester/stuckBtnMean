StuckAppRegistration.factory("RegisterService",["$http", function($http){
  console.log("infactory")
  var data = {};

  var postData = function(username, password, teamname){
    var registerObject = {};
    registerObject.username = username;
    registerObject.password = password;
    $http.post('/registrationuser', registerObject).success(function(response){
      console.log("We Dun Did It");
    });
  }

  return {
    postData : postData
  };
}]);
