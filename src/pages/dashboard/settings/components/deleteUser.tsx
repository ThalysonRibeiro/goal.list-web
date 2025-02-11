import { Trash2 } from "lucide-react";
import { useState } from "react";
import Router from "next/router";
import { setupApiClient } from "@/services/api";
import { destroyCookie } from "nookies";
import { Bounce, toast } from "react-toastify";

export function DeleteUser() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  async function handleDeleteAccount() {
    try {
      const apiClient = setupApiClient();
      await apiClient.delete('/delete-user');
      destroyCookie(null, '@goallist.token', { path: '/' });

      toast.success("Conta excluída com sucesso!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      window.location.reload();
      Router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" flex flex-col gap-3 max-w-[480px] w-full md:max-w-[780px]">
        <div className="mt-12 pt-8 border-t border-zinc-700">
          <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
            <Trash2 className="w-5 h-5 mr-2" />
            Zona de Perigo
          </h2>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-200 font-medium"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Excluir Conta
            </button>
          ) : (
            <div className="space-y-4 bg-zinc-950/30 p-6 rounded-lg border border-red-900/50">
              <p className="text-sm text-zinc-300">
                Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium"
                >
                  Sim, excluir minha conta
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-6 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-all duration-200 font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>


      </div>
    </>
  )
}