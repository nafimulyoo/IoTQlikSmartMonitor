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
import { Input } from "../ui/input";

const SelectionInput = ({
  setInputQuery,
  inputQuery,
  children,
  session,
}: any) => {
  const [queryType, setQueryType] = useState("");
  const [deviceCode, setDeviceCode] = useState("");
  const [parameterCode, setParameterCode] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -1),
    to: new Date(),
  });

  const [deviceData, setDeviceData] = useState({});
  const [parameters, setParameters] = useState([]);

  async function getDeviceData() {
    const data = await fetch("/api/data/devices", {
      method: "POST",
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
        update: false,
      }),
    }).then((res) => res.json());
    console.log(data);
    setDeviceData(data);
  }

  const [queryName, setQueryName] = useState("");

  useEffect(() => {
    getDeviceData();
  }, []);

  useEffect(() => {
    if (deviceCode) {
      const selectedDeviceData = deviceData.device.find(
        (device) => device.code === deviceCode
      );
      if (selectedDeviceData) {
        setParameters(selectedDeviceData.parameters.parameter);
        console.log(selectedDeviceData.parameters.parameter);
      }
    }
  }, [deviceCode]);

  useEffect(() => {
    const newInputQuery = {
      type: "select",
      query_selection: {
        query_name: queryName,
        query_type: queryType,
        device_code: deviceCode,
        parameters: parameterCode,
        from_time: format(date?.from, "yyyy-MM-dd"),
        to_time: format(date?.to, "yyyy-MM-dd"),
      },
    };

    console.log(newInputQuery);
    setInputQuery(newInputQuery);
  }, [queryType, deviceCode, parameterCode, date, queryName, setInputQuery]);

  return (
    <>
      <div className="flex flex-row">
        <Input
          className="h-12 w-32 text-sm mx-1"
          type="text"
          onChange={(e) => setQueryName(e.target.value)}
          value={queryName}
          placeholder="Query Name"
          required
        />
        <Select
          value={queryType}
          onValueChange={(value) => setQueryType(value)}
        >
          <SelectTrigger className="w-[180px] mx-1 h-12">
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

        {
          // if queryType is data-last or data-log or parameter-list
          queryType === "data-last" ||
          queryType === "data-log" ||
          queryType === "parameter-list" ? (
            <Select
              value={deviceCode}
              onValueChange={(value) => setDeviceCode(value)}
            >
              <SelectTrigger className="w-[200px] mx-1 h-12">
                <SelectValue placeholder="Select device name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Device Name</SelectLabel>
                  {deviceData &&
                    deviceData.device?.map((device: any) => (
                      <SelectItem key={device.code} value={device.code}>
                        {device.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : null
        }

        {
          // if queryType is data-log
          queryType === "data-log" ? (
            <Select
              value={parameterCode}
              onValueChange={(value) => setParameterCode(value)}
              className="mx-2"
            >
              <SelectTrigger className="w-[80px] mx-1 h-12">
                <SelectValue placeholder="Select parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Parameter</SelectLabel>
                  {parameters &&
                    parameters?.map((parameter: any) => (
                      <SelectItem key={parameter.code} value={parameter.code}>
                        {parameter.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : null
        }

        {
          // if data log
          queryType === "data-log" ? (
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    id="date"
                    className="flex h-12 w-[250px] items-center  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
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
                  </button>
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
          ) : null
        }
      </div>
      <div className="flex flex-col w-96 items-center justify-center">
        {children}
      </div>
    </>
  );
};

export default SelectionInput;
