Project name : Expense Manager Description : Expense manager is an 
application which allows user to track his/her income and expenses. It 
provides ways to categorize expenses (e.g. rent, travel, party, office, 
studies, shopping etc.).
Features
Add income from different sources (salary, business, interest on deposits etc.). 
Add categories to be selected when adding expenses.
Add/delete/update expense. capture these details - amount of expense, category, 
date of expense, mode of payment (credit card, cash, electronic transfer)
A report page providing ability to filter expenses based on category, date.
Ability to sort expenses in ascending order based on amount

Data structures
Transaction : {
transactionId
payer
payee
category
subCategory
amount
date
modeOfPayment : (cash/electronic_transfer/cheque/credit_card)
notes
type : (Income or Expense)
}

SubCategory : {
parentCategoryName
subCategoryName
}

Session 2
Create an AngularJS application to visualize expense and income details.
Create 2 arrays of Transaction objects. One for expenses and one for income.
Provide two buttons on view “Show Income” and “Show Expense”
On click of “Show income”, hide/ remove expense details table (if it was shown previously) from UI and display the income details in a tabular format
On click of “Show expense”, hide/remove income details (if it was shown previously) from UI and display the expense details in a tabular format. 
Try to achieve this using different ways i.e once with ng-show/ng-hide and then using ng-hide. Note the difference in generated DOM.
Show total income, total expenses and total balance at the top of the page.
Note : All the data to be presented on UI for this session should be statically built in controller.

