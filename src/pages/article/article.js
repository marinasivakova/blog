import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { Button, message, Popconfirm } from "antd";

import Markdown from "markdown-to-jsx";

import ArticleHeader from "../../components/articleHeader/articleHeader";
import "./article.css";
import connectToAPI from "../../client/client";
import { getPage } from "../../store/clientReducer";

const Article = ({ props }) => {
  let articlesSelector = useSelector((s) => s.client.articles);
  let textSelector = useSelector((s) => s.client.page);
  let dispatch = useDispatch();

  let slug = useParams().slug;

  let [passingData, setPassingData] = useState(null);

  useEffect(() => {
    setPassingData(props);
    if (slug) {
      dispatch(getPage(true));
    } else {
      dispatch(getPage(false));
    }
    if (!props) {
      if (!articlesSelector.length) {
        connectToAPI("article", slug).then((response) => {
          setPassingData(response);
        });
      }
      setPassingData(
        articlesSelector.filter((item) => {
          return item.slug === slug;
        })[0]
      );
    }
  }, [props, slug, articlesSelector, dispatch]);
  let buttonsJsx = null;

  const deleteArticle = () => {
    connectToAPI("delete-article", { slug: slug }).then((result)=>{
      let response = result.response || result;
      if (response.status >= 200 && response.status < 300) {
        message.success("Deleted!");
      } else {
        message.error("Access denied");
      }
    });
  };
  const confirm = () => {
    deleteArticle()
  };
  const cancel = () => {
    message.error("Cancelled!");
  };
  if (document.cookie && slug) {
    buttonsJsx = (
      <div className="btns--editing">
        <button className="btn btn--green">
          <Link to={`/articles/${slug}/edit`}>Edit</Link>
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
          <Button danger className="btn btn--red">Delete</Button>
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
        <section className="article__text">
          <Markdown>{passingData.body}</Markdown>
        </section>
      );
    }
  }
  while (!passingData) {
    return null;
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
};
export default Article;
