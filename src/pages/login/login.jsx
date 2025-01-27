import React, {useEffect, useState} from 'react';
import './login.css';
import truck from '../../assets/img/login_truck.png';
import {notification} from "antd";
import {$API} from "../../utils/http.jsx";
import {ADMIN_DASHBOARD, ADMIN_PRODUCTS} from "../../utils/const/consts.jsx";
import axios from "axios";

const Login = () => {
    const [api, contextHolder] = notification.useNotification();
    const [initialState, setInitialState] = useState({
        email: "",
        password: "",
        role: "user"
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!initialState.email) {
            api.error({
                message: 'Error',
                description: 'Please enter a email.',
            });
            return;
        }

        if (!initialState.password) {
            api.error({
                message: 'Error',
                description: 'Please enter a password.',
            });
            return;
        }

        try {
            const response = await $API.post("auth/token", initialState);
            console.log(response)
            if (response?.status === 200) {
                window.localStorage.setItem('token', response.data.token);
                window.location.assign(ADMIN_DASHBOARD+ADMIN_PRODUCTS);
            } else {
                api.error({
                    message: 'Login Failed',
                    description: 'Invalid credentials. Please try again.',
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            api.error({
                message: 'Login Error',
                description: 'An error occurred while logging in. Please try again later.',
            });
        }
    };
    const fetchData = async () => {
        // const userDataString = window.localStorage.getItem('user');
        // if (userDataString) {
        //     try {
        //
        //         const res = await $API.get('/auth/user-info/');
        //
        //         if (res.data.role === 'user') {
        //             window.location.assign(CABINET + CURRENT_MONTH_USER);
        //         } else if (res.data.role === 'admin') {
        //             window.location.assign(CABINET + USER_LIST_ADMIN);
        //         }
        //     } catch (error) {
        //         console.error('Error parsing user data:', error);
        //         window.localStorage.removeItem("user");
        //     }
        // }
    };

    // useEffect(() => {
    //     fetchData();
    // }, [initialState]);
    return (
        <div className='login-box'>
            {contextHolder}
            {/*<div className="login_truck_img">*/}
            {/*    <img src={truck} alt="uzbleader cargo"/>*/}
            {/*</div>*/}
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1>Mas Market</h1>
                    <div className="input">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder='Username'
                            autoComplete='new-username'
                            onChange={e => setInitialState({...initialState, email: e.target.value})}
                            value={initialState.email}
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            autoComplete='new-password'
                            onChange={e => setInitialState({...initialState, password: e.target.value})}
                            value={initialState.password}
                        />
                    </div>

                    <button type="submit" className='login_btn'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
