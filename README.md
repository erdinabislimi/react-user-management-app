# React User Management App  

A simple React application for managing users. The app demonstrates CRUD operations, search, sorting, and pagination using **React** and **Material-UI**.  

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)
- [Contact](#contact)

## About the Project
This project allows managing users with add, edit, delete, search, sort and pagination functionalities. Data is fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).  

## Features
- Add new users  
- Edit user information  
- Delete users  
- Search by name  
- Sort by name or email  
- Pagination (5 users per page)  
- See more user details  

## Tech Stack
- React (Vite)  
- Material-UI (MUI)  
- Axios  
- React Router  
- React Toastify  

## Project Structure
```bash
src/
├── api/Users.js
├── components/
│ ├── AddUserForm.jsx
│ ├── EditUserForm.jsx
│ ├── DeleteUser.jsx
│ ├── UserTable.jsx
│ ├── Pagination.jsx
│ └── WelcomeDialog.jsx
├── pages/
│ ├── UsersPage.jsx
│ └── UserDetailsPage.jsx
├── utils/validation.js
├── App.js
└── main.js
```


## Getting Started
 
1. Clone the repo:
```bash 
git clone https://github.com/erdinabislimi/react-user-management-app.git
```
2. Install dependencies:
```bash
npm install
```
3. Run the app:
```bash
npm start
```

## Usage
Use the + button to add a user.

Click Edit or Delete in the table for user actions.

Use the Search bar to filter by name.

Pagination controls let you navigate between pages.
## Screenshots
- User Table  
  ![User Table](./screenshots/user-table.png)

- Add User Form  
  ![Add User](./screenshots/add-user.png)

- Welcome Dialog  
  ![Welcome Dialog](./screenshots/welcome-dialog.png)



## License
This project is open-source and available under the MIT License.

## Contact
Erdinë Bislimi - [GitHub](https://github.com/erdinabislimi)
