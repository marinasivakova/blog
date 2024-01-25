import { Link, useNavigate, useParams } from "react-router-dom";
import OriginalPoster from "../poster/poster";
import "./articleHeader.css";
import { useEffect } from "react";

const ArticleHeader = ({ description, author, likes, date, tags,title,slug }) => {
  let jsxTags = tags.map((tag,id)=>{
    return <div className="article__tag" key={tag+id}>{tag}</div>
  })
  let path = useParams() ;
  const navigate = useNavigate();
  useEffect(() => {
    if ("*" in path) {
      navigate("/");
    }
  }, [path, navigate]);

  return (
    <div className="article__header">
      <div className="article__header--left">
        <div className="article__title-wrapper">
          <Link to={`articles/${slug}`} className="article__title">{title}</Link>
          <div className="article__likes">
            <button>♡</button>
            <span>{likes}</span>
          </div>
        </div>
        <div className="article__tags">
          {jsxTags}
        </div>
        <div className="article__description">
          {description}
        </div>
      </div>
      <OriginalPoster author={author} date={date}/>
    </div>
  );
};

export default ArticleHeader;
