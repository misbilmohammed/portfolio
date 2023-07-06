import { getElement, addEvent, randomNumber } from './utils'
import Clipboard from 'clipboard'

const quotes = [];
const quote = getElement('quote');
const author = getElement('author');

function nextQuote(response) {
	let url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=nextQuote&key=' + randomNumber(0, 999999);
	let script = getElement('quoteLink');

	if(response) {
		if(response.quoteLink) {
			quotes.push(response);
			if(!quote.innerText) showQuote();
		}	else if(quotes.length > 0) {			
			showQuote();
		}
	}	
	
	if(quotes.length < 5) {
		if(script) {
			document.body.removeChild(script);
			script = null;
		}

		script = document.createElement('script');
		script.src = url;
		script.setAttribute("id", "quoteLink");
		document.body.appendChild(script);
	}
}

function showQuote(params) {
	quote.classList.add('fadeIn');
	author.classList.add('fadeIn');

	quote.textContent = quotes[0].quoteText.trim();
	author.textContent = quotes[0].quoteAuthor.trim();
	quotes.shift();

	updateTweetUrl();

	setTimeout(() => {
		quote.classList.remove('fadeIn');
		author.classList.remove('fadeIn');
	}, 500);
}

function updateTweetUrl() {
	let url = 'https://twitter.com/intent/tweet?';

	url += 'text=' + encodeURIComponent(formatQuote());
	document.getElementById('tweetQuote').setAttribute('href', url);
}

function formatQuote() {
	return '"' + quote.textContent + '"' + (author.textContent ? ' - ' + author.textContent : '')
}

export default (function() {
	if(quote) {
		window.nextQuote = nextQuote;
		nextQuote();	
		addEvent('click', 'nextQuote', nextQuote);
		new Clipboard('#copyQuote', {
			text: function(trigger) {
					return formatQuote()
			}
		});
	}
})();