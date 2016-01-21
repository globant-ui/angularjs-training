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

Session 3
Modify the application to
Allow user to add/update/ delete income/expense details.
Apply validations on all input fields.
show appropriate messages for each input field if there is an error.
Validations
Category, Subcategory and mode of payment should be drop downs filled with prepopulated values.
notes field should not exceed limit of 20 characters.
Amount should not have more than 2 decimal places.
Amount should not be negative.
Transaction date must have date and time
After adding/updating/deleting income/expense it should immediately affect.

Session 4
Move the code to add/update/delete income/expense to services
Inject these services into controller and call them from controller. UI result should not be affected.
Use best practices related to services.
Write unit test cases to test service and controller methods.

Session 5
Instead of using static data now let the application use below given endpoints to fetch/add/update/delete income/expense details
Endpoint specifications will come here.
Make use of $http, $q services to communicate with these endpoints and handle promises.
Handle errors from server gracefully and display appropriate error messages on UI.

Session 6
Create a landing page for the application. In other words a dashboard page that contains a navigation panel and a section which by default shows total income, total expense and total balance.
In the navigation panel provide links to navigate to income/expenses/reports page.
Add a reports page that shows 
summarized expense details for each category.
summarized income details from each source.
Navigate to appropriate page when a link in navigation panel is clicked.


Session 8
Create a settings page to add recurring income/expense details.
Provide recurring type as monthly, yearly.  
create a “expense notification panel” directive which is tied to an endpoint and is used to display upcoming expenses based on the recurring expenses that we have added. It keeps polling to that endpoint. Results returned from the endpoint are displayed in the panel.

