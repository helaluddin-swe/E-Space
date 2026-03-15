import React from 'react';

interface TextLogoProps {
  variant?: 'light' | 'dark';
}

const TextLogo = ({ variant = 'light' }: TextLogoProps) => {
  // Logic to switch colors based on the background
  const isDarkBg = variant === 'dark';

  return (
    <div className="flex items-center gap-1.5 cursor-pointer select-none group">
      {/* The Styled "E" Box */}
      <div className={`
        flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
        ${isDarkBg 
          ? "bg-white group-hover:bg-blue-500 shadow-lg shadow-blue-500/20" 
          : "bg-gray-900 group-hover:bg-blue-600 shadow-lg shadow-gray-200"}
      `}>
        <span className={`text-2xl font-black italic tracking-tighter ${isDarkBg ? "text-gray-900" : "text-white"}`}>
          E
        </span>
      </div>

      {/* The Text Brand */}
      <div className="flex flex-col leading-none">
        <span className={`text-2xl font-black tracking-tight transition-colors ${isDarkBg ? "text-white" : "text-gray-900"}`}>
          Space<span className="text-blue-600">.</span>
        </span>
        <span className={`text-[9px] uppercase tracking-[0.25em] font-bold mt-0.5 transition-colors ${isDarkBg ? "text-gray-500" : "text-gray-400"}`}>
          Premium Hub
        </span>
      </div>
    </div>
  );
};

export default TextLogo;