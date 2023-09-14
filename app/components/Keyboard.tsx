import Key from "./Key";

export default function Keyboard() {
  return (
    <div className="flex flex-col shrink-0 items-center justify-center space-y-1 md:space-y-2 rounded-[15px] w-full md:w-[638px] h-[135px] md:h-[215px] bg-[#f3f3f3] dark:bg-[#DADCE008] duration-150 py-6">
      <div className="flex space-x-1 md:space-x-2">
        <Key letter="Q" status={0} />
        <Key letter="W" status={0} />
        <Key letter="E" status={0} />
        <Key letter="R" status={0} />
        <Key letter="T" status={0} />
        <Key letter="Y" status={0} />
        <Key letter="U" status={0} />
        <Key letter="I" status={0} />
        <Key letter="O" status={0} />
        <Key letter="P" status={0} />
      </div>
      <div className="flex space-x-1 pl-2 md:space-x-2 md:pl-6">
        <Key letter="A" status={0} />
        <Key letter="S" status={0} />
        <Key letter="D" status={0} />
        <Key letter="F" status={0} />
        <Key letter="G" status={0} />
        <Key letter="H" status={0} />
        <Key letter="J" status={0} />
        <Key letter="K" status={0} />
        <Key letter="L" status={0} />
        <Key letter="Ñ" status={0} />
      </div>

      <div className="flex space-x-1 md:space-x-2">
        <Key letter="ENTER" status={0} />
        <Key letter="Z" status={0} />
        <Key letter="X" status={0} />
        <Key letter="C" status={0} />
        <Key letter="V" status={0} />
        <Key letter="B" status={0} />
        <Key letter="N" status={0} />
        <Key letter="M" status={0} />
        <Key letter="BACKSPACE" status={0} />
      </div>
    </div >
  );
}
