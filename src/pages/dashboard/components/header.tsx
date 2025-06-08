import Image from "next/image";
import logoImg from "@/assets/logo-goallist.png";
import Link from "next/link";
import { Settings, User, LogOutIcon, Sparkles } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
  return (
    <nav className="flex max-w-4xl mt-6 py-4 px-6 w-full rounded-2xl justify-between relative glass border border-white/10 backdrop-blur-md">
      <div className="inline-flex justify-center items-center gap-3">
        <div className="relative">
          <Image
            alt="logo do site goal list"
            src={logoImg}
            width={36}
            height={36}
            className="drop-shadow-lg"
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-sm"></div>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Goal.List
        </span>
      </div>
      <div className="inline-flex justify-center items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-white font-medium">{name}</span>
        </div>
        <DropdownMenu />
      </div>
    </nav>
  );
}

function DropdownMenu() {
  const { logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="p-2 rounded-full glass border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-105"
      >
        <User size={20} className="text-blue-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 glass rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden">
          <Link href="/dashboard/settings">
            <div className="flex items-center px-4 py-3 hover:bg-white/5 transition-colors group">
              <Settings size={18} className="text-purple-400 group-hover:text-purple-300" />
              <span className="ml-3 text-slate-300 group-hover:text-white font-medium">Configurações</span>
            </div>
          </Link>

          <div className="border-t border-white/10"></div>

          <button 
            className="w-full flex items-center px-4 py-3 hover:bg-red-500/10 transition-colors group"
            onClick={() => logoutUser()}
          >
            <LogOutIcon size={18} className="text-red-400 group-hover:text-red-300" />
            <span className="ml-3 text-slate-300 group-hover:text-white font-medium">Sair</span>
          </button>
        </div>
      )}
    </div>
  );
}