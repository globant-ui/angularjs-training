var app = angular.module('myApp',[]);

app.controller('myControl',function($scope){
 
  
   
            $scope.ShowIncome = function () {
              $scope.IsVisible = false;
            }
            
            $scope.ShowExpance = function(){
              $scope.IsVisible = true;  
            }
    
     $scope.expenseData = [
        {
            name: 'Gaurishankar',
            hra: 14000,
            lta: 1020,
            medical: 1050,
            party:4000
        },
        {
            name: 'John',
            hra: 7000,
            lta: 7200,
            medical: 8500,
            party:5000
        }
    ];
    
     $scope.incomeData = [
        {
            name: 'Gaurishankar',
            income: 30000,
            sources: 'Salary'
            
        },
        {
            name: 'John',
            income: 80000,
            sources: 'Business'
        }
    ];
    
});