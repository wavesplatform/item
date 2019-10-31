/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DappQuery
// ====================================================

export interface DappQuery_user {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface DappQuery {
  user: DappQuery_user | null;
}

export interface DappQueryVariables {
  address: string;
}
