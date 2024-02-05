import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/userReducer";

const Header = () => {
  const userSelector = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(updateUser({username: null, url: null, email: null}))
    document.cookie+='=; Max-Age=-99999999;';
    navigate('/sign-in')
  }
  if ( document.cookie) {
    return (<div className="header">
    <div className="header-left">
      <Link to="/" className="blog-title">Realworld blog</Link>
    </div>
    <div className="header-right">
    <button className="btn btn--green">
      <Link to="/new-article" className="link--article">
        Create article
      </Link>
      </button>
      <button className="btn">
      <Link to="/profile" className="btn--profile">
        {userSelector.username}
        <img alt="'Set profile" className="profile__img" src={userSelector.url}/>
      </Link>
      </button>
      <button className="btn btn--black" onClick={logOut}>
      <Link to="/sign-in">
        Log Out
      </Link>
      </button>
    </div>
  </div>
    )
  } else {
    return (
      <div className="header">
        <div className="header-left">
          <Link to="/" className="blog-title">Realworld blog</Link>
        </div>
        <div className="header-right header-right--un-auth">
        <button className="btn">
          <Link to="/sign-in">
            Sign In
          </Link>
          </button>
          <button className="btn btn--green btn--signup">
          <Link to="/sign-up">
            Sign Up
          </Link>
          </button>
        </div>
      </div>
    );
  }
};

export default Header;
