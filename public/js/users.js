const formEl = document.querySelector('form');
const answEl = document.querySelector('.answer');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const url = window.location.pathname.split('/');
  const data = new FormData(formEl);
  data.set('id', url[2]);
  axios.post('/users', data)
    .then((r) => {
      answEl.innerHTML = r.data;
    })
    .catch((error) => {
      console.log(error);
    });
});




 
  