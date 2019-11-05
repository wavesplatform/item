/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DappsQuery
// ====================================================

export interface DappsQuery_dapps {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface DappsQuery {
  dapps: DappsQuery_dapps[];
}
