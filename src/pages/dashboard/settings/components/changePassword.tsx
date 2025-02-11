import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setupApiClient } from "@/services/api";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    if (newPassword !== "" && confirmPassword !== "") {
      if (newPassword.length < 8) {
        setErrorPassword("A nova senha precisa ter pelo menos 8 caracteres");
      } else if (newPassword !== confirmPassword) {
        setErrorPassword("As senhas precisam ser iguais");
      } else {
        setErrorPassword("");
      }
    }
  }, [newPassword, confirmPassword]);

  async function handleChangePassword() {
    try {
      const apiClient = setupApiClient();
      await apiClient.put('/change-password', {
        currentPassword: currentPassword,
        newPassword: newPassword
      });

      setErrorPassword("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success("Senha laterada com sucesso!", {
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
        setErrorPassword(error.response.data.message);
      } else {
        setErrorPassword(error.message);
      }

    }
  }


  return (
    <>
      <div className=" flex flex-col gap-3 max-w-[480px] w-full md:max-w-[780px]">
        <Label>
          Senha atual
        </Label>
        <Input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {/* {errors.newEmail && <p className="text-red-800">{errors.newEmail.message}</p>} */}

        <Label>
          Nova senha
        </Label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {/* {errors.newEmail && <p className="text-red-800">{errors.newEmail.message}</p>} */}

        <Label>
          Confirmar nova senha
        </Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorPassword && <p className="text-red-800">{errorPassword}</p>}

        <Button
          onClick={handleChangePassword}
        >Salvar
        </Button>

      </div>
    </>
  )
}