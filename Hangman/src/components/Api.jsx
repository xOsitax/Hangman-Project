// Api.js
const fetchRandomWord = async () => {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1"
    );
    const data = await response.json();
    return data[0].toUpperCase(); // returns the word in uppercase
  } catch (error) {
    console.error("Error fetching word:", error);
    return null;
  }
};

export default fetchRandomWord;
