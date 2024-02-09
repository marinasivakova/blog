import '../../pages/article/article.css';
import './articlesList.css';
import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import connectToAPI from '../../client/client';
import { updateClient } from '../../store/clientReducer';
import Article from '../../pages/article/article';

function ArticlesList() {
  const articlesSelector = useSelector((s) => s.client.articles);
  const dispatch = useDispatch();
  const processPageChange = (e) => {
    connectToAPI('articles', e).then((response) => {
      dispatch(updateClient(response));
    });
  };
  useEffect(() => {
    connectToAPI('articles').then((response) => {
      dispatch(updateClient(response));
    });
  }, [dispatch]);
  // eslint-disable-next-line max-len
  const jsxListOfArticles = articlesSelector.map((article) => (
    <Article props={article} key={article.slug} />
  ));
  return (
    <>
      {jsxListOfArticles}
      {' '}
      <Pagination onChange={processPageChange} showSizeChanger={false} total={500} />
      <Outlet />
    </>
  );
}
export default ArticlesList;
