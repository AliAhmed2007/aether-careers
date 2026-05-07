import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

async function PricingTable() {
  return <ClerkPricingTable for="organization" newSubscriptionRedirectUrl="/employer/pricing" />;
}

export default PricingTable;
