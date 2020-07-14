const { words } = require("../data/words");

const handleWord = (req, res) => {
  const id = req.params.id;
  const result = words.find((word) => {
    if (word.id === id) {
      return word;
    }
  });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).send("Error, these aren't the words you're looking for");
  }
};

const handleHangman = (req, res) => {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  let removeWord = randomWord;
  let { id, letterCount } = removeWord;
  if (id && letterCount) {
    res.status(200).json({ id, letterCount });
  } else {
    res.status(400).send("No Word to be found.");
  }
};

const handleGuess = (req, res) => {};

module.exports = { handleWord, handleHangman, handleGuess };
