		app.controller("expensecntr",[ "$scope", function($scope) {
			$scope.total=0;
			$scope.total_expense=0;
			$scope.total_income=0;

			$scope.exvisible=false;
			$scope.clicked=false;

			$scope.expenses= [
				{ Rent : 5000, Travel  :3000, Party : 4000, Studies	: 1000, Shopping :10000 }
			];


			$scope.income= [
				{ Salary : 40000, Business  :20000, Deposites : 5000 }
			];

console.log( $scope.income.length );
			function tot_income1()
			{
					for( var i=0; i<$scope.income.length; i++)
					{
						for( key in $scope.income[i])
						{
							console.log("Hello me"+key);
						}
					}

			}
			tot_income1();

			


/*
			$scope.income= new Object();
			$scope.income.Salary = 40000;
			$scope.income.Business = 20000;
			$scope.income.Deposites = 5000;

			$scope.tot_income=$scope.income["Salary"] +	$scope.income["Business"]+	$scope.income["Deposites"] ;
			$scope.tot_expense = $scope.expenses["Rent"]+	$scope.expenses["Travel"] +	$scope.expenses["Party"] +	$scope.expenses["Studies"]	+ $scope.expenses["Shopping"] ;

			$scope.total = $scope.tot_income - $scope.tot_expense;
			*/
		}]);
