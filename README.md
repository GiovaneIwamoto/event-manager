# EVENT MANAGER

### **INTRODUCTION**

User-Event API that allows users to perform various operations related to events and user management. The API includes routes for creating, updating, and deleting users, as well as retrieving and creating events. The PUT and DELETE operations on users can only be performed by the same user, ensuring data privacy. Users can retrieve events either by specifying the weekday or the event ID. The API also supports user sign-up and sign-in operations to authenticate users. Please refer to the following routes for more details:

[![Icons](https://skillicons.dev/icons?i=ts,nodejs,mongodb,fastapi,postman&theme=dark)](https://skillicons.dev)

---

### **INSTALLATION GUIDE**

```ruby
Clone this repository 'https://github.com/GiovaneIwamoto/event-manager.git'
Run '$ npm install' to install all the dependencies needs.
Run '$ npm start' to start the local server hosted at 'http://localhost:3333'
```

> [!TIP]
> To connect the application to the database, create a config.env file at the root of your project, if it does not already exist. In this file, set the values of two environment variables: DATABASE and DATABASE_PASSWORD. These variables should contain the database connection string and the database password, respectively.

---

### **FEATURES**

- `UPDATE/DELETE` Allows users to update or delete their own user profile information using the HTTP PUT and DELETE methods. However, the API has been designed to ensure that only the user who owns the data can make changes to it. User B cannot access, modify or delete data belonging to User A, enhancing the security and privacy of user data.

- `GET` The Get Routes feature allows users to retrieve event data from the API by sending GET requests to specific endpoints. Users can get all events by sending a GET request to the "/events" endpoint, or they can filter events by weekday or event ID. The API responds with JSON-formatted data containing information about the requested events, including the event ID, description, date, and creation date. This feature is useful for users who need to view or track event data in their application.

- `POST` The Post Routes feature allows users to create new accounts, sign in, and create events by making POST requests to the corresponding API endpoints. The User Signup endpoint requires users to provide all necessary information, including their first and last name, birth date, city, country, email, password, and confirmation password. Once the user provides this information, a new account is created, and they can then use the User Signin endpoint to log in with their email and password. The Create Event endpoint allows users to add new events to the platform by specifying a description, the date for the event, and the date and time the event was created.

- `DELETE` The Delete Routes feature allows users to delete events by their ID or weekday. This feature can be accessed through the /events endpoint and requires authentication to ensure that only the user who created the event can delete it. By allowing users to delete events, the application can keep its data updated and ensure that users have control over the events they have created.

---

### **API ENDPOINTS**

| **HTTP VERB** | **ENDPOINT**                       | **ACTION**                                |
| ------------- | ---------------------------------- | ----------------------------------------- |
| GET           | /api/v1/events                     | Retrieve all events                       |
| GET           | /api/v1/events/{id}                | Retrieve a specific event by id           |
| GET           | api/v1/events?dayOfWeek={weekday}  | Retrieve all events on a specific weekday |
| POST          | /api/v1/users/signUp               | Create a new user account                 |
| POST          | /api/v1/users/signIn               | Login to an existent user account         |
| POST          | /api/v1/events                     | Create a new event                        |
| PUT           | /api/v1/users/updateUser           | Update a user's account information       |
| DELETE        | /api/v1/users/deleteUser           | Delete a user account                     |
| DELETE        | /api/v1/events?id={id}             | Delete a specific event by id             |
| DELETE        | /api/v1/events?dayOfWeek={weekday} | Delete all events on a specific weekday   |

---

### **JWT AUTHENTICATION**

> [!NOTE]
> All authenticated routes require a valid JSON Web Token to be included in the auth header of the request. The following routes are protected by JWT authentication and require a bearer token to be included in the request header:

```ruby
GET /api/v1/events
GET /api/v1/events/{id}
GET /api/v1/events?dayOfWeek={weekday}

POST /api/v1/events
PUT  /api/v1/users/updateUser

DELETE /api/v1/users/deleteUser
DELETE /api/v1/events?id={id}
DELETE /api/v1/events?dayOfWeek={weekday}
```

> [!WARNING]
> For these routes, the user must first obtain a valid JWT by signing through the appropriate endpoint. Once authenticated, the user can use the obtained JWT to access the protected resources by including it in the Authorization header of the request with the format Bearer JWT. This ensures that only authorized users can perform sensitive operations on the server.

---

### **EVENTS**

To create an event, user can send a POST request to the _/events_ endpoint with the following information in the request body:

```ruby
description: A brief description of the event.
dateTime: MM/DD/YYYY format that will happen the event.
```

> [!CAUTION]  
> This format is case-sensitive. Make sure to use the correct spelling and capitalization when specifying the weekday to ensure that the filtering works properly.

To filter events by weekday using the endpoint `/api/v1/events?dayOfWeek={weekday}`, it's important to pass the name of the day in the correct format. The weekday name should be in English and start with an **uppercase letter** for example:

```python
"Monday", "Tuesday", "Wednesday"
```

---

### **USER ACCOUNT**

`SIGN UP` User can send a POST request to the _/signUp_ endpoint with the following information in the request url parameters:

```ruby
[firstName]: This parameter should contain the user's first name as a string.
[lastName]: This parameter should contain the user's last name as a string.
[birthDate]: This parameter should contain the user's birth date in the format of MM/DD/YYYY.
[city]: This parameter should contain the user's city of residence as a string.
[country]: This parameter should contain the user's country of residence as a string.
[email]: This parameter should be passed in a valid email format, such as "example@example.com".
[password]: This parameter should contain the user's password as a string.
[confirmPassword]: This parameter should contain a copy of the user's password.
```

`LOG IN` User can send a POST request to the _/signIn_ endpoint with the following information in the request body:

```ruby
[email]: This parameter should be passed in a valid email format, such as "example@example.com".
[password]: This parameter should contain the user's password as a string.
```

---

### **DEPLOYMENT**

- This topic is to discuss the deployment process of the project. The project was deployed using Vercel, a powerful platform for hosting and managing modern web applications. The live application can be accessed at the following link: [Live Planner API]().

- The deployment process was seamless and straightforward with Vercel. All I had to do was to connect the GitHub repository to Vercel and trigger a new deployment every time changes were made to the code. The deployment process is fully automated, and there is no worry about manual updates or server maintenance.

- In addition to the ease of deployment, Vercel also provides a range of features and tools to help monitor and manage the application. With Vercel's dashboards, it is possible to monitor real-time performance, track errors, and see how users are interacting with the application.

- Please note that the deployment of this application on Vercel may cause some issues with Swagger, as Vercel is primarily designed for static site hosting. While the authenticated routes and other routes of this API should work correctly, there may be some limitations with the documentation generated by Swagger.

---

### **SWAGGER**

We have implemented Swagger to provide a more user-friendly interface for testing our API. You can access the Swagger UI by visiting the following url in your browser. From there, you can see a list of all available API routes, and you can interact with them by clicking on each endpoint.

```ruby
http://127.0.0.1:3333/swagger/
```

> [!NOTE]
> All of the functionalities of our API routes, including the authentication system, are fully functional through the Swagger interface. This means that you can test each endpoint and ensure that everything is working as expected before integrating our API into your application. We recommend using the Swagger UI to test each endpoint and familiarize yourself with the available functionality.

---

### **TECHNOLOGIES USED**

The following technologies were used in the development of this project:

```python
TypeScript: Statically-typed superset of JavaScript that compiles to plain JavaScript.
Express: Fast and minimalist web framework for Node.js used to create server applications.
Nodejs: JavaScript runtime built on Chromes V8 JS engine that allows for server-side scripting.
Mongoose: ODM library used for MongoDB to provide a schemabased solution to model app data.
MongoDB: Document-oriented NoSQL database used for storing and retrieving data.
Swagger: Open-source software framework used for consuming RESTful web services.
Dotenv: Zero-dependency module used for loading environment variables from a env file.
JWT: Compact and self-contained way for securely transmitting info as a JSON obj.
Zod: TS-first schema validation library used for defining and validating data structures.
```

All functionalities of the routes and the authentication system are documented in Swagger, which can be accessed at the specif route defined above after starting the local server with npm start. The project also includes development dependencies such as `nodemon` for automatic server restarts and `ts-node` for running TypeScript files without compilation.

---

### **AUTHORS**

- Julio Cezar Lossavaro - Information Systems student at UFMS - Brazil - MS
- Giovane Hashinokuti Iwamoto - Computer Science student at UFMS - Brazil - MS
- Marcos Paulo Paolino - Data Science student at UFMS - Brazil - MS

We are always open to receiving constructive criticism and suggestions for improvement in our developed code. We believe that feedback is an essential part of the learning and growth process, and we are eager to learn from others and make our code the best it can be. Whether it's a minor tweak or a major overhaul, we are willing to consider all suggestions and implement the changes that will benefit our code and its users.
