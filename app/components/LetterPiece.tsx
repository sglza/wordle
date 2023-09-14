interface LetterPieceProps {
  letter: string;
  status: number;
}

export default function LetterPiece({
  letter,
  status
}: LetterPieceProps) {

  let style;

  switch (status) {
    case 1:
      style = ' bg-[#939B9F] '; // gray
      break;
    case 2:
      style = ' bg-[#CEB02C] '; // yellow
      break;
    case 3:
      style = ' bg-[#6AAA64] '; // green
      break;
    default:
      style = ' bg-none outline outline-1 dark:outline-[#939B9F] '
      break;
  }

  return (
    <div className={`flex items-center justify-center rounded-md w-[50px] h-[50px] md:w-[60px] md:h-[60px] font-extrabold text-[25px] md:text-[30px] ${style}`}>
      {letter}
    </div>
  );
}
