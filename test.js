const express = require('express');
const multer  = require('multer');
const axios = require('axios');
const router = express.Router();
const upload = multer();


const getInfo = async(url) => {
  const resultRegion = await axios.get(url);
  const countryArr = resultRegion.data.map((country) => {
    return {
      name: country.name.common,
      languages: Object.values(country.languages),
      population: country.population,
      currencies: Object.keys(country.currencies)[0],
      flagUrl: country.flags.png,
    }
  })
  return countryArr
}


const createHTML = async (element, ress) => {
	// console.log(element)
	return ress.send(`					
		<div class="country-card">		
			<img src= ${element.flagUrl} alt="" tabindex=0>
			<div class="country-card_list">          
        <p class="country-header">${element.name}</p>
        <p class="country-info">Languages: ${element.languages}</p>
        <p class="country-info">Population: ${element.population}</p>
        <p class="country-info">Currencies: ${element.currencies}</p>
			</div>		   
	  </div>`)
}

// const sendHTML = async (item, res) => {

// }

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.none(), async (req, res, next) => {
  const URL = `https://restcountries.com/v3.1/region/${req.body.region}`;  
  // res.send(`Hello ${URL}`)
  const tempArr = await getInfo(URL);
  tempArr.forEach(element => {
    createHTML(element, res)
    console.log(element)
  })
});

module.exports = router;
