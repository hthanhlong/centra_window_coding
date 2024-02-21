import { Request, Response } from "express";
import { getBucketParams } from "../utils";
import { S3custom } from "../config";

export class AWSHandler {
  constructor() {}

  static generateUploadURL(req: Request, res: Response) {
    const fileName = req.body.fileName;
    const params = getBucketParams(fileName);

    S3custom.getSignedUrl("putObject", params, (err, url) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error generating pre-signed URL.");
      }
      res.status(200).json({ uploadUrl: url });
    });
  }
}
