import { useSignOutAccount } from "@/lib/tanstack-query/queriesAndMutations.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchField } from "@/components/shared/SearchField.tsx";
import { LogOut } from "lucide-react";
import { toast } from "@/components/ui/use-toast.ts";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Signing out...",
    });
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-white flex justify-between gap-6 items-center py-2 px-5 sm:p-5 fixed sm:static w-full top-0">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <img src="/assets/logo.png" width={40} height={40} alt="logo" />
        <p className="text-2xl font-medium ml-1 hidden lg:block">TransPod</p>
      </div>
      <div className="rounded-full w-full max-w-2xl mx-auto">
        <SearchField />
      </div>
      <div className="hover:underline cursor-pointer" onClick={handleSignOut}>
        <LogOut />
      </div>
    </div>
  );
};
export default Topbar;
