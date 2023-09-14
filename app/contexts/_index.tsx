import { createContext } from "react";

import words from "../../public/assets/words.json"
import type { Action, GameState } from "~/types/_index";

export const GameContext = createContext<any>(null);

export function GameContextReducer(
  state: GameState,
  action: Action,
) {
  switch (action.type) {
    case 'UPDATE_THEME':
      return { ...state, theme: action.payload };
    case 'UPDATE_INPUT':

      let newInput: string = state.input + action.payload;

      if (state.attempts.includes(state.word)) return state;

      if (action.payload === 'BACKSPACE') {
        return { ...state, input: state.input.slice(0, -1) };
      }

      if (action.payload === 'ENTER') {

        if (state.word === state.input) {
          //! This means the game ended by winnning
          localStorage.setItem('wins', (state.wins + 1).toString());
          localStorage.setItem('attempts', JSON.stringify([...state.attempts, state.input]));

          return {
            ...state,
            input: '',
            finished: true,
            endedBy: { success: true, attempts: false, timeout: false },
            attempts: [...state.attempts, state.input],
            wins: state.wins + 1,
          };

        } else if (words.includes(state.input)) {

          if (state.attempts.length === 4) {
            //! This means the game ended by attempts
            localStorage.setItem('attempts', JSON.stringify([...state.attempts, state.input]));
            return {
              ...state,
              input: '',
              finished: true,
              endedBy: { success: false, attempts: true, timeout: false },
              attempts: [...state.attempts, state.input]
            };
          }

          if (state.attempts.length < 5) {
            localStorage.setItem('attempts', JSON.stringify([...state.attempts, state.input]));
            return { ...state, input: '', attempts: [...state.attempts, state.input] };
          }
        }
      }

      if (newInput.length > 5 || state.attempts.length === 5) {
        return state;
      } else {
        return { ...state, input: newInput };
      }
    case 'UPDATE_WINS':
      return { ...state, wins: action.payload };
    case 'UPDATE_ATTEMPTS':
      return { ...state, attempts: action.payload };
    case 'UPDATE_WORD':
      return { ...state, word: action.payload };
    case 'UPDATE_LETTERS':

      if (action.payload.status === 3 && !state.correctLetters.includes(action.payload.letter)) {
        return { ...state, input: '', correctLetters: [...state.correctLetters, action.payload.letter] };
      }

      if (action.payload.status === 2 && !state.misplacedLetters.includes(action.payload.letter)) {
        return { ...state, input: '', misplacedLetters: [...state.misplacedLetters, action.payload.letter] };
      }

      if (action.payload.status === 1 && !state.missingLetters.includes(action.payload.letter)) {
        return { ...state, input: '', missingLetters: [...state.missingLetters, action.payload.letter] };
      }

      return state;
    case 'RESET':
      localStorage.setItem('attempts', JSON.stringify([]));
      if (state.attempts.length < 5 && !state.attempts.includes(state.word)) {
        //! This means the game ended by timeout
        return {
          ...state,
          input: '',
          finished: true,
          endedBy: { success: false, attempts: false, timeout: true },
          attempts: [], correctLetters: [], misplacedLetters: [], missingLetters: []
        };
      }
      return { ...state, input: '', finished: false, attempts: [], correctLetters: [], misplacedLetters: [], missingLetters: [] };
    case 'UPDATE_FINISHED':
      return { ...state, input: '', finished: !state.finished };
    case 'UPDATE_TIME':
      return { ...state, input: '', endTime: action.payload };
    case 'UPDATE_WORDS':
      return { ...state, input: '', previousWords: [...state.previousWords, action.payload] };
    case 'RESTORE_WORDS':
      return { ...state, input: '', previousWords: action.payload };
    default:
      return state;
  }
}