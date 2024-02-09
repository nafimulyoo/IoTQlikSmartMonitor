const baseUrl = "iot.ayou.id/api";
const getUrlFromStructuredQuery = (structuredQuery: any, token: string, site: string, username: string) => {
  var url;

  if (structuredQuery.query_type === "device-list") {
    url = new URL(`https://${baseUrl}/data`);
    url.searchParams.append("token", token);
    url.searchParams.append("site", site);
    url.searchParams.append("type", "device-list");
  }
  if (structuredQuery.query_type === "parameter-list") {
    url = new URL(`https://${baseUrl}/data`);
    url.searchParams.append("token", token);
    url.searchParams.append("site", site);
    url.searchParams.append("type", "parameter-list");
    url.searchParams.append("device_code", structuredQuery.device_code);
  }
  if (structuredQuery.query_type === "data-last") {
    url = new URL(`https://${baseUrl}/data`);
    url.searchParams.append("token", token);
    url.searchParams.append("site", site);
    url.searchParams.append("type", "data-last");
    url.searchParams.append("device_code", structuredQuery.device_code);
    url.searchParams.append("parameters", structuredQuery.parameters);
  }
  if (structuredQuery.query_type === "alarm-log") {
    console.log("ALARM LOG");
    url = new URL(`https://${baseUrl}/alarmlog`);
    url.searchParams.append("token", token);
    url.searchParams.append("site", site);
  }
  if (structuredQuery.query_type === "data-log") {
    url = new URL(`https://${baseUrl}/alarmlog`);
    url.searchParams.append("token", token);
    url.searchParams.append("site", site);
    url.searchParams.append("type", "data-log");
    url.searchParams.append("device_code", structuredQuery.device_code);
    url.searchParams.append("parameters", structuredQuery.parameters);
    url.searchParams.append("from_time", structuredQuery.from_time);
    url.searchParams.append("to_time", structuredQuery.to_time);
  }
  if (structuredQuery.query_type === "error") {
    url = new URL(`https://${baseUrl}/data`);
    url.searchParams.append("type", "error");
  }
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
