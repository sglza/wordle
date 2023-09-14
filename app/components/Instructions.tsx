import LetterPiece from "./LetterPiece";

export default function Instructions(props: {
  closeModal: any
}) {
  return (
    <>
      <h1 className="text-center text-[33px] font-extrabold">
        Cómo jugar
      </h1>
      <div className="flex flex-col space-y-4">
        <p>Adivina la palabra oculta en cinco intentos.</p>
        <p>Cada intento debe ser una palabra válida de 5 letras.</p>
        <p>Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.</p>
      </div>
      <h3 className="font-extrabold">Ejemplos</h3>

      <div className="flex self-center space-x-4">
        <LetterPiece letter="G" status={3} />
        <LetterPiece letter="A" status={0} />
        <LetterPiece letter="T" status={0} />
        <LetterPiece letter="O" status={0} />
        <LetterPiece letter="S" status={0} />
      </div>

      <p>La letra <b>G</b> está en la palabra y en la posición correcta.</p>

      <div className="flex self-center space-x-4">
        <LetterPiece letter="V" status={0} />
        <LetterPiece letter="O" status={0} />
        <LetterPiece letter="C" status={2} />
        <LetterPiece letter="A" status={0} />
        <LetterPiece letter="L" status={0} />
      </div>

      <p>La letra <b>C</b> está en la palabra pero en la posición incorrecta.</p>

      <div className="flex self-center space-x-4">
        <LetterPiece letter="C" status={0} />
        <LetterPiece letter="A" status={0} />
        <LetterPiece letter="N" status={0} />
        <LetterPiece letter="T" status={0} />
        <LetterPiece letter="O" status={1} />
      </div>

      <p>La letra <b>O</b> no está en la palabra.</p>
      <p>Puede haber letras repetidas. Las pistas son independientes para cada letra.</p>
      <p className="text-center">¡Una palabra nueva cada 5 minutos!</p>

      <button type="button"
        className="w-1/2 self-center rounded-md bg-[#6AAA64] px-3 py-2 text-[20px] font-extrabold text-white shadow-sm hover:bg-[#5F995A] duration-150"
        onClick={props.closeModal}>
        ¡JUGAR!
      </button>
    </>
  );
}
