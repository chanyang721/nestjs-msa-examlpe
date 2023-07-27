import { CookieOptions } from 'express'
import { PRODUCTION }    from '@app/utils'



export const COOKIE_ACCESS_TOKEN_OPTIONS = {
    httpOnly: true,
    secure  : process.env.NODE_ENV === PRODUCTION,
    maxAge  : 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: "none"
} as CookieOptions;

export const COOKIE_REFRESH_TOKEN_OPTIONS = {
    httpOnly: true,
    secure  : process.env.NODE_ENV === PRODUCTION,
    maxAge  : 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: "none"
} as CookieOptions;
