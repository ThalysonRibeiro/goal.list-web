import { AuthContex } from "@/context/AuthContext";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useContext } from "react";

export default function Dashboard() {
  const { signIn, user } = useContext(AuthContex);

  return (
    <div>
      Dashboard
    </div>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }
})