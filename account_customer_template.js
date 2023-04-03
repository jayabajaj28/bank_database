/* This is a template for one possible solution of this assignment
Feel free to modify this template or create your own from scratch using your own logic for completing this assignment. */

/*
Account Class: represent a customer's account in the bank.
The class constructor will accept the Account Number and balance as properties
*/
class Account {
  // properties

  //constructor
  constructor(accountNumber, accountBalance, interestRate) {
    this.accountNumber = accountNumber;
    this.accountBalance = accountBalance;
    this.interestRate = interestRate;
  }

  // getter methods

  // get AccountNumber from the user
  // get Balance from the user

  getAccountNumber() {
    return this.accountNumber;
  }

  getBalance() {
    return this.accountBalance;
  }

  getInterestRate() {
    return this.interestRate;
  }
}
//prototype methods
//Deposit money to the account
Account.prototype.deposit = function (creditAmount) {
  this.accountBalance += creditAmount;
  return this.accountBalance;
};

Account.prototype.withdraw = function (amount) {
  if (this.accountBalance < amount) {
    window.alert("Insufficient funds");
    //throw new Error("Insufficient funds");
    return "Error";
  }
  this.accountBalance -= amount;
  return this.accountBalance;
};

//Withdraw money from the account

/*
Customer Class: Represent a customer of the bank.
The class constructor will accept customer Name, Account Number and password (PIN)
The Account number will act as the username and will be unique for each customer
*/
class Customer {
  //constructor
  constructor(accountName, accountNumber, accountPin) {
    this.accountName = accountName;
    this.accountNumber = accountNumber;
    this.accountPin = accountPin;
    this.login = false;
  }

  // getter methods
  // get the name from the user
  getName() {
    return this.accountName;
  }

  getInfo(key) {
    return this[key];
  }

  //prototype methods
  //Login to the Customer's account
}
//Show Balance Inquiry
Customer.prototype.login = function (accountNumber, PIN) {
  if (this.accountNumber === accountNumber && this.pin === PIN) {
    //console.log("login successful, welcome!");
    this.login = true;
    return 1;
  }
  //console.log("Failed to login, reset and login again..");
  else {
    this.login = false;
    return 0;
  }
};
