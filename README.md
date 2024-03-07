# MERN Blog App

This is a full-stack blog application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, read, update, and delete blog posts.

## Features

- User authentication: Users can register, log in, and log out.
- Create posts: Authenticated users can create new blog posts with a title, summary, content, and optional cover image.
- View posts: Users can view the list of all blog posts and click on individual posts to view details.
- Edit and delete posts: Post creators can edit or delete their own posts.
- Responsive design: The application is designed to work well on desktop and mobile devices.

## Technologies Used

- MongoDB: NoSQL database for storing blog posts and user information.
- Express.js: Node.js framework for building the backend REST API.
- React: Frontend library for building user interfaces.
- Node.js: JavaScript runtime for server-side code execution.
- Axios: HTTP client for making requests to the backend API.
- bcryptjs: Library for hashing passwords for user authentication.
- JWT: JSON Web Tokens for user authentication and authorization.
- Multer: Middleware for handling file uploads.
- React Router: Library for routing within the React application.
- React Quill: Rich text editor component for creating blog post content.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository_url>
 2. Install dependencies for both the client and server:
    ```bash
    cd mern-blog/client
    npm install

    cd ../api
    npm instal
3 .Set up environment variables:

Create a .env file in the api directory.
Define the following environment variables:
makefile
4.Start the development server:
# Start the backend server
cd ../api
npm start

# Start the frontend development server
cd ../client
npm start
5 .Open your browser and navigate to http://localhost:3000 to view the application.

6. Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.

---

**Author:** Srijan Mukherjee
