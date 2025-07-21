export async function getUserInfo(
  token: string,
): Promise<UserInfoResponse | null> {
  const res = await fetch(`${process.env.SERVER_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.ok ? await res.json() : null;
}

export interface UserInfoResponse {
  id: string;
  name: string;
  email: string;
  photoUrl: string | null;
  dtype: string;
}
