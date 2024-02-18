import { supabase } from "@/lib/initSupabase";
import axios from "axios"


export async function getDeviceData(session, updateDevice = false) {
    if (!updateDevice) {

      let { data: savedData, error } = await supabase
        .from("Device Data")
        .select("*")
        .eq("username", session.username)
        .single();

  
      if (error) {
        console.error("Error fetching device data from supabase:", error);
        throw new Error("Error fetching device data");
      }
  
      if (savedData && savedData.device_data) {
        console.log("Using saved device data");
        return savedData.device_data;
      }
    }
    console.log("Fetching and saving device data");
    const deviceData = await fetchAndSaveDeviceData(session);
    return deviceData;
  }
  
  async function fetchAndSaveDeviceData(session) {
    const deviceListUrl = "https://iot.ayou.id/api/devicelist";
  
    try {
      const deviceListResponse = await axios.post(deviceListUrl, {
        token: session.token,
        site: session.site,
      });
  
      const jsonString = deviceListResponse.data.substring(
        deviceListResponse.data.indexOf("{")
      );
      const deviceListJsonValue = JSON.parse(jsonString);
  
      console.log("Device List JSON Value:");
      console.log(deviceListJsonValue);
  
      for (let device of deviceListJsonValue.device) {
        const deviceCode = device.code;
        const parameterListUrl = "https://iot.ayou.id/api/parlist";
  
        try {
          const parameterListResponse = await axios.post(parameterListUrl, {
            token: session.token,
            site: session.site,
            device: deviceCode,
          });
          const jsonString = parameterListResponse.data.substring(
            parameterListResponse.data.indexOf("{")
          );
          const parameterListJsonValue = JSON.parse(jsonString);
          device["parameters"] = parameterListJsonValue;
        } catch (error) {
          console.error(
            `Error fetching parameters for device ${deviceCode}: ${error}`
          );
          device["parameters"] = {
            error: "Error fetching parameters for this device",
          };
        }
      }
  
      const { data, error } = await supabase.from("Device Data").upsert({
        username: session.username,
        device_data: deviceListJsonValue,
      });
      if (error) {
        console.error("Error saving device data to supabase:", error);
        throw new Error("Error saving device data");
      }
      return deviceListJsonValue;
    } catch (error) {
      console.error(`Error fetching device list: ${error}`);
      throw new Error("Error fetching device list");
    }
  }