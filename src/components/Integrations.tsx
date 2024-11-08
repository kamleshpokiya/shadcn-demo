import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Ellipsis, ShieldCheck } from "lucide-react";
type IntegrationsProps = {
  className?: string;
} & React.ComponentProps<"div">;

const Integrations: React.FC<IntegrationsProps> = ({ className, ...props }) => {
  const data = [
    {
      name: "Jira",
      tags: ["LINK PREVIEW", "SYNC"],
      user: "Anyone in Acme Inc.",
      tag: "Notion",
      logo: "/brands/jira.jpeg",
    },
    {
      name: "Github",
      tags: ["LINK PREVIEW", "SYNC"],
      user: "Anyone in Acme Inc.",
      tag: "Notion",
      logo: "/brands/github.png",
    },
    {
      name: "Slack",
      tags: ["LINK PREVIEW"],
      user: "Anyone in Acme Inc.",
      tag: "Notion",
      logo: "/brands/slack.png",
    },
    {
      name: "Figma",
      tags: ["LINK PREVIEW"],
      user: "Anyone in Acme Inc.",
      tag: "Notion",
      logo: "/brands/figma.jpeg",
    },
  ];
  return (
    <div className={cn("h-full flex flex-col", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-base font-medium">
            Restrict members from installing integrations
          </p>
          <Label className="text-sm text-muted-foreground">
            Workspace members can install any new integrations
          </Label>
        </div>
        <Select defaultValue="off">
          <SelectTrigger className="w-fit border-0 flex gap-2">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="off">Off</SelectItem>
            <SelectItem value="on">On</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full h-full gap-4 mt-4 flex-col flex-grow">
        <div>
          All integrations <span className="text-muted-foreground">11</span>
        </div>
        <ScrollArea className="h-[100px] flex-grow">
          <Table>
            <TableHeader className="border-t">
              <TableRow>
                <TableHead className="w-[100px]">Integration</TableHead>
                <TableHead>Users</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10">
                        <Image
                          alt=""
                          src={item.logo}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          {item.name}{" "}
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            {item.tags.map((tag, index) => (
                              <p
                                key={index}
                                className="text-sm bg-zinc-100 text-muted-foreground rounded px-2"
                              >
                                {tag}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1 items-center">
                          {item.tag} <ShieldCheck size={16} color="green" />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 items-center">{item.user}</div>
                  </TableCell>
                  <TableCell>
                    <Ellipsis />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Integrations;
