
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { initLoginFramwork, handleFbSignIn, handleGoogleSignIn, handleSignOut, signUpWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';

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

	initLoginFramwork();

	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const history = useHistory();
	const location = useLocation();

	let { from } = location.state || { from: { pathname: "/" } };

	const googleSignIn = () => {
		handleGoogleSignIn()
			.then(res => {
				handleResponse(res, true);
			})
	}

	const fbSignIn = () => {
		handleFbSignIn()
			.then(res => {
				handleResponse(res, true);
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
			signUpWithEmailAndPassword(user.name, user.email, user.password)
				.then(res => {
					handleResponse(res, true);
				})

		}
		if (!newUser && user.email && user.password) {
			signInWithEmailAndPassword(user.email, user.password)
				.then(res => {
					handleResponse(res, true);
				})
		}
		e.preventDefault();
	}

	const handleResponse = (res, redirect) => {
		setUser(res);
		setLoggedInUser(res);
		redirect && history.replace(from);
	}


	return (
		<div style={{ textAlign: 'center' }}>
			<button onClick={googleSignIn}>Sign In</button>
			<button onClick={fbSignIn}>Sign in With Facebook</button>

			{
				user.err && <p style={{ color: "red" }}>{user.err}</p>
			}


			<form>
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
				user.success && <p style={{ color: "green" }}>{newUser ? 'Sign up' : 'Log In'} successful.</p>



			}

		</div>
	);

}

export default Login;
