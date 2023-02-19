# Tasks Management

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This application allows you to create tasks, the user can add some basic configurations such as:
- Add/edit the task name
- Specify point estimation
- Assign it to specific users
- Select the expiration date
- Select the task status
- Select tags from a defined list

## Build with
- `@apollo/client`
- `graphql`
- `dayjs`
- `classnames`
- `react-loading-skeleton`
- `react-router-dom`
- `remixion`
- `semantic-ui`
- `sweetalert2`
- `zustand`
- `@craco/craco`
- `sass`
- `eslint`
- `prettier`

## Requirements

```
- NodeJS v16.19.0
- Yarn
```

## Installation

```
# Clone this repository
git clone https://github.com/alexn29/react-app-task-management.git

# Navigate to the cloned folder
cd react-app-task-management

# Use the NodeJS version from .nvmrc
nvm use

Note: if you are on windows and using gitbash, type the following: 
nvm use $(cat .nvmrc)

# Once you select the correct nodejs version, now install the dependencies
yarn install

# Run in development mode
yarn start

# Finally, open your web browser and navigate to
http://localhost:3000/
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

### `npm run lint`

Analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs
