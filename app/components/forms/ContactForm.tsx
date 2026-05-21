"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/queries/clients";
import { contactDataSchema, type ContactData } from "@/lib/schemas/contactData";

export default function ContactForm() {
  const form = useForm<ContactData>({
    resolver: zodResolver(contactDataSchema),
    defaultValues: {
      name: "",
      email: "",
      organisation: "",
      preferredTime: "",
      serviceType: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactData) {
    try {
      await createClient(data);
      form.reset();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  }

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Contact Details</FieldLegend>
            <FieldDescription>
              Tell us about your enquiry and we will get back to you.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" placeholder="Your name" {...form.register("name")} />
                {form.formState.errors.name && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.name.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="organisation">Organisation</FieldLabel>
                <Input
                  id="organisation"
                  placeholder="Company or organisation"
                  {...form.register("organisation")}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="serviceType">Service Type</FieldLabel>
                <Input
                  id="serviceType"
                  placeholder="Accounting, tax, advisory..."
                  {...form.register("serviceType")}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="preferredTime">Preferred Time</FieldLabel>
                <Input
                  id="preferredTime"
                  placeholder="e.g. Weekday morning"
                  {...form.register("preferredTime")}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea
                  id="message"
                  placeholder="How can we help?"
                  className="resize-none"
                  {...form.register("message")}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button variant="outline" type="button" onClick={() => form.reset()}>
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
