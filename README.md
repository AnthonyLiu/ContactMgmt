# ContactMgmt

ContactMgmt is a fully usable application built with Docker, integrating MongoDB as the database, React/Redux for the frontend, and NodeJS/Express for the backend.

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/): If you do not have Docker installed, follow the link to install Docker on your system.

## Quick Start
To run the app, follow these steps:

1. Change `server.example.env` to `server.dev.env` and update the values as per your requirements.

2. Run the following command in the terminal to start the app using Docker:
```
docker compose up --build
```


## Description
ContactMgmt is a contact management platform that allows users to store, manage, and organize their contacts. It provides a user-friendly interface for adding, editing, and deleting contacts, along with powerful search and filtering capabilities.

## Features
- Add and manage contacts with details like name, email, phone number, etc.
- Search and filter contacts based on various criteria.
- Edit and update contact information easily.
- Delete contacts when no longer needed.
- Responsive design for optimal usage on different devices.

## Technologies Used
- Frontend: React, Redux
- Backend: Node.js, Express
- Database: MongoDB
- Docker: For containerization and easy deployment
