/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlatformStatsQuery
// ====================================================

export interface PlatformStatsQuery_platformStats {
  __typename: "PlatformStats";
  dapps: number;
  items: number;
  transactions: number;
}

export interface PlatformStatsQuery {
  platformStats: PlatformStatsQuery_platformStats;
}
