import type { GameState } from "~/types/_index";
import { GameContext } from "~/contexts/_index";
import GamePiece from "./GamePiece";
import { useContext } from "react";

export default function GameRow(props: {
  attempt?: string;
  input?: string;
  id?: number;
}) {

  const { state }: { state: GameState } = useContext(GameContext);

  const isItGreen = (i: number) => {
    return props.attempt!.charAt(i) === state.word.charAt(i)
  }

  const isItOrange = (i: number) => {
    let isOrange: boolean = false;
    let str: string = state.word;
    let indices: number[] = [];

    // check if its is somewhere in the word
    if (state.word.includes(props.attempt!.charAt(i))) {
      // get all the position where it is
      for (var j = 0; j < str.length; j++) {
        if (state.word.charAt(j) === props.attempt!.charAt(i))
          indices.push(j);
      }

      // check there is at least one that isn't correct yet
      for (const index of indices) {
        if (state.word.charAt(index) !== props.attempt!.charAt(index)) {
          isOrange = true;
        }
      }
    }

    return isOrange;
  }

  return (
    props.attempt ? (
      <div className="flex flex-row space-x-2 duration-250">
        {[...Array(5)].map((_, i) => <GamePiece
          letter={props.attempt!.charAt(i)}
          status={
            isItGreen(i) ? 3 : (
              isItOrange(i) ? 2 : 1
            )
          }
          key={i}
          className={`flip${i + 1}`}
        />)}
      </div >
    ) : (
      <div className="flex flex-row space-x-2 duration-250 transition-colors	">
        {props.id === state.attempts.length || props.id === 0 ? <GamePiece letter={props.input!.charAt(0)} /> : <GamePiece />}
        {props.id === state.attempts.length || props.id === 0 ? <GamePiece letter={props.input!.charAt(1)} /> : <GamePiece />}
        {props.id === state.attempts.length || props.id === 0 ? <GamePiece letter={props.input!.charAt(2)} /> : <GamePiece />}
        {props.id === state.attempts.length || props.id === 0 ? <GamePiece letter={props.input!.charAt(3)} /> : <GamePiece />}
        {props.id === state.attempts.length || props.id === 0 ? <GamePiece letter={props.input!.charAt(4)} /> : <GamePiece />}
      </div >
    )
  );
}
