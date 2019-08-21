const el = document.querySelector('.lazy-load');
const observer = window.lozad(el); // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
observer.observe();
