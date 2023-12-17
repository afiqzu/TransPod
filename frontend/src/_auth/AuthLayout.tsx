import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext.tsx";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="flex flex-1 h-screen bg-white justify-center items-center flex-col">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default AuthLayout;
