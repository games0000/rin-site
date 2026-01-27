import { getPosts } from "@/lib/api";
import PlanClient from "@/components/plan/PlanClient";

export default function PlanPage() {
  const plans = getPosts("plans");

  return <PlanClient plans={plans as any} />;
}
