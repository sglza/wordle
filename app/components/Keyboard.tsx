import Key from "./Key";

export default function Keyboard() {
  return (
    <div className="flex flex-col shrink-0 items-center justify-center space-y-1 md:space-y-2 rounded-[15px] w-full md:w-[638px] h-[135px] md:h-[215px] bg-[#f3f3f3] dark:bg-[#DADCE008] duration-150 py-6">
      <div className="flex space-x-1 md:space-x-2">
        <Key letter="Q" />
        <Key letter="W" />
        <Key letter="E" />
        <Key letter="R" />
        <Key letter="T" />
        <Key letter="Y" />
        <Key letter="U" />
        <Key letter="I" />
        <Key letter="O" />
        <Key letter="P" />
      </div>
      <div className="flex space-x-1 pl-2 md:space-x-2 md:pl-6">
        <Key letter="A" />
        <Key letter="S" />
        <Key letter="D" />
        <Key letter="F" />
        <Key letter="G" />
        <Key letter="H" />
        <Key letter="J" />
        <Key letter="K" />
        <Key letter="L" />
        <Key letter="Ñ" />
      </div>

      <div className="flex space-x-1 md:space-x-2">
        <Key letter="ENTER" />
        <Key letter="Z" />
        <Key letter="X" />
        <Key letter="C" />
        <Key letter="V" />
        <Key letter="B" />
        <Key letter="N" />
        <Key letter="M" />
        <Key letter="BACKSPACE" />
      </div>
    </div>
  );
}
