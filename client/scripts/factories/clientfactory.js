StuckApp.factory("ClientService",["$http", function($http){
  var client ={}

  console.log("client service")
  var getInfo = function(){
    $http.get("/submit").then(function(response){
      console.log(response.data);
      client.things = response.data
    })
  };

  var submitInfo = function(data){
    $http.post("/submit", data).then(function(response){
    });
  };

return{
  client:client,
  getInfo:getInfo,
  submitInfo:submitInfo,
};

}]);
