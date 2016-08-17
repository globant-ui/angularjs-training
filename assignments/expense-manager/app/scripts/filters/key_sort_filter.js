angular.module("expenseManagerApp").filter('keySortFilter', [function () {
    return function (incomeExpenseData, selectedFilter) {
        /*if(selectedFilter.length == 0){
            console.log("cmes here");
            return incomeExpenseData;
        }*/
    	if(!angular.isUndefined(incomeExpenseData) && !angular.isUndefined(selectedFilter) && selectedFilter.length > 0) {
            var tempincomeExpenseData = [];
            //console.log(selectedFilter.length);
            if(selectedFilter.length == 1 ){
                angular.forEach(incomeExpenseData, function (client) {
                    if(angular.equals(client.category, selectedFilter[0]) || angular.equals(client.modeOfPayment, selectedFilter[0])) {
                        tempincomeExpenseData.push(client);

                    }       
                });
            } else if(selectedFilter.length > 1 ){
               angular.forEach(incomeExpenseData, function (client) {
                    if( (selectedFilter.indexOf(client.category) != -1 && selectedFilter.indexOf(client.modeOfPayment) != -1 ) || (selectedFilter.indexOf(client.category) != -1 || selectedFilter.indexOf(client.modeOfPayment) != -1 ) ) {
                        tempincomeExpenseData.push(client);
                    }   
                });
            }
            return tempincomeExpenseData;
        } else {
            return incomeExpenseData;
        }
    };
}]);