import jump from 'jump.js'
import { addEvent } from './utils'

export default (function() {
  let links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    let id = link.href.slice(link.href.indexOf('#'));
    addEvent('click', link, () => jump(id, { duration: 500 }));
  });

  addEvent('submit', 'form', (event) => {
    let form = new FormData(event.target);
    event.preventDefault();    
    
    fetch('https://formspree.io/email@misbilmohammed.com', {
      method: "POST",
      headers: new Headers({ "content-type": "application/json", "accept": "application/json" }),
      mode: 'no-cors',
      body: form })
    .then(res => console.log(res))
    .catch(error => console.log(error));
  })
})();