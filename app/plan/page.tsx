import { getPosts } from "@/lib/api";
import PlanClient from "@/components/plan/PlanClient";

interface Plan {
  id: string;
  title: string;
  date: string;
  content: string;
  tags?: string[];
}

export default function PlanPage() {
  const plans = getPosts("plans") as unknown as Plan[];

  return <PlanClient plans={plans} />;
}
