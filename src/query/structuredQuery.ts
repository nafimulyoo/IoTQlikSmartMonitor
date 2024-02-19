
const baseUrl = "iot.ayou.id/api";
const getUrlFromStructuredQuery = (
  structuredQuery: any,
  token: string,
  site: string,
  username: string
) => {
  let url;

  switch (structuredQuery.query_type) {
    case "device-list":
      url = new URL(`https://${baseUrl}/devicelist`);
      break;
    case "parameter-list":
      url = new URL(`https://${baseUrl}/parlist`);
      url.searchParams.append("device", structuredQuery.device_code);
      break;
    case "data-last":
      url = new URL(`https://${baseUrl}/datalast`);
      url.searchParams.append("device", structuredQuery.device_code);
      break;
    case "alarm-log":
      url = new URL(`https://${baseUrl}/alarmlog`);
      break;
    case "data-log":
      url = new URL(`https://${baseUrl}/datalog`);
      url.searchParams.append("device", structuredQuery.device_code);
      const parameters = structuredQuery.parameters.split(",");
      for (let param of parameters) {
        url.searchParams.append("param[]", param);
      }
      const from_time = structuredQuery.from_time + " 00:00:00"
      const to_time = structuredQuery.to_time + " 00:00:00"
      console.log(from_time, to_time);
      url.searchParams.append("from", from_time);
      url.searchParams.append("to", to_time);
      break;
    default:
      throw new Error("Unsupported query type");
  }

  // Common parameters for all requests
  url.searchParams.append("token", token);
  url.searchParams.append("site", site);

  console.log(url.href);
  return url.href;
};

// function getSelection(session)  {
//   const structuredQuerySelection =  {
//     label: 'Query Type',
//     value: '',
//     children: [
//       {
//         label: 'Device List',
//         value: 'device-list',
//         children: []
//       },
//       {
//         label: 'Parameter List',
//         value: 'parameter-list',
//         children: [
//           { label: 'Incoming PLN', 
//             value: 'mcdpm1', 
//             children: [] },
//           { label: 'Incoming PLN', 
//             value: 'mcdpm1', 
//             children: [] },
//         ]
//       },
//       {
//         label: 'Data Last',
//         value: 'data-last',
//         children: [
//           { label: 'Incoming PLN', 
//             value: 'mcdpm1', 
//             children: [] },
//           { label: 'Incoming PLN', 
//             value: 'mcdpm1', 
//             children: [] },
//         ]
//       },
//       {
//         label: 'Alarm Log',
//         value: 'alarm-log',
//         children: []
//       },
//       {
//         label: 'Data Log',
//         value: 'data-log',
//         children: [
//           { label: 'Incoming PLN', 
//             value: 'mcdpm1', 
//             children: [
//               { 
//                 label: 'Voltage',
//                 value: 'voltage',
//                 children: []
//               }
//             ] },
//           { label: 'Incoming PLN', 
//             value: 'mcdpm1', 
//             children: [
//               { 
//                 label: 'Voltage',
//                 value: 'voltage',
//                 children: []
//               }
//             ]
//           },
//         ]
//       }
//     ]
//   }
//   return structuredQuerySelection;
// }
// for branching selection


const getResponseSchema = (deviceData: string) => {
const responseSchema = {
  name: "responseSchema",
  description:
    "Schema defining the structure of responses based on user queries.",
  parameters: {
    type: "object",
    properties: {
      status: {
        type: "string",
        description:
          "Indicates the status of the response: 'success' if the response is successful and according to plan. If failed, a string is returned to explain why the operation failed.",
      },
      query_name: {
        type: "string",
        description: "Enter a concise, memorable name for your query. Choose up to three words that summarize the querys purpose or content, such as [Device Name] Voltage Readings, Alarm Log, or Weekly Voltage History. A well-chosen name helps you easily identify and refer back to the query in the future.",
      },
      query_type: {
        type: "string",
        enum: [
          "device-list",
          "parameter-list",
          "data-last",
          "alarm-log",
          "data-log",
        ],
        description: "Specifies the type of user-inputted query .",
      },
      device_code: {
        type: "string",
        description:
          `If applicable, contains the device code based on user input and data. Empty string if not applicable. This is the device data and parameter data ${deviceData}`
      },
      parameters: {
        type: "string",
        description:
          "If the query type is 'data-log', contains the parameter code. Empty string if not applicable, only get one parameter.",
      },
      from_time: {
        type: "string",
        description:
          "For 'data-log' queries, contains the starting time in the format YYYY-MM-DD HH:MM:SSS. Empty string if not applicable.",
      },
      to_time: {
        type: "string",
        description:
          "For 'data-log' queries, contains the ending time in the format YYYY-MM-DD HH:MM:SSS. Empty string if not applicable.",
      },
    },
    required: ["status", "query_name", "query_type"],

  },
};
  return responseSchema;
}

export { getUrlFromStructuredQuery, getResponseSchema
  // , 
  // getSelection 
};
