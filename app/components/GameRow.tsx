import { useContext } from "react";

import { GameContext } from "~/contexts/_index";
import type { GameState } from "~/types/_index";
import GamePiece from "./GamePiece";

interface GameRowProps {
  attempt?: string;
  input?: string;
  id?: number;
}

export default function GameRow({
  attempt,
  input,
  id
}: GameRowProps) {

  const { state }: { state: GameState } = useContext(GameContext);

  const isItGreen = (i: number) => {
    return attempt?.charAt(i) === state.word.charAt(i)
  }

  const isItOrange = (i: number) => {
    let isOrange: boolean = false;
    let indices: number[] = [];

    // check if its is somewhere in the word
    if (state.word.includes(attempt!.charAt(i))) {
      // get all the position where it is
      for (const index of state.word.split("").keys()) {
        if (state.word.charAt(index) === attempt?.charAt(i))
          indices.push(index);
      }

      // check there is at least one that isn't correct yet
      for (const index of indices) {
        if (state.word.charAt(index) !== attempt?.charAt(index)) {
          isOrange = true;
        }
      }
    }

    return isOrange;
  }

  return (
    attempt ? (
      <div className="flex flex-row space-x-2 duration-250">
        {[...Array(5)].map((_, i) => <GamePiece
          letter={attempt?.charAt(i)}
          status={
            isItGreen(i) ? 3 : (
              isItOrange(i) ? 2 : 1
            )
          }
          key={i}
          className={`flip${i + 1}`}
        />)}
      </div>
    ) : (
      <div className="flex flex-row space-x-2 duration-250 transition-colors	">
        {id === state.attempts.length || id === 0 ? (
          <>
            <GamePiece letter={input?.charAt(0)} />
            <GamePiece letter={input?.charAt(1)} />
            <GamePiece letter={input?.charAt(2)} />
            <GamePiece letter={input?.charAt(3)} />
            <GamePiece letter={input?.charAt(4)} />
          </>
        ) : (
          <>
            <GamePiece />
            <GamePiece />
            <GamePiece />
            <GamePiece />
            <GamePiece />
          </>
        )}
      </div>
    )
  );
}
