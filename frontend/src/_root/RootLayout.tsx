import Topbar from "@/components/shared/Topbar.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext.tsx";
import LoadingScreen from "@/components/shared/LoadingScreen.tsx";
import { useEffect } from "react";

const RootLayout = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="overflow-hidden">
          <Topbar />
          <section className="mt-[58px] sm:mt-[66px]">
            <Outlet />
          </section>
        </div>
      )}
    </>
  );
};
export default RootLayout;
