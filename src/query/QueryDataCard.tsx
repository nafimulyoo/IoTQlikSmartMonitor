"use client";

import QueryChart from "./QueryChart";
import { ScrollArea } from "@/components/ui/scroll-area";

const QueryDataModal = ({ data }: any) => {
  const query_type = data?.query_type;
  
  if (query_type === "alarm-log") {
    return (
      <ScrollArea className="h-48 w-11/12 flex flex-col items-center justify-center">
        <table className="table w-full mr-4">
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
    );
  }

  if (query_type === "device-list") {
    return (
      <ScrollArea className="h-48 w-11/12 flex flex-col items-center justify-center">
        <table className="table w-full mr-4">
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
    );
  }

  if (query_type === "parameter-list") {
    return (
      <ScrollArea className="h-48 w-11/12 flex flex-col items-center justify-center">
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
    );
  }

  if (query_type === "data-last") {
    return (
      <>
        <ScrollArea className="h-48 w-11/12 flex flex-col items-center justify-center">
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
      </>
    );
  }

  if (query_type === "data-log") {
    return (
      <ScrollArea className="h-48 w-11/12 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <QueryChart data={data} />
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-48 w-11/12 flex flex-col items-center justify-center"></ScrollArea>
  );
};

export default QueryDataModal;
