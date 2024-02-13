/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';

import '../forms.css';
import connectToAPI from 'client/client';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/userReducer';

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => connectToAPI('login', data).then((r) => {
    if (!r.token) {
      return message.error('Invalid credentials!');
    }
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = `auth=${r.token}; expires=" + ${date}; SameSite=None; secure`;
    dispatch(updateUser(data));
    reset(data);
    return navigate('/profile');
  });
  return (
    <div className="form-wrapper">
      <form className="form form--regular  form--centered" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Sign In</h2>
        <label htmlFor="email">
          Email address
          <input
            className={
              errors?.email?.message
                ? 'input input--error'
                : ' input input--no-error'
            }
            placeholder="Email address"
            type="email"
            name="email"
            id="email"
            {...register('email', {
              required: 'This is required.',
              validate: (value) => !!value.trim() || 'This is required.',
            })}
          />
        </label>
        <ErrorMessage className="error-message" as="span" errors={errors} name="email" />
        <label htmlFor="password">
          Password
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            className={
              errors?.password?.message
                ? 'input input--error'
                : ' input input--no-error'
            }
            {...register('password', {
              required: 'This is required.',
              validate: (value) => !!value.trim() || 'This is required.',
            })}
          />
        </label>
        <ErrorMessage className="error-message" as="span" errors={errors} name="password" />
        <input type="submit" value="Login" className="submit-btn input" />
        <span className="redirect">
          Do not have an account?
          <Link to="/sign-up">Sign Up</Link>
        </span>
      </form>
    </div>
  );
}

export default SignInPage;
