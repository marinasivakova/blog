import Article from "../article/article";
import ArticlesList from "../articlesList/articlesList";
import Header from "../header/header";
import SignUpPage from "../signUpPage/signUpPage";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ArticlesList />} />
          <Route exact path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<ArticlesList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
