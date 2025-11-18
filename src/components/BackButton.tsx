import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate("/")}
      className="group hover:bg-primary/10"
    >
      <ArrowLeft className="w-5 h-5 mr-2 text-primary group-hover:translate-x-[-4px] transition-transform" />
      <span className="text-foreground group-hover:text-primary">Ana Sayfaya Dön</span>
    </Button>
  );
};
