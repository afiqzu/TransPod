import { Button } from "@/components/ui/button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sign-up");
  };

  return (
    <div className="ml-auto mr-auto flex flex-col items-center">
      <div className="fixed top-0 z-10 flex w-full items-center justify-between gap-6 border-b-2 bg-white bg-opacity-90 px-5 py-2 backdrop-blur-sm sm:px-4 sm:py-3">
        <div className="flex cursor-pointer items-center">
          <img src="/assets/logo.png" width={40} height={40} alt="logo" />
          <p className="ml-3 text-2xl font-medium">TransPod</p>
        </div>
        <Link to={"/sign-in"} className="ml-auto hover:text-green-800">
          Sign in
        </Link>
        <Button className="shad-button_primary right-0" onClick={handleClick}>
          Get started
        </Button>
      </div>
      <div className="flex max-w-4xl flex-col items-start px-7">
        <div className="text-start text-4xl font-bold sm:text-5xl tracking-tight">
          <span>Get more than just transcriptions with </span>
          <span className="text-green-700">TransPod.</span>
        </div>
        <p className="mb-7 mt-5 text-start text-xl">
          Get accurate transcriptions, AI-driven summaries, and interactive chat
          in one platform. TransPod lets you search, discover, and engage with
          podcasts effortlessly. Ideal for podcast enthusiasts and creators.
        </p>
        <Button className="shad-button_action" onClick={handleClick}>
          Get Started
          <ArrowUpRight />
        </Button>
      </div>
    </div>
  );
};
export default Landing;
