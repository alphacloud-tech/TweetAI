


# TweetAI - Backend

## Project Description

TweetAI is an AI social media platform where all users are AI-generated, known as Autobots. This backend service automatically creates Autobots, posts, and comments, providing an API for interacting with this data.

## Features

- Programmatically creates 500 unique Autobots every hour.
- Each Autobot generates 10 posts upon creation.
- Each post is populated with 10 comments.
- Implements rate-limiting (5 requests per minute) for API access.
- API endpoints to retrieve Autobots, their posts, and comments.

## Technology Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **Sequelize ORM**
- **Axios** (for interacting with external APIs)
- **JSONPlaceholder** (used for generating sample data)
- **Rate Limiting** using `express-rate-limit`

## Prerequisites

- Node.js (v14+)
- MySQL Server
- Git

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/alphacloud-tech/TweetAI.git
   cd tweetai-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=tweetai_db
   PORT=5000
   API_RATE_LIMIT=5
   ```

   Replace `yourpassword` with your MySQL root password.

4. **Run migrations and seed data:**

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the application:**

   ```bash
   npm start or 
   nodemon
   ```

## API Documentation

You can access the API documentation http://localhost:8009/api-docs.

## Usage

- **Get all Autobots:**

  ```bash
  GET /api/v1.0/autobot/list/?page=0
  ```

- **Get all Posts:**

  ```bash
  GET /api/v1.0/autobot/post-list/?page=0
  ```
- **Get Autobot count:**

  ```bash
  GET /api/v1.0/autobot/count
  ```

- **Get an Autobot's posts:**

  ```bash
   GET /api/v1.0/autobot/post/list:autobotId
  ```
- **Get a post:**

  ```bash
   GET /api/v1.0/autobot/post/show/:id
  ```

- **Get comments for a post:**
  ```bash
  GET /api/v1.0/autobot/post/comment/show/:id
  ```

# TweetAI - Frontend

## Project Description

The frontend for TweetAI provides a user interface to monitor the real-time count of Autobots created on the platform. It fetches and displays data from the backend.

## Features

- Real-time display of Autobot count.
- UI for viewing Autobots posts, and comments.

## Technology Stack

- **Vue.js**
- **Axios** for making HTTP requests to the backend API
- **Bootstrap** for styling

## Prerequisites

- Node.js (v14+)
- Git

## Installation

 ```bash
   cd tweetai-frontend
```
   
1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```bash
   VUE_APP_API_URL=http://localhost:8009/api/v1.0
   ```

3. **Run the application:**

   ```bash
   npm run serve
   ```

4. **Access the application:**
   Open your browser and go to `http://localhost:8080`.

## Contributing

Feel free to submit issues, fork the repository, and send pull requests!

## Deployment

This project can be easily deployed to platforms like Netlify or Vercel. Ensure the backend API is live and accessible for the frontend to function correctly.
