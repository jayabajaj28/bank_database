//Variable declaration
//Using array here to access the data
let accountData = [];
//Defining index this shall be used to identify appropriate pair
let activeCustomerIndex = null;
const API_ENDPOINT =
  "https://raw.githubusercontent.com/jayabajaj28/bank_database/main/bank_users.json";
//Initialize the ATM machine
function initialize() {
  Stage = 1;
  AcctNo = "";
  Pin = 0;
  choice = 0;
  document.getElementById("Message").innerHTML =
    "Please Enter your Account Number";
  //using this method to display the bank DB
  showDatabase();
  //using this method to show the menu options
  showMenu();
}
//This method is called after the user enters the values and clicks on the submit button
function enterPressed() {
  //Fetch the account # user has entered
  AcctNo = document.getElementById("accountNumber").value;
  //Fetch the PIN # user has entered
  Pin = document.getElementById("pinNumber").value;
  //Fetch the choice user has entered
  choice = Number.parseInt(document.getElementById("choice").value);
  //Check if user has entered Account #, PIN and choice
  if (AcctNo && Pin && choice) {
    //Fetch the index of account by comparing the credentials with the account # and Pin # pairs
    let findCustomerIndex = accountData.findIndex(
      (data) =>
        data.accountInfo.getAccountNumber() === AcctNo &&
        data.customer.getInfo("accountPin") === Pin
    );
    //if (activeCustomerIndex !== findCustomerIndex) {
    //If the no credentials entered by the user are not matching to any of the pairs the index variable will return -1
    //Show an error message when index is -1
    if (findCustomerIndex === -1) {
      document.getElementById("SubMsg").innerHTML =
        "Oops! Incorrect login credentials, please retry!";
      return;
    }
    //Set the active index to the index found by looping in the data
    //This shall ensure operations being performed on the same account unless cred. are changed
    activeCustomerIndex = findCustomerIndex;
    // }
    //Setting the found index to account info to perform operations
    let { accountInfo } = accountData[activeCustomerIndex];
    //Switch around the choice user has entered
    //1 - view balance, 2 - deposit and 3 - withdrawal
    switch (choice) {
      case 1:
        //Show Balance
        //Call to getBalance method in order to view the balance
        document.getElementById("SubMsg").innerHTML =
          "Your account balance is: " + accountInfo.getBalance();
        break;

      case 2:
        //Deposit Money
        //Prompt user to get the deposit amount
        let depositAmount = +prompt(
          "Enter the amount you wish to deposit in your account"
        );
        //Check if number is not NaN then only perform operation
        if (isNaN(depositAmount)) {
          document.getElementById("SubMsg").innerHTML =
            "Opps! Something went wrong!";
          //If the entered amount is not valid, show an alert asking user to retry
          alert("Failed! Please give it another try!");
          return;
        }
        //If amount is valid, perform deposit function and show updated balance
        if (depositAmount) {
          let newBalance = accountInfo.deposit(depositAmount);
          //Print updated balance on the HTML
          document.getElementById("SubMsg").innerHTML =
            "Your money has been deposited successfully and new account balance is: " +
            newBalance;
        }
        break;

      case 3:
        //Withdraw Money
        //Prompt user to get the withdrawal amount
        let withdrawalAmount = +prompt(
          "Enter the amount you wish to withdraw in your account"
        );
        //If amount is valid, parse it to number and call withdraw function of Account class
        if (withdrawalAmount) {
          let updatedBalance = accountInfo.withdraw(
            Number.parseInt(withdrawalAmount)
          );
          //If the withdraw returns error, display it to the user
          if (updatedBalance != "Error") {
            document.getElementById("SubMsg").innerHTML =
              "You have withdrawn " +
              withdrawalAmount +
              " and updated balance is: " +
              updatedBalance;
          } else {
            document.getElementById("SubMsg").innerHTML =
              "You do not have sufficient funds in your account!";
          }
        }
        break;
      case 4:
        //Show intrest rate
        document.getElementById("SubMsg").innerHTML =
          "Your interest rate is: " + accountInfo.getInterestRate();
        break;
      default:
        window.alert(
          "Opps! you have entered an incorrect choice. Please retry!"
        );
    }
  } else {
    window.alert("Seems you missed something please enter all values");
  }
}

function showMenu() {
  var msg = "Enter the corresponding option to select respective action<br>";
  msg += "1. Show Balance<br>";
  msg += "2. Deposit Money<br>";
  msg += "3. Withdraw Money<br>";
  msg += "4. Show interest rate<br>";
  document.getElementById("Message").innerHTML = msg;
}

function showDatabase() {
  fetch(API_ENDPOINT)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      accountData = data.map((item) => {
        return {
          customer: new Customer(
            item.account_name,
            item.account_number,
            item.account_pin
          ),
          accountInfo: new Account(
            item.account_number,
            Number.parseInt(item.account_balance),
            item.account_interest_rate
          ),
        };
      });
      let table =
        "<table><thead><tr><th>Account Number</th><th>Account Name</th><th>Account PIN</th></tr></thead><tbody>";
      data.forEach((item) => {
        table +=
          "<tr><td>" +
          item.account_number +
          "</td><td>" +
          item.account_name +
          "</td><td>" +
          item.account_pin +
          "</td></tr>";
      });
      table += "</tbody></table>";
      document.getElementById("table-container").innerHTML = table;
    })
    .catch((error) => {
      console.error("There was a problem fetching the data:", error);
    });
}
