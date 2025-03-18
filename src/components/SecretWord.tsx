import useHangman from "../hooks/useHangman";

type PropsWordType = {
  word: string;
  guess: string[];
};

type LetterProps = {
  letter: string;
};

function SecretWord() {
  const { state } = useHangman();

  return (
    <div className="secret">
      {state.secret.split(" ").map((word, wordIndex) => (
        <Word key={wordIndex} word={word} guess={state.guess} />
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
