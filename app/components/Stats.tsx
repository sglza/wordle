import { useContext } from "react";
import { GameContext } from "~/contexts/_index";
import { useCountdown } from "~/hooks/useCountdown";
import type { GameContextType } from "~/types/_index";

export default function Stats() {

  const { state, dispatchContext }: GameContextType = useContext(GameContext);
  const { minutes, seconds } = useCountdown(state.endTime);

  return (
    <>
      <h1 className="text-center text-[33px] font-extrabold">
        Estadísticas
      </h1>

      <div className="flex flex-row justify-between px-8 py-2">
        <div className="text-center">
          <div className="font-bold text-[35px]">
            {state.endedBy.success ? (
              state.previousWords.length
            ) : (
              state.previousWords.length - 1
            )}
          </div>
          <div className="text-[21px]">Jugadas</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-[35px]">{state.wins}</div>
          <div className="text-[21px]">Victorias</div>
        </div>
      </div>

      <h3 className="text-center text-[19px] pt-4">La palabra era: {" "}
        <b>
          {state.endedBy.success || state.endedBy.attempts ? (
            state.previousWords[state.previousWords.length - 1]
          ) : (
            state.previousWords[state.previousWords.length - 2]
          )}
        </b>
      </h3>

      <div>
        <h3 className="text-center text-[19px] pt-4">SIGUIENTE PALABRA</h3>
        <div className="font-bold text-center text-[24px] pb-8">{minutes}:{seconds}</div>
      </div>

      <button type="button" className="w-1/2 self-center rounded-md bg-[#6AAA64] px-3 py-2 text-[20px] font-extrabold text-white shadow-sm hover:bg-[#5F995A] duration-150" onClick={() => dispatchContext({ type: 'UPDATE_FINISHED' })}>Aceptar</button>
    </>
  );
}
