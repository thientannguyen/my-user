# Simple React JS Project to fetch data from API

## What is the use of this Repo

This Project is a Simple ReactJS Project to fetch data from API which demonstrates the following

1. Creating a Component UserPage in React
2. Making HTTP calls
3. Communicating between parent and child component

## Prerequisites

### Install Node JS

Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app

Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Application design

#### Components

1. **UserPage** Component : This Component displays a list of users, input is maxWidth and maxHeight of table. This Component gets the data from https://reqres.in/

2. **UserDetailDialog** Component : This Component Displays the details of the selected user. This Component gets its data from _UserPage_ Component

#### HTTP client

**axios** library is used to make HTTP Calls
