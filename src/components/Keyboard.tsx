const letter_array: string[] = [
  "a",
  "ą",
  "b",
  "c",
  "ć",
  "d",
  "e",
  "ę",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "ł",
  "m",
  "n",
  "ń",
  "o",
  "ó",
  "p",
  "q",
  "r",
  "s",
  "ś",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "ź",
  "ż",
];

type PropsType = {
  onGuess: (letter: string) => void;
  guess: string[];
};

function Keyboard({ onGuess, guess }: PropsType) {
  return (
    <div className="keyboard">
      {letter_array.map((letter, i) =>
        guess.includes(letter.toUpperCase()) ? (
          <div className="selected" key={i}>
            {letter.toUpperCase()}
          </div>
        ) : (
          <div key={i} onClick={() => onGuess(letter.toUpperCase())}>
            {letter.toUpperCase()}
          </div>
        )
      )}
    </div>
  );
}

export default Keyboard;
