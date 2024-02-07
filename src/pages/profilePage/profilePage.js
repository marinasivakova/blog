import { ErrorMessage } from "@hookform/error-message";
import "../forms.css";
import { useForm } from "react-hook-form";
import connectToAPI from "../../client/client";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/userReducer";
import { useEffect } from "react";

const ProfilePage = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  const userSelector = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateUser(data));
    connectToAPI("update-user", data);
  };
  useEffect(() => {
    connectToAPI("user").then((user) => {
      dispatch(updateUser(user));
    });
  }, [dispatch]);
  return (
    <div className="form-wrapper">
      <form className="form form--regular" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Edit Profile</h2>
        <label htmlFor="username">Username</label>
        <input
          placeholder={userSelector.username}
          defaultValue={userSelector.username}
          type="text"
          className={
            errors?.username?.message
              ? "input input--error"
              : " input input--no-error"
          }
          name="username"
          id="username"
          {...register("username", {
            required: "This is required",
            validate: (value) => !!value.trim() || "Username is required",
            maxLength: {
              value: 20,
              message: "This username exceeds the maximum length of 20",
            },
            minLength: { value: 3, message: "This username is too short" },
          })}
        />
        <ErrorMessage errors={errors} name="username" />
        <label htmlFor="email">Email address</label>
        <input
          placeholder={userSelector.email}
          defaultValue={userSelector.email}
          type="email"
          name="email"
          className={
            errors?.email?.message
              ? "input input--error"
              : " input input--no-error"
          }
          id="email"
          {...register("email", {
            required: "This is required",
            validate: (value) => !!value.trim() || "Email is required",
          })}
        />
        <ErrorMessage errors={errors} name="email" />
        <label htmlFor="new-password">Password</label>
        <input
          placeholder="New password"
          type="password"
          className={
            errors?.password?.message
              ? "input input--error"
              : " input input--no-error"
          }
          name="new-password"
          id="new-password"
          {...register("password", {
            required: "Enter/Change password",
            validate: (value) => !!value.trim() || "Password can't be empty",
            maxLength: {
              value: 40,
              message: "This password exceeds the maximum length of 40",
            },
            minLength: { value: 6, message: "This password is too short" },
          })}
        />
        <ErrorMessage errors={errors} name="password" />
        <label htmlFor="username">Avatar image(url)</label>
        <input
          placeholder={userSelector.url}
          defaultValue={userSelector.url}
          type="url"
          name="image"
          id="image"
          className={
            errors?.image?.message
              ? "input input--error"
              : " input input--no-error"
          }
          {...register("image", {
            required: "Enter URL linking to the profile",
            validate: (value) => !!value.trim() || "Enter URL linking to the profile",
          })}
        />
        <ErrorMessage errors={errors} name="image" />
        <input type="submit" value="Save" className="submit-btn input" />
      </form>
    </div>
  );
};

export default ProfilePage;
