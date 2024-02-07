import axios from 'axios';

export default async function connectToAPI(type, argument) {
  const url = 'https://blog.kata.academy/api/';
  let auth;
  if (document.cookie) {
    auth = `Token ${document.cookie.match(/=(.*)/gm).toString().slice(1)}`;
  }
  switch (type) {
    case 'articles':
      if (argument) {
        return axios(`${url}articles?limit=5&&offset=${argument * 5}`, {
          headers: { Authorization: auth },
        })
          .then((r) => r.data.articles)
          .catch((err) => err);
      }
      return axios(`${url}articles?limit=5`, {
        headers: { Authorization: auth },
      })
        .then((r) => r.data.articles)
        .catch((err) => err);

    case 'article':
      return axios(`${url}/articles/${argument}`, {
        headers: { Authorization: auth },
      })
        .then((r) => r.data.article)
        .catch((err) => err);
    case 'new-article':
      return axios
        .post(
          `${url}articles`,
          {
            article: {
              title: argument.title,
              description: argument.description,
              body: argument.body,
              tagList: argument.tagList,
            },
          },
          {
            headers: {
              Authorization: auth,
              'Content-Type': 'application/json',
            },
          },
        )
        .catch((err) => err);
    case 'update-article':
      return axios
        .put(
          `${url}articles/${argument.slug}`,
          {
            article: {
              title: argument.title,
              description: argument.description,
              body: argument.body,
              tagList: argument.tagList,
            },
          },
          {
            headers: {
              Authorization: auth,
              'Content-Type': 'application/json',
            },
          },
        )
        .catch((err) => err);
    case 'delete-article':
      return axios
        .delete(`${url}articles/${argument.slug}`, {
          headers: {
            Authorization: auth,
            'Content-Type': 'application/json',
          },
        })
        .then((r) => r)
        .catch((err) => err);
    case 'new-user':
      return axios
        .post(`${url}users`, {
          user: {
            username: argument.username,
            email: argument.email,
            password: argument.password,
          },
        })
        .then((r) => r.data.user)
        .catch((err) => err);
    case 'login':
      return axios
        .post(`${url}users/login`, {
          user: { email: argument.email, password: argument.password },
        })
        .then((r) => r.data.user)
        .catch((err) => err);
    case 'user':
      return axios
        .get(`${url}user`, { headers: { Authorization: auth } })
        .then((r) => r.data.user)
        .catch((err) => err);
    case 'update-user':
      return axios
        .put(
          `${url}user`,
          {
            user: {
              username: argument.username,
              email: argument.email,
              password: argument.password,
              image: argument.image,
            },
          },
          {
            headers: {
              Authorization: auth,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((r) => r.data.user)
        .catch((err) => err);
    case 'like':
      return axios.post(`${url}articles/${argument.slug}/favorite`, null, {
        headers: { Authorization: auth },
      });
    case 'dislike':
      return axios.delete(`${url}articles/${argument.slug}/favorite`, {
        headers: { Authorization: auth },
      });
    default:
      return axios(`${url}articles`)
        .then((r) => r.data.articles)
        .catch((err) => err);
  }
}
