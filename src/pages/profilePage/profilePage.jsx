/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage } from '@hookform/error-message';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, React } from 'react';

import '../forms.css';
import connectToAPI from 'client/client';
import { updateUser } from 'store/userReducer';
import errorToMessage from 'utils/errorToMessage';
import testUrlValidity from 'utils/testUrlValidity';

function ProfilePage() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  const userSelector = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    connectToAPI('update-user', data).then((r) => {
      if (!r.token) {
        return errorToMessage(r.response.data.errors);
      }
      return testUrlValidity(data.image).then((resolve) => {
        if (resolve) {
          dispatch(updateUser(data));
          return message.success('Updated profile');
        }
        return message.error('Invalid image url');
      });
    });
  };
  useEffect(() => {
    connectToAPI('user').then((user) => {
      dispatch(updateUser(user));
    });
  }, [dispatch]);
  return (
    <div className="form-wrapper">
      <form className="form form--regular  form--centered" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Edit Profile</h2>
        <label htmlFor="username">
          Username
          <input
            placeholder={userSelector.username}
            defaultValue={userSelector.username}
            type="text"
            className={
              errors?.username?.message
                ? 'input input--error'
                : ' input input--no-error'
            }
            name="username"
            id="username"
            {...register('username', {
              required: 'This is required',
              validate: (value) => !!value.trim() || 'Username is required',
              maxLength: {
                value: 20,
                message: 'This username exceeds the maximum length of 20',
              },
              minLength: { value: 3, message: 'This username is too short' },
            })}
          />
        </label>
        <ErrorMessage className="error-message" as="span" errors={errors} name="username" />
        <label htmlFor="email">
          Email address
          <input
            placeholder={userSelector.email}
            defaultValue={userSelector.email}
            type="email"
            name="email"
            className={
              errors?.email?.message
                ? 'input input--error'
                : ' input input--no-error'
            }
            id="email"
            {...register('email', {
              required: 'This is required',
              validate: (value) => !!value.trim() || 'Email is required',
            })}
          />
        </label>
        <ErrorMessage className="error-message" as="span" errors={errors} name="email" />
        <label htmlFor="new-password">
          Password
          <input
            placeholder="New password"
            type="password"
            className={
              errors?.password?.message
                ? 'input input--error'
                : ' input input--no-error'
            }
            name="new-password"
            id="new-password"
            {...register('password', {
              required: 'Enter/Change password',
              validate: (value) => !!value.trim() || "Password can't be empty",
              maxLength: {
                value: 40,
                message: 'This password exceeds the maximum length of 40',
              },
              minLength: { value: 6, message: 'This password is too short' },
            })}
          />
        </label>
        <ErrorMessage className="error-message" as="span" errors={errors} name="password" />
        <label htmlFor="username">
          Avatar image(url)
          <input
            placeholder={userSelector.url}
            defaultValue={userSelector.url}
            type="url"
            name="image"
            id="image"
            className={
              errors?.image?.message
                ? 'input input--error'
                : ' input input--no-error'
            }
            {...register('image', {
              required: 'Enter URL linking to the profile',
              validate: (value) => !!value.trim() || 'Enter URL linking to the profile',
            })}
          />
        </label>
        <ErrorMessage className="error-message" as="span" errors={errors} name="image" />
        <input type="submit" value="Save" className="submit-btn input" />
      </form>
    </div>
  );
}

export default ProfilePage;
