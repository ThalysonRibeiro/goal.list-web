import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { api } from "@/services/apiClient";
import { useEffect, useState } from "react";

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
      const response = await api.get('/pending-goals');
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  async function handleCompleteGoal(goalId: string) {
    try {
      console.log('Tentando completar o objetivo:', goalId); // Log para debug

      const response = await api.post('/completions', {
        goal_id: goalId  // Alterado de ggoal_id para goal_id
      });

      await getPendingGoals();

      setPendingGoals(currentGoals =>
        currentGoals.map(goal =>
          goal.id === goalId
            ? { ...goal, completionCount: goal.completionCount + 1 }
            : goal
        )
      );

    } catch (error: any) {
      console.error('Erro completo:', error);
      console.error('Dados do erro:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map(goal => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desired_weekly_frequency}
          onClick={() => handleCompleteGoal(goal.id)}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title} ({goal.completionCount}/{goal.desired_weekly_frequency})
        </OutlineButton>
      ))}
    </div>
  );
}