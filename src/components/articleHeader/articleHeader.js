import { Link, useNavigate, useParams } from "react-router-dom";
import OriginalPoster from "../poster/poster";
import "./articleHeader.css";
import { useEffect, useState } from "react";
import connectToAPI from "../../client/client";

const ArticleHeader = ({
  description,
  author,
  likes,
  date,
  tags,
  title,
  slug,
  btns,
  favorited,
}) => {
  let [toggledLikeAmount, setToggledLikeAmount] = useState(likes);
  let [toggleFavorite, setToggleFavorite] = useState(favorited);
  let jsxTags = tags.map((tag, id) => {
    return (
      <div className="article__tag" key={tag + id}>
        {tag}
      </div>
    );
  });
  let path = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if ("*" in path) {
      navigate("/");
    }
  }, [path, navigate]);
  const toggleLike = () => {
    if (toggleFavorite) {
      connectToAPI("dislike", { slug: slug });
      setToggledLikeAmount((likes)=>likes - 1);
    } else {
      connectToAPI("like", { slug: slug });
      setToggledLikeAmount((likes)=>likes + 1);
    }
    setToggleFavorite((toggleFavorite)=>!toggleFavorite);
  };
  return (
    <div className="article__header">
      <div className="article__header--left">
        <div className="article__title-wrapper">
          <Link to={`articles/${slug}`} className="article__title">
            {title}
          </Link>
          <div className="article__likes">
            <button
              className={toggleFavorite ? "likes--true" : "likes--false"}
              onClick={toggleLike}
            >
              ❤
            </button>
            <span>{toggledLikeAmount}</span>
          </div>
        </div>
        <div className="article__tags">{jsxTags}</div>
        <div className="article__description">{description}</div>
      </div>
      <div className="article__header--right">
        <OriginalPoster author={author} date={date} />
        {btns}
      </div>
    </div>
  );
};

export default ArticleHeader;
