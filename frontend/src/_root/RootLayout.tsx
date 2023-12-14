import Topbar from "@/components/shared/Topbar.tsx";
import {Outlet} from "react-router-dom";

const RootLayout = () => {
    return (
        <div><Topbar/>
            <section>
                <Outlet/>
            </section>
        </div>
    )
}
export default RootLayout
