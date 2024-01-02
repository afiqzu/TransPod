import Topbar from "@/components/shared/Topbar.tsx";
import { Outlet } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext.tsx";
import LoadingScreen from "@/components/shared/LoadingScreen.tsx";

const RootLayout = () => {
  const { isLoading } = useUserContext();
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
