type PropsType = {
  secret: string;
  guess: string[];
};

type PropsWordType = {
  word: string;
  guess: string[];
};

type LetterProps = {
  letter: string;
};

function SecretWord({ secret, guess }: PropsType) {
  return (
    <div className="secret">
      {secret.split(" ").map((word, wordIndex) => (
        <Word key={wordIndex} word={word} guess={guess} />
      ))}
    </div>
  );
}

function Word({ word, guess }: PropsWordType) {
  return (
    <div className="secret-word">
      {word
        .split("")
        .map((letter, letterIndex) =>
          guess.includes(letter) ? (
            <Letter key={letterIndex} letter={letter} />
          ) : (
            <EmptyLetter key={letterIndex} />
          )
        )}
    </div>
  );
}

function Letter({ letter }: LetterProps) {
  return <span className="letter">{letter}</span>;
}

function EmptyLetter() {
  return <span className="empty-letter">-</span>;
}

export default SecretWord;
