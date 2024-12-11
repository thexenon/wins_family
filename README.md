# wins_family

Below is a **code tree and roadmap** for developing a **React Native app** with a **Node.js backend** to include the features and pages listed. The roadmap covers folder structures, key libraries, backend endpoints, and development milestones.

---

### **1. Project Directory Structure**

```plaintext
project-root/
├── backend/                  # Node.js Backend
│   ├── controllers/          # Business logic for routes
│   ├── models/               # MongoDB/SQL database models
│   ├── routes/               # API routes
│   ├── middleware/           # Auth and validation middleware
│   ├── utils/                # Utility functions
│   ├── config/               # Configuration (e.g., environment variables)
│   ├── server.js             # Server entry point
│   └── package.json          # Backend dependencies
│
├── mobile/                   # React Native App
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── screens/          # App screens
│   │   │   ├── HomePage.js
│   │   │   ├── LiveStreamPage.js
│   │   │   ├── RegistrationPage.js
│   │   │   ├── UserAccountPage.js
│   │   │   ├── AdminPage.js
│   │   │   └── ShortVideosPage.js
│   │   ├── navigation/       # Navigation stack (e.g., React Navigation)
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services (Axios/Fetch calls)
│   │   ├── utils/            # Helper functions
│   │   ├── App.js            # Main app entry
│   │   └── package.json      # Frontend dependencies
│   ├── android/              # Android-specific files
│   ├── ios/                  # iOS-specific files
│   ├── app.json              # App configuration
│   └── index.js              # React Native entry point
└── README.md                 # Documentation
```

---

### **2. Development Roadmap**

#### **Phase 1: Backend Development**

1. **Set Up the Node.js Server**:

   - Install essential libraries: `express`, `mongoose` (or `sequelize` for SQL), `jsonwebtoken`, `bcrypt`, `cors`, `multer` (for media uploads), `socket.io` (for live comments).
   - Scaffold the backend structure.

2. **Database Design**:

   - Use MongoDB or SQL for storing user details, announcements, videos, and comments.

     - **User Schema**:

       ```javascript
       const mongoose = require("mongoose");
       const userSchema = new mongoose.Schema({
         username: { type: String, required: true },
         email: { type: String, required: true, unique: true },
         password: { type: String, required: true },
         accountType: {
           type: String,
           enum: ["admin", "streamer", "member"],
           default: "member",
         },
         createdAt: { type: Date, default: Date.now },
       });
       module.exports = mongoose.model("User", userSchema);
       ```

     - **Video Schema**:
       ```javascript
       const videoSchema = new mongoose.Schema({
         title: String,
         description: String,
         url: String,
         likes: [String], // Array of user IDs
         comments: [
           {
             userId: String,
             comment: String,
             createdAt: { type: Date, default: Date.now },
           },
         ],
       });
       module.exports = mongoose.model("Video", videoSchema);
       ```

3. **API Endpoints**:

   - User Authentication:
     - `POST /api/register`: Register a new user.
     - `POST /api/login`: Authenticate user and return a JWT token.
   - User Management:
     - `GET /api/user/:id`: Fetch user details.
     - `PUT /api/user/:id`: Update user details (admin only).
   - Admin Operations:
     - `POST /api/admin/post-message`: Post messages/announcements.
     - `POST /api/admin/upload-video`: Upload a short video.
   - Live Stream:
     - `POST /api/livestream/start`: Start a live stream (streamer/admin only).
     - `GET /api/livestream`: Fetch live stream details.
   - Comments and Likes:
     - `POST /api/video/:id/comment`: Post a comment (member only).
     - `POST /api/video/:id/like`: Like a video (member/viewer).

4. **Authentication Middleware**:

   - Verify JWT tokens and user roles (admin, streamer, member).

5. **Real-Time Functionality**:
   - Use `Socket.IO` for live stream comments.

---

#### **Phase 2: React Native App Development**

1. **Set Up the React Native Environment**:

   - Install dependencies: `react-navigation`, `axios`, `react-redux`, `socket.io-client`.

2. **Create Screens**:

   - **HomePage.js**:

     - Display welcome video, announcements, and messages.
     - Fetch data from `/api/admin/messages` using `Axios`.

   - **LiveStreamPage.js**:

     - Integrate live video streaming (use `react-native-video` or `RTMP` libraries).
     - Connect to `Socket.IO` for real-time comments.

   - **RegistrationPage.js**:

     - Use form libraries like `Formik` for user registration.

   - **UserAccountPage.js**:

     - Display user details and provide a form for updates.
     - Fetch data from `/api/user/:id`.

   - **AdminPage.js**:

     - Allow admins to change user roles, post messages, and upload videos.
     - Use `/api/admin` endpoints.

   - **ShortVideosPage.js**:
     - List short videos with a like button and comment section.
     - Fetch data from `/api/videos`.

3. **Implement Navigation**:

   - Use `React Navigation` with stack and tab navigators.

     ```javascript
     import { NavigationContainer } from "@react-navigation/native";
     import { createStackNavigator } from "@react-navigation/stack";

     const Stack = createStackNavigator();

     const App = () => (
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen name="Home" component={HomePage} />
           <Stack.Screen name="Live Stream" component={LiveStreamPage} />
           <Stack.Screen name="Register" component={RegistrationPage} />
           <Stack.Screen name="Account" component={UserAccountPage} />
           <Stack.Screen name="Admin" component={AdminPage} />
           <Stack.Screen name="Videos" component={ShortVideosPage} />
         </Stack.Navigator>
       </NavigationContainer>
     );
     export default App;
     ```

4. **Integrate API Services**:

   - Create an API service file in `services/`:

     ```javascript
     import axios from "axios";

     const API_URL = "http://your-backend-url.com";

     export const registerUser = async (userData) => {
       return axios.post(`${API_URL}/api/register`, userData);
     };

     export const fetchVideos = async () => {
       return axios.get(`${API_URL}/api/videos`);
     };
     ```

5. **Handle Authentication**:

   - Store JWT tokens securely using `AsyncStorage`.
   - Attach tokens to API requests using Axios interceptors.

6. **Real-Time Features**:

   - Connect to `Socket.IO` for live comments:

     ```javascript
     import io from "socket.io-client";
     const socket = io(API_URL);

     socket.on("newComment", (comment) => {
       console.log(comment);
     });
     ```

---

### **3. Pros of the Development Roadmap**

1. **Modular Structure**:
   - Clean separation of concerns for scalability.
2. **Reusable Components**:
   - Shared components and services make future updates efficient.
3. **Real-Time Engagement**:
   - Live streaming and real-time comments enhance user experience.

---

### **4. Challenges and Solutions**

1. **Challenge**: Integrating live streaming.
   - **Solution**: Use third-party streaming services like Twilio or AWS IVS for better reliability.
2. **Challenge**: Managing multiple user roles.
   - **Solution**: Implement role-based access control in the backend.

---

This roadmap ensures an organized and scalable approach to development while prioritizing feature requirements.

Here’s a detailed breakdown of each page in your **React Native app** and the required components and packages for implementation. The breakdown also includes reusable components to minimize redundancy and improve maintainability.

---

<br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br>

---

Below is a detailed breakdown of a **Node.js backend** for your React Native app. The explanation includes folder structure, key files, and required packages.

---

## **Backend Folder Structure**

```plaintext
backend/
├── config/                   # Configuration files
│   ├── db.js                 # Database connection setup
│   ├── env.js                # Environment variable loader
├── controllers/              # Request-handling logic
│   ├── authController.js     # Authentication logic (login/register)
│   ├── userController.js     # User account management
│   ├── adminController.js    # Admin-specific operations
│   ├── streamController.js   # Live stream handling
│   └── videoController.js    # Video and comment management
├── middleware/               # Middleware functions
│   ├── authMiddleware.js     # Authentication (JWT verification)
│   ├── roleMiddleware.js     # Role-based access control
├── models/                   # Database schemas/models
│   ├── User.js               # User model
│   ├── Video.js              # Video model
│   └── Comment.js            # Comment model (optional)
├── routes/                   # Route definitions
│   ├── authRoutes.js         # Routes for login/register
│   ├── userRoutes.js         # User-related routes
│   ├── adminRoutes.js        # Admin-related routes
│   ├── streamRoutes.js       # Live stream routes
│   └── videoRoutes.js        # Video and comment routes
├── utils/                    # Utility functions
│   ├── generateToken.js      # JWT token generator
│   ├── uploadHelper.js       # File upload helper
│   └── errorHandler.js       # Centralized error handling
├── public/                   # Publicly accessible files (e.g., uploaded media)
│   └── uploads/              # Uploaded videos/images
├── server.js                 # Main server entry point
└── package.json              # Node.js project dependencies
```

---

## **Folder and File Breakdown**

### **1. `config/`**

Holds configuration files for the backend.

- **`db.js`**:

  - Sets up the database connection (e.g., MongoDB or SQL).
  - Example (for MongoDB):
    ```javascript
    const mongoose = require("mongoose");
    const connectDB = async () => {
      try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
      } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
      }
    };
    module.exports = connectDB;
    ```

- **`env.js`**:
  - Loads environment variables.
  - Example:
    ```javascript
    require("dotenv").config();
    ```

---

### **2. `controllers/`**

Handles business logic for each route.

- **`authController.js`**:

  - Handles user registration and login.
  - Example:

    ```javascript
    const User = require("../models/User");
    const generateToken = require("../utils/generateToken");

    exports.register = async (req, res) => {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password });
      await user.save();
      res.status(201).json({ token: generateToken(user._id) });
    };
    ```

- **`userController.js`**:

  - Fetch and update user details.
  - Example:
    ```javascript
    exports.getUserDetails = async (req, res) => {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    };
    ```

- **`adminController.js`**:

  - Admin functions like changing user roles and posting messages.
  - Example:
    ```javascript
    exports.changeUserRole = async (req, res) => {
      const { userId, role } = req.body;
      const user = await User.findByIdAndUpdate(userId, { accountType: role });
      res.json(user);
    };
    ```

- **`streamController.js`**:

  - Start or fetch live stream details.
  - Example:
    ```javascript
    exports.startStream = (req, res) => {
      res.json({ message: "Stream started", streamKey: "stream-key-here" });
    };
    ```

- **`videoController.js`**:
  - Handle video uploads, comments, and likes.
  - Example:
    ```javascript
    exports.uploadVideo = async (req, res) => {
      const video = new Video({ title: req.body.title, url: req.file.path });
      await video.save();
      res.status(201).json(video);
    };
    ```

---

### **3. `middleware/`**

Contains reusable middleware functions.

- **`authMiddleware.js`**:

  - Verifies JWT tokens for authentication.
  - Example:

    ```javascript
    const jwt = require("jsonwebtoken");
    module.exports = (req, res, next) => {
      const token = req.header("Authorization");
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch {
        res.status(401).json({ message: "Invalid token" });
      }
    };
    ```

- **`roleMiddleware.js`**:
  - Ensures only specific roles can access certain routes.
  - Example:
    ```javascript
    module.exports = (roles) => (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access forbidden" });
      }
      next();
    };
    ```

---

### **4. `models/`**

Defines database schemas.

- **`User.js`**:

  - Stores user information.
  - Example:
    ```javascript
    const mongoose = require("mongoose");
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      accountType: {
        type: String,
        enum: ["admin", "streamer", "member"],
        default: "member",
      },
    });
    module.exports = mongoose.model("User", userSchema);
    ```

- **`Video.js`**:

  - Stores uploaded video details.

- **`Comment.js`**:
  - Stores comments on videos.

---

### **5. `routes/`**

Defines API endpoints and their handlers.

- **`authRoutes.js`**:

  - Authentication routes like `/api/register` and `/api/login`.

- **`userRoutes.js`**:

  - User-related routes like `/api/user/:id`.

- **`adminRoutes.js`**:

  - Admin-specific routes like `/api/admin/change-role`.

- **`streamRoutes.js`**:

  - Routes for managing live streams.

- **`videoRoutes.js`**:
  - Routes for video uploads and comments.

---

### **6. `utils/`**

Reusable helper functions.

- **`generateToken.js`**:

  - Generates JWT tokens.
  - Example:
    ```javascript
    const jwt = require("jsonwebtoken");
    module.exports = (id) =>
      jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    ```

- **`uploadHelper.js`**:

  - Configures file uploads.
  - Example:
    ```javascript
    const multer = require("multer");
    const storage = multer.diskStorage({
      destination: "./public/uploads/",
      filename: (req, file, cb) =>
        cb(null, `${Date.now()}-${file.originalname}`),
    });
    module.exports = multer({ storage });
    ```

- **`errorHandler.js`**:
  - Centralized error handling middleware.

---

### **7. `public/`**

Holds uploaded media files (e.g., videos, images).

---

### **8. `server.js`**

Main entry point for the server.

- Sets up the Express app, connects to the database, and starts the server.
- Example:

  ```javascript
  const express = require("express");
  const connectDB = require("./config/db");
  const authRoutes = require("./routes/authRoutes");
  const userRoutes = require("./routes/userRoutes");

  const app = express();
  connectDB();
  app.use(express.json());
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  ```

---

### **Packages Needed**

1. **Core Packages**:

   - `express`, `dotenv`, `mongoose` or `sequelize`.

2. **Authentication**:

   - `jsonwebtoken`, `bcrypt`.

3. **File Uploads**:

   - `multer`.

4. **Real-Time Communication**:

   - `socket.io`.

5. **Others**:
   - `cors` for cross-origin resource sharing, `nodemon` for development.

---

This breakdown ensures a well-organized, scalable backend setup, aligning with the React Native app requirements.

---

<br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br><hr><br>

---

## **1. Home Page/Landing Page**

### **Features**

- Short welcome video.
- Announcements and short messages from admins.
- Comments from member accounts.

### **Components**

1. **VideoPlayer**: A component for playing the welcome video.

   - Package: [`react-native-video`](https://github.com/react-native-video/react-native-video) for video playback.
   - Example:

     ```javascript
     import Video from "react-native-video";

     const VideoPlayer = ({ uri }) => (
       <Video
         source={{ uri }}
         style={{ width: "100%", height: 200 }}
         controls
       />
     );
     export default VideoPlayer;
     ```

2. **AnnouncementCard**: Displays each admin announcement.

   - Contains: Title, short description, and posted time.

3. **CommentsSection**: Displays and submits member comments.

   - Package: [`react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/) for swiping gestures (optional).

4. **Reusable Components**:
   - **Header**: Displays the app's title or navigation buttons.
   - **Button**: Custom button component for styling consistency.

---

### **Packages**

- **State Management**: `react-redux` or `context API` for global state.
- **Networking**: `axios` for fetching announcements and comments.
- **UI Components**: `react-native-paper` or `react-native-elements` for pre-styled UI components.

---

## **2. Live Stream Page**

### **Features**

- Start live streams (admin/streamer accounts).
- Watch live streams (member accounts).
- Real-time comments section for members.

### **Components**

1. **LiveStreamPlayer**:

   - Plays the live video feed.
   - Package: [`react-native-webrtc`](https://github.com/react-native-webrtc/react-native-webrtc) or integrate third-party services like Twilio or AWS IVS.
   - Example:

     ```javascript
     import { RTCView } from "react-native-webrtc";

     const LiveStreamPlayer = ({ stream }) => <RTCView streamURL={stream} />;
     ```

2. **CommentsSection**:

   - Displays real-time comments from Socket.IO or Firebase.
   - Package: [`socket.io-client`](https://github.com/socketio/socket.io-client).

3. **StartStreamButton** (Admin Only):

   - Allows admins/streamers to start a new stream.

4. **ViewerCount**:
   - Displays the number of active viewers.

---

### **Packages**

- **Real-Time Communication**: `socket.io-client` for comments and viewer updates.
- **Live Stream**: `react-native-webrtc` for live video streaming.
- **State Management**: `react-redux` or `zustand` for managing stream state.

---

## **3. Registration Page**

### **Features**

- User registration form with validation.
- Submit user details to the backend.

### **Components**

1. **FormInput**: Reusable text input component.

   - Package: `react-native-elements` for styled inputs.

2. **SubmitButton**: Reusable button component.

3. **Form Validation**:

   - Package: [`formik`](https://formik.org/) for form state management and validation.
   - Package: [`yup`](https://github.com/jquense/yup) for validation schemas.
   - Example:

     ```javascript
     import { useFormik } from "formik";
     import * as Yup from "yup";

     const RegistrationForm = () => {
       const { handleChange, handleSubmit, values, errors } = useFormik({
         initialValues: { username: "", email: "", password: "" },
         validationSchema: Yup.object({
           username: Yup.string().required("Username is required"),
           email: Yup.string()
             .email("Invalid email")
             .required("Email is required"),
           password: Yup.string()
             .min(6, "Password must be at least 6 characters")
             .required(),
         }),
         onSubmit: (values) => console.log(values),
       });
     };
     ```

---

### **Packages**

- **Form Validation**: `formik`, `yup`.
- **Networking**: `axios` for backend API calls.

---

## **4. User Account Details Page**

### **Features**

- Display all user information.
- Update user information via form submission.

### **Components**

1. **ProfileCard**:

   - Displays user information such as name, email, and account type.

2. **EditProfileForm**:

   - Similar to the registration form but pre-filled with user data.

3. **AvatarUploader**:
   - Package: [`react-native-image-picker`](https://github.com/react-native-image-picker/react-native-image-picker) for selecting and uploading a profile image.

---

### **Packages**

- **Networking**: `axios` for fetching and updating user data.
- **Image Picker**: `react-native-image-picker`.

---

## **5. Admin Page**

### **Features**

- Change user account types.
- Post short messages, videos, and announcements.

### **Components**

1. **UserList**:

   - Displays a list of users with buttons to change account type.
   - Package: [`react-native-flatlist`](https://reactnative.dev/docs/flatlist).

2. **PostForm**:

   - Allows admins to post announcements or upload short videos.

3. **VideoUploader**:

   - Package: [`react-native-image-picker`](https://github.com/react-native-image-picker/react-native-image-picker) for selecting video files.
   - Example:

     ```javascript
     import { launchImageLibrary } from "react-native-image-picker";

     const VideoUploader = () => {
       const pickVideo = () => {
         launchImageLibrary({ mediaType: "video" }, (response) => {
           console.log(response.uri);
         });
       };
     };
     ```

---

### **Packages**

- **Networking**: `axios` for admin operations.
- **Media Upload**: `react-native-image-picker`.

---

## **6. Short Videos Page**

### **Features**

- List of short videos.
- Comments for each video (members only).
- Like button for viewers and members.

### **Components**

1. **VideoCard**:

   - Displays video thumbnail, title, description, like button, and comment button.

2. **CommentsModal**:

   - A modal for displaying and submitting comments.

3. **LikeButton**:
   - Tracks likes and sends them to the backend.

---

### **Packages**

- **Video Playback**: `react-native-video`.
- **Modal**: Built-in React Native `Modal` component.
- **Networking**: `axios` for fetching videos, comments, and likes.

---

### **Reusable Components Across All Pages**

- **Header**: Custom navigation bar.
- **Loader**: Loading spinner using `react-native-activity-indicator`.
- **Toast Notifications**: Package: [`react-native-toast-message`](https://github.com/calintamas/react-native-toast-message).

---

### **Summary of Required Packages**

1. **Navigation**: `@react-navigation/native`, `@react-navigation/stack`.
2. **Form Handling**: `formik`, `yup`.
3. **Media**: `react-native-video`, `react-native-image-picker`, `react-native-webrtc`.
4. **Real-Time Communication**: `socket.io-client`.
5. **Networking**: `axios`.
6. **UI Components**: `react-native-elements`, `react-native-paper`.
7. **State Management**: `redux`, `zustand`, or React Context.

This component-by-component approach ensures modular, maintainable, and feature-rich development of your React Native app.
