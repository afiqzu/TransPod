import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext.tsx";
import LoadingScreen from "@/components/shared/LoadingScreen.tsx";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  return (
      <>
        {isLoading ? (
            <LoadingScreen />
        ) : isAuthenticated ? (
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
