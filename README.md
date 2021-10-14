# Budgeteer

<p align="center">
  <img src="https://i.ibb.co/fFJ3rrV/header-logo-removebg-preview.png">  
</p>

Budgeteer is a money budgeting and transaction tracking tool. Features include account creation, email confirmation, money categorization, transaction logging, and paycheck allocation.

### A live version of Budgetter is deployed with heroku and running here:

[Live Version](https://budgeteer-finance.herokuapp.com)

*Note: Any feature that uses cronjobs is not available on the hosted version*

## Features

#### Account Creation

Budgeteer has a fully realized account creation flow with protected inputs. Users must provide unique usernames and emails, but have no constraints on their passwords. Budgeteer makes use of the Rails Bcrypt gem for account security, as well as ActionDispatch::Cookies for saving currently logged in accounts in the session.

#### Email Confirmation

Budgeteer has a fully functioning email confirmation system for newly created users using Rails ActionMailer. Once a user creates a new account, an email will be sent to them with a confirmation link that they must click. The user will be prompted to confirm their email and unable to log in until they do so. 

#### Money Categorization

Budgeteer allows for users to create their own categories, distribute their money into them, set their paycheck percentages, and drag and drop their order on the dashboard. All of the form inputs are protected and filter out bad data using the [React-Number-Format](https://github.com/s-yadav/react-number-format) library with [MUI Text Inputs](https://mui.com/components/text-fields/#main-content). It makes use of [Atlassians' React-Beautiful-DnD](https://github.com/atlassian/react-beautiful-dnd) node package for the drag and drop.

#### Money Transfering

Budgeteer permits users to transfer money between categories and their unallocated balance. A useful form is provided, with protected inputs, custom error messages, and a nifty input swapping feature that ensures an intuitive and safe experience for the user.

#### Transaction Logging

Budgeteer enables users to create their own transactions with an intuitive, custom form. Transactions can either be positive, meaning that the amount is added to their account, or negative, meaning the opposite. Transactions can also specify both a primary category and secondary categories. The primary category has both its balance affected by the transaction and shows the transaction in its logs, while the secondary categories just show the transaction in their logs. All of the inputs are protected, allowing only the proper type of input (ie. The amount only allows numbers with two decimal places), and displaying custom error messages for required empty inputs. 

Budgeteer also has a neat **Recent Transactions** module on the user dashboard. The recent transactions module displays the user's five most recent transactions. It updates accordingly whenever a transaction is added or removed.

#### Paycheck Allocation

Budgeteer allows users to define their payperiod and paycheck amount in their user settings. The user can either choose bi-weekly (1st and 15th) or monthly (1st) for their pay period. They can set their paycheck amount to anything. By default, their pay period is bi-weekly and their pay amount is $2000. Budgeteer makes use of the [Whenever gem](https://github.com/javan/whenever) and a crontab to set up scheduled payments. Each day at midnight, the user's payperiod information is checked. If their paydate is the current day, then the paycheck amount is distributed to their account according to the categories paycheck percentages.

Along with setting up payperiods and paycheck ammounts, Budgeteer has automatic paycheck allocation. Each category can have a percentage associated with it. Using [ApexChart's pie chart](https://apexcharts.com/) to provide an interactive view, users can customize their percentage allocations. All inputs are protected to ensure that the percentage total for a user never goes above 100%. When a user's payday arrives, their paycheck will first be divided up among the categories according to their percentages (ie. if **Savings** category has **20%** then 20% of their paycheck will be added to **Saving's** balance). The remainder is added to the user's unallocated balance.

## Installation

**1. Clone the repository to your local maching**

After cloning, make sure you have Ruby installed.

**2. Navigate into the root folder and run the build commands**

  To install all ruby gems:
  ```
  $ bundle install
  ```
  
  To install all node packages:
  ```
  $ npm install --prefix client
  ```

**3. Add the necessary environment variables**

  Budgeteer makes use of the [Figaro gem](https://github.com/laserlemon/figaro) to handle environment variables.
  
  First run this command:
  ```
  $ bundle exec figaro install
  ```
  
  It will create a `/config/application.yml` file.
  
  Navigate to this file and add the following:
  
  ```ruby
  GMAIL_USERNAME: 'valid-username'
  GMAIL_PASSWORD: 'valid-password'
  ```
  
  Replace [valid-username] and [valid-password] with the username and password of a gmail account that you want ActionMailer to use   for the email authentication delivery process.
  
  **4. Start the crontab**
  
  Budgeteer makes use of the [Whenever gem](https://github.com/javan/whenever) to handle configuring the cronjobs.
  
  Run this to update the crontab with the contents of `config/schedule.rb`:
  ```
  $ whenever --update-crontab
  ```
  
  **5. Start up the servers**
  
  Run this to start up the Rails backend:
  ```
  $ rails server
  ```
  
  Then, in another terminal, run this to start up the React frontend:
  ```
  $ npm start --prefix client
  ```

## Contributing

Pull requests are welcome. 
