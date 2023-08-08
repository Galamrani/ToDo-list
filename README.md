# ToDo-List Web Application

This is a ToDo-List web application built with Node.js, Express.js, and MongoDB. It allows users to add, mark as completed, and delete items from their to-do list.

Visit ToDo-List: [https://polar-thicket-05240-6d4ccf3b0598.herokuapp.com/](https://polar-thicket-05240-6d4ccf3b0598.herokuapp.com/)

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- Express.js
- MongoDB
- body-parser module
- EJS (Embedded JavaScript) templating engine

## Installation

To install the required dependencies, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the dependencies:

   ```bash
   npm install
   ```

## Database Configuration

1. This application uses MongoDB as its database. Make sure you have MongoDB installed and running.
2. Configure the database connection in the `app.js` file by replacing the connection URL with your own MongoDB connection string.

## Usage

1. Start the server by running:

   ```bash
   node app.js
   ```

2. Once the server is running, you can access the application by visiting [http://localhost:3000](http://localhost:3000) in your web browser.

## File Structure

The project contains the following files:

- `app.js`: The main server file containing the Express.js application logic and MongoDB setup.
- `public/css/styles.css`: The CSS file for styling the web application.
- `views/list.ejs`: The EJS template file for rendering the HTML content.

## Features

- Add new items to the to-do list.
- Mark items as completed by checking the checkboxes.
- Delete items from the to-do list by clicking the delete button.

## Deployment

The application can be deployed using platforms like Heroku, AWS, or any other hosting service. Make sure to configure the environment variables and database connection appropriately for the deployment environment.

## Acknowledgments

This project was inspired by [your previous project](https://polar-thicket-05240-6d4ccf3b0598.herokuapp.com/) and built using Node.js, Express.js, and MongoDB.

---

Feel free to update the above information to match any specific changes or improvements you've made to your project.
