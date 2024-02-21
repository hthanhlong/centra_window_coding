interface REGION {
  usCali: string;
  Canada: string;
}

export class AWSConfig {
  protected static REGION = {
    usCali: "us-west-1",
    Canada: "ca-central-1",
  };
  protected static BUCKET = "example_bucket";

  constructor() {}

  static getRegion(key: keyof REGION) {
    return this.REGION[key];
  }

  static getBucket() {
    return this.BUCKET;
  }
}
