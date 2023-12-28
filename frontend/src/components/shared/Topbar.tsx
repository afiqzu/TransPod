import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "@/components/shared/SideBar.tsx";
import { SearchField } from "@/components/shared/SearchField.tsx";

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-between gap-6 border-b-2 bg-white bg-opacity-90 px-5 py-2 backdrop-blur-sm sm:px-4 sm:py-3">
      <div
        className="flex cursor-pointer items-center"
        onClick={handleLogoClick}
      >
        <img src="/assets/logo.png" width={40} height={40} alt="logo" />
        <p className="ml-1 hidden text-2xl font-medium sm:block">TransPod</p>
      </div>
      <div className="fixed hidden w-1/2 translate-x-1/2 self-center sm:flex">
        {location.pathname !== "/home" &&
          !location.pathname.startsWith("/episode/") && (
            <div className="w-full">
              <SearchField inTopbar={true} />
            </div>
          )}
      </div>
      <div className="flex cursor-pointer hover:underline">
        <SideBar />
      </div>
    </div>
  );
};
export default Topbar;
