import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from "../../firebase.config";
if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

function Login() {
	const [newUser, setNewUser] = useState(false);
	const [user, setUser] = useState({
		isSignedIn: false,
		email: '',
		err: '',
		name: '',
		photo: '',
		password: '',
		success: false
	});

	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const history = useHistory();
	const location = useLocation();

	let { from } = location.state || { from: { pathname: "/" } };

	const googleProvider = new firebase.auth.GoogleAuthProvider();
	var fbProvider = new firebase.auth.FacebookAuthProvider();
	const handleSignIn = () => {
		firebase.auth().signInWithPopup(googleProvider)
			.then(res => {
				const { displayName, email, photoURL } = res.user;
				setUser({
					isSignedIn: true,
					email: email,
					name: displayName,
					photo: photoURL
				})
				console.log(displayName, email, photoURL);
			})
			.catch(err => {
				console.log(err);
				console.log(err.message);
			})
	}

	const handleFbSignIn = () => {
		firebase
			.auth()
			.signInWithPopup(fbProvider)
			.then(res => {

				console.log('fb user', res.user);

				// This gives you a Facebook Access Token. You can use it to access the Facebook API.

				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				console.log(error)
				// ...
			});
	}

	const handleSignOut = () => {
		setUser({
			isSignedIn: false,
			email: '',
			name: '',
			photo: ''
		})
	}

	const handleBlur = (e) => {
		const inpt = e.target;
		let formValid = true;
		if (inpt.name === 'email') {
			formValid = /\S+@\S+\.\S+/.test(inpt.value)

		}
		if (inpt.name === 'password') {
			const isPasswordLong = inpt.value.length >= 6;
			const isPasswordValid = /\d{1}/.test(inpt.value);
			formValid = isPasswordLong && isPasswordValid;
		}
		if (formValid === true) {
			const newUserInfo = { ...user };
			newUserInfo.isSignedIn = true;
			newUserInfo[inpt.name] = inpt.value;
			setUser(newUserInfo);

		}
	}

	const handleSubmit = e => {
		console.log(user.email, user.password);
		if (newUser && user.email && user.password && user.name) {
			firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
				.then((userCredential) => {
					console.log(userCredential)
					const newUserInfo = { ...user };
					newUserInfo.err = '';
					newUserInfo.success = true;
					setUser(newUserInfo);
					updateName(user.name);
					// ...
				})
				.catch((error) => {
					let newUserInfo = { ...user }
					newUserInfo.err = error.message;
					newUserInfo.success = false;
					setUser(newUserInfo);
					console.log(user.err)
				});
		}
		if (!newUser && user.email && user.password) {
			firebase.auth().signInWithEmailAndPassword(user.email, user.password)
				.then(res => {
					const newUserInfo = { ...user };
					newUserInfo.err = '';
					newUserInfo.success = true;
					setUser(newUserInfo);
					setLoggedInUser(newUserInfo);
					history.replace(from);
					console.log(res.user)
				})
				.catch((error) => {
					let newUser = { ...user }
					newUser.err = error.message;
					setUser(newUser);
					console.log(user.err)
				});
		}
		e.preventDefault();
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

	return (
		<div style={{ textAlign: 'center' }}>
			{
				user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
			}
			<button onClick={handleFbSignIn}>Sign in With Facebook</button>
			{user.isSignedIn &&
				<div>
					<img src={user.photo} alt="" />
					<h1>Welcome, {user.name} </h1>
					<p>You E-Mail:{user.email}</p>
					<p>Your password:{user.password}</p>
				</div>
			}


			<form action="">
				<input type="checkbox" name="newUsers" id="" onChange={() => setNewUser(!newUser)} />
				<label htmlFor="newUsers">Sign Up</label>
				<br />
				{
					newUser && <input type="text" name="name" id="" onBlur={handleBlur} placeholder="name" />
				}
				<br />
				<input type="email" name="email" id="" onBlur={handleBlur} placeholder="email" required />
				<br />
				<input type="password" name="password" id="" onBlur={handleBlur} placeholder="password" required />
				<br />
				<input type="submit" value="Submit" onClick={handleSubmit} />

			</form>
			{
				user.err && <p style={{ color: "red" }}>{user.err}</p>
			}

			{
				user.success && <p style={{ color: "green" }}>{newUser ? 'Sign up' : 'Log In'} successful.</p>



			}

		</div>
	);

}

export default Login;
