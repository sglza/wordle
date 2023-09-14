import { useContext, useEffect, useState } from "react";

import { GameContext } from "~/contexts/_index";
import type { GameContextType } from "~/types/_index";

export default function Key(props: { letter: string }) {

  const { state, dispatchContext }: GameContextType = useContext(GameContext);

  const [style, setStyle] = useState<string>('');

  useEffect(() => {
    if (state.correctLetters.includes(props.letter)) {
      setStyle('bg-[#6AAA64] text-white hover:bg-[#548850] dark:hover:bg-[#548850]'); // green
    } else if (state.misplacedLetters.includes(props.letter)) {
      setStyle('bg-[#CEB02C] text-white hover:bg-[#a48c23] dark:hover:bg-[#a48c23]'); // yellow
    } else if (state.missingLetters.includes(props.letter)) {
      setStyle('bg-[#56575E] text-white hover:bg-[#44454b] dark:bg-[#818181] dark:hover:bg-[#747474]'); // gray
    } else {
      setStyle('bg-[#D3D6DA] text-[#56575E] hover:bg-[#A8ABAE] hover:text-white dark:bg-[#565F7E] dark:text-white dark:hover:bg-[#4c546f]');
    }
  }, [props.letter, state.correctLetters, state.misplacedLetters, state.missingLetters])

  return (
    <button className="outline-none" onClick={() => { dispatchContext({ type: 'UPDATE_INPUT', payload: props.letter }) }}>
      {props.letter === 'BACKSPACE' ? (
        <div className={`px-3 md:px-4 flex flex-row shrink-0 items-center justify-center rounded-md min-w-[30px] min-h-[30px] md:min-w-[45px] md:min-h-[45px] duration-150 ${style}`}>
          <img src={state.theme === 'light' ? "/assets/icons/del.svg" : "/assets/icons/del_dark.svg"} alt="Delete icon" />
        </div>

      ) : (
        <div className={`px-3 md:px-4 flex flex-row shrink-0 items-center justify-center rounded-md min-h-[30px] md:min-w-[45px] md:min-h-[45px] font-extrabold text-[9px] md:text-[16px] duration-150 ${style}`}>
          {props.letter}
        </div   >
      )}
    </button>
  );
}
