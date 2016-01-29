app.controller('expManagerCtrl', function( $scope, expneseMgtService,$timeout ){
  console.log("Hello");
    $scope.expDetails = {};
    $scope.buttonValue = "Add";

    $scope.categoryType = [ 'Rent', 'Light Bill', 'Internet Bill', 'Recharge', 'Other' ];
    $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
    $scope.expenseData = [];
    var errorIs = true;

    $scope.expenceType = [{
        type:'Income',isDefault:true
      },
      {
       type:'Expense',isDefault:false
      }];

    $scope.type = 'Income';

    console.log( expneseMgtService.getData() );
    var transactionId = 0;
    var expneseServiceData ="";

    $timeout(function(){
      expneseServiceData = expneseMgtService.getData();
      if( expneseServiceData.expensesData.length > 1 ) {
          transactionId = expneseServiceData.expensesData.length;
          $scope.expenseData = expneseServiceData.expensesData;
      }
      console.log( expneseServiceData );
    },100);

    $scope.clear = function(){
      $scope.expDetails.payer = "";
    }

    $scope.addIncome = function() {
        var data = {};
        if( $scope.expensedetailForm.$invalid ){
          errorIs = true;
         console.log( errorIs );
        }else {
          if( expneseServiceData.expensesData.length > 1 ){
              transactionId = expneseServiceData.expensesData.length;
          }
          transactionId++;
          errorIs = false;
          data = {
              "transactionId":transactionId,
              "amount":$scope.expDetails.amount,
              "categorytype":$scope.expDetails.categorytype,
              "date":$scope.expDetails.date,
              "modeofpayment":$scope.expDetails.modeofpayment,
              "note":$scope.expDetails.note,
              "payee":$scope.expDetails.payee,
              "payer":$scope.expDetails.payer,
              "type":$scope.type
          }
        }

        if( !errorIs ) {
          if( $scope.buttonValue == "Edit" ){
            $scope.buttonValue  = "Add";
            console.log( $scope.expDetails );
            console.log( $scope.expenseData );
            for( var i = 0; i < $scope.expenseData.length; i++ ){
              if( $scope.expenseData[i].transactionId == $scope.expDetails.transactionId  ){
                  $scope.expDetails.type = $scope.type;
                  $scope.expenseData[i] = $scope.expDetails;
              }
            }
            expneseMgtService.saveData( $scope.expenseData );
            $scope.expDetails = "";
          }else{
            $scope.expenseData.push( data );
            $scope.expenseData.reverse();
            console.log( $scope.expenseData );
            expneseMgtService.saveData( $scope.expenseData );
            alert( "Record Added Successfully...!" );
            $scope.expDetails = "";
            console.log( expneseMgtService.getData() );
          }
        }
    }

    $scope.deleteExpenseData = function( obj ){
      var index = $scope.expenseData.indexOf( obj );
      $scope.expenseData.splice( index, 1 );
    }

    $scope.editExpenseData = function( obj ){
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
    }

})