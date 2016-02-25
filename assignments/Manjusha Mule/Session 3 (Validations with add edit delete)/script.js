(function(){
var ExpenseManager = angular.module('ExpenseManager',[]);

	ExpenseManager.controller('ExpenseCtrl', function($scope){

		$scope.categories_exp  = ["Rent", "Travel", "Office", "Studies"];		
		$scope.categories_inc  = ["Salary", "Business", "Intersts", "Other"];
		$scope.modeOfPayment  = ["Cheque", "Cash", "Credit Card", "Debit Card"];


		$scope.totalIncome = 0;
		$scope.totalExpense = 0;
		$scope.balance = 0;
		$scope.expense = [];
		$scope.income = [];
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
			var id = $scope.Transaction.id;
			if(choice)
				$scope.income.push($scope.Transaction);
			else
				$scope.expense.push($scope.Transaction);
			
			calculateBalance();

			$scope.Transaction = {id : "" ,
						   amount : "",
							category : "",
							date : "",
							mode : "", 
							note : ""
						   };
			$scope.detailsForm.$setPristine();

		};

		$scope.EnableEdit = function(exp, index){
				//$scope.Transaction = exp;
				$scope.edit = true;
				
				$scope.Transaction = {
        		id: exp.id,
        		amount: exp.amount,
        		category: exp.category,
        		date: exp.date,
        		mode: exp.mode,
        		note : exp.note
    		  };
    		  $scope.editThis = index;
		};

		$scope.editTransaction = function(choice){
			if(choice){
				$scope.totalIncome -= parseInt($scope.income[$scope.editThis].amount, 10);
				$scope.income.splice($scope.editThis, 1);
				$scope.income.splice($scope.editThis, 0, $scope.Transaction);
			}
			else
			{
				$scope.expense.splice($scope.editThis, 1);
				$scope.expense.splice($scope.editThis, 0, $scope.Transaction);
			}

			calculateBalance();	
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

		$scope.delete = function(index, choice){
			if(choice){
  				$scope.totalIncome -= parseInt($scope.income[index].amount, 10);
  				$scope.income.splice(index, 1);
			}
  			else{
  				$scope.totalExpense -= parseInt($scope.expense[index].amount, 10);
  				$scope.expense.splice(index, 1);
  			}
  			calculateBalance(); 
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

		var calculateBalance = function(){
			$scope.totalIncome = 0;
			$scope.totalExpense = 0;
			$scope.balance = 0;
		for(var i = 0 ; i < $scope.income.length; i++)
			$scope.totalIncome += parseInt($scope.income[i].amount,10); 

		for(var i = 0 ; i < $scope.expense.length; i++)
			$scope.totalExpense += parseInt($scope.expense[i].amount, 10); 

		$scope.balance = $scope.totalIncome - $scope.totalExpense;
	}
})

})();