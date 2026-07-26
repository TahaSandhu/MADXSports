import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthFromRequest, TokenPayload } from "../core/jwt";

/**
 * Call at the top of a protected handler.
 * Returns the decoded token payload, or writes a 401 response and returns null.
 */
export function requireAuth(
    req: NextApiRequest,
    res: NextApiResponse
): TokenPayload | null {
    const auth = getAuthFromRequest(req);
    if (!auth) {
        res.status(401).json({ message: "Unauthorized" });
        return null;
    }
    return auth;
}

/**
 * Call after requireAuth to additionally restrict to admins.
 */
export function requireAdmin(
    req: NextApiRequest,
    res: NextApiResponse
): TokenPayload | null {
    const auth = requireAuth(req, res);
    if (!auth) return null;

    if (auth.role !== "admin") {
        res.status(403).json({ message: "Forbidden: admin access required" });
        return null;
    }
    return auth;
}