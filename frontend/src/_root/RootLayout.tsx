import Topbar from "@/components/shared/Topbar.tsx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Topbar />
      <section className="mt-[70px] sm:mt-0">
        <Outlet />
      </section>
    </div>
  );
};
export default RootLayout;
