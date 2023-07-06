function getElement(element) {
  return document.getElementById(element)
}

function addEvent(type, element, func) {
  if(element instanceof Element)
    element.addEventListener(type, func);
  else if(typeof element === 'string')
    getElement(element).addEventListener(type, func);
}

function toggleClasses(element, classes, condition) {
  if(element.tagName)
    element.classList.toggle(classes, condition)
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getElement, addEvent, toggleClasses, randomNumber }