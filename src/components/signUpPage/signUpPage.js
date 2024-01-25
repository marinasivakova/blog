import "./signUpPage.css";

const SignUpPage = () => {
  return (
    <div className="form-wrapper">
      <form className="signup-form">
        <h2 className="form-title">Create new account</h2>
        <label htmlFor="username">Username</label>
        <input
          placeholder="Username"
          type="text"
          name="username"
          id="username"
          required
        />
        <label htmlFor="email">Email address</label>
        <input
          placeholder="Email address"
          type="email"
          name="email"
          id="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          required
        />
        <label htmlFor="repeat-password">Repeat password</label>
        <input
          placeholder="Repeat password"
          type="password"
          name="repeat-password"
          id="repeat-password"
          required
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default SignUpPage;
