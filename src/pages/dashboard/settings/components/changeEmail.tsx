import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import { setupApiClient } from "@/services/api";
import { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";



export default function ChangeEmail() {
  const { user } = useContext(AuthContext);
  const [currentEmail, setCurrentEmail] = useState(user?.email);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  async function handleChangeEmail() {
    try {
      const apiClient = setupApiClient();
      const response = await apiClient.put('/change-email', {
        currentEmail: currentEmail,
        newEmail: newEmail
      });

      setEmailError("");
      toast.success("Email alterado com sucesso!", {
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

    } catch (error) {
      if (error.response && error.response.data) {
        setEmailError(error.response.data.message);  // Mensagem de erro retornada pela API
      } else {
        setEmailError(error.message);  // Caso o erro seja outro (não relacionado à resposta da API)
      }
    }

  }

  return (
    <>
      <div
        className=" flex flex-col gap-3 max-w-[480px] w-full md:max-w-[780px]">
        <Label>
          Email Atual
        </Label>

        <Input
          type="email"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
        />

        <Label>
          Novo Email
        </Label>
        <Input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        {emailError && <p className="text-red-800">{emailError}</p>}

        <Button
          onClick={handleChangeEmail}
        >Salvar
        </Button>
      </div>
    </>
  )
}