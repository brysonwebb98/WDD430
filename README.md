# Signum Loan Platform

The Signum Loan Platform is a full-stack loan application and underwriting prototype built for WDD 430.

The goal of this project is to demonstrate a complete loan workflow using SvelteKit, including user authentication, loan application creation, credit manager review, and status updates.

## Features

- User sign up
- User login and logout
- Role-based navigation
- Loan Officer dashboard
- Credit Manager dashboard
- Create loan applications
- View submitted applications
- Review underwriting details
- Calculate debt-to-income ratio
- Approve, counter, deny, or keep applications pending
- MongoDB database integration
- Server-side validation
- Responsive design for desktop and mobile

## Tech Stack

- SvelteKit
- Svelte
- JavaScript
- Node.js
- MongoDB Atlas
- bcryptjs
- Vite
- Render

## User Roles

### Loan Officer

Loan Officers can:

- Create new loan applications
- View their submitted applications
- View the current status of each application

### Credit Manager

Credit Managers can:

- View applications submitted for review
- Open individual applications
- Review borrower information
- Review credit score and debt-to-income ratio
- Approve, counter, deny, or leave an application pending

## Loan Application Information

Each loan application includes:

- First name
- Last name
- Loan request amount
- Loan purpose
- Monthly income
- Monthly debt
- Credit score
- Application status

Loan purposes currently include:

- Purchase
- Debt Consolidation
- Refinance

## Application Workflow

1. A user creates an account.
2. The user logs in as a Loan Officer.
3. The Loan Officer creates a loan application.
4. The application is saved to MongoDB with a pending status.
5. A Credit Manager logs in and views the application queue.
6. The Credit Manager opens the application and reviews the underwriting information.
7. The Credit Manager selects a decision.
8. The application status is updated in MongoDB.
9. The Loan Officer can see the updated status from their dashboard.

## Test Credentials

### Loan Officer

You can create a new Loan Officer account through the Sign Up page.

### Credit Manager

Use the following demo account to access the Credit Manager queue:

Email: `CreditManager@byui.com`

Password: `CreditManager`

After logging in, you will be redirected to the Credit Manager dashboard where you can review submitted loan applications and update their status.

## Running the Project Locally

Install dependencies:

```bash
npm install
