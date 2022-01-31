import jsonData from './word_pool.json'; 

let listOfWords = jsonData.words
let setOfWords = new Set(listOfWords)

function getWord() {
  return listOfWords[Math.floor(Math.random()*listOfWords.length)];
}

export {getWord}