<h1 align="center">
  Interview Scheduler
</h1>
<p align="center">
  Check out the live link <a href="https://schedulerverse.netlify.app/" target="_blank">schedulerverse.netlify.app </a> where <a href="https://www.netlify.com/" target="_blank">Netlify</a> serves the client, while automatic continuous integration and tests are managed using <a href="https://circleci.com/" target="_blank">CircleCI</a>. The server is hosted on <a href="https://www.heroku.com/" target="_blank">Heroku</a>.
</p> 

<p align="center">
<img width="200" src="https://github.com/zakwarsame/scheduler/blob/master/docs/demo.png" alt="Home Page">
</p> 

## 🚨 Description

This is a single page application built using React on the frontend and a backend API where the data is persisted using PostreSQL. A user can switch between days, book an interview in an empty appointment slot, cancel an existing interview, edit and delete. The scheduler API used is [here](https://github.com/zakwarsame/scheduler-api)

When a user books or cancels an interview, all connected users see the update in their browser. This is achieved via the [Websockets API ](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

### 💻 Technologies Used

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/)
- [Axios](https://github.com/axios/axios), [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Storybook](https://storybook.js.org/), [Webpack Dev Server](https://github.com/webpack/webpack-dev-server), [Jest](https://jestjs.io/en/), [Testing Library](https://testing-library.com/)
- [Create React App](https://facebook.github.io/create-react-app/)

### 🖥️ Demo

!["Scheduler gif"](https://github.com/zakwarsame/scheduler/blob/master/docs/demonstration.gif)

## 🛠 Installation & Set Up

1. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm). This app was both built and hosted using node v10.16.1 and it is highly recommended to use this in your environment

   ```sh
   nvm install
   ```

1. Install dependencies

   ```sh
   npm install
   ```

1. Start the development server

   ```sh
   npm start
   ```

### 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   npm run build
   ```

### 🧪 Running Jest Test Framework

```sh
npm test
```

### 📕 Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- @babel/core
- @storybook/addon-actions
- @storybook/addon-backgrounds
- @storybook/addon-links
- @storybook/addons
- @storybook/react
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/react-hooks
- babel-loader
- node-sass
- prop-types
- react-test-renderer

## Known Issues

Opening the live link for the first time may show an empty app. This is because the server instance shuts down after 30 minutes of inactivity. Refreshing the page will revive the server and make it behave as expected.