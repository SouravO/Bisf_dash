import React, { useState, useRef, useEffect } from "react";
import { Search, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string; // Keep label in props for accessibility or future use, but hide redundant one
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
    <div ref={dropdownRef} className="relative w-full group">
      <div
        className={`w-full flex items-center gap-3 px-4 py-4 bg-slate-950/50 border transition-all duration-300 cursor-pointer rounded-2xl ${
          isOpen 
            ? "border-cyan-400 ring-1 ring-cyan-400/20" 
            : "border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
        <div className="flex-grow overflow-hidden">
          <span className={`block truncate text-sm font-medium ${value ? "text-white" : "text-slate-500"}`}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : ""}`} 
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[100] left-0 right-0 mt-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col backdrop-blur-xl"
          >
            <div className="p-3 border-b border-slate-800 flex items-center gap-2 bg-slate-950/50">
              <Search className="w-4 h-4 text-cyan-400/70" />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm py-1 text-white placeholder:text-slate-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="overflow-y-auto flex-grow max-h-60 scrollbar-thin scrollbar-thumb-slate-800">
              {filteredOptions.length > 0 ? (
                <div className="py-2">
                  {filteredOptions.map((option) => (
                    <motion.div
                      key={option}
                      whileHover={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                      className="px-4 py-3 cursor-pointer text-sm text-slate-300 flex justify-between items-center transition-colors"
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <span className={value === option ? "text-cyan-400 font-semibold" : ""}>
                        {option}
                      </span>
                      {value === option && (
                        <Check className="w-4 h-4 text-cyan-400" />
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-slate-500 italic">No matches found</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
