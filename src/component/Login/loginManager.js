import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

export const initLoginFramwork = () => {
	if (firebase.apps.length === 0) {
		firebase.initializeApp(firebaseConfig);
	}
}

export const handleGoogleSignIn = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	return firebase.auth().signInWithPopup(googleProvider)
		.then(res => {
			const { displayName, email, photoURL } = res.user;
			return ({
				isSignedIn: true,
				email: email,
				name: displayName,
				photo: photoURL,
				success: true
			})
			// console.log(displayName, email, photoURL);
		})
		.catch(err => {
			let newUserInfo = {}
			newUserInfo.err = err.message;
			return newUserInfo;
		})
}

export const handleFbSignIn = () => {
	const fbProvider = new firebase.auth.FacebookAuthProvider();
	return firebase
		.auth()
		.signInWithPopup(fbProvider)
		.then(res => {
			const { displayName, email, photoURL } = res.user;
			return ({
				isSignedIn: true,
				email: email,
				name: displayName,
				photo: photoURL,
				success: true
			})

			// This gives you a Facebook Access Token. You can use it to access the Facebook API.

			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			let newUserInfo = {}
			newUserInfo.err = error.message;
			return newUserInfo;
			// ...
		});
}

export const signUpWithEmailAndPassword = (name, email, password) => {
	return firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(res => {
			// console.log(userCredential)
			const newUserInfo = res.user;
			newUserInfo.err = '';
			newUserInfo.success = true;
			updateName(name);
			return newUserInfo;
		})
		.catch((error) => {
			let newUserInfo = {}
			newUserInfo.err = error.message;
			return newUserInfo;
			// console.log(error)
		});
}

export const signInWithEmailAndPassword = (email, password) => {
	return firebase.auth().signInWithEmailAndPassword(email, password)
		.then(res => {
			const newUserInfo = res.user;
			newUserInfo.err = '';
			newUserInfo.success = true;
			return newUserInfo;

		})
		.catch((error) => {
			let newUserInfo = {
				err: error.message
			};
			return newUserInfo;

		});
}

export const handleSignOut = () => {
	return firebase.auth().signOut()
		.then(res => {
			return ({
				isSignedIn: false,
				email: '',
				name: '',
				photo: '',
				success: false
			})
		})
}

const updateName = name => {
	var user = firebase.auth().currentUser;

	user.updateProfile({
		displayName: name,

	}).then(function () {
		console.log('Update successful.');
	}).catch(function (error) {
		// An error happened.
	});
};