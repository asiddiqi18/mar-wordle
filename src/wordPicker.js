import jsonData from './word_pool.json'; 

let listOfWords = jsonData.words

export default function getWord() {
  return listOfWords[Math.floor(Math.random()*listOfWords.length)];
}