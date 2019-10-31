/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GamesQuery
// ====================================================

export interface GamesQuery_dapps {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface GamesQuery {
  dapps: GamesQuery_dapps[];
}
