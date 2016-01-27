app.controller('expManagerCtrl', function( $scope ){
  console.log("Hello");
   $scope.expDetails = {};
   $scope.buttonValue = "Add";
   $scope.expenceType = [ 'Income', 'Expense' ];

   $scope.categoryType = [ 'Rent', 'Light Bill', 'Net Bill', 'Recharge', 'Other' ];
   $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
  $scope.sourcetype = [ 'Rent', 'Light Bill', 'Net Bill', 'Recharge', 'Other' ];
  $scope.expenseData = [];
  var errorIs = true;
  $scope.addIncome = function(){
    console.log( $scope.expenseData );
    console.log($scope.expDetails.type);
    console.log($scope.expDetails);
    var data = {};
    if( $scope.expensedetailForm.type.$error.required || $scope.expensedetailForm.payer.$error.required || $scope.expensedetailForm.payee.$error.required ||
      $scope.expensedetailForm.categorytype.$error.required || $scope.expensedetailForm.amount.$error.required || $scope.expensedetailForm.dates.$error.required
      || $scope.expensedetailForm.note.$error.maxlength || $scope.expensedetailForm.note.$error.required ){
      errorIs = true;
     console.log( errorIs );
    }else {
      errorIs = false;
      data = {
        "amount":$scope.expDetails.amount,
         "categorytype":$scope.expDetails.categorytype,
          "date":$scope.expDetails.date,
           "modeofpayment":$scope.expDetails.modeofpayment,
            "note":$scope.expDetails.note,
             "payee":$scope.expDetails.payee,
              "payer":$scope.expDetails.payer,
               "type":$scope.expDetails.type
      }
    }
    if( !errorIs ) {
      $scope.expenseData.push( data );
       $scope.expenseData.reverse();
       console.log( $scope.expenseData );
       $scope.expDetails = "";
    }
    console.log( errorIs );
    console.log( $scope.expenseData );
  }
})