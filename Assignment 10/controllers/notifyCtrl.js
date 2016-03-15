	app.controller("notifyctrl",[ "$scope","$http", "expFactory", function($scope, $http,expFactory) {

    $scope.notifyArr=[];
    $scope.notifyArr=expFactory.getNotify();
    console.log("gtNootify - NotifyArr..."+$scope.notifyArr);

    $scope.notifyTest=function(){
		console.log("Notify test");
		console.log("got It...");
	};
        
    $scope.notifySet=function(notify){
        $scope.notifyArr=expFactory.notifySet(notify); 
        $scope.notify=null;
        $scope.reset();        
    };
        
    $scope.reset = function()
	{
		//$scope.newTrans={};
		$scope.notifyForm.$setPristine();
		$scope.notifyForm.$setUntouched();
		console.log("Notification Form... reset succeful.");
	};        
}]);