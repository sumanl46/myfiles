// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// for authentication,
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCJvngv0ZEc-4ru729ZmZDwP8P3EjLTCkw",
	authDomain: "imageeditor-c18c6.firebaseapp.com",
	projectId: "imageeditor-c18c6",
	storageBucket: "imageeditor-c18c6.appspot.com",
	messagingSenderId: "890283065088",
	appId: "1:890283065088:web:69587c380099d6aba4bde5",
	measurementId: "G-9G476V3W3V",
};

// const EMAIL = "sumanlimbu112003@gmail.com";
// const PASSWORD = "sumanL!23";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// const auth = getAuth();
// signInWithEmailAndPassword(auth, EMAIL, PASSWORD)
// 	.then(user => {
// 		const USER = user.user;

// 		const { apiKey, uid } = USER;

// 		// console.log(apiKey, uid);
// 		console.log(USER);
// 	})
// 	.catch(error => {
// 		const errorCode = error.code;
// 		const errorMessage = error.message;

// 		console.log(errorCode, errorMessage);
// 	});

export { db, app };
