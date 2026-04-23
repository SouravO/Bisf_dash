import React, { useState, useRef, useEffect } from "react";
import { Search, Check } from "lucide-react";

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  icon: React.ReactNode;
  options: string[];
}

export default function SearchableSelect({
  value,
  onChange,
  placeholder,
  label,
  icon,
  options,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow focus-within:border-[#2B2E7E] focus-within:ring-1 focus-within:ring-[#2B2E7E] w-full"
    >
      <div className="bg-[#dce4ff] py-3 px-4 rounded-t-2xl">
        {icon}
      </div>
      <div className="p-4">
        <label className="block font-semibold text-slate-800 mb-2 text-sm">
          {label}
        </label>
        <div
          className="w-full text-sm text-slate-600 cursor-pointer flex justify-between items-center py-3 px-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors min-h-[44px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={value ? "text-slate-800" : "text-slate-400"}>
            {value || placeholder}
          </span>
          <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm py-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="overflow-y-auto flex-grow max-h-48">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-3 hover:bg-[#dce4ff] cursor-pointer text-sm text-slate-700 flex justify-between items-center transition-colors min-h-[44px]"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    {option}
                    {value === option && (
                      <Check className="w-4 h-4 text-[#2B2E7E]" />
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-slate-400 italic">
                  No matches found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
