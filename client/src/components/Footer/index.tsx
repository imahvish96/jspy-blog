import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-500 py-2">
      <div className="flex justify-center items-center">
        <p>© {new Date().getFullYear()} JsPy. All rights reserved.</p>
      </div>
    </footer>
  );
};
