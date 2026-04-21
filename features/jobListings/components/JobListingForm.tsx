"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobListingSchema } from "../actions/schemas";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/LoadingSwap";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  experienceLevels,
  jobListingTypes,
  locationRequirements,
  wageIntervals,
  JobListingTable,
} from "@/drizzle/schema";
import {
  formatExperienceLevel,
  formatJobType,
  formatLocationRequirement,
  formatWageInterval,
} from "../lib/formatters";
import { StateSelectItems } from "./StateSelectItems";
import { MarkdownEditor } from "@/components/markdown/MarkdownEditor";
import { createJobListing } from "../actions/actions";
import { toast } from "sonner";
// import { createJobListing, updateJobListing } from "../actions/actions";

const UNSELECT_STATE_VALUE = "none";

export default function JobListingForm({
  jobListing,
}: {
  jobListing?: Pick<
    typeof JobListingTable.$inferSelect,
    | "title"
    | "description"
    | "experienceLevel"
    | "id"
    | "stateAbbreviation"
    | "type"
    | "wage"
    | "wageInterval"
    | "city"
    | "locationRequirement"
  >;
}) {
  const form = useForm({
    resolver: zodResolver(jobListingSchema),
    defaultValues: jobListing ?? {
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

  async function onSubmit(data: z.infer<typeof jobListingSchema>) {
    const res = await createJobListing(data);
    if (res?.error) {
      toast.error(res.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 @container"
    >
      {/* ROW 1: Title & Wage */}
      <div className="grid grid-cols-1 @md:grid-cols-2 gap-x-4 gap-y-6 items-start">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Job Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Your Job Title"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <FieldLabel htmlFor="wage">Wage</FieldLabel>
          <div className="flex items-start">
            <Controller
              name="wage"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex-1 flex flex-col">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your Wage"
                    type="number"
                    value={field.value ?? ""}
                    className="rounded-r-none focus:z-10 relative"
                    onChange={(e) =>
                      field.onChange(
                        isNaN(e.target.valueAsNumber)
                          ? null
                          : e.target.valueAsNumber,
                      )
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="mt-2" />
                  )}
                </div>
              )}
            />
            <Controller
              name="wageInterval"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col">
                  <Select
                    name={field.name}
                    value={field.value ?? ""}
                    onValueChange={(val) => field.onChange(val ?? null)}
                  >
                    <SelectTrigger
                      id="wage-interval-select"
                      className="rounded-l-none -ml-px relative focus:z-10"
                    >
                      / <SelectValue placeholder="Interval" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {wageIntervals.map((interval) => (
                        <SelectItem key={interval} value={interval}>
                          {formatWageInterval(interval)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
        </Field>
      </div>

      {/* ROW 2: City/State & Location Requirement */}
      <div className="grid grid-cols-1 @md:grid-cols-2 gap-x-4 gap-y-6 items-start">
        <div className="grid grid-cols-1 @xs:grid-cols-[1fr_1fr] gap-x-2 gap-y-6 items-start">
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="City"
                  value={field.value ?? ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field>
            <FieldLabel htmlFor="state-select">State</FieldLabel>
            <Controller
              name="stateAbbreviation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Select
                  value={field.value ?? ""}
                  onValueChange={(val) =>
                    field.onChange(val === UNSELECT_STATE_VALUE ? null : val)
                  }
                >
                  <SelectTrigger id="state-select">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {field.value != null && (
                      <SelectItem
                        value={UNSELECT_STATE_VALUE}
                        className="text-muted-foreground"
                      >
                        Clear
                      </SelectItem>
                    )}
                    <StateSelectItems />
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="location-req">Location Requirement</FieldLabel>
          <Controller
            name="locationRequirement"
            control={form.control}
            render={({ field, fieldState }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="location-req">
                  <SelectValue placeholder="Select Requirement" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {locationRequirements.map((lr) => (
                    <SelectItem key={lr} value={lr}>
                      {formatLocationRequirement(lr)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      {/* ROW 3: Job Type & Experience Level */}
      <div className="grid grid-cols-1 @md:grid-cols-2 gap-x-4 gap-y-6 items-start">
        <Field>
          <FieldLabel htmlFor="job-type">Job Type</FieldLabel>
          <Controller
            name="type"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="job-type">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {jobListingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatJobType(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="experience-level">Experience Level</FieldLabel>
          <Controller
            name="experienceLevel"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="experience-level">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {formatExperienceLevel(level)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <Field>
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <div className="mdx-editor-wrapper">
                <MarkdownEditor
                  {...field}
                  markdown={field.value}
                  placeholder="Enter a job Description"
                />
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} className="mt-2" />
              )}
            </Field>
          )}
        />
      </Field>

      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        className="w-full cursor-pointer"
      >
        <LoadingSwap isLoading={form.formState.isSubmitting}>
          {jobListing ? "Update Job Listing" : "Create Job Listing"}
        </LoadingSwap>
      </Button>
    </form>
  );
}
