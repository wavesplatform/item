/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DappInfo } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDappInfo
// ====================================================

export interface UpdateDappInfo_updateDappInfo {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface UpdateDappInfo {
  updateDappInfo: UpdateDappInfo_updateDappInfo;
}

export interface UpdateDappInfoVariables {
  input: DappInfo;
}
