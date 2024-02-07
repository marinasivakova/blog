import { Link } from "react-router-dom";
import "../forms.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import connectToAPI from "../../client/client";

const SignUpPage = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm();
  const onSubmit = (data) =>
    connectToAPI("new-user", data).then((r) => {
      console.log(r);
      let date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();
      document.cookie = `auth=${r.token}; expires=" + ${date};`;
    });

  return (
    <div className="form-wrapper">
      <form className="form form--regular" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Create new account</h2>
        <label htmlFor="username">Username</label>
        <input
          className={errors?.username?.message ? "input input--error" : " input input--no-error"}
          placeholder="Username"
          type="text"
          name="username"
          id="username"
          {...register("username", {
            required: "This is required.",
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
          placeholder="Email address"
          type="email"
          name="email"
          id="email"
          className={errors?.email?.message ? "input input--error" : " input input--no-error"}
          required
          {...register("email", {
            required: "This is required.",
          })}
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          className={errors?.password?.message ? "input input--error" : " input input--no-error"}
          {...register("password", {
            required: "This is required.",
            maxLength: {
              value: 40,
              message: "This password exceeds the maximum length of 40",
            },
            minLength: { value: 6, message: "This password is too short" },
          })}
        />
        <ErrorMessage errors={errors} name="password" />
        <label htmlFor="repeat-password">Repeat password</label>
        <input
          placeholder="Repeat password"
          type="password"
          name="repeat-password"
          id="repeat-password"
          className={errors?.["repeat-password"]?.message ? "input input--error" : " input input--no-error"}
          {...register("repeat-password", {
            required: "This is required.",
            validate: (value) =>
              value === getValues("password") ||
              "Repeat password should match the password",
          })}
        />
        <ErrorMessage errors={errors} name="repeat-password" />
        <hr className="separator"></hr>
        <label htmlFor="privacy" className="checkbox-text">
          <input
            type="checkbox"
            id="privacy"
            name="privacy"
            className="checkbox input"
            required
          />
          I agree to the processing of my personal information
        </label>
        <input type="submit" value="Create" className="submit-btn input" />
        <span className="redirect">
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </span>
      </form>
    </div>
  );
};

export default SignUpPage;
