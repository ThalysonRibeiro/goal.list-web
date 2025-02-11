import { AuthContex } from "@/context/AuthContext";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useContext } from "react";
import { Dialog } from "@/components/ui/dialog";
import { CreateGoal } from "@/components/create-goal";
import { Summary } from "@/components/summary";
import { setupApiClient } from "@/services/api";
import { EmptyGoal } from "@/components/empyt-goal";
import Header from "./components/header";


interface SummaryResponse {
  summary: {
    completed: number;
    total: number;
    goalsPerDay: Record<
      string,
      Array<{
        id: string;
        title: string;
        completedAt: string;
      }>
    >;
  };
};



export default function Dashboard(summary: SummaryResponse) {
  const { user } = useContext(AuthContex);
  const { summary: data } = summary;


  return (
    <Dialog>
      <div className="flex items-center justify-center flex-col">
        <Header name={user?.name} />

        {data?.total > 0 ? <Summary data={data} /> : <EmptyGoal />}


        <CreateGoal />
      </div>
    </Dialog>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiCliente = setupApiClient(ctx);
    const response = await apiCliente.get('/summary');
    if (!response.data) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return {
      props: {
        summary: response.data.summary
      }
    }

  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

})
