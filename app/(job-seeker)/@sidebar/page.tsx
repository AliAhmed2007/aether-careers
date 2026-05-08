import { JobListingFilterForm } from "@/features/jobListings/components/JobListingFilterForm";
import { Suspense } from "react";

function page() {
  return (
    <div className="m-4">
      <Suspense>
        <SuspendedPage />
      </Suspense>
    </div>
  );
}

async function SuspendedPage() {
  return <JobListingFilterForm />;
}

export default page;
