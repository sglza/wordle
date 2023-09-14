import { useReducer, useEffect } from "react";

import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { GameContext, GameContextReducer } from "./contexts/_index";

import stylesheet from "~/styles/tailwind.css";
import custom from "~/styles/custom.css";
import words from "../public/assets/words.json";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: custom },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap" },
];

const minutes = 5;

export default function App() {

  const [state, dispatchContext] = useReducer(
    GameContextReducer,
    {
      theme: 'light',
      word: '',
      finished: false,
      input: '',
      attempts: [],
      missingLetters: [],
      correctLetters: [],
      misplacedLetters: [],
      endTime: new Date(),
      previousWords: [],
      endedBy: {
        success: false,
        timeout: false,
        attempts: false
      },
      wins: 0,
    }
  );

  function addMinutes(date: Date, minutes: number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  useEffect(() => {
    const storedWord: string | null = localStorage.getItem('selectedWord');
    const storedTime: string | null = localStorage.getItem('endTime');
    const storedPrevSelectedWords: string | null = localStorage.getItem('prevSelectedWords');
    const storedAttempts: string | null = localStorage.getItem('attempts');
    const storedWins: string | null = localStorage.getItem('wins');

    const getRandomWord = () => {

      const storedPrevSelectedWords: string | null = localStorage.getItem('prevSelectedWords');

      if (new Date() >= new Date(localStorage.getItem('endTime')!)) {

        if (JSON.parse(storedPrevSelectedWords!).length > 0) {
          dispatchContext({ type: 'RESET' })
        }

        let newDate: Date = addMinutes(new Date(), minutes);
        localStorage.setItem('endTime', newDate.toISOString())
        dispatchContext({ type: 'UPDATE_TIME', payload: newDate })

        const availableWords = words.filter(
          (word: string) => !localStorage.getItem('prevSelectedWords')?.includes(word)
        );

        if (availableWords.length === 0) {
          // If all fruits have been selected, reset the list of previously selected fruits
          dispatchContext({ type: 'UPDATE_WORD', payload: '' })
          dispatchContext({ type: 'RESTORE_WORDS', payload: [] })

          localStorage.setItem('prevSelectedWords', JSON.stringify([]));
          localStorage.setItem('selectedWord', '');
          getRandomWord();
        } else {
          const randomIndex = Math.floor(Math.random() * availableWords.length);
          const newWord = availableWords[randomIndex];
          dispatchContext({ type: 'UPDATE_WORD', payload: newWord })

          // Save the selected word in local storage
          localStorage.setItem('selectedWord', newWord);
          localStorage.setItem('prevSelectedWords', JSON.stringify([...JSON.parse(storedPrevSelectedWords!), newWord]));

          // Update the list of previously selected words
          dispatchContext({ type: 'UPDATE_WORDS', payload: newWord })
        }
      }

    };

    if (storedWins) {
      dispatchContext({ type: 'UPDATE_WINS', payload: JSON.parse(storedWins) })
    }

    if (storedAttempts) {
      dispatchContext({ type: 'UPDATE_ATTEMPTS', payload: JSON.parse(storedAttempts) })
      dispatchContext({ type: 'UPDATE_WORDS', payload: storedWord })
    }

    if (storedPrevSelectedWords) {
      dispatchContext({ type: 'RESTORE_WORDS', payload: JSON.parse(storedPrevSelectedWords) })
    } else {
      localStorage.setItem('prevSelectedWords', JSON.stringify([]));
    }

    if (storedWord) {
      dispatchContext({ type: 'UPDATE_WORD', payload: storedWord })
    }

    if (storedTime) {
      dispatchContext({ type: 'UPDATE_TIME', payload: new Date(storedTime) })
    } else {
      localStorage.setItem('endTime', new Date().toISOString())
    }

    // Set up an interval to select a new word every minute
    const intervalId = setInterval(getRandomWord, 100);

    return () => {
      // Clear the interval on component unmount to avoid memory leaks
      clearInterval(intervalId);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GameContext.Provider value={{ state, dispatchContext }}>
          <Outlet />
        </GameContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
