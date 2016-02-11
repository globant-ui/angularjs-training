'use strict'
angular.module('ExpenseManager')
  .controller('ExpenseCtrl', function ($scope,$rootScope, ExpenseService,editDeleteService) {
   $scope.categories_exp  = ["Rent", "Travel", "Office", "Studies"];		
		
		$scope.modeOfPayment  = ["Cheque", "Cash", "Credit Card", "Debit Card"];

		$scope.edit = false;
		$scope.editThis = 0;

		$scope.Transaction = {id : "",
						   amount : "",
							category : "",
							date : "",
							mode : "",
							note : ""
						   };
			
		$scope.addExpense = function(choice){
			
			ExpenseService.addTransaction($scope.Transaction,false);			
			$rootScope.$broadcast('Expense added',$scope.Transaction.amount);
			
			
			$scope.Transaction = {id : "" ,
						   amount : "",
							category : "",
							date : "",
							mode : "", 
							note : ""
						   };
			$scope.detailsForm.$setPristine();

		};
		$scope.$on('Enable Edit', function(event){
			$scope.edit = editDeleteService.edit;
			$scope.Transaction = {
        		id: editDeleteService.objToBeUpdated.id,
        		amount: editDeleteService.objToBeUpdated.amount,
        		category: editDeleteService.objToBeUpdated.category,
        		date: editDeleteService.objToBeUpdated.date,
        		mode: editDeleteService.objToBeUpdated.mode,
        		note : editDeleteService.objToBeUpdated.note
    		  };
    		  console.log($scope.Transaction.amount + "   " + $scope.Transaction.category);
    		  $scope.editThis = editDeleteService.editThis;
		});

		
		$scope.editExp = function(choice){
			$scope.oldAmount = editDeleteService.oldAmount;
			ExpenseService.editTransaction($scope.editThis,false,$scope.Transaction);
			$rootScope.$broadcast('Expense updated',$scope.Transaction.amount,$scope.oldAmount);
			
			$scope.Transaction = {id : "" ,
						   amount : "",
							category : "",
							date : "",
							mode : "", 
							note : ""
						   };
			$scope.detailsForm.$setPristine();
			$scope.edit = false;
		};

		

		$scope.reset = function(){
			$scope.Transaction = {id : "" ,
						   amount : "",
							category : "",
							date : "",
							mode : "", 
							note : ""
						   };
			$scope.detailsForm.$setPristine();
		}
  });