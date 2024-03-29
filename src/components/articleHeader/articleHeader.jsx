/* eslint-disable react/forbid-prop-types */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

import OriginalPoster from 'components/poster/poster';
import connectToAPI from 'client/client';
import './articleHeader.css';

function ArticleHeader({
  description,
  author,
  likes,
  date,
  tags,
  title,
  slug,
  btns,
  favorited,
}) {
  const [toggledLikeAmount, setToggledLikeAmount] = useState(likes);
  const [toggleFavorite, setToggleFavorite] = useState(favorited);
  const jsxTags = tags.map((tag, id) => {
    const key = tag + id;
    return (
      <li className="article__tag" key={key}>
        {tag}
      </li>
    );
  });
  const path = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if ('*' in path) {
      navigate('/');
    }
  }, [path, navigate]);
  const toggleLike = () => {
    if (!document.cookie) {
      return message.error('Not authorized!');
    }
    if (toggleFavorite) {
      connectToAPI('dislike', { slug });
      setToggledLikeAmount((prevLikes) => prevLikes - 1);
    } else {
      connectToAPI('like', { slug });
      setToggledLikeAmount((prevLikes) => prevLikes + 1);
    }
    setToggleFavorite((prevToggleFavorite) => !prevToggleFavorite);
    return null;
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
              type="button"
              className={toggleFavorite ? 'likes--true' : 'likes--false'}
              onClick={toggleLike}
            >
              ❤
            </button>
            <span>{toggledLikeAmount}</span>
          </div>
        </div>
        <ul className="article__tags">{jsxTags}</ul>
        <p className="article__description">{description}</p>
      </div>
      <div className="article__header--right">
        <OriginalPoster author={author} date={date} />
        {btns}
      </div>
    </div>
  );
}

ArticleHeader.propTypes = {
  description: PropTypes.string,
  author: PropTypes.object,
  likes: PropTypes.number,
  date: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
  slug: PropTypes.string,
  btns: PropTypes.element,
  favorited: PropTypes.bool,
};

ArticleHeader.defaultProps = {
  description: 'desc',
  author: { username: 'name', image: 'url' },
  likes: 0,
  date: 'date',
  tags: [],
  title: 'title',
  slug: '',
  btns: <div />,
  favorited: false,
};

export default ArticleHeader;
