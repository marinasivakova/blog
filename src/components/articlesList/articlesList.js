import "../article/article.css";
import "./articlesList.css";
import React, { useEffect } from "react";
import { Pagination } from "antd";
import getArticles from "../../client/client";
import { useDispatch, useSelector } from "react-redux";
import { updateClient } from "../../store/clientReducer";
import Article from "../article/article";
import { Outlet } from "react-router-dom";

const ArticlesList = () => {
  const processPageChange = (e) => {
    getArticles("articles",e).then((response) => {
      dispatch(updateClient(response));
    });
  };
  let articlesSelector = useSelector((s) => s.client.articles);
  const dispatch = useDispatch();
  useEffect(() => {
    getArticles("articles").then((response) => {
      dispatch(updateClient(response));
    });
  }, [dispatch]);
  let jsxListOfArticles = articlesSelector.map((article) => {
    return <Article props={article} key={article.slug} />;
  });
  return (
    <>
      {jsxListOfArticles}{" "}
      <Pagination onChange={processPageChange} total={500} />
      <Outlet />
    </>
  );
};
export default ArticlesList;
