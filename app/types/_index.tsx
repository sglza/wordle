export interface GameState {
  theme: string,
  input: string,
  word: string,
  finished: boolean,
  attempts: string[],
  missingLetters: string[],
  correctLetters: string[],
  misplacedLetters: string[],
  endTime: Date,
  previousWords: string[],
  endedBy: {
    success: boolean,
    timeout: boolean,
    attempts: boolean
  },
  wins: number,
}

export interface Action {
  type: string,
  payload?: any
}

export type Dispatcher = (obj: Action) => void;

export interface GameContextType {
  state: GameState,
  dispatchContext: Dispatcher
}