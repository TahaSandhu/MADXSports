import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../models/auth/schema";

const COOKIE_NAME = "madx_token";

interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
    path?: string;
    maxAge?: number;
}

function serializeCookie(name: string, value: string, options: CookieOptions = {}) {
    let str = `${name}=${encodeURIComponent(value)}`;
    if (options.maxAge !== undefined) str += `; Max-Age=${options.maxAge}`;
    if (options.path) str += `; Path=${options.path}`;
    if (options.httpOnly) str += `; HttpOnly`;
    if (options.secure) str += `; Secure`;
    if (options.sameSite) str += `; SameSite=${options.sameSite[0].toUpperCase()}${options.sameSite.slice(1)}`;
    return str;
}

function parseCookies(header: string): Record<string, string> {
    const result: Record<string, string> = {};
    header.split(";").forEach((pair) => {
        const idx = pair.indexOf("=");
        if (idx === -1) return;
        const key = pair.slice(0, idx).trim();
        const value = pair.slice(idx + 1).trim();
        if (key) result[key] = decodeURIComponent(value);
    });
    return result;
}

export interface TokenPayload {
    id: string;
    email: string;
    role: "user" | "admin";
}

export const generateToken = (user: IUser): string => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );
};

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};

export const setAuthCookie = (res: NextApiResponse, token: string) => {
    const cookie = serializeCookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    });
    res.setHeader("Set-Cookie", cookie);
};

export const clearAuthCookie = (res: NextApiResponse) => {
    const cookie = serializeCookie(COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
    res.setHeader("Set-Cookie", cookie);
};

export const getAuthFromRequest = (req: NextApiRequest): TokenPayload | null => {
    const cookies = req.cookies ?? parseCookies(req.headers.cookie || "");
    const token = (cookies as any)[COOKIE_NAME];
    if (!token) return null;

    try {
        return verifyToken(token);
    } catch {
        return null;
    }
};