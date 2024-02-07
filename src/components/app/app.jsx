import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Article from '../../pages/article/article';
import ArticlesList from '../articlesList/articlesList';
import Header from '../header/header';
import NewArticle from '../../pages/newArticle/newArticle';
import ProfilePage from '../../pages/profilePage/profilePage';
import SignInPage from '../../pages/signInPage/signInPage';
import SignUpPage from '../../pages/signUpPage/signUpPage';
import './app.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<ArticlesList />} />
          <Route exact path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/articles/:slug/edit" element={<NewArticle />} />
          <Route path="*" element={<ArticlesList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
