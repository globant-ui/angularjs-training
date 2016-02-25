var express = require('express');
var app = express();

app.get('/incomeDetails', function(req, res) {
//  res.type('text/json'); // set content-type
  var incomeDetails = [
        {incomeDescription: 'House1 Rent',
            incomeAmount: 10000,
            incomeCategory: 'Rent'
        },
        {incomeDescription: 'Fixed deposit intrest',
            incomeAmount: 3000,
            incomeCategory: 'Fixed Deposit'
        },
        {incomeDescription: 'Annual intrest',
            incomeAmount: 10000,
            incomeCategory: 'Interest'
        },
        {incomeDescription: 'Monthly salary',
            incomeAmount: 45000,
            incomeCategory: 'Salary'
        },
        {incomeDincomeDetailsescription: 'House2 Rent',
            incomeAmount: 7500,
            incomeCategory: 'Rent'
        }
    ];
  res.json(incomeDetails); // send text response
});

app.listen(process.env.PORT || 4730);