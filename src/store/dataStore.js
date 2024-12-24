import { makeAutoObservable, runInAction } from "mobx";
import {
  getBuckets,
  validateFiles,
  transformFiles,
  downloadFiles,
} from "../service/dataService";

class DataStore {
  selectedBucket = "";
  selectedFormat = "FHIR XML Format";
  buckets = [];
  step = 0;
  validated = false;
  converted = false;

  isLoading = false;
  isValidateLoading = false;
  isTransformLoading = false;
  isDownloadLoading = false;

  validateStatusMsg = null;
  convertStatusMsg = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getBuckets() {
    try {
      this.isLoading = true;
      const data = await getBuckets();
      this.buckets = JSON.parse(data);
      runInAction(() => {
        this.isLoading = false;
        this.statusMsg = null;
      });
    } catch (error) {
      console.log("error ===>", error);
      runInAction(() => {
        this.isLoading = false;
        this.statusMsg = error;
      });
    }
  }

  // async validateFiles() {
  //   try {
  //     this.isValidateLoading = true;
  //     this.validateStatusMsg = null;
  //     const response = await validateFiles(this.selectedBucket);

  //     runInAction(() => {
  //       this.isValidateLoading = false;
  //       this.validateStatusMsg = JSON.parse(response);
  //       this.validated = true;
  //       this.step = 2;
  //     });
  //   } catch (error) {
  //     runInAction(() => {
  //       this.isValidateLoading = false;
  //       this.validateStatusMsg = error;
  //     });
  //   }
  // }

  async validateFiles() {
    try {
      this.isValidateLoading = true;
      this.validateStatusMsg = null;
      const response = await validateFiles(this.selectedBucket);
  
      runInAction(() => {
        this.isValidateLoading = false;
        try {
          // Log the response to check its structure
          console.log("API Response datastore:", response);
          // Assuming response is JSON string and needs parsing
          // this.validateStatusMsg = JSON.parse(response);
          this.validateStatusMsg = response;
          console.log("this.validateStatusMsg",this.validateStatusMsg);
          this.validated = true;
          this.step = 2;
        } catch (parseError) {
          // Handle JSON parsing errors
          console.error("Parsing Error:", parseError);
          this.validateStatusMsg = `Parsing Error: ${parseError.message}`;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.isValidateLoading = false;
        console.error("API Error:", error);
        this.validateStatusMsg = `API Error: ${error.message}`;
      });
    }
  }

  async transformFiles() {
    try {
      this.isTransformLoading = true;
      this.convertStatusMsg = null;
      const response = await transformFiles(
        this.selectedBucket,
        this.selectedFormat
      );

      runInAction(() => {
        this.isTransformLoading = false;
        this.convertStatusMsg = response;
        this.converted = true;
        this.step = 3;
      });
    } catch (error) {
      runInAction(() => {
        this.isTransformLoading = false;
        this.convertStatusMsg = error;
      });
    }
  }

  async downloadFiles() {
    try {
      this.isDownloadLoading = true;
      this.statusMsg = null;
      const response = await downloadFiles(this.selectedBucket);

      runInAction(() => {
        this.isDownloadLoading = false;
        this.statusMsg = response;
      });
    } catch (error) {
      runInAction(() => {
        this.isDownloadLoading = false;
        this.statusMsg = error;
      });
    }
  }

  changeBucket(bucket) {
    this.selectedBucket = bucket;
  }

  changeStep(step) {
    this.step = step;
  }

  resetState() {
    this.selectedBucket = "";
    this.validateStatusMsg = null;
    this.step = 0;
    this.convertStatusMsg = null;
    this.validated = false;
    this.converted = false;
  }
}

export default DataStore;
