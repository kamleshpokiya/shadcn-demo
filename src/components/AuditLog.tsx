import React from "react";
import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EyeOff,
  FileTerminal,
  Lock,
  Rainbow,
  User,
  Volleyball,
} from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AudioLogProps = {
  className?: string;
} & React.ComponentProps<"div">;

const userImages = [
  "/users/u1.jpeg",
  "/users/u2.jpeg",
  "/users/u3.jpeg",
  "/users/u4.png",
];

const event = [
  {
    name: "Edited",
    icon: EyeOff,
    tag: "Secret Project",
  },
  {
    name: "Viewed",
    icon: Lock,
    tag: "Private page",
  },
  {
    name: "Edited",
    icon: Volleyball,
    tag: "OS",
  },
  {
    name: "Exported",
    icon: Rainbow,
    tag: "Product Search",
  },
  {
    name: "Downloaded",
    icon: FileTerminal,
    tag: "Contract.pdf",
  },
];
const data = [
  {
    proficPic: userImages[0],
    event: event[0],
    date: new Date().toDateString(),
  },
  {
    proficPic: userImages[1],
    event: event[1],
    date: new Date().toDateString(),
  },
  {
    proficPic: userImages[2],
    event: event[2],
    date: new Date().toDateString(),
  },
  {
    proficPic: userImages[3],
    event: event[3],
    date: new Date().toDateString(),
  },
  {
    proficPic: userImages[0],
    event: event[4],
    date: new Date().toDateString(),
  },
  {
    proficPic: userImages[1],
    event: event[0],
    date: new Date().toDateString(),
  },
];
const AuditLog: React.FC<AudioLogProps> = ({ className, ...props }) => {
  const [sorting, setSorting] = React.useState<{
    column: string;
    direction: "asc" | "desc";
  }>({
    column: "date",
    direction: "asc",
  });

  const handleSorting = (column: string) => {
    setSorting({
      column,
      direction:
        sorting.column === column && sorting.direction === "asc"
          ? "desc"
          : "asc",
    });
  };
  return (
    <div className={cn("flex h-full w-full flex-col", className)} {...props}>
      <div className="text-end my-4 flex justify-between">
        <Select>
          <SelectTrigger className="w-fit flex gap-2">
            <User />
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">User 1</SelectItem>
            <SelectItem value="dark">User 2</SelectItem>
            <SelectItem value="system">User 3</SelectItem>
          </SelectContent>
        </Select>
        <Button>Export</Button>
      </div>
      <ScrollArea>
        <Table>
          <TableHeader className="border-t sticky top-0">
            <TableRow>
              <TableHead className="w-[100px]">User</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>
                <div
                  onClick={() => handleSorting("date")}
                  className="cursor-pointer flex gap-2"
                >
                  <div>
                    {sorting.column === "date" &&
                    sorting.direction === "asc" ? (
                      <span>⬆️</span>
                    ) : (
                      <span>⬇️</span>
                    )}
                  </div>
                  Date
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div>
                    <div className="w-10 h-10">
                      <Image
                        alt=""
                        src={item.proficPic}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 items-center">
                    {item.event.name}
                    <item.event.icon width={12} height={12} />
                    {item.event.tag}
                  </div>
                </TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default AuditLog;
