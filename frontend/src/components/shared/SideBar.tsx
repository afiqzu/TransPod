import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { LogOut, Menu } from "lucide-react";
import { SearchField } from "@/components/shared/SearchField.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import { useSignOutAccount } from "@/lib/tanstack-query/queriesAndMutations.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SideBar = () => {
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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle className="align-center mb-5 flex gap-1">
            <img src="/assets/logo.png" width={30} height={30} alt="logo" />
            <p>TransPod</p>
          </SheetTitle>
        </SheetHeader>
        <SearchField />
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={handleSignOut}
              className="ml-auto mt-10 w-fit gap-3 p-0"
            >
              Sign Out
              <LogOut size={20} />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default SideBar;
