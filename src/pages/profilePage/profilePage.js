import { ErrorMessage } from "@hookform/error-message";
import "../signUpPage/signUpPage.css";
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
          className="input"
          name="username"
          id="username"
          required
          {...register("username", {
            required: true,
            maxLength: {
              value: 20,
              message: "This username exceeds the maximum length of 20",
            },
            minLength: { value: 3, message: "This username is too short" },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
        <label htmlFor="email">Email address</label>
        <input
          placeholder={userSelector.email}
          defaultValue={userSelector.email}
          type="email"
          name="email"
          className="input"
          id="email"
          required
          {...register("email", {
            required: true,
          })}
        />
        <label htmlFor="new-password">Password</label>
        <input
          placeholder="New password"
          type="password"
          className="input"
          name="new-password"
          id="new-password"
          required
          {...register("password", {
            required: "Enter password",
            maxLength: {
              value: 40,
              message: "This password exceeds the maximum length of 40",
            },
            minLength: { value: 6, message: "This password is too short" },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
        <label htmlFor="username">Avatar image(url)</label>
        <input
          placeholder={userSelector.url}
          defaultValue={userSelector.url}
          type="url"
          name="image"
          id="image"
          className="input"
          required
          {...register("image", { required: "Enter URL link" })}
        />
        <input type="submit" value="Save" className="submit-btn input" />
      </form>
    </div>
  );
};

export default ProfilePage;
