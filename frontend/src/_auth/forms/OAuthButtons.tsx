import { signInWithGoogle } from "@/lib/appwrite/api.ts";
import { Button } from "@/components/ui/button.tsx";

const OAuthButtons = () => {
  return (
    <Button
      type="button"
      className=" w-full gap-3 bg-black text-white"
      onClick={signInWithGoogle}
    >
      <img src="/assets/google-icon.svg" alt="google" height={20} width={20} />
      Continue with Google
    </Button>
  );
};
export default OAuthButtons;
