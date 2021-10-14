# Loan

Simple SLS service to allow companies to get the loan.

## Tech design:

Service is split into 3 parts:
  - infrastructure
    defines shared resources which can be accessed by other applications
  - applications/loan-client
    defines the api gateway to manage loans
  - applications/loan-disburse
    defines the api gateway to disburse loans (not implemented)

Storage specific:

In the database we store such record:
```code
{
  loanId: auto generated on insert
  companyId: company id provided by the user
  amount: amount of the loan
  loanStatus: enum Offered || Disbursed
  companyInfo: stringified object with company info received from the 3rd party service
  timestamp: date when the loan was created
}
```

## API 

Loan-client:

* GET {api-url}/all/{companyId}
  gets the all loans the company has


* POST {api-url}/create
  creates the loan for the company

* DELETE /delete/{loanId}
  deletes the specified loan

* PUT /disburse/{loanId}
  disburses the specified loan

## Deploy
To deploy the application run the command `npm run deploy`

## TODO
- implement disburse application if needed
  according to the current design we having separate API for the disbursing loans looks like unnecessary, all current operations can be implemented in one client application.

- run the service locally
  due to the lack of experience with splitting service into several applications, we need more time to understand how to set the service to run it locally.

- create OpenAPI defenitions

- improve test coverage

- use domains
- store secrets in proper way (now I just hardcoded it)

