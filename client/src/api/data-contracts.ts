/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface StudentResponseDTO {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  name: string;
  photoUrl?: string;
  academicRecordUrl?: string;
  about?: string;
  /** @format date */
  birthDate?: string;
  course?: "COMPUTER_SCIENCE" | "COMPUTER_ENGINEERING";
  registration?: string;
  phone?: string;
  secondaryPhone?: string;
  /** @format int32 */
  period?: number;
  entryPeriod?: string;
  /** @minLength 1 */
  dtype: string;
  /** @minLength 1 */
  email: string;
  /**
   * @format date
   * @minLength 1
   */
  entryDate: string;
  /** @format int32 */
  studentGroup: number;
  /** @format double */
  ira: number;
}

export interface GradeUpdateDTO {
  subjectStatus: "ENROLLED" | "APPROVED" | "REPROVED";
  /** @format double */
  finalGrade: number;
  /** @minLength 1 */
  subjectId: string;
  /** @format int32 */
  period: number;
  /**
   * @format email
   * @minLength 1
   */
  studentEmail: string;
}

export interface GradeResponseDTO {
  subjectStatus?: "ENROLLED" | "APPROVED" | "REPROVED";
  /** @format double */
  finalGrade?: number;
  subjectCode?: string;
  /** @format int32 */
  period?: number;
  studentId?: string;
}

export interface AdministratorUpdateDTO {
  /** @minLength 1 */
  name: string;
  /**
   * @minLength 0
   * @maxLength 2600
   */
  about?: string;
}

export interface AdministratorResponseDTO {
  id?: string;
  name?: string;
  email?: string;
  about?: string;
  photoUrl?: string;
}

export interface ActivityUpdateDTO {
  activityType: "RESEARCH" | "TUTORING" | "INTERNSHIP" | "OTHERS";
  activityId: string;
  /** @minLength 1 */
  name: string;
  /**
   * @format email
   * @minLength 1
   */
  studentEmail: string;
  /** @minLength 1 */
  description: string;
  /**
   * @format int32
   * @min 1
   */
  workShift: number;
  /** @pattern ^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$ */
  startDate: string;
  /** @pattern ^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$ */
  conclusionDate?: string;
  onGoing: boolean;
  paid?: boolean;
}

export interface ActivityResponseDTO {
  activityId?: string;
  activityType?: "RESEARCH" | "TUTORING" | "INTERNSHIP" | "OTHERS";
  name?: string;
  description?: string;
  /** @format int32 */
  workShift?: number;
  /** @format date */
  startDate?: string;
  /** @format date */
  conclusionDate?: string;
  onGoing?: boolean;
  paid?: boolean;
}

export interface StudentCreateDTO {
  /**
   * @minLength 8
   * @maxLength 20
   */
  password: string;
  /** @minLength 1 */
  activationCode: string;
}

export interface StudentTerminateDTO {
  /** @minLength 1 */
  terminationReason: string;
}

export interface InvitationRequestDTO {
  emails: string[];
  /** @format int32 */
  studentGroup: number;
  /** @format date */
  entryDate: string;
}

export interface InvitationErrorDTO {
  error?: "ALREADY_INVITED" | "ALREADY_REGISTERED" | "SMTP_ERROR";
  cause?: string;
}

export interface InvitationSendResponseDTO {
  successfulEmails: string[];
  failedEmails: Record<string, InvitationErrorDTO>;
}

export interface GradeCreateDTO {
  /** @minLength 1 */
  subjectCode: string;
  /**
   * @format email
   * @minLength 1
   */
  studentEmail: string;
  /**
   * @format int32
   * @min 1
   * @max 15
   */
  period: number;
  /**
   * @format double
   * @min 0
   * @max 10
   */
  finalGrade?: number;
  subjectStatus: "ENROLLED" | "APPROVED" | "REPROVED";
}

export interface ResetPasswordRequestDTO {
  /** @minLength 1 */
  token: string;
  /**
   * @minLength 8
   * @maxLength 20
   */
  password: string;
}

export interface SignInRequestDTO {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * @minLength 8
   * @maxLength 20
   */
  password: string;
}

export interface SignInResponseDTO {
  /** @minLength 1 */
  token: string;
}

export interface ForgotPasswordRequestDTO {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
}

export interface ChangePasswordRequestDTO {
  /** @minLength 1 */
  oldPassword: string;
  /**
   * @minLength 8
   * @maxLength 20
   */
  newPassword: string;
}

export interface AdministratorCreateDTO {
  name: string;
  /** @format email */
  email: string;
  about: string;
}

export interface ActivityCreateDTO {
  activityType: "RESEARCH" | "TUTORING" | "INTERNSHIP" | "OTHERS";
  /** @minLength 1 */
  name: string;
  /**
   * @format email
   * @minLength 1
   */
  studentEmail: string;
  /** @minLength 1 */
  description: string;
  /**
   * @format int32
   * @min 1
   */
  workShift: number;
  /** @pattern ^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$ */
  startDate: string;
  conclusionDate?: string;
  onGoing: boolean;
  paid?: boolean;
}

export interface StudentUpdateDTO {
  /** @minLength 1 */
  name: string;
  /** @format date */
  birthDate: string;
  course: "COMPUTER_SCIENCE" | "COMPUTER_ENGINEERING";
  /**
   * @minLength 8
   * @maxLength 8
   * @pattern \d+
   */
  registration: string;
  /**
   * @minLength 1
   * @pattern \d{2}9\d{8}
   */
  phone: string;
  /** @pattern (\d{2}9\d{8})|($) */
  secondaryPhone?: string;
  /**
   * @format int32
   * @min 1
   * @max 15
   */
  period: number;
  /**
   * @minLength 1
   * @pattern \d{4}\.[1-2]
   */
  entryPeriod: string;
  /**
   * @minLength 0
   * @maxLength 2600
   */
  about?: string;
}

export interface SubjectResponseDTO {
  code?: string;
  name?: string;
  /** @format int32 */
  workload?: number;
}

export interface StudentGradesDTO {
  subjectCode?: string;
  subjectStatus?: "ENROLLED" | "APPROVED" | "REPROVED";
  studentId?: string;
  /** @format int32 */
  period?: number;
  /** @format double */
  finalGrade?: number;
  name?: string;
  workload?: string;
}

export interface CurrentUserInfoDTO {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  email: string;
  photoUrl?: string;
  /** @minLength 1 */
  dtype: string;
}

export interface GradeDeleteDTO {
  /** @minLength 1 */
  subjectCode: string;
  /**
   * @format email
   * @minLength 1
   */
  studentEmail: string;
  /**
   * @format int32
   * @min 1
   * @max 15
   */
  period: number;
}

export interface ActivityDeleteDTO {
  /** @minLength 1 */
  activityId: string;
  /**
   * @format email
   * @minLength 1
   */
  studentEmail: string;
}
