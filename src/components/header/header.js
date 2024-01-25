import './header.css'

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <h3 className='blog-title'>Realworld blog</h3>
      </div>
      <div className="header-right">
        <button className='btn'>Sign In</button>
        <button className='btn btn--green'>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
