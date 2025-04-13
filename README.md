# Getting Started with React Payment checker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

```bash
   git clone <repository_url>

   cd <project_directory>

   npm install

   npm run start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Requirements

The project meets the following business requirements:

**Login Page**

- Email and password fields [cite: 2]
- Validation for each field (Email is a valid email, password has a minimum length) [cite: 2]
- API call with response handling, error handling, and loading state [cite: 2]
- Redirect to the profile page on successful login [cite: 2]

**My Profile Page**

- Displays user information (name, email, business name, Company Expected Activity) [cite: 2]
- Handles 401 errors for unauthorized/unauthenticated access [cite: 2]
- Redirects to the login page if not authenticated [cite: 2]
- API call with response handling, error handling, and loading state (fetching user data) [cite: 2]

**Payment Date Checker Component**

- Displayed on the My Profile page [cite: 3]
- Two date/calendar inputs: one for the invoice due date and one for monthly payment dates or pay cycle dates [cite: 3]
- Displays a result text when both dates are set (e.g., "Your invoice pay date will be X") [cite: 3]
- Calculates the next payment date of the invoice based on the invoice due date and the pay cycle [cite: 3, 4, 5]

## Resources

- Postman Docs: [https://documenter.getpostman.com/view/24871387/2sAYkKGcMh](https://documenter.getpostman.com/view/24871387/2sAYkKGcMh) [cite: 2]

## Example

For example, if you select an invoice due date of April 15th and a pay cycle of every month on the 30th, the component will determine that the payment is due on April 30th. [cite: 3, 4, 5]
