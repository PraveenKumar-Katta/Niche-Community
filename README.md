# 🏘️ NicheeHood

**NicheeHood** is a niche community web app that connects people with shared interests, hobbies, and goals.  
Built using **HTML, CSS, JavaScript, and Firebase**, it allows users to join communities, post updates, and interact with like-minded individuals.  

---

## 🚀 Features
- 🔐 **Firebase Authentication** – User sign-up and login using email/password.
- 📝 **Post Creation** – Share your thoughts, images, and links.
- 🖼️ **Image Upload** for posts using Firebase Storage.
- 💬 **Comment System** – Interact with others in real time.
- 📂 **Community Spaces** – Topic-based community creation and joining.
- 📱 **Responsive UI** – Works seamlessly across devices.

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend & Database:** Firebase Firestore  
- **Authentication:** Firebase Auth  
- **Hosting:** Firebase Hosting  

---

🔗 **[View Live App Here](https://your-live-demo-link.com)** 

## 📦 Installation & Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/PraveenKumar-Katta/NicheeHood.git
    cd NicheeHood
    ```

2. **Set up Firebase Project**
    - Go to [Firebase Console](https://console.firebase.google.com/)  
    - Create a new project  
    - Enable **Firestore Database** and **Authentication** (Email/Password)  
    - Go to **Project Settings** → **Your Apps** → copy your Firebase config  

3. **Configure Firebase**
    - Open `firebase-config.js` (or wherever you store it)  
    - Replace with your Firebase config:
    ```javascript
    const firebaseConfig = {
    apiKey: "AIzaSyCo8bAkuexM6HEsv8yUBeqzbObG3gz6Mqg",
    authDomain: "nichecommunity-99429.firebaseapp.com",
    projectId: "nichecommunity-99429",
    storageBucket: "nichecommunity-99429.firebasestorage.app",
    messagingSenderId: "279519848760",
    appId: "1:279519848760:web:4cae7aa6e7f8530a4bf9cd",
    measurementId: "G-S858ZSPPYT"
    };
    ```

4. **Run the App**
    - Open `index.html` in your browser or use a local server:

---
## 📂 Folder Structure

```plaintext
public/
│── communitie.html       # Communities page
│── createpost.html       # Create post page
│── firebaseconfig.js     # Firebase configuration
│── homepage.html         # Home page after login
│── index.html            # Landing page
│── logIn.html            # Login page
│── profil.html           # Profile page
│── script.js             # Main JavaScript logic
│── signUp.html           # Sign-up page
```
## 📸 Screenshots
### Home Page
![Home Page](https://github.com/PraveenKumar-Katta/Niche-Community/blob/master/public/Home.png)

### SignUp Page
![SignUp Page](https://github.com/PraveenKumar-Katta/Niche-Community/blob/master/public/Signup.png)

### Login Page
![Login Page](https://github.com/PraveenKumar-Katta/Niche-Community/blob/master/public/Login.png)


### Dashboard Page
![Community Page](https://github.com/PraveenKumar-Katta/Niche-Community/blob/master/public/Dashboard.png)

---

## 📜 License
This project is licensed under the MIT License.

🙌 Thank You
Thanks for checking out NicheeHood!
If you like this project, feel free to ⭐ the repo and share it with others.

Made with ❤️ using HTML, CSS, JS, and Firebase
