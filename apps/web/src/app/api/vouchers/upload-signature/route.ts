/**
 * Issue a short-lived Cloudinary upload signature scoped to the caller's
 * workspace, so the browser can upload a voucher image directly without the
 * API secret ever reaching the client.
 */
import { createVoucherUploadSignature, isCloudinaryConfigured } from "@/server/cloudinary";
import { handleRoute } from "@/server/api/handleRoute";
import { jsonNoStore } from "@/server/api/noStore";
import { extractWorkspaceId } from "@/server/userId";

export const dynamic = "force-dynamic";

export const POST = async (request: Request): Promise<Response> =>
  handleRoute(
    {
      route: "/api/vouchers/upload-signature",
      method: "POST",
      internalErrorMessage: "Could not create upload signature",
    },
    async (): Promise<Response> => {
      if (!isCloudinaryConfigured()) {
        return jsonNoStore(
          { error: "Cloudinary is not configured on this deployment" },
          { status: 503 },
        );
      }

      const workspaceId = extractWorkspaceId(request);
      return jsonNoStore(createVoucherUploadSignature(workspaceId));
    },
  );
