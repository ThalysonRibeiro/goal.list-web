import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContex } from "@/context/AuthContext";
import { setupApiClient } from "@/services/api";
import { useContext, useState } from "react";

export function ChangeName() {
  const { user } = useContext(AuthContex);
  const [newname, setNewName] = useState(user?.name);

  async function handleChangeName() {
    const apiClient = setupApiClient();
    await apiClient.put('/change-name', {
      name: newname
    });

    alert("Nome alterado com sucesso!")
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