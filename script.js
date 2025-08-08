import { auth, db } from "./firebaseconfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  increment,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  let currentUser = JSON.parse(localStorage.getItem("Nestuser"))
  let signupBtn = document.getElementById("signup-btn");
  let loginBtn = document.getElementById("login-btn");
  let logoutBtn = document.getElementById("logout-btn");

  displayPosts(false); // default Explore mode

  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      let name = document.getElementById("name");
      let email = document.getElementById("signup-email");
      let message = document.getElementById("signup-message");
      let password = document.getElementById("signup-password");
      try {
        let userCredentials = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        await setDoc(doc(db, "users", userCredentials.user.uid), {
          userId: userCredentials.user.uid,
          name: name.value,
          email: email.value,
          avatarUrl:
            "https://tse4.mm.bing.net/th/id/OIP.mUqmInvPRlOkJNYnk_hmeAHaJQ?pid=Api&P=0&h=180",
          interests: [],
          joinedCommunities: [],
        });
        name.value = "";
        email.value = "";
        password.value = "";
        message.innerText = "Signup successful. Redirecting to Login Page...";
        setTimeout(() => {
          window.location.href = "logIn.html";
        }, 2000);
      } catch (error) {
        message.innerText = error.message;
      }
    });
  }

  document.getElementById("following")?.addEventListener("click", () => {
    displayPosts(true);
  });

  document.getElementById("explore")?.addEventListener("click", () => {
    displayPosts(false);
  });

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      let email = document.getElementById("login-email");
      let message = document.getElementById("login-message");
      let password = document.getElementById("login-password");
      try {
        let userCredentials = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        let userRef = doc(db, "users", userCredentials.user.uid);
        let userSnap = await getDoc(userRef);
        let user = userSnap.data();
        localStorage.setItem("Nestuser", JSON.stringify(user));
        email.value = "";
        password.value = "";
        message.innerText = "Login Successful.";
        setTimeout(() => {
          window.location.href = "homepage.html";
        }, 1000);
      } catch (error) {
        message.innerText = error.message;
      }
    });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let userdoc = await getDoc(doc(db, "users", user.uid));
      if (userdoc.exists()) {
        currentUser = userdoc.data();
        let p = document.getElementById("name");
        if (p) p.innerText = `Hello, ${currentUser.name}`;
      }
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        localStorage.removeItem("Nestuser");
        window.location.href = "login.html";
      } catch (error) {
        alert(error.message);
      }
    });
  }

  async function displayPosts(showFollowing = false) {
    let userData = JSON.parse(localStorage.getItem("Nestuser")) || {};
    let userJoined = Array.isArray(userData.joinedCommunities)
      ? userData.joinedCommunities
      : [];
    let userId = userData.userId || "";

    const postListDiv = document.getElementById("post-list");
    if (!postListDiv) return;

    postListDiv.innerHTML =
      "<div class='flex items-center justify-center text-2xl'>Loading Posts...</div>";

    try {
      const postsRef = collection(db, "posts");
      let snapshots = [];

      if (showFollowing && userJoined.length > 0) {
        // Handle Firestore "in" limitation of max 10 elements
        if (userJoined.length <= 10) {
          const q = query(postsRef, where("category", "in", userJoined));
          snapshots.push(await getDocs(q));
        } else {
          // Split into batches of 10
          for (let i = 0; i < userJoined.length; i += 10) {
            const batch = userJoined.slice(i, i + 10);
            const q = query(postsRef, where("category", "in", batch));
            snapshots.push(await getDocs(q));
          }
        }
      } else {
        snapshots.push(await getDocs(postsRef)); // Explore: fetch all posts
      }

      // Merge results
      let allDocs = [];
      snapshots.forEach((snap) => {
        snap.forEach((docSnap) => allDocs.push(docSnap));
      });

      postListDiv.innerHTML = "";

      if (allDocs.length === 0) {
        postListDiv.innerHTML =
          "<p class='flex items-center justify-center text-2xl py-10 text-gray-500'>No posts found.</p>";
        return;
      }

      allDocs.forEach((docSnap) => {
        const data = docSnap.data();
        const postId = docSnap.id;
        const hasLiked = JSON.parse(localStorage.getItem("likedPosts")) || [];
        const hasDisLiked =
          JSON.parse(localStorage.getItem("dislikedPosts")) || [];

        const box = document.createElement("div");
        box.className =
          "post-box mb-6 border-b pb-4 p-4 bg-white rounded shadow";

        box.innerHTML = `
        <img src="${data.postImg}" alt="${
          data.postTitle
        }" class="w-full max-w-md mb-4 rounded">
        <h2 class="text-xl font-semibold">${data.postTitle}</h2>
        <p>${data.postDesc}</p>
        <p>Community: ${data.category}</p>
        <p>By: ${data.createdBy}</p>
        <p class="text-sm text-gray-500">Posted On: ${
          data.timestamp?.toDate().toLocaleString() || "N/A"
        }</p>
        
        <button class="like-btn px-4 py-2 rounded text-white ${
          hasLiked.includes(`${postId} ${userId}`)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }" data-id="${postId}" ${
          hasLiked.includes(`${postId} ${userId}`) ? "disabled" : ""
        }>
          👍  (${data.likes || 0})
        </button>
        <button class="dislike-btn px-4 py-2 rounded text-white ${
          hasDisLiked.includes(`${postId} ${userId}`)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }" data-id="${postId}" ${
          hasDisLiked.includes(`${postId} ${userId}`) ? "disabled" : ""
        }>
          👎  (${data.dislikes || 0})
        </button>

        <div class="mt-3">
          <input type="text" class="comment-input border p-1 rounded w-full mt-2" placeholder="Add a comment...">
          <button class="comment-btn bg-green-600 text-white px-3 py-1 mt-1 rounded hover:bg-green-700" data-id="${postId}">Comment</button>
          <button class="toggle-comments-btn text-blue-600 mt-2 underline">Show Comments</button>
        </div>

        <div class="comments-section mt-2 text-sm text-gray-700 hidden"></div>
      `;

        const commentBtn = box.querySelector(".comment-btn");
        const commentInput = box.querySelector(".comment-input");
        const commentsSection = box.querySelector(".comments-section");
        const toggleCommentsBtn = box.querySelector(".toggle-comments-btn");
        const likeBtn = box.querySelector(".like-btn");
        let disLikeBtn = box.querySelector(".dislike-btn");

        commentBtn.addEventListener("click", async () => {
          const commentText = commentInput.value.trim();
          if (!commentText) return;
          try {
            const commentData = `${currentUser.name}: ${commentText}`;
            await updateDoc(doc(db, "posts", postId), {
              comments: arrayUnion(commentData),
            });
            commentsSection.innerHTML += `<p>${commentData}</p>`;
            commentInput.value = "";
            commentsSection.classList.remove("hidden");
          } catch {
            alert("Failed to add comment");
          }
        });

        likeBtn.addEventListener("click", async () => {
          if (hasLiked.includes(`${postId} ${userId}`)) return;
          try {
            await updateDoc(doc(db, "posts", postId), { likes: increment(1) });
            hasLiked.push(`${postId} ${userId}`);
            localStorage.setItem("likedPosts", JSON.stringify(hasLiked));
            displayPosts(showFollowing);
          } catch {}
        });

        disLikeBtn.addEventListener("click", async () => {
          if (hasDisLiked.includes(`${postId} ${userId}`)) return;
          try {
            await updateDoc(doc(db, "posts", postId), {
              dislikes: increment(1),
            });
            hasDisLiked.push(`${postId} ${userId}`);
            localStorage.setItem("dislikedPosts", JSON.stringify(hasDisLiked));
            displayPosts(showFollowing);
          } catch {}
        });

        toggleCommentsBtn.addEventListener("click", () => {
          commentsSection.classList.toggle("hidden");
        });

        if (data.comments) {
          data.comments.forEach((comment) => {
            commentsSection.innerHTML += `<p>${comment}</p>`;
          });
        }

        postListDiv.appendChild(box);
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      postListDiv.innerHTML =
        "<p class='text-red-500'>Failed to load posts.</p>";
    }
  }
});
