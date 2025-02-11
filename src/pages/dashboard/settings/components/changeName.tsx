import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContex } from "@/context/AuthContext";
import { setupApiClient } from "@/services/api";
import { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function ChangeName() {
  const { user } = useContext(AuthContex);
  const [newname, setNewName] = useState(user?.name);

  async function handleChangeName() {
    const apiClient = setupApiClient();
    await apiClient.put('/change-name', {
      name: newname
    });

    toast.success("Nome alterado com sucesso!", {
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
  }

  return (
    <>
      <div className=" flex flex-col max-w-[480px] w-full md:max-w-[780px]">
        <Label className="mb-3">
          Nome
        </Label>

        <div className="flex w-full gap-3">
          <Input
            className="flex-1"
            type="textt"
            value={newname}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button
            className="flex-1"
            onClick={handleChangeName}
          >Salvar
          </Button>
        </div>
      </div>
    </>
  )
}