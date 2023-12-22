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
    <div className="fixed top-0 z-10 flex w-full items-center justify-between gap-6 border-b-2 bg-white bg-opacity-90 px-5 py-2 backdrop-blur-sm sm:p-5">
      <div
        className="flex cursor-pointer items-center"
        onClick={handleLogoClick}
      >
        <img src="/assets/logo.png" width={40} height={40} alt="logo" />
        <p className="ml-1 hidden text-2xl font-medium lg:block">TransPod</p>
      </div>
      <div className="ml-5 mr-auto w-full max-w-xl rounded-full">
        <SearchField />
      </div>
      <div className="cursor-pointer hover:underline" onClick={handleSignOut}>
        <LogOut />
      </div>
    </div>
  );
};
export default Topbar;
