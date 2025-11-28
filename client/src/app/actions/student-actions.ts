'use server';

import { auth } from '@/shared/lib/auth';
import { api, getAuthorizationHeader, InvitationRequestDTO, throwFromResponse } from '@/api';

export async function inviteStudent(data: {
  email: string;
  studentGroup: number;
}) {
  const session = await auth();
  
  if (!session) {
    throw new Error('Não autenticado');
  }

  const payload: InvitationRequestDTO = {
    emails: [data.email],
    studentGroup: data.studentGroup,
    entryDate: new Date().toISOString().split("T")[0],
  };

  const res = await api.inviteStudents(payload, {
    format: "json",
    headers: getAuthorizationHeader(session),
  });

  throwFromResponse(res);

  return { success: true };
}

export async function inviteStudentsBatch(data: {
  emails: string[];
  studentGroup: number;
}) {
  const session = await auth();
  
  if (!session) {
    throw new Error('Não autenticado');
  }

  const payload: InvitationRequestDTO = {
    emails: data.emails,
    studentGroup: data.studentGroup,
    entryDate: new Date().toISOString().split("T")[0],
  };

  const res = await api.inviteStudents(payload, {
    format: "json",
    headers: getAuthorizationHeader(session),
  });

  throwFromResponse(res);

  return { success: true, count: data.emails.length };
}