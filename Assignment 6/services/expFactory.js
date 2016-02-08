
app.factory("expFactory", function($http, $q) {
	var factory= {};
	var Transaction = {};
	var msg;

	var newTrans={};
	var edited=false;

	factory.getTrans= function()
	{
		var def = $q.defer();

        $http.get("json/expData.json")
		.then(function(response)
		{
			Transaction.data=response.data;
			balance();
			def.resolve(response);
			console.log("Resolved...")
			return Transaction;

		},
		function(response)
		{
			msg="Something Went Wrong !";
			console.log(msg);
			def.reject("Failed to get albums");
		});
		return	Transaction;
	}

	factory.balance=function()
	{
		var sum={};
		var sum_income=0, sum_expense=0, total=0;
		for(var i=0; i<Transaction.data.length; i++)
		{		
			if(Transaction.data[i].transType=="income"){
				sum_income=sum_income + Transaction.data[i].amount;
			}
			else if(Transaction.data[i].transType=="expense"){
				sum_expense = sum_expense + Transaction.data[i].amount;
			}
		}
		sum.sum_income=sum_income;
		sum.sum_expense=sum_expense;
		sum.total=sum.sum_income - sum.sum_expense ;

		return sum;
	}

	factory.addTrans = function(newTrans)
	{
		for(var i=0; i<Transaction.data.length; i++)
		{
			if(Transaction.data[i].transactionId == newTrans.transactionId )
			{
				edited=true;
				Transaction.data[i].payer=newTrans.payer;
				Transaction.data[i].payee = newTrans.payee;
				Transaction.data[i].category=newTrans.category;
				Transaction.data[i].subCategory=newTrans.subCategory;
				Transaction.data[i].amount=newTrans.amount;
				Transaction.data[i].date=newTrans.date;
				Transaction.data[i].modeOfPayment= newTrans.modeOfPayment;
				Transaction.data[i].transType = newTrans.transType;				

				edited=true;
				break;
			}
		}
		if(edited===false)	Transaction.data.push(newTrans);
		console.log("In Add trans 4"+newTrans.transType);
		edited=false;
		return Transaction;
	};

	factory.deleteTrans=function(searchId ){
		console.log("Inside Delete Trans ....");
		for(var i=0; i<Transaction.data.length; i++)
		{
			if(Transaction.data[i].transactionId == searchId )
			{
				Transaction.data.splice(i,1);
				break;
			}
		}
		return Transaction;
	};

	factory.editTrans=function(searchTerm)
	{
		console.log("Inside ---Factory---- search --"+searchTerm)
		var trFound=false;
		for(i=0; i<Transaction.data.length; i++)
		{
			console.log("Inside for --- "+Transaction.data[i].transactionId)
			if(Transaction.data[i].transactionId==searchTerm)
			{
				console.log("Youreka! transaction Found"+Transaction.data[i].transactionId);
				console.log(typeof(Transaction.data[i].transactionId));
				trFound=true;
				return Transaction.data[i].transactionId;
				break;
			}
		}
		if(trFound==false){

			alert("Transaction Not Found...")
		}
		return null;
	}

	factory.setForm=function(searchTrans )
	{
		var setForm=false;
		for(var i=0; i<Transaction.data.length; i++)
		{
			console.log("In Add trans 2");
			if(Transaction.data[i].transactionId == searchTrans)
			{
				edited=true;
				console.log("In Add trans 3");
				newTrans.transactionId=Transaction.data[i].transactionId;				
				newTrans.payer = Transaction.data[i].payer;
				newTrans.payee = Transaction.data[i].payee ;
				newTrans.category = Transaction.data[i].category;
				newTrans.subCategory = Transaction.data[i].subCategory;
				newTrans.amount = Transaction.data[i].amount;
				newTrans.date =Transaction.data[i].date;
				newTrans.modeOfPayment=Transaction.data[i].modeOfPayment;
				newTrans.transType=Transaction.data[i].transType;				
				setForm=true;
				break;
			}
		}
		if(setForm===true)
 		return newTrans;
 		else {console.log("Something wrong in setForm...");}

	};
	return factory;
});
