
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
			//return def.promise;

		},
		function(response)
		{
			msg="Something Went Wrong !";
			console.log(msg);
			def.reject("Failed to get albums");
		});
		//return	Transaction;
        return def.promise;
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

	factory.addTrans = function(newTrans, startAdd, startEdit)
	{
		newTrans.date=factory.convertDate(newTrans.date);
		console.log("TypeOf Newdate"+typeof(newTrans.date))

		if(startAdd==false && startEdit==true)
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
					console.log("Transaction.data[i].date"+Transaction.data[i].date+"---"+typeof(Transaction.data[i].date));
					console.log("newTrans.date"+newTrans.date+"---"+typeof(newTrans.date));
					Transaction.data[i].date=newTrans.date;
					Transaction.data[i].modeOfPayment= newTrans.modeOfPayment;
					Transaction.data[i].transType = newTrans.transType;				

					edited=true;
					break;
				}
			}
			if(edited===false)	
			console.log("Transaction Not Found...");
		}

		if(startAdd==true && startEdit==false)
		{			
				Transaction.data.push(newTrans);
		}
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
				var strtodate=factory.toDate(Transaction.data[i].date);
console.log("Date  :"+Transaction.data[i].date+"Date in date format"+strtodate);				
				edited=true;
				console.log("In Add trans 3");
				newTrans.transactionId=Transaction.data[i].transactionId;				
				newTrans.payer = Transaction.data[i].payer;
				newTrans.payee = Transaction.data[i].payee ;
				newTrans.category = Transaction.data[i].category;
				newTrans.subCategory = Transaction.data[i].subCategory;
				newTrans.amount = Transaction.data[i].amount;
				newTrans.date =strtodate;
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


	factory.convertDate=function(inputFormat) 
	{
console.log("Inside Conver Date..."+inputFormat);		
  		function pad(s) 
  		{ 
  			return (s < 10) ? '0' + s : s; 
  		}
  		var d = new Date(inputFormat);

  		return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
	};
	
	factory.toDate=function(dateStr) {
console.log("Inside toDate...")		
    	var parts = dateStr.split("-");
    	return new Date(parts[2], parts[1] - 1, parts[0]);
	}
	return factory;
});
