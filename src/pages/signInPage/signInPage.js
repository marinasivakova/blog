import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

import "../signUpPage/signUpPage.css";
import connectToAPI from "../../client/client";
import { useForm } from "react-hook-form";

const SignInPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const onSubmit = (data) =>
    connectToAPI("login", data).then((r) => {
      if (!r.token) {
        return null;
      }
      let date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();
      document.cookie = `auth=${r.token}; expires=" + ${date};`;
      navigate('/profile')
    });
  return (
    <div className="form-wrapper">
      <form className="form form--regular" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Sign In</h2>
        <label htmlFor="email">Email address</label>
        <input
          className="input"
          placeholder="Email address"
          type="email"
          name="email"
          id="email"
          {...register("email", {
            required: "This is required.",
            validate: (value) => !!value.trim() || "This is required.",
          })}
        />
        <ErrorMessage errors={errors} name="email" />
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          className={errors?.password?.message ? "submit-btn input input--error" : "submit-btn input input--no-error"}
          {...register("password", {
            required: "This is required.",
            validate: (value) => !!value.trim() || "This is required.",
          })}
        />
        <ErrorMessage errors={errors} name="password" />
        <span className="redirect">
          Don't have an account? <Link to="/sign-up">Sign Up</Link>.
        </span>
      </form>
    </div>
  );
};

export default SignInPage;
