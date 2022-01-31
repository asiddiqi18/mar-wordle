// Create a request variable and assign a new XMLHttpRequest object to it.
import {key} from "./credentials";

function isWord(word) {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${word}/pertainsTo`, false);
  xhr.setRequestHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", key);
  
  xhr.send(data);

  return xhr.status == 200
}

export { isWord };

