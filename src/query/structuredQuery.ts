const baseUrl = "iot.ayou.id/api";
const getUrlFromStructuredQuery = (structuredQuery: any, token: string, site: string, username: string) => {
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
      url.searchParams.append("param", structuredQuery.parameters.join(","));
      url.searchParams.append("from", structuredQuery.from_time);
      url.searchParams.append("to", structuredQuery.to_time);
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
          "If applicable, contains the device code based on user input and data. Empty string if not applicable.",
      },
      parameters: {
        type: "string",
        description:
          "If the query type is 'data-log', contains the parameter code. Empty string if not applicable.",
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
    required: ["status", "query_type"],
  },
};

export { getUrlFromStructuredQuery, responseSchema };
