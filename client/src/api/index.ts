import { type User } from 'next-auth';
import { Api } from './Api';
export * from './data-contracts';
import { type HttpResponse } from './http-client';

export const api = new Api({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL });

export function getAuthorizationHeader(session: { user: User }) {
  return { Authorization: 'Bearer ' + session.user.authToken };
}

export function getErrorMessage(
  res: HttpResponse<unknown, { message?: string; detail?: string }>,
) {
  return res.error.message ?? res.error.detail;
}

export function throwFromResponse(res: Parameters<typeof getErrorMessage>[0]) {
  if (!res.ok) {
    throw new Error(getErrorMessage(res));
  }
}
