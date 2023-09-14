import type { ReactElement } from "react";

export default function Modal(props: { children: ReactElement; }) {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="flex flex-col w-full md:w-[480px] bg-[#F3F3F3] dark:bg-[#262B3C] rounded-xl text-left px-6 md:px-8 py-6 space-y-4 outline outline-1 my-8 text-[15px] dark:text-white dark:outline-[#939B9F]">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
