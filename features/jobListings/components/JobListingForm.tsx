"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobListingSchema } from "../actions/schemas";
import z from "zod";

function JobListingForm() {
  const form = useForm({
    resolver: zodResolver(jobListingSchema),
    defaultValues: {
      title: "",
      description: "",
      stateAbbreviation: null,
      city: null,
      wage: null,
      wageInterval: "yearly",
      experienceLevel: "junior",
      type: "full-time",
      locationRequirement: "in-office",
    },
  });

  function onSubmit(data: z.infer<typeof jobListingSchema>) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ... */}
      {/* Build the form here */}
      {/* ... */}
    </form>
  );
}

export default JobListingForm;
