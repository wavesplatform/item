/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: userInfo
// ====================================================

export interface userInfo {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}
