import axios from "axios"

const getArticles = async function (value,offset) {
    const url = 'https://blog.kata.academy/api/';
    switch (value) {
        case 'articles': 
        if (offset) {
            return axios(url+`/articles?limit=5&&offset=${offset*5}`,).then((r)=>{
                return r.data.articles
            })
        } else {
            return axios(url+'/articles?limit=5',).then((r)=>{
                return r.data.articles
            })
        }
        case 'article':
            return axios(url+`/articles/${offset}`,).then((r)=>{
                return r.data.article
            })
        default: return axios(url+'/articles').then((r)=> {
            return r.data.articles;
        })
    }
}
export default getArticles;