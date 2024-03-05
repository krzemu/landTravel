import React, { forwardRef } from "react";

export default forwardRef(function Box({ name, urlTag }, ref) {
  return (
    <div className="w-max h-max box" ref={ref}>
      <div
        className="w-32 h-32 border border-white/40 px-4 text-center rounded-xl text-xl flex text-slate-200 justify-center items-center cursor-pointer transition hover:-translate-y-4 hover:rotate-[15deg] hover:scale-110 hover:border-white/80 hover:text-slate-50 hover:bg-slate-900 active:scale-105 active:rotate-[7deg] active:-translate-y-2 select-none backdrop-blur-xl"
        data-tab={urlTag}>
        {name}
      </div>
    </div>
  );
});
