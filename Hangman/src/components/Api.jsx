const fetchRandomWord = async () => {
  try {
    const response = await fetch(
      "https://random-word-api.vercel.app/api?words=1"
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching word:", error);
    return null;
  }
};
export default fetchRandomWord;
