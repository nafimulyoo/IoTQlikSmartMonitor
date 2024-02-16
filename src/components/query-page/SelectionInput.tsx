"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const SelectionInput = ({ setInputQuery, inputQuery, children }: any) => {
  
  const [ selection1, setSelection1 ] = useState("");
  const [ selection2, setSelection2 ] = useState("");
  const [ selection3, setSelection3 ] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  useEffect(() => {
    const newInputQuery = {
      type: "select",
      query_input : {
        value1: selection1,
        value2: selection2,
        value3: selection3,
      }
    };
    console.log(newInputQuery);
    setInputQuery(newInputQuery);
  }, [selection1, selection2, selection3]);
  
  return (
    <>
    <div className="flex flex-row">

    
      <Select  value={selection1} onValueChange={(value) => setSelection1(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel >Fruit</SelectLabel>
            <SelectItem value="select1">Select 1</SelectItem>
            <SelectItem value="select2">Select 2</SelectItem>
            <SelectItem value="select3">Select 3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={selection2} onValueChange={(value) => setSelection2(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fish" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fish</SelectLabel>
            <SelectItem value="select1">Select 1</SelectItem>
            <SelectItem value="select2">Select 2</SelectItem>
            <SelectItem value="select3">Select 3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={selection3} onValueChange={(value) => setSelection3(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a item" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Item</SelectLabel>
            <SelectItem value="select1">Select 1</SelectItem>
            <SelectItem value="select2">Select 2</SelectItem>
            <SelectItem value="select3">Select 3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
    
    </div>
    <div className="w-32 flex justify-center items-center">
    {children}
    </div>
    </>
  );
};

export default SelectionInput;
