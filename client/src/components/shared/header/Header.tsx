import DarkModeToggle from "@/components/shared/toggle/DarkModeToggle";
import SpaceLogo from "../../../assets/logo.svg";

const HEADER_TEXT = {
  TITLE: `Cosmic Journey`,
  DESCRIPTION: `Discover the cosmos, one NASA picture at a time.`,
};

export default function Header() {
  return (
    <div className=" space-y-2 pt-4">
      <div className="text-left">
        <DarkModeToggle />
      </div>
      <div className="text-center flex items-center justify-center gap-2">
        <img src={SpaceLogo} alt="space logo" className="h-15 w-15" />

        <h1 className="text-3xl font-bold tracking-tight">{HEADER_TEXT.TITLE}</h1>
      </div>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto text-balance">
        {HEADER_TEXT.DESCRIPTION}
      </p>
    </div>
  );
}
