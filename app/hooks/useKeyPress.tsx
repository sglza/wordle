import { useEffect, useState } from "react";

const validKeys: string[] = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm',
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M',
  'Enter', 'Backspace'
];

export const useKeyPress = (): string => {
  const [keyPressed, setKeyPressed] = useState<string>('');

  const downHandler = ({ key }: { key: string }) => {
    if (validKeys.includes(key)) setKeyPressed(key);
  };

  const upHandler = ({ key }: { key: string }) => {
    if (validKeys.includes(key)) setKeyPressed('');
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
};