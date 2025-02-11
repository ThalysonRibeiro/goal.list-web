import Image from "next/image";
import logoImg from "@/assets/logo-goallist.png";
import Link from "next/link";
import { Settings, User, LogOutIcon } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContex } from "@/context/AuthContext";

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {

  return (
    <nav className="flex max-w-3xl mt-3 py-3 px-2 w-full rounded-full justify-between relative border border-zinc-800">
      <div className="inline-flex justify-center items-center gap-2">
        <Image
          alt="logo do site goal list"
          src={logoImg}
          width={30}
          height={30}
        />
        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Goal.List
        </span>
      </div>
      <div className="inline-flex justify-center items-center gap-3">
        <p>{name}</p>
        <DropdownMenu />
      </div>
    </nav>
  );
}

function DropdownMenu() {
  const { logoutUser } = useContext(AuthContex);

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

      <button onClick={toggleDropdown}>
        <User size={28} color="#8b5cf6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-zinc-900 shadow-lg rounded border border-zinc-800 z-10">

          <Link href="/dashboard/settings">
            <div className="flex items-center px-4 py-2 hover:bg-zinc-950/50">
              <Settings size={24} color="#8b5cf6" />
              <span className="ml-2 text-zinc-500">Configurações</span>
            </div>
          </Link>

          <div className="cursor-pointer flex items-center px-4 py-2 hover:bg-zinc-950/50" onClick={() => logoutUser()}>
            <LogOutIcon size={24} color="#8b5cf6" />
            <span className="ml-2 text-zinc-500">Sair</span>
          </div>

        </div>
      )}
    </div>
  );
}
