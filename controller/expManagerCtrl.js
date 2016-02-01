app.controller('expManagerCtrl', function( $scope, expneseMgtService ){
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

    var transactionId = 0;
    var expneseServiceData ="";

    var promise =expneseMgtService.getjson()
    .then(function(data) {
      expneseServiceData = data;

       $scope.currentBalance = expneseServiceData.current_balance;
       $scope.expenseData = expneseServiceData.expensesData;

       $scope.expenseData.currentBalance = expneseServiceData.current_balance;
    }, function(error) {
       return error;
    })
    .finally(function() {
      console.log('Finished at:', new Date())
    });

    $scope.clear = function(){
      $scope.expDetails = "";
    }
    $scope.errors = {
        'requiredPayerName': false,
        'requiredPayeeName': false,
        'requiredCatName': false,
        'requiredAmount': false,
         'requiredDate': false,
         'modeofPayment': false,
         'note': false,
         'noteLength': false,

    };
console.log($scope.expDetails.payer);
  //  $scope.errors.requiredPayerName = a.trim().length > 1 ? true : false;
  $scope.checkValidations = function(){
     $scope.errors.requiredPayerName = !$scope.expDetails.payer ? true : false;
      $scope.errors.requiredPayeeName = !$scope.expDetails.payee ? true : false;
      $scope.errors.requiredCatName = $scope.expDetails.categorytype == undefined ? true : false;
      $scope.errors.requiredAmount = !$scope.expDetails.amount ? true : false;
      $scope.errors.requiredDate = !$scope.expDetails.date ? true : false;
      $scope.errors.modeofPayment = !$scope.expDetails.modeofpayment ? true : false;
      $scope.errors.note = !$scope.expDetails.note ? true : false;
      if( !$scope.errors.note ){
              $scope.errors.noteLength = $scope.expDetails.note.length > 50 ? true : false;
      }
  }

    var data = {};
    $scope.addIncome = function() {

        $scope.checkValidations();
        if( $scope.errors.requiredPayerName ||  $scope.errors.requiredPayeeName || $scope.errors.requiredCatName || $scope.errors.requiredAmount || $scope.errors.requiredDate || $scope.errors.modeofPayment){
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

            console.log( $scope.expDetails );
            console.log( $scope.expenseData );
            $scope.checkValidations();


            var income = 0,expense = 0 ;
            for( var i = 0; i < $scope.expenseData.length; i++ ){
              if( $scope.expenseData[i].transactionId == $scope.expDetails.transactionId  ){
                  $scope.expDetails.type = $scope.type;
                  $scope.expenseData[i] = $scope.expDetails;
              }
            }
             for( var i = 0; i < $scope.expenseData.length; i++ ){
                if( $scope.expenseData[i].type == "Income" ){
                  console.log( "income" + $scope.expenseData[i].amount);
                    income = income + parseInt( $scope.expenseData[i].amount );
                }else if( $scope.expenseData[i].type == "Expense" ){
                  console.log( "expensw"+$scope.expenseData[i].amount);
                    expense = expense + parseInt( $scope.expenseData[i].amount );
                }
              }
            console.log( income );
            console.log( expense );
             if( parseInt( income ) < parseInt( expense )){
                alert("Expense is More than Balance");
            }else{
            $scope.currentBalance = parseInt( income ) - parseInt( expense );
            expneseMgtService.saveData( $scope.expenseData );
            $scope.expDetails = "";
          }
          }else{
            $scope.buttonValue  = "Add";
            $scope.calculationFun();
            data.current_balance = $scope.currentBalance;
            $scope.expenseData.push( data );
            $scope.expenseData.reverse();
            console.log( $scope.expenseData );
            expneseMgtService.saveData( $scope.expenseData );
            alert( "Record Added Successfully...!" );
            $scope.expDetails = "";
          }
        }
    }
    $scope.calculationFun = function(){
       if(  $scope.type == "Income"){
                $scope.currentBalance = parseInt( $scope.currentBalance ) + parseInt( $scope.expDetails.amount );
            }else{
                  if( parseInt( $scope.expDetails.amount ) > parseInt( $scope.currentBalance )){
                    alert("Account Balance is less");
                  }else{
                      $scope.currentBalance = parseInt( $scope.currentBalance ) - parseInt( $scope.expDetails.amount );
                  }
            }
    }
    $scope.deleteExpenseData = function( obj ){
      console.log( obj )
      $scope.currentBalance = parseInt( $scope.currentBalance ) - parseInt( obj.amount );
      var index = $scope.expenseData.indexOf( obj );
      $scope.expenseData.splice( index, 1 );
    }
    var editValue = "";
    $scope.editExpenseData = function( obj ){
      console.log( $scope.expenseData );
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
      editValue = obj.amount;
    }

})