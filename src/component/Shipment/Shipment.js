import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
	const { register, handleSubmit, watch, errors } = useForm();
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const onSubmit = data => console.log(data);

	console.log(watch("example"));

	return (

		< form className="ship-form" onSubmit={handleSubmit(onSubmit)}  >

			< input name="Name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Enter Your Name' />
			{ errors.Name && <span className="err">Name is required</span>}

			< input name="Email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Enter Your Email' />
			{ errors.Email && <span className="err">Email is required</span>}

			< input name="Address" ref={register({ required: true })} placeholder='Enter Your Address' />
			{ errors.Address && <span className="err">Address is required</span>}

			< input name="zip" ref={register({ required: true })} placeholder='ZIP' />
			{ errors.zip && <span className="err">ZIP is required</span>}

			< input name="Phone" ref={register({ required: true })} placeholder='Phone Number' />
			{ errors.Phone && <span className="err">Phone Number is required</span>}

			<input type="submit" />
		</form >
	);

};

export default Shipment;