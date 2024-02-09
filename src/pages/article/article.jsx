import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

import Markdown from 'markdown-to-jsx';

import ArticleHeader from '../../components/articleHeader/articleHeader';
import './article.css';
import connectToAPI from '../../client/client';
import { getPage } from '../../store/clientReducer';
import Loader from '../../components/loader/loader';

function Article({ props }) {
  const articlesSelector = useSelector((s) => s.client.articles);
  const textSelector = useSelector((s) => s.client.page);
  const loggedUser = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [passingData, setPassingData] = useState(null);
  let buttonsJsx = null;

  useEffect(() => {
    setPassingData(props);
    if (slug) {
      dispatch(getPage(true));
    } else {
      dispatch(getPage(false));
    }
    if (!props) {
      if (!articlesSelector.length) {
        connectToAPI('article', slug).then((response) => {
          setPassingData(response);
        });
      }
      setPassingData(articlesSelector.filter((item) => item.slug === slug)[0]);
    }
  }, [props, slug, articlesSelector, dispatch]);

  const deleteArticle = () => {
    connectToAPI('delete-article', { slug }).then((result) => {
      const response = result.response || result;
      if (response.status >= 200 && response.status < 300) {
        message.success('Deleted!');
        navigate('/');
      } else {
        message.error('Access denied');
      }
    });
  };
  const confirm = () => deleteArticle();
  const cancel = () => message.error('Cancelled!');
  const onEdit = () => {
    if (passingData.author.username !== loggedUser.username) {
      message.error('Access denied');
    } else {
      navigate(`/articles/${slug}/edit`);
    }
  };

  if (document.cookie && slug) {
    buttonsJsx = (
      <div className="btns--editing">
        <button type="button" className="btn btn--green" onClick={onEdit}>
          Edit
        </button>
        <Popconfirm
          placement="right"
          title="Delete the article"
          description="Are you sure to delete the article?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger className="btn btn--red">
            Delete
          </Button>
        </Popconfirm>
      </div>
    );
  }

  let text = null;
  if (textSelector) {
    if (!passingData) {
      text = null;
    } else {
      text = (
        <p className="article__text">
          <Markdown>{passingData.body ? passingData.body : '' }</Markdown>
        </p>
      );
    }
  }

  if (!passingData) {
    return <Loader />;
  }

  return (
    <article className="article">
      <ArticleHeader
        description={passingData.description}
        author={passingData.author}
        likes={passingData.favoritesCount}
        date={passingData.updatedAt}
        tags={passingData.tagList}
        title={passingData.title}
        slug={passingData.slug}
        btns={buttonsJsx}
        favorited={passingData.favorited}
      />
      {text}
    </article>
  );
}

Article.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  props: PropTypes.object,
};

Article.defaultProps = {
  props: null,
};
export default Article;
