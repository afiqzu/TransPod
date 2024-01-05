import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext.tsx";
import LoadingScreen from "@/components/shared/LoadingScreen.tsx";
import { useEffect } from "react";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/home");
    }
  }, [isLoading, isAuthenticated]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="flex h-screen flex-1 flex-col items-center justify-center bg-white">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default AuthLayout;
