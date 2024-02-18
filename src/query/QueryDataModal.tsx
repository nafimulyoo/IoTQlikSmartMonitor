"use client";

import QueryChart from "./QueryChart";

const QueryDataModal = ({ modalData }: any) => {
  const query_type = modalData.query_type;
  if (query_type === "alarm-log") {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="text-gray-900">Time</th>
            <th className="text-gray-900">Name</th>
            <th className="text-gray-900">Condition</th>
            <th className="text-gray-900">Parameter</th>
            <th className="text-gray-900">Value</th>
            <th className="text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody>
          {modalData.alarmlog.map((alarmlog, key) => (
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
    );
  }

  if (query_type === "device-list") {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="text-gray-900"></th>
            <th className="text-gray-900">Code</th>
            <th className="text-gray-900">Name</th>
          </tr>
        </thead>
        <tbody>
          {modalData.device.map((device, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{device.code}</td>
              <td>{device.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (query_type === "parameter-list") {
    return (
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
          {modalData.parameter.map((param, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{param.code}</td>
              <td>{param.name}</td>
              <td>{param.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (query_type === "data-last") {
    return (
      <>
        
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
            {modalData.datalast.map((data, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{data.parcode}</td>
                <td>{data.value}</td>
                <td>{data.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  if (query_type === "data-log") {
    return(
      <QueryChart data={modalData} />
    )
  }

  return (
    <div>
      <h1>Modal</h1>
      <h1 className="font-bold">{JSON.stringify(modalData.status)}</h1>
      <p>Structured Query:</p>
      <p>{JSON.stringify(modalData)}</p>
      <p>Results:</p>
    </div>
  );
};

export default QueryDataModal;
