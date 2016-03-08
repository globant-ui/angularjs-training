var report = angular.module('report', ['ngRoute', 'myApp']);

report.controller('reportController', function($scope, incomeService) {
 $scope.income_table = incomeService.income_table;
 $scope.expense_table = incomeService.expense_table;
 $scope.total_Salary = 0;
 $scope.total_Business = 0;
 $scope.total_interest = 0;
 $scope.Rent = 0;
 $scope.Travel = 0;
 $scope.Shopping = 0;
 $scope.Study = 0;
 $scope.Party = 0;
 $scope.Office = 0;
 $scope.incomes = incomeService.incomes;
 $scope.expenses = incomeService.expenses;
 for (i = 0; i < $scope.incomes.length; i++) {
  $scope.incomes[i].amount = parseInt($scope.incomes[i].amount);
  if ($scope.incomes[i].type == "Salary") {
   console.log("here");
   $scope.total_Salary = $scope.total_Salary + $scope.incomes[i].amount;
  } else if ($scope.incomes[i].type == "Business") {
   $scope.total_Business = $scope.total_Business + $scope.incomes[i].amount;
  } else if ($scope.incomes[i].type == "interest") {
   $scope.total_interest = $scope.total_interest + $scope.incomes[i].amount;
  }
 }
 console.log(typeof($scope.incomes[0].amount));



 for (i = 0; i < $scope.expenses.length; i++) {
  $scope.expenses[i].amount = parseInt($scope.expenses[i].amount);

  /*if ($scope.expenses[i].category == "Rent") {
   console.log("here");
   $scope.Rent = $scope.Rent + $scope.expenses[i].amount;
  } else if ($scope.expenses[i].category == "Travel") {
   $scope.Travel = $scope.Travel + $scope.expenses[i].amount;
  } else if ($scope.expenses[i].category == "Office") {
   $scope.Office = $scope.Office + $scope.expenses[i].amount;
  } else if ($scope.expenses[i].category == "Shopping") {
   $scope.Shopping = $scope.Shopping + $scope.expenses[i].amount;
  } else if ($scope.expenses[i].category == "Study") {
   $scope.Study = $scope.Study + $scope.expenses[i].amount;
  } else if ($scope.expenses[i].category == "Party") {
   $scope.Party = $scope.Party + $scope.expenses[i].amount;
  }*/

  switch($scope.expenses[i].category)
  {
   case "Rent" :   $scope.Rent = $scope.Rent + $scope.expenses[i].amount;
                   break;
   case "Travel" :   $scope.Travel = $scope.Travel + $scope.expenses[i].amount;
                    break;
   case "Office" :   $scope.Office = $scope.Office + $scope.expenses[i].amount;
                      break;
   case "Shopping" :   $scope.Shopping = $scope.Shopping + $scope.expenses[i].amount;
                      break;
   case "Study" :   $scope.Study = $scope.Study + $scope.expenses[i].amount;
                      break;
   case "Party" :   $scope.Party = $scope.Party + $scope.expenses[i].amount;
                    break;
  }


 }



});