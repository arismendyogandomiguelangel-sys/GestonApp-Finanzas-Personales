/**
 * Voucher records extracted from receipt images (vouchers_ocr).
 *
 * GET  — list the workspace's vouchers, newest first.
 * POST — persist an extracted voucher. The image URL must point at this
 *        project's own Cloudinary cloud so an arbitrary external URL cannot be
 *        stored and later rendered as if it were ours.
 */
import { z } from "zod";

import { isOwnCloudinaryUrl } from "@/server/cloudinary";
import { handleRoute } from "@/server/api/handleRoute";
import { jsonNoStore } from "@/server/api/noStore";
import { queryAs } from "@/server/db";
import { extractUserId, extractWorkspaceId } from "@/server/userId";

export const dynamic = "force-dynamic";

const voucherSchema = z.object({
  imageUrl: z.string().url().nullable().optional(),
  rncIssuer: z.string().trim().max(32).nullable().optional(),
  issuerName: z.string().trim().max(200).nullable().optional(),
  ncf: z.string().trim().max(32).nullable().optional(),
  totalAmount: z.number().finite().nonnegative(),
  itbisAmount: z.number().finite().nonnegative().default(0),
  voucherDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u),
  category: z.string().trim().max(80).default("General"),
});

export const GET = async (request: Request): Promise<Response> =>
  handleRoute(
    { route: "/api/vouchers", method: "GET", internalErrorMessage: "Database query failed" },
    async (): Promise<Response> => {
      const result = await queryAs(
        extractUserId(request),
        extractWorkspaceId(request),
        `SELECT id, image_url, rnc_issuer, issuer_name, ncf,
                total_amount, itbis_amount, voucher_date, category, status, created_at
           FROM vouchers_ocr
          ORDER BY created_at DESC
          LIMIT 200`,
        [],
      );
      return jsonNoStore({ vouchers: result.rows });
    },
  );

export const POST = async (request: Request): Promise<Response> =>
  handleRoute(
    { route: "/api/vouchers", method: "POST", internalErrorMessage: "Could not save voucher" },
    async (): Promise<Response> => {
      const parsed = voucherSchema.safeParse(await request.json().catch(() => null));
      if (!parsed.success) {
        return jsonNoStore({ error: "Invalid voucher payload" }, { status: 400 });
      }

      const voucher = parsed.data;
      const imageUrl = voucher.imageUrl ?? null;
      if (imageUrl !== null && !isOwnCloudinaryUrl(imageUrl)) {
        return jsonNoStore({ error: "imageUrl must be a Cloudinary URL of this project" }, { status: 400 });
      }

      const workspaceId = extractWorkspaceId(request);
      const result = await queryAs(
        extractUserId(request),
        workspaceId,
        `INSERT INTO vouchers_ocr (
           workspace_id, image_url, rnc_issuer, issuer_name, ncf,
           total_amount, itbis_amount, voucher_date, category
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING id, image_url, rnc_issuer, issuer_name, ncf,
                   total_amount, itbis_amount, voucher_date, category, status, created_at`,
        [
          workspaceId,
          imageUrl,
          voucher.rncIssuer ?? null,
          voucher.issuerName ?? null,
          voucher.ncf ?? null,
          voucher.totalAmount,
          voucher.itbisAmount,
          voucher.voucherDate,
          voucher.category,
        ],
      );

      return jsonNoStore({ voucher: result.rows[0] }, { status: 201 });
    },
  );
