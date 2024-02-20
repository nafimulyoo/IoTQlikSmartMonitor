"use client";

import QueryChart from "./QueryChart";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const QueryDataModal = ({ modalInput, children }: any) => {

  const data = modalInput?.data;
  const structured_query = modalInput?.structured_query;
  const query_type = data?.query_type;
  
  
  if (query_type === "alarm-log") {
    return (
      <DialogContent className=" max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {
            structured_query?.query_name
            }
          </DialogTitle>
          <DialogDescription>
            Alarm Log Data returned from the querys
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 w-full flex flex-col items-center justify-center">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-gray-900">`Time`</th>
                <th className="text-gray-900">Name</th>
                <th className="text-gray-900">Condition</th>
                <th className="text-gray-900">Parameter</th>
                <th className="text-gray-900">Value</th>
                <th className="text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.alarmlog.map((alarmlog, key) => (
                <tr key={key}>
                  <td>{alarmlog.occur_at}</td>
                  <td>{alarmlog.name}</td>
                  <td>{alarmlog.conditstr}</td>
                  <td>{alarmlog.param}</td>
                  <td>{alarmlog.value}</td>
                  <td>{alarmlog.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
        <DialogClose asChild>{children}</DialogClose>
      </DialogContent>
    );
  }

  if (query_type === "device-list") {
    return (
      <DialogContent className=" max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {structured_query.query_name}
          </DialogTitle>
          <DialogDescription>
            Device List Data returned from the querys
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 w-full flex flex-col items-center justify-center">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-gray-900"></th>
                <th className="text-gray-900">Code</th>
                <th className="text-gray-900">Name</th>
              </tr>
            </thead>
            <tbody>
              {data.device.map((device, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{device.code}</td>
                  <td>{device.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
        <DialogClose asChild>{children}</DialogClose>
      </DialogContent>
    );
  }

  if (query_type === "parameter-list") {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {structured_query.query_name}
            </DialogTitle>
          <DialogDescription>
            Parameter List Data returned from the querys
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 w-full flex flex-col items-center justify-center">
          <table className="table">
            <thead>
              <tr>
                <th className="text-gray-900"></th>
                <th className="text-gray-900">Code</th>
                <th className="text-gray-900">Name</th>
                <th className="text-gray-900">Unit</th>
              </tr>
            </thead>
            <tbody>
              {data.parameter.map((param, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{param.code}</td>
                  <td>{param.name}</td>
                  <td>{param.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
        <DialogClose asChild>{children}</DialogClose>
      </DialogContent>
    );
  }

  if (query_type === "data-last") {
    return (
      <>
        <DialogContent className=" max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {structured_query.query_name}
              </DialogTitle>
            <DialogDescription>
              Last Data returned from the querys
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-96 w-full flex flex-col items-center justify-center">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-gray-900"></th>
                  <th className="text-gray-900">Code</th>
                  <th className="text-gray-900">Value</th>
                  <th className="text-gray-900">Updated at</th>
                </tr>
              </thead>
              <tbody>
                {data.datalast.map((data, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{data.parcode}</td>
                    <td>{data.value}</td>
                    <td>{new Date(data.updated_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
          <DialogClose asChild>{children}</DialogClose>
        </DialogContent>
      </>
    );
  }

  if (query_type === "data-log") {
    
    return (
      <DialogContent className=" max-w-5xl">
      <DialogHeader>
        <DialogTitle>
        {structured_query.query_name}
        </DialogTitle>
        <DialogDescription>
          Data Log Data returned from the querys
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-[28rem] w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
    <QueryChart data={data} />
        </div>
    </ScrollArea>
    <DialogClose asChild>{children}</DialogClose>
    </DialogContent>
    )
  } 

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
        </DialogTitle>
        <DialogDescription>

        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-96 w-full flex flex-col items-center justify-center">
    
      </ScrollArea>
      <DialogClose asChild>{children}</DialogClose>
    </DialogContent>
  );
}

export default QueryDataModal;
