export async function loginAsUser(
  payload: LoginAsUserPayload,
): Promise<LoginAsUserResponse | null> {
  const res = await fetch(`${process.env.SERVER_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return res.ok ? await res.json() : null;
}

export interface LoginAsUserPayload {
  email: string;
  password: string;
}

export interface LoginAsUserResponse {
  token: string;
}
