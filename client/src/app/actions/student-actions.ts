'use server';

import { auth } from '@/shared/lib/auth';
import { api, getAuthorizationHeader, getErrorMessage, InvitationRequestDTO, throwFromResponse } from '@/api';

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

  if (!res.ok) {
    throw new Error(getErrorMessage(res));
  }

  const responseData = res.data as any;
  if (responseData?.failedEmails && responseData.failedEmails[data.email]) {
    const error = responseData.failedEmails[data.email];
    throw new Error(`Convite falhou: ${error.message || error.error}`);
  }

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
  console.log("Inviting students batch:", payload);
  const res = await api.inviteStudents(payload, {
    format: "json",
    headers: getAuthorizationHeader(session),
  });

  if (!res.ok) {
    throw new Error(getErrorMessage(res));
  }

  const responseData = res.data as any;
  if (responseData?.failedEmails && Object.keys(responseData.failedEmails).length > 0) {
    const failedEmails = Object.entries(responseData.failedEmails)
      .map(([email, error]: any) => `${email}: ${error.message || error.error}`)
      .join('\n');
    
    throw new Error(`Alguns convites falharam:\n${failedEmails}`);
  }

  return { success: true, count: responseData?.successfulEmails?.length ?? data.emails.length };
}