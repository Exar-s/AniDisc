import axios from 'axios';
import anime from './randPop.json';
const baseUrl = 'https://api.jikan.moe/v4/';

//Get Random popular from jikan api
// export const getRandom = async () => {
//   const promises = [];
//   while (promises.length < 3) {
//     const res = await axios.get(baseUrl + 'random/anime');
//     promises.push(res.data);
//   }

//   return await Promise.all(promises);
// };

//Get random popular from local json
export const getRandPopular = async () => {
  const rand = new Set();
  while (rand.size < 5) {
    rand.add(anime[Math.floor(Math.random() * 51)]);
  }
  return [...rand];
};

//Get top anime from jikan
export const getTop = async (page, limit) => {
  const res = await axios.get(
    baseUrl + `top/anime?page=${page}&limit=${limit}`
  );
  return res.data;
};

//get query string from object for jikan search
export const getSearch = async (query, page) => {
  let queryString = '';
  if (Object.keys(query).length > 0) {
    queryString = '&' + queryString;
    let index = 0;
    for (const key in query) {
      if (index === 0) {
        queryString = queryString.concat(key, '=', query[key]);
      } else {
        queryString = queryString.concat('&', key, '=', query[key]);
      }
      index++;
    }
  }
  const res = await axios.get(`https://api.jikan.moe/v4/anime?&limit=24&page=${page}` + queryString);
  return res.data;
};

//Searchbar 
export const getAnimeById = async (id) => {
  const res = await axios.get(baseUrl + `anime/${id}`);
  return res.data;
};

//Change name of anime for use as a param
export const getUrl = (animeName) => {
  animeName = animeName.split(' ').join('_');
  animeName = animeName.replace('/', '_')
  return `/anime/${animeName}`;
};

//Change Date string to only yyyy/mm/dd
export const getDate = (data) => {
  if(!data) return 'Unknown date';
  const date = data.split('T')[0];
  return date;
};


