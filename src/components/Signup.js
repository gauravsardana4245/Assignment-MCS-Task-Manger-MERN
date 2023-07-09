import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Spinner from './Spinner';

const Signup = (props) => {
    const { mode } = props;
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [loading, setLoading] = useState(false);
    const onChange = async (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    let navigate = useNavigate();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("https://task-manager-gaurav-backend.onrender.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            setLoading(false);
            localStorage.setItem("token", json.authtoken);
            props.setName(json.name);
            navigate('/');
            props.showAlert("Signed up successfully", "success");
        }
        else {
            setLoading(false);
            props.showAlert("Invalid credentials", "danger")
        }
    }
    return (
        <div className='container auth-page'>
            <h2 className='my-2 mb-4'>Create an account to start using MyTasks</h2>
            <form onSubmit={onSubmit} className='auth-box'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name <span className={`mandatory-mark-${mode}`}>*</span></label>
                    <input required style={{
                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                        color: `${mode === 'light' ? "black" : 'white'}`
                    }} type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address <span className={`mandatory-mark-${mode}`}>*</span></label>
                    <input required style={{
                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                        color: `${mode === 'light' ? "black" : 'white'}`
                    }} type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of birth</label>
                    <input style={{
                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                        color: `${mode === 'light' ? "black" : 'white'}`
                    }} type="date" className="form-control" id="dob" name='dob' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password <span className={`mandatory-mark-${mode}`}>*</span></label>
                    <input required style={{
                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                        color: `${mode === 'light' ? "black" : 'white'}`
                    }} type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confrrm Password</label>
                    <input style={{
                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                        color: `${mode === 'light' ? "black" : 'white'}`
                    }} type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary my-2" >Sign up</button>
                {loading && <Spinner />}
                {/* <div className='my-2'> Already have an account? <Link className='text-decoration-none' to="/login">Login</Link></div> */}
            </form>
        </div>
    )
}

export default Signup
