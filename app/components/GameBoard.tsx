import type { GameState } from "~/types/_index";
import { GameContext } from "~/contexts/_index";
import GameRow from "./GameRow";
import { useContext } from "react";

export default function GameBoard() {

  const { state }: { state: GameState } = useContext(GameContext);

  return (
    <div className="flex flex-col shrink-0 items-center space-y-2 rounded-[15px] w-full md:w-[638px] duration-150 p-8">
      {
        state.attempts.map((attempt: string, i: number) =>
          <GameRow attempt={attempt} key={i} />
        )
      }
      {
        [...Array(5 - state.attempts.length)].map((_, i) =>
          <GameRow input={state.input} id={i + state.attempts.length} key={i} />
        )
      }
    </div >
  );
}
