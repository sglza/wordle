import { useContext, useEffect } from "react";
import type { Dispatcher } from "~/types/_index";
import { GameContext } from "~/contexts/_index";

export default function GamePiece(props: {
  letter?: string; status?: number; className?: string;
}) {

  const { dispatchContext }: { dispatchContext: Dispatcher } = useContext(GameContext);

  let style;

  switch (props.status) {
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
    if (props.letter && props.status) {
      dispatchContext({ type: 'UPDATE_LETTERS', payload: { letter: props.letter, status: props.status } });
    }
  }, [dispatchContext, props.letter, props.status]);

  return (
    <div className={`px-4 flex flex-row shrink-0 items-center justify-center rounded-md min-w-[55px] min-h-[55px] md:min-w-[76px] md:min-h-[76px] font-extrabold text-[35px] ${props.className} ${style}`}>
      {props.letter}
    </div >
  );
}
