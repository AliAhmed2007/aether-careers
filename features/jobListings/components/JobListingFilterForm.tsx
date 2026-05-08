"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ExperienceLevel,
  experienceLevels,
  JobListingType,
  jobListingTypes,
  LocationRequirement,
  locationRequirements,
} from "@/drizzle/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  formatExperienceLevel,
  formatJobType,
  formatLocationRequirement,
} from "../lib/formatters";
import { StateSelectItems } from "./StateSelectItems";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/LoadingSwap";
import { useSidebar } from "@/components/ui/sidebar";

const ANY_VALUE = "any";

const jobListingFilterSchema = z.object({
  title: z.string().optional(),
  city: z.string().optional(),
  stateAbbreviation: z.string().or(z.literal(ANY_VALUE)).optional(),
  experienceLevel: z.enum(experienceLevels).or(z.literal(ANY_VALUE)).optional(),
  type: z.enum(jobListingTypes).or(z.literal(ANY_VALUE)).optional(),
  locationRequirement: z
    .enum(locationRequirements)
    .or(z.literal(ANY_VALUE))
    .optional(),
});

export function JobListingFilterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const form = useForm({
    resolver: zodResolver(jobListingFilterSchema),
    defaultValues: {
      title: searchParams.get("title") ?? "",
      city: searchParams.get("city") ?? "",
      locationRequirement:
        (searchParams.get("locationRequirement") as LocationRequirement) ??
        ANY_VALUE,
      stateAbbreviation: searchParams.get("state") ?? ANY_VALUE,
      experienceLevel:
        (searchParams.get("experience") as ExperienceLevel) ?? ANY_VALUE,
      type: (searchParams.get("type") as JobListingType) ?? ANY_VALUE,
    },
  });

  function onSubmit(data: z.infer<typeof jobListingFilterSchema>) {
    const newParams = new URLSearchParams();

    if (data.city) newParams.set("city", data.city);
    if (data.stateAbbreviation && data.stateAbbreviation !== ANY_VALUE) {
      newParams.set("state", data.stateAbbreviation);
    }
    if (data.title) newParams.set("title", data.title);
    if (data.experienceLevel && data.experienceLevel !== ANY_VALUE) {
      newParams.set("experience", data.experienceLevel);
    }
    if (data.type && data.type !== ANY_VALUE) {
      newParams.set("type", data.type);
    }
    if (data.locationRequirement && data.locationRequirement !== ANY_VALUE) {
      newParams.set("locationRequirement", data.locationRequirement);
    }

    router.push(`${pathname}?${newParams.toString()}`);
    setOpenMobile(false);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="locationRequirement"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Location Requirement</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={field.name} className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value={ANY_VALUE}>Any</SelectItem>
                {locationRequirements.map((lr) => (
                  <SelectItem key={lr} value={lr}>
                    {formatLocationRequirement(lr)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="city"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>City</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="stateAbbreviation"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>State</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={field.name} className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value={ANY_VALUE}>Any</SelectItem>
                <StateSelectItems />
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="type"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Job Type</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={field.name} className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value={ANY_VALUE}>Any</SelectItem>
                {jobListingTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {formatJobType(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="experienceLevel"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Experience Level</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={field.name} className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value={ANY_VALUE}>Any</SelectItem>
                {experienceLevels.map((experience) => (
                  <SelectItem key={experience} value={experience}>
                    {formatExperienceLevel(experience)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        className="w-full"
      >
        <LoadingSwap isLoading={form.formState.isSubmitting}>
          Filter
        </LoadingSwap>
      </Button>
    </form>
  );
}
