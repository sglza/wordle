import type { V2_MetaFunction } from "@remix-run/node";
import type { GameContextType } from "~/types/_index";
import { useContext, useEffect, useState } from "react";
import GameBoard from "~/components/GameBoard";
import Header from "~/components/Header";
import Keyboard from "~/components/Keyboard";
import { GameContext } from "~/contexts/_index";
import { useKeyPress } from "~/hooks/useKeyPress";
import Modal from "~/components/Modal";
import Stats from "~/components/Stats";
import Instructions from "~/components/Instructions";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Wordle Demo" },
    { name: "description", content: "Esta es mi prueba técnica para DD360 :)" },
  ];
};

export default function Index() {

  const { state, dispatchContext }: GameContextType = useContext(GameContext);
  const [visitorInd, setVisitorInd] = useState<boolean>(true);

  const keyPressed = useKeyPress();

  const handleThemeChange = () => {
    if (state.theme === 'light') {
      dispatchContext({ type: 'UPDATE_THEME', payload: 'dark' })
      localStorage.setItem('theme', 'dark')

    } else {
      dispatchContext({ type: 'UPDATE_THEME', payload: 'light' })
      localStorage.setItem('theme', 'light')
    }

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    dispatchContext({ type: 'UPDATE_INPUT', payload: keyPressed.toUpperCase() })
  }, [keyPressed, dispatchContext])

  useEffect(() => {
    const visitorInd = JSON.parse(localStorage.getItem('visitorInd')!);
    const theme = localStorage.getItem('theme')!;
    if (visitorInd === null) {
      setVisitorInd(false);
      localStorage.setItem('visitorInd', 'true')
    }

    dispatchContext({ type: 'UPDATE_THEME', payload: theme })

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dispatchContext]);

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] dark:bg-[#262b3c] duration-150">
      <div className="container mx-auto py-4">
        <div className="flex flex-1 flex-col h-full items-center justify-between">
          <Header theme={state.theme} handleThemeChange={handleThemeChange} showInfo={() => { setVisitorInd(false) }} />
          <GameBoard />
          <Keyboard />
        </div>

        {state.finished && (
          <Modal>
            <Stats />
          </Modal>
        )}

        {!visitorInd && (
          <Modal>
            <Instructions closeModal={() => { setVisitorInd(true) }} />
          </Modal>
        )}
      </div>
    </div>
  );
}
