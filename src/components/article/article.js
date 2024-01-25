import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Markdown from 'markdown-to-jsx'

import ArticleHeader from "../articleHeader/articleHeader";
import "./article.css";
import getArticles from "../../client/client";
import { getPage } from "../../store/clientReducer";

const Article = ({ props }) => {
  let articlesSelector = useSelector((s) => s.client.articles);
  let textSelector = useSelector((s) => s.client.page);
  let dispatch = useDispatch();

  let slug = useParams().slug;

  let [passingData, setPassingData] = useState(null);

  useEffect(() => {
    setPassingData(props)
    if (slug) {
      dispatch(getPage(true));
    } else {
      dispatch(getPage(false));
    }
    if (!props) {
      if (!articlesSelector.length) {
        getArticles("article", slug).then((response) => {
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

  let text = null;
  if (textSelector) {
    if (!passingData) {
      text = null;
    } else {
      text = <section className="article__text"><Markdown>{passingData.body}</Markdown></section>;
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
      />
      {text}
    </article>
  );
};
export default Article;
