import { useContext, type ChangeEventHandler } from "react";

import { GameContext } from "~/contexts/_index";
import type { Dispatcher } from "~/types/_index";

interface HeaderProps {
  showInfo: () => void;
  theme: string;
  handleThemeChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function Header({
  showInfo,
  theme,
  handleThemeChange
}: HeaderProps) {

  const { dispatchContext }: { dispatchContext: Dispatcher } = useContext(GameContext);

  return (
    <div className="flex flex-row shrink-0 items-center justify-between rounded-[15px] w-full md:w-[638px] h-[60px] md:h-[84px] bg-[#f3f3f3] dark:bg-[#DADCE008] duration-150">
      <div className="w-1/3 px-4 mt-2">
        <button onClick={() => { showInfo() }}>
          <img src={theme === 'light' ? "/assets/icons/info.svg" : "/assets/icons/info_dark.svg"} alt="Info icon" className="hover:cursor-pointer" />
        </button>
      </div>
      <div className="w-1/3 text-center font-semibold text-[20px] md:text-[40px] tracking-[3px] text-[#202537] dark:text-[#DADCE0] duration-150">
        WORDLE
      </div>
      <div className="flex flex-row justify-end items-center w-1/3 px-4 space-x-2">
        <button onClick={() => dispatchContext({ type: 'UPDATE_FINISHED' })}>
          <img src={theme === 'light' ? "/assets/icons/chart.svg" : "/assets/icons/chart_dark.svg"} alt="Chart icon" className="hover:cursor-pointer" />
        </button>
        <div className="flex flex-row items-center">
          <label>
            <input type="checkbox" checked={theme === 'light'} onChange={handleThemeChange} />
            <span className="check"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
