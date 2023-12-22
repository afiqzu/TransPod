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
        <section className="flex h-screen flex-1 flex-col items-center justify-center bg-white">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default AuthLayout;
