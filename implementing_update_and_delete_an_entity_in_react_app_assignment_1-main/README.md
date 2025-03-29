# Lab Exercise: Create a Component Which Fetches an Existing Item and Updates It 📝🔄

## 🎯 Objectives

In this task, we will create a React component that fetches an existing item from an API and allows the user to update it. This will help you understand CRUD operations and how to interact with APIs using React.

## 🧐 Prerequisites

You should have a basic understanding of JavaScript, React, and familiarity with fetch API or axios for making HTTP requests.

## 🚀 Steps

1. **Initialize State**: Inside your 'UpdateItem' component, initialize state variables to store the existing item, the updated item, and any API responses.

2. **Find an API**: The `API_URI` is provided in the `src/App.jsx` file. You will use this URL to make requests to the API. 
   > **Note**: If you are unable to find the `API_URI`, please reach out to your mentor.

3. **Fetch Existing Item**: Write a method that makes a GET request to the API to fetch the existing item when the component mounts.

4. **Display Existing Item**: Display the fetched item in your component's render method.

5. **Create an Input Field**: Add an HTML input field in the component's render method to take the user's updates.

6. **Handle Input Change**: Write a method that updates the state with the user's input every time it changes. Attach this method to the input field's `onChange` event.

7. **Create an Update Method**: Write a method that makes a PUT or PATCH request to the API with the user's input when a submit button is clicked.

8. **Handle API Response**: Update the state with the API response and handle any errors that may occur during the request.

## 🏁 Outcome

By the end of this task, you will have a functional React component that fetches an existing item, allows user input for updates, and sends the updates to an API. This is a crucial skill in creating dynamic and interactive web applications.
