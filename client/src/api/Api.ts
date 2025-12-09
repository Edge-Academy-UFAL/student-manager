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

import {
  ActivityCreateDTO,
  ActivityDeleteDTO,
  ActivityResponseDTO,
  ActivityUpdateDTO,
  AdministratorCreateDTO,
  AdministratorResponseDTO,
  AdministratorUpdateDTO,
  ChangePasswordRequestDTO,
  CurrentUserInfoDTO,
  ForgotPasswordRequestDTO,
  GradeCreateDTO,
  GradeDeleteDTO,
  GradeResponseDTO,
  GradeUpdateDTO,
  InvitationRequestDTO,
  InvitationSendResponseDTO,
  ResetPasswordRequestDTO,
  SignInRequestDTO,
  SignInResponseDTO,
  StudentCreateDTO,
  StudentGradesDTO,
  StudentResponseDTO,
  StudentTerminateDTO,
  StudentUpdateDTO,
  SubjectResponseDTO,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags student-controller
   * @name UpdateStudentAcademicRecordByEmail
   * @request PUT:/api/v1/students/{email}/record
   */
  updateStudentAcademicRecordByEmail = (
    email: string,
    data: {
      /** @format binary */
      photo: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<StudentResponseDTO, any>({
      path: `/api/v1/students/${email}/record`,
      method: "PUT",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags student-controller
   * @name UpdateStudentPhotoByEmail
   * @request PUT:/api/v1/students/{email}/photo
   */
  updateStudentPhotoByEmail = (
    email: string,
    data: {
      /** @format binary */
      photo: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<StudentResponseDTO, any>({
      path: `/api/v1/students/${email}/photo`,
      method: "PUT",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags grade-controller
   * @name UpdateGrade
   * @request PUT:/api/v1/grades
   */
  updateGrade = (data: GradeUpdateDTO, params: RequestParams = {}) =>
    this.request<GradeResponseDTO, any>({
      path: `/api/v1/grades`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags grade-controller
   * @name SaveGrade
   * @request POST:/api/v1/grades
   */
  saveGrade = (data: GradeCreateDTO, params: RequestParams = {}) =>
    this.request<GradeResponseDTO, any>({
      path: `/api/v1/grades`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags grade-controller
   * @name DeleteGrade
   * @request DELETE:/api/v1/grades
   */
  deleteGrade = (data: GradeDeleteDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/grades`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags administrator-controller
   * @name GetAdministrator
   * @request GET:/api/v1/administrators/{email}
   */
  getAdministrator = (email: string, params: RequestParams = {}) =>
    this.request<AdministratorResponseDTO, any>({
      path: `/api/v1/administrators/${email}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags administrator-controller
   * @name UpdateAdministratorByEmail
   * @request PUT:/api/v1/administrators/{email}
   */
  updateAdministratorByEmail = (
    email: string,
    data: AdministratorUpdateDTO,
    params: RequestParams = {},
  ) =>
    this.request<AdministratorResponseDTO, any>({
      path: `/api/v1/administrators/${email}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags administrator-controller
   * @name DeleteAdministrator
   * @request DELETE:/api/v1/administrators/{email}
   */
  deleteAdministrator = (email: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/administrators/${email}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags activity-controller
   * @name UpdateActivity
   * @request PUT:/api/v1/activities
   */
  updateActivity = (data: ActivityUpdateDTO, params: RequestParams = {}) =>
    this.request<ActivityResponseDTO, any>({
      path: `/api/v1/activities`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags activity-controller
   * @name SaveActivity
   * @request POST:/api/v1/activities
   */
  saveActivity = (data: ActivityCreateDTO, params: RequestParams = {}) =>
    this.request<ActivityResponseDTO, any>({
      path: `/api/v1/activities`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags activity-controller
   * @name DeleteActivity
   * @request DELETE:/api/v1/activities
   */
  deleteActivity = (data: ActivityDeleteDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/activities`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags student-controller
   * @name GetAllStudents
   * @request GET:/api/v1/students
   */
  getAllStudents = (params: RequestParams = {}) =>
    this.request<StudentResponseDTO[], any>({
      path: `/api/v1/students`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags student-controller
   * @name RegisterStudent
   * @request POST:/api/v1/students
   */
  registerStudent = (data: StudentCreateDTO, params: RequestParams = {}) =>
    this.request<StudentResponseDTO, any>({
      path: `/api/v1/students`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags student-controller
   * @name TerminateStudent
   * @request POST:/api/v1/students/{email}/terminate
   */
  terminateStudent = (
    email: string,
    data: StudentTerminateDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/students/${email}/terminate`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags invitation-controller
   * @name InviteStudents
   * @request POST:/api/v1/register
   */
  inviteStudents = (data: InvitationRequestDTO, params: RequestParams = {}) =>
    this.request<InvitationSendResponseDTO, any>({
      path: `/api/v1/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags s-3-controller
   * @name Upload
   * @request POST:/api/v1/files/upload
   */
  upload = (
    data: {
      /** @format binary */
      file: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, any>({
      path: `/api/v1/files/upload`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name ResetPassword
   * @request POST:/api/v1/auth/reset-password
   */
  resetPassword = (data: ResetPasswordRequestDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/auth/reset-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name SignIn
   * @request POST:/api/v1/auth/login
   */
  signIn = (data: SignInRequestDTO, params: RequestParams = {}) =>
    this.request<SignInResponseDTO, any>({
      path: `/api/v1/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name ForgotPassword
   * @request POST:/api/v1/auth/forgot-password
   */
  forgotPassword = (
    data: ForgotPasswordRequestDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/auth/forgot-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name ChangePassword
   * @request POST:/api/v1/auth/change-password
   */
  changePassword = (
    data: ChangePasswordRequestDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/auth/change-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags administrator-controller
   * @name GetAllAdministrators
   * @request GET:/api/v1/administrators
   */
  getAllAdministrators = (params: RequestParams = {}) =>
    this.request<AdministratorResponseDTO[], any>({
      path: `/api/v1/administrators`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags administrator-controller
   * @name Register
   * @request POST:/api/v1/administrators
   */
  register = (data: AdministratorCreateDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/administrators`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags student-controller
   * @name DeleteStudent
   * @request DELETE:/api/v1/students/{email}
   */
  deleteStudent = (email: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/students/${email}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags student-controller
   * @name UpdateStudentByEmail
   * @request PATCH:/api/v1/students/{email}
   */
  updateStudentByEmail = (
    email: string,
    data: StudentUpdateDTO,
    params: RequestParams = {},
  ) =>
    this.request<StudentResponseDTO, any>({
      path: `/api/v1/students/${email}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags subject-controller
   * @name GetAllSubjects
   * @request GET:/api/v1/subjects
   */
  getAllSubjects = (params: RequestParams = {}) =>
    this.request<SubjectResponseDTO[], any>({
      path: `/api/v1/subjects`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags student-controller
   * @name GetStudent
   * @request GET:/api/v1/students/{id}
   */
  getStudent = (id: string, params: RequestParams = {}) =>
    this.request<StudentResponseDTO, any>({
      path: `/api/v1/students/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags invitation-controller
   * @name CheckInvitation
   * @request GET:/api/v1/register/{invitationId}
   */
  checkInvitation = (invitationId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/register/${invitationId}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags grade-controller
   * @name GetStudentGrades
   * @request GET:/api/v1/grades/{email}
   */
  getStudentGrades = (email: string, params: RequestParams = {}) =>
    this.request<StudentGradesDTO[], any>({
      path: `/api/v1/grades/${email}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags grade-controller
   * @name GetStudentIraPerPeriod
   * @request GET:/api/v1/grades/{email}/ira
   */
  getStudentIraPerPeriod = (email: string, params: RequestParams = {}) =>
    this.request<number[], any>({
      path: `/api/v1/grades/${email}/ira`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags grade-controller
   * @name GetStudentGradesAveragePerPeriod
   * @request GET:/api/v1/grades/{email}/average
   */
  getStudentGradesAveragePerPeriod = (
    email: string,
    params: RequestParams = {},
  ) =>
    this.request<number[], any>({
      path: `/api/v1/grades/${email}/average`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags s-3-controller
   * @name Download
   * @request GET:/api/v1/files/download/{fileName}
   */
  download = (fileName: string, params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/v1/files/download/${fileName}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name GetCurrentUser
   * @request GET:/api/v1/auth/me
   */
  getCurrentUser = (params: RequestParams = {}) =>
    this.request<CurrentUserInfoDTO, any>({
      path: `/api/v1/auth/me`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags activity-controller
   * @name GetAllActivities
   * @request GET:/api/v1/activities/{email}
   */
  getAllActivities = (email: string, params: RequestParams = {}) =>
    this.request<ActivityResponseDTO[], any>({
      path: `/api/v1/activities/${email}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags s-3-controller
   * @name Delete
   * @request DELETE:/api/v1/files/delete/{fileName}
   */
  delete = (fileName: string, params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/v1/files/delete/${fileName}`,
      method: "DELETE",
      ...params,
    });
}
