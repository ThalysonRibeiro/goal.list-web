import Image from "next/image";
import logoImg from "@/assets/logo-goallist.png";
import { ChangeEmail } from "./components/changeEmail";
import { ChangeName } from "./components/changeName";
import { ChangePassword } from "./components/changePassword";
import { DeleteUser } from "./components/deleteUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Settings() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col max-w-7xl w-full p-3">
        <div className="inline-flex justify-start items-center gap-2">
          <Image
            alt="logo do site goal list"
            src={logoImg}
            width={30}
            height={30}
          />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Goal.List
          </span>
          <Link href="/dashboard" className="ml-6">
            <Button size="sm">
              Voltar
            </Button>
          </Link>
        </div>

        <div className="min-h-screen text-center bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">Configurações da Conta</h1>

          <div className="mx-auto text-start bg-zinc-900 rounded-xl shadow-2xl p-8 mb-6 border border-zinc-800 max-w-[480px] w-full md:max-w-[780px]">
            <ChangeName />
          </div>

          <div className="mx-auto text-start bg-zinc-900 rounded-xl shadow-2xl p-8 mb-6 border border-zinc-800 max-w-[480px] w-full md:max-w-[780px]">
            <ChangeEmail />
          </div>

          <div className="mx-auto text-start bg-zinc-900 rounded-xl shadow-2xl p-8 mb-6 border border-zinc-800 max-w-[480px] w-full md:max-w-[780px]">
            <ChangePassword />
          </div>

          <div className="mx-auto text-start bg-zinc-900 rounded-xl shadow-2xl p-8 mb-6 border border-zinc-800 max-w-[480px] w-full md:max-w-[780px]">
            <DeleteUser />
          </div>

        </div>
      </div>
    </div>
  )
}