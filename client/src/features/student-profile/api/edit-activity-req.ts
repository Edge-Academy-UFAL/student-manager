'use server';

import { auth } from '@/shared/lib/auth';
import { revalidateTag } from 'next/cache';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editActivity = async (data: any) => {
  'use server';

  const session = await auth();
  const token = session?.user.authToken;

  data.studentEmail = session?.user.email;

  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/activities`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Erro ao editar as atividades');
    }

    revalidateTag('user-data');

    return {
      status: res.status,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
    };
  }
};
