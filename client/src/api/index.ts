import { type User } from 'next-auth';
import { Api } from './Api';
export * from './data-contracts';
import { type HttpResponse } from './http-client';

export const api = new Api({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL });

export function getAuthorizationHeader(session: { user: User }) {
  return { Authorization: 'Bearer ' + session.user.authToken };
}

export function throwFromResponse(
  res: HttpResponse<unknown, { message: string }>,
) {
  if (!res.ok) {
    throw new Error(res.error.message);
  }
}
