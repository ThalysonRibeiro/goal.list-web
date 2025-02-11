import { Plus, RefreshCw, Trash } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { api } from "@/services/apiClient";
import { useEffect, useState } from "react";
import { setupApiClient } from "@/services/api";
import { Bounce, toast } from "react-toastify";

interface PendingGoalsResponse {
  id: string;
  title: string;
  desired_weekly_frequency: number;
  completionCount: number;
}

export function PendingGoals() {

  const [pendingGoals, setPendingGoals] = useState<PendingGoalsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function getPendingGoals() {
    try {
      const apiClient = setupApiClient();
      const response = await apiClient.get('/pending-goals');

      setPendingGoals(response.data);
    } catch (error) {
      console.error('Error fetching pending goals:', error);
      setError('Failed to load goals. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPendingGoals();
  }, []);

  if (loading) {
    return <div className="flex gap-3 ">
      <RefreshCw className="size-6 animate-spin" color="cyan" />
      Loading...
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  async function handleCompleteGoal(goalId: string) {
    try {
      const apiClient = setupApiClient();
      await apiClient.post('/completions', {
        goal_id: goalId
      });

      await getPendingGoals();

      setPendingGoals(currentGoals =>
        currentGoals.map(goal =>
          goal.id === goalId
            ? { ...goal, completionCount: goal.completionCount * 1 }
            : goal
        )
      );

    } catch (error: any) {
      console.error('Erro completo:', error);
      console.error('Dados do erro:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
    }
  }

  async function handleDeleteGoal(id: string) {
    const confirmDelete = confirm("Tem certeza que quer deletar essa meta?");

    if (confirmDelete) {
      const apiClient = setupApiClient();
      await apiClient.delete('/delete-goal', {
        data: { id: id }
      });
      window.location.reload();
      toast.success("Meta deleta!", {
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
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map(goal => (
        <div key={goal.id} className="flex items-center gap-2 border-r border-zinc-800 border-dashed  rounded-full hover:border-zinc-700">
          <OutlineButton
            disabled={goal.completionCount >= goal.desired_weekly_frequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title} ({goal.completionCount}/{goal.desired_weekly_frequency})
          </OutlineButton>
          <button
            onClick={() => handleDeleteGoal(goal.id)}
          >
            <Trash className="size-4 text-red-500 mr-2" />
          </button>
        </div>
      ))}
    </div>
  );
}