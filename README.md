# Welcome to SkinSolve API Documentation
### About SkinSolve

SkinSolve is an application developed as part of the 2024 project by Bangkit Academy. This application focuses on facial skin health, aiming to help users identify and address their skin concerns more effectively. With SkinSolve, users can:
- Accurately assess the condition of their facial skin.
- Share stories and experiences related to skincare routines.
- And many more features that we continue to develop.

### To run locally

1. install all npm dependency using
   
```
npm install
```

2. To start run the server run this command in terminal

```
nodemon index.js
```

### Testing the API

The server is already running locally on port 3000 , and you can now test the API using the provided URL. Follow these steps to test the API:
1. Launch your preferred API testing tool, such as Postman or any other application that allows you to make HTTP requests.
2. Set the Base URL to the API endpoint: http://localhost:3000/register.
3. Set the request method and URL based on the API endpoint you want to test. For example, if you want to test the /login endpoint, set the URL to http://localhost:3000/login and choose the appropriate HTTP method (GET, POST, PUT, DELETE).
4. (Optional) If the API requires specific headers or data in the request body, you can add them as request headers. For example, if the API requires an authentication token, add a header named Authorization with the token value.
5. Click the "Send" button to send the API request to the server.
6. Review the response from the server. Check the response status code to ensure it is a successful response (2xx). Inspect the response body to verify that the expected data is returned correctly.
7. Repeat these steps for different API endpoints or to test different HTTP methods.
8. Make sure the connection to dabatabase is correct.

###List API

