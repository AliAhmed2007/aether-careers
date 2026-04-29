import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

function PricingTable() {
  return <ClerkPricingTable for="organization" newSubscriptionRedirectUrl="/employer/pricing" />;
}

export default PricingTable;
