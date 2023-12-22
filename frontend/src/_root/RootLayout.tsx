import Topbar from "@/components/shared/Topbar.tsx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className='overflow-hidden'>
      <Topbar />
      <section className="mt-[70px] sm:mt-[80px]">
        <Outlet />
      </section>
    </div>
  );
};
export default RootLayout;
