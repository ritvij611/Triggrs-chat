import { useRouter } from "next/router";
import { Pricing } from "@/components/general/Pricing";

export default function SelectPlan() {
  const router = useRouter();  

  return (
    <div className="font-outfit bg-emerald-50">
        <Pricing />
      </div>
  )
}


