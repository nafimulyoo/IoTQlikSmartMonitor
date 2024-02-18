"use client";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SelectionInput =  ({ setInputQuery, inputQuery, children, session }: any) => {
  const [queryType, setQueryType] = useState("");
  const [deviceCode, setDeviceCode] = useState("");
  const [parameterCode, setParameterCode] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -1),
    to: new Date()
  });

  const [deviceData, setDeviceData] = useState({})
  const [parameters, setParameters] = useState([])


  async function getDeviceData() {
    const data = await fetch("/api/data/devices", {
      method: "POST",
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
        update: false
      }),
    }).then((res) => res.json());
    console.log(data);
    setDeviceData(data);
  }

  useEffect(() => {
    getDeviceData();
  }, []);

  useEffect(() => {
    if (deviceCode) {
      const selectedDeviceData = deviceData.device.find(device => device.code === deviceCode);
      if (selectedDeviceData) {
        setParameters(selectedDeviceData.parameters.parameter)
        console.log(selectedDeviceData.parameters.parameter);
      }
    }
  }, [deviceCode]);


  useEffect(() => {
    const newInputQuery = {
      type: "select",
      query_selection: {
        query_name: "name",
        query_type: queryType,
        device_code: deviceCode,
        parameters: parameterCode,
        from_time: format(date?.from, 'yyyy-MM-dd'),
        to_time: format(date?.to, 'yyyy-MM-dd'),
      },
    };

    console.log(newInputQuery);
    setInputQuery(newInputQuery);
  }, [queryType, deviceCode, parameterCode, date]);

  return (
    <>
      <div className="flex flex-row">
        <Select
          value={queryType}
          onValueChange={(value) => setQueryType(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select query type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Query Type</SelectLabel>
              <SelectItem value="data-last">Last Data</SelectItem>
              <SelectItem value="data-log">Data Log</SelectItem>
              <SelectItem value="device-list">Device List</SelectItem>
              <SelectItem value="parameter-list">Parameter List</SelectItem>
              <SelectItem value="alarm-log">Alarm Log</SelectItem>
            </SelectGroup>
          </SelectContent>

        </Select>

        <Select
          value={deviceCode}
          onValueChange={(value) => setDeviceCode(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select device name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Device Name</SelectLabel>
              {
                deviceData && deviceData.device?.map((device: any) => (
                  <SelectItem key={device.code} value={device.code}>
                    {device.name}
                  </SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>

        </Select>
        <Select
          value={parameterCode}
          onValueChange={(value) => setParameterCode(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select parameter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Parameter</SelectLabel>
              {
                parameters && parameters?.map((parameter: any) => (
                  <SelectItem key={parameter.code} value={parameter.code}>
                    {parameter.name}
                  </SelectItem>
                ))
              }
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
                // defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col w-96 items-center justify-center">
        {children}
      </div>
    </>
  );
};

export default SelectionInput;
