 'use strict';
    app.controller('settingCtrl', ['$scope',  function($scope) {
    
     $scope.notifyArray =[{ "category": "Movie",
                            "subCategory": 2000,
                            "transType": "15-10-2015",
                            "reccur": "online"
                        },
                          { "category": "Movie",
                            "subCategory": 2000,
                            "transType": "15-10-2015",
                            "reccur": "online"
                        }
                         
                         ];
    
    $scope.addNotification = function (notifyData) {
        
        console.log("hello");
                console.log(notifyData);
        
                $scope.notifyArray.push(notifyData);
                $scope.notifyData = {};
                console.log(notifyArray);
                
               
            }
        
    }]);



app.directive("notification", function(){
    console.log("Inside Directive ... ");
    return {       
        restrict:"E",
        require: '^ngModel',
        scope: {
                data:'='
                },

        templateUrl:"views/notification.html"
    }
});