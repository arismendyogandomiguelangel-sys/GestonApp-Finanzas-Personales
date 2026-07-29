/**
 * Signed Cloudinary uploads for voucher images.
 *
 * The API secret never leaves the server: the browser asks this module for a
 * short-lived signature, then uploads the file straight to Cloudinary. That
 * keeps large images off the serverless function and out of its payload limit.
 *
 * Uploads are pinned to a per-workspace folder so one workspace's receipts can
 * never be written into another's namespace.
 */
import { createHash } from "node:crypto";

export type CloudinarySignature = Readonly<{
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
  uploadUrl: string;
}>;

type CloudinaryConfig = Readonly<{
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}>;

export const isCloudinaryConfigured = (): boolean =>
  (process.env.CLOUDINARY_CLOUD_NAME ?? "") !== ""
  && (process.env.CLOUDINARY_API_KEY ?? "") !== ""
  && (process.env.CLOUDINARY_API_SECRET ?? "") !== "";

const getConfig = (): CloudinaryConfig => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "";
  const apiKey = process.env.CLOUDINARY_API_KEY ?? "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET ?? "";
  if (cloudName === "" || apiKey === "" || apiSecret === "") {
    throw new Error(
      "Cloudinary is not configured: set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET",
    );
  }
  return { cloudName, apiKey, apiSecret };
};

/**
 * Cloudinary signs the alphabetically sorted `key=value` pairs joined by `&`,
 * with the API secret appended, hashed with SHA-1.
 */
const sign = (params: Readonly<Record<string, string>>, apiSecret: string): string => {
  const canonical = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(`${canonical}${apiSecret}`).digest("hex");
};

export const createVoucherUploadSignature = (workspaceId: string): CloudinarySignature => {
  const { cloudName, apiKey, apiSecret } = getConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `gfp/vouchers/${workspaceId}`;

  return {
    cloudName,
    apiKey,
    timestamp,
    folder,
    signature: sign({ folder, timestamp: String(timestamp) }, apiSecret),
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  };
};

/**
 * Reject anything that is not a Cloudinary URL under this project's cloud, so a
 * caller cannot persist an arbitrary external URL as a voucher image.
 */
export const isOwnCloudinaryUrl = (url: string): boolean => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "";
  if (cloudName === "") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:"
      && parsed.hostname === "res.cloudinary.com"
      && parsed.pathname.startsWith(`/${cloudName}/`);
  } catch {
    return false;
  }
};
