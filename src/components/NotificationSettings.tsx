"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Define a schema dynamically based on the data
const FormSchema = z.object({
  mobile_push_notification: z.boolean().default(false).optional(),
  slack_notification: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
});

type NotificationSettingsProps = {
  className?: string;
} & React.ComponentProps<"form">;

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  className,
  ...props
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile_push_notification: true,
      slack_notification: false,
      marketing_emails: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const data = [
    {
      name: "mobile_push_notification",
      label: "Mobile Push Notification",
      description: "Receive push notifications on your mobile device.",
      disabled: false,
    },
    {
      name: "slack_notification",
      label: "Slack Notification",
      description: "Receive notifications in Slack.",
      disabled: true,
    },
    {
      name: "marketing_emails",
      label: "Marketing Emails",
      description: "Receive emails about new products, features, and more.",
      disabled: false,
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full space-y-6", className)}
        {...props}
      >
        <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
        <div className="space-y-4">
          {data.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name as keyof z.infer<typeof FormSchema>}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{item.label}</FormLabel>
                    <FormDescription>{item.description}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={item.disabled}
                      aria-readonly={item.disabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default NotificationSettings;
