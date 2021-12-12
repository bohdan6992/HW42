const express = require('express');
const multer  = require('multer');
const axios = require('axios');
const router = express.Router();
const upload = multer();

const getContryesInfo = async(url) => {
  const resultRegion = await axios.get(url);
  const countryArr = resultRegion.data.map((country) => {
    return {
      name: country.name.common,
      languages: Object.values(country.languages),
      population: country.population,
      currencies: Object.keys(country.currencies),
      flagUrl: country.flags.png,
      cats: [],
    }
  })
  return countryArr
}

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

const getСombinedArr = (country, cat) => {
  country.forEach(countryEl =>{
    cat.forEach(catEl => {
      if(countryEl.name === catEl.coutryName){
        countryEl.cats.push(catEl)
      }
    })
  })
  return country
}

const createHTML = async (arr) => {
	// console.log(element)
  let cards = '';
  arr.forEach((element) => {
    const conuntriesHTML = (`					
		<div class="country-card">	
      <div class="country-header">
        <p class="country-name">${element.name}</p>	
			  <img class="flag-img" src= ${element.flagUrl} alt="" tabindex=0>
      </div>
			<div class="country-card_list">          
        <p class="country-info">Languages: ${element.languages}</p>
        <p class="country-info">Population: ${element.population}</p>
        <p class="country-info">Currencies: ${element.currencies}</p>
			</div>		   
	  </div>`)
    const catsCard = element.cats.map((item) =>{
      return `	          
      <div class="cat-info">   
        <img class="cat-img" src= ${item.catImgUrl} alt="" tabindex=0>       
        <p class="cat-mame">${item.breed}</p>
			</div>`
    })
    cards = `${cards}<div class="card">${conuntriesHTML}<div class="cats-card"> ${catsCard}</div></div>`
  })
  return cards
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.none(), async (req, res, next) => {
  const URL = `https://restcountries.com/v3.1/region/${req.body.region}`;  
  const coutryArr = await getContryesInfo(URL);
  const catsArr = await getCatsInfo();
  const combArr = await getСombinedArr(coutryArr, catsArr)
  const resultHTML = await createHTML(combArr);
  
  // console.log(cards)
  res.send(resultHTML)
});

module.exports = router;
