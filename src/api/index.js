import axios from 'axios';

axios.defaults.baseURL = 'https://www.modestfun.com:8080' // 请求前缀路径

const api = {
  getArticleList (tagName = "") {
    return tagName ? axios.get(`/getArticleList?tagName=${tagName}`) :
      axios.get(`/getArticleList`)
  }
}

export default api