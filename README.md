# AI Audio Transcription Web App

A full-stack web application that allows users to upload or record audio and receive an AI-powered transcription. The application features secure user authentication and a personal history of all transcriptions.

## ✨ Features

- **🔐 Secure User Authentication**: Register and log in using a secure, token-based system (JWT).
- **⬆️ File Upload**: Upload existing audio files (e.g., `.mp3`, `.wav`, `.m4a`) for transcription.
- **🎤 Live Recording**: Record audio directly from your browser for instant transcription.
- **📖 Transcription History**: View a personal, chronologically sorted list of all your past transcriptions.
- **📱 Responsive Design**: A mobile-first interface built with Bootstrap that works beautifully on any device.

## 🛠️ Tech Stack

### Frontend
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A blazing-fast frontend build tool.
- **[React Router](https://reactrouter.com/)**: For client-side routing.
- **[React Bootstrap](https://react-bootstrap.github.io/)**: For responsive UI components.
- **[Axios](https://axios-http.com/)**: For making HTTP requests to the backend API.
- **[react-media-recorder](https://www.npmjs.com/package/react-media-recorder)**: For handling browser-based audio recording.

### Backend
- **[Node.js](https://nodejs.org/)**: A JavaScript runtime environment.
- **[Express.js](https://expressjs.com/)**: A web framework for Node.js.
- **[MongoDB](https://www.mongodb.com/)**: A NoSQL database for storing user and transcription data.
- **[Mongoose](https://mongoosejs.com/)**: An ODM for modeling application data.
- **[Passport.js](https://www.passportjs.org/)**: Authentication middleware for Node.js (using JWT and Local strategies).
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: For hashing user passwords.
- **[JSON Web Token (JWT)](https://jwt.io/)**: For creating secure access tokens.
- **[Multer](https://www.npmjs.com/package/multer)**: Middleware for handling file uploads.
- **[Deepgram](https://deepgram.com/)**: For the AI-powered Speech-to-Text API.

## 📂 Project Structure

The project is a monorepo with two main directories:
- `/client`: Contains the entire React frontend application.
- `/backend`: Contains the Node.js/Express backend server and API.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18.x or later recommended)
- `npm`
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database.
- A [Deepgram](https://developers.deepgram.com/) API Key.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd APP_TRANSLATOR
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    # Deepgram API Configuration
    DEEPGRAM_API_KEY="YOUR_DEEPGRAM_API_KEY_HERE"
    DEEPGRAM_API_URL="https://api.deepgram.com/v1/listen"

    # MongoDB Connection String (from MongoDB Atlas)
    MONGO_URI="YOUR_MONGODB_CONNECTION_STRING"

    # JWT Secret for Authentication
    JWT_SECRET="A_VERY_LONG_AND_COMPLEX_SECRET_PHRASE"

    # Server Configuration
    PORT=3001
    ```

3.  **Setup the Frontend:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

You will need to run the backend and frontend servers in two separate terminals.

1.  **Start the backend server:**
    - In a terminal at the `/backend` directory:
        ```bash
        npm run dev
        ```
    - The server will start on `http://localhost:3001`.

2.  **Start the frontend development server:**
    - In another terminal at the `/client` directory:
        ```bash
        npm run dev
        ```
    - The application will open and be accessible at `http://localhost:5173`.

## 📝 API Endpoints

The backend exposes the following REST API endpoints:

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Log in a user and receive a JWT.
-   `POST /api/transcripts/upload`: (Protected) Upload or record audio for transcription.
-   `GET /api/transcripts`: (Protected) Get the authenticated user's transcription history.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📝 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.