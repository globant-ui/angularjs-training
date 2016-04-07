angular.module("expenseManagerApp").directive('inlineEdit',function($compile,CRUD){
	
	return {
		restrict: 'A',
		//templateUrl: 'views/directives/inlineEdit/inlineEdit.html',
		scope: {
            accessor: '='
        },
	    link: function(scope, element, attrs) {
	    	var modeOfPayment = ["Cash","Electronic Transfer","Cheque","Credit Card"];

         	scope.update = function(){
         		//get radio buttons checked value if radio button selected
         		if(attrs.type != 'radio'){
         			var updatedText = document.getElementById('inlineEditElement').value;
				} else if(attrs.type == 'radio') {
					var checked_value = document.querySelector('input[name = "inlineEditElement"]:checked').value;
					updatedText = eval(checked_value);
				}
				
	       		var transactionData = JSON.parse(attrs.data);
         		var entireTransactionData = JSON.parse(attrs.entiredata);

         		var elementPos = entireTransactionData.map(function(x) {return x.transactionId; }).indexOf(transactionData.transactionId);
				var objectFound = entireTransactionData[elementPos];
				
				//setting the data to be updated on server
				if(angular.isObject(objectFound)) {

					if(attrs.type == 'text'){
	         			if(attrs.transaction == 'income'){
	         				transactionData.payer = updatedText;
	         			} else {
	         				transactionData.payee = updatedText;
	         			}
	         		} else if (attrs.type == 'number') {
	         			transactionData.amount = updatedText;
	         		} else if(attrs.type == 'datepicker') {
	         			transactionData.date = updatedText;	
	         		} else if(attrs.type == 'radio') {
	         			transactionData.modeOfPayment = updatedText;
	         			
	         		}

	         		if(attrs.transaction == 'income'){
	         			scope.data_source			= CRUD.incomeUrl;
	         		} else if(attrs.transaction == 'expense') {
	         			scope.data_source			= CRUD.expenseUrl;
	         		}
	         		
	         		entireTransactionData[elementPos] = transactionData;

	         		//saving data to server
	         		scope.transactionData = entireTransactionData;
	         		
	         		CRUD.updateTransaction(scope);

	         		//showing the updated text to view.
	         		
	         		var template = "<span> "+updatedText+"</span>";
					element.html(template);
					$compile(element.contents())(scope);

				}
				
            }

			scope.cancel = function(){
				if(attrs.type != 'radio'){
         			var updatedText = document.getElementById('inlineEditElement').value;
				} else if(attrs.type == 'radio') {
					var checked_value = document.querySelector('input[name = "inlineEditElement"]:checked').value;
					updatedText = eval(checked_value);
				}
            	var template = "<span> "+updatedText+"</span>";
				element.html(template);
    			$compile(element.contents())(scope);
            }

			element.bind('dblclick', function () {
				scope.updatedText = '';
				if(attrs.type != 'radio') {
					var template = "<input type='"+attrs.type+"' id='inlineEditElement' value='"+element[0].innerText+"'>  </input> <i class='glyphicon glyphicon-ok' ng-click='update()'></i><i class='glyphicon glyphicon-remove' ng-click='cancel()'></i>";
				} else if(attrs.type == 'radio') {
					var template = "<input type='"+attrs.type+"' value='modeOfPayment[0]' ng-selected='element[0].innerText==modes' ng-model='addNew.modeOfPayment' name='inlineEditElement'> "+ modeOfPayment[0] +" &nbsp <input type='"+attrs.type+"' value='modeOfPayment[1]' ng-selected='element[0].innerText==modes' ng-model='addNew.modeOfPayment' name='inlineEditElement'> "+ modeOfPayment[1] +" &nbsp <input type='"+attrs.type+"' value='modeOfPayment[2]' ng-selected='element[0].innerText==modes' ng-model='addNew.modeOfPayment' name='inlineEditElement'> "+ modeOfPayment[2] +" &nbsp <input type='"+attrs.type+"' value='modeOfPayment[3]' ng-selected='element[0].innerText==modes' ng-model='addNew.modeOfPayment' name='inlineEditElement'> "+ modeOfPayment[3] +" &nbsp  <i class='glyphicon glyphicon-ok' ng-click='update()'></i> <i class='glyphicon glyphicon-remove' ng-click='cancel()'></i>";
				}
				element.html(template);
				/*console.log(element.innerHTML);
				return false;*/
    			$compile(element.contents())(scope);
	    		
            });

      }
    };

        
});