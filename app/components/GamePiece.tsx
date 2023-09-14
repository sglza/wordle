import { useContext, useEffect } from "react";

import { GameContext } from "~/contexts/_index";
import type { Dispatcher } from "~/types/_index";

interface GamePieceProps {
  letter?: string;
  status?: number;
  className?: string;
}

export default function GamePiece({
  letter,
  status,
  className
}: GamePieceProps) {

  const { dispatchContext }: { dispatchContext: Dispatcher } = useContext(GameContext);

  let style;

  switch (status) {
    case 1:
      style = 'bg-[#939B9F] text-white'; // gray
      break;
    case 2:
      style = 'bg-[#CEB02C] text-white'; // yellow
      break;
    case 3:
      style = 'bg-[#6AAA64] text-white'; // green
      break;
    default:
      style = 'bg-[#939B9F4D] text-[#56575E] dark:bg-[#939B9F33] dark:text-white'
      break;
  }

  useEffect(() => {
    if (letter && status) {
      dispatchContext({ type: 'UPDATE_LETTERS', payload: { letter: letter, status: status } });
    }
  }, [dispatchContext, letter, status]);

  return (
    <div className={`px-4 flex flex-row shrink-0 items-center justify-center rounded-md min-w-[55px] min-h-[55px] md:min-w-[76px] md:min-h-[76px] font-extrabold text-[35px] ${className} ${style}`}>
      {letter}
    </div>
  );
}
