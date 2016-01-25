app.controller('expManagerCtrl', function( $scope ){
  console.log("Hello");
   $scope.expDetails = '';
   $scope.buttonValue = "Add";
   $scope.expenceType = [ 'Income', 'Expense' ];

   $scope.categoryType = [ 'Rent', 'Light Bill', 'Net Bill', 'Recharge', 'Other' ];
   $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
  $scope.sourcetype = [ 'Rent', 'Light Bill', 'Net Bill', 'Recharge', 'Other' ];

  $scope.addIncome = function(){
    console.log($scope.expDetails.type);
    console.log($scope.expDetails);
  }
})