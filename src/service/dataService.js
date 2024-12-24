import axios from "../config/http";

export const getBuckets = async () => {
  try {
    const response = await axios.get("dev/buckets");
    return response.data.body;
  } catch (error) {
    throw error;
  }
};

// export const validateFiles = async (bucketName) => {
//   try {
//     const params = {
//       bucketName: bucketName,
//     };
//     const response = await axios.post("dev/validate", params);
//     return response.data.body;
//   } catch (error) {
//     throw error;
//   }
// };

export const validateFiles = async (bucketName) => {
  try {
    const params = {body:{
      source_bucket: bucketName
    }
    };
    const response = await axios.post("dev/validate", params);

    // Log the full response object to check its structure
    console.log("Full Response:", response);

    // Check if response.data and response.data.body exist
    if (response && response.data) {
      return response.data.body;
    } else {
      // Handle case where response data is not in the expected format
      console.error("Unexpected response format:", response);
      throw new Error("Unexpected response format.");
    }
  } catch (error) {
    console.error("Request Error:", error);
    throw error;
  }
};

export const transformFiles = async (bucketName, format) => {
  try {
    const params = {body:{
      source_bucket: bucketName,
      source_key: "intermediate_json/"
      // destination_bucket: "edi-to-fhir-output"
    }};
    // const params ={ body: JSON.stringify({
    //   source_bucket: bucketName,
    //   source_key: "intermediate_json/parsed_json_test.json",
    //   destination_bucket: "edi-to-fhir-output"
    // })}
    const response = await axios.post("dev/transform", params);

    // Log the full response object to check its structure
    console.log("Full Response:", response);

    // Check if response.data and response.data.body exist
    if (response && response.data) {
      return response.data.body;
    } else {
      // Handle case where response data is not in the expected format
      console.error("Unexpected response format:", response);
      throw new Error("Unexpected response format.");
    }
  } catch (error) {
    console.error("Request Error:", error);
    throw error;
  }
  };


export const downloadFiles = async (bucketName) => {
  try {
    const dataInfo = {
      type: "download-status",
      "Last Updated Date & Time": "01/17/2024 2:00 PM EST",
      "Total Number of Files": "1,000,000,000",
      "Validated Files": "800,000,000",
      "EDI 1 Files": "700,000,000",
      "EDI 2 Files": "100,000,000",
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dataInfo);
      }, 3000);
    });
  } catch (error) {
    throw error;
  }
};
