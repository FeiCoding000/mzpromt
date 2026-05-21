"use client";
import { Controller } from "react-hook-form";
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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
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

  const serviceOptions = [
    "Business services",
    "New Entity Setup",
    "Individual Tax",
  ];

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Contact Details</FieldLegend>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...form.register("name")}
                />
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

              <div className="flex flex-col md:flex-row md:justify-between gap-7">
                <Field>
                  <FieldLabel htmlFor="organisation">Organisation</FieldLabel>
                  <Input
                    id="organisation"
                    placeholder="Company or organisation"
                    {...form.register("organisation")}
                  />
                </Field>

                <Controller
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="serviceType">
                        Service Type
                      </FieldLabel>

                      <Combobox
                        items={serviceOptions}
                        value={field.value || null}
                        onValueChange={(value) => field.onChange(value ?? "")}
                      >
                        <ComboboxInput placeholder="Select a service" />
                        <ComboboxContent>
                          <ComboboxEmpty>No items found.</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>

                      {form.formState.errors.serviceType && (
                        <FieldDescription className="text-destructive">
                          {form.formState.errors.serviceType.message}
                        </FieldDescription>
                      )}
                    </Field>
                  )}
                />
              </div>

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
            <Button
              variant="outline"
              type="button"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
