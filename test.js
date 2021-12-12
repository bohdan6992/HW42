const express = require('express');
const multer  = require('multer');
const axios = require('axios');
const router = express.Router();
const upload = multer();


const getCountryInfo = async() => {
  const resultRegion = await axios.get('https://restcountries.com/v3.1/region/europe');
  const countryArr = resultRegion.data.map((country) => {
    return {
      name: country.name.common,
      languages: Object.values(country.languages),
      population: country.population,
      currencies: Object.keys(country.currencies)[0],
      flagUrl: country.flags.png,
      cats: [],
    }
  })
  return countryArr;
}
getCountryInfo();

const getCatsInfo = async () => {
  const tempArr = await axios.get('https://api.thecatapi.com/v1/breeds');
  const catArr = tempArr.data.map((catObj) => {
    return {
      coutryName: catObj.origin,
      catImgUrl: (!catObj.image) ? null : catObj.image.url,
      breed: catObj.name,
    }
  });
  return catArr;
}
getCatsInfo();

const getСombinedArr = (country, cat) => {
  country.forEach(countryEl =>{
    cat.forEach(catEl => {
      if(countryEl.name === catEl.coutryName){
        countryEl.cats.push(catEl)
        console.log(countryEl)
      }
    })
    
  })
  console.log(country)
  
}

const cuncutArr = async () => {
  const coutryArr = await getCountryInfo();
  const catsArr = await getCatsInfo();
  getСombinedArr(coutryArr, catsArr)
}
cuncutArr();

const arr = Promise.all([getCountryInfo(), getCatsInfo()]).then(r => { console.log(r[1][0])});

