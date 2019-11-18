/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CursorInfo, UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_user_lots_edges_node_item_params {
  __typename: "ItemParams";
  txId: string;
  name: string;
  version: number;
  imageUrl: string;
  storageImageUrl: string | null;
  misc: any | null;
}

export interface UserQuery_user_lots_edges_node_item_dapp {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface UserQuery_user_lots_edges_node_item {
  __typename: "Item";
  id: string;
  txId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  params: UserQuery_user_lots_edges_node_item_params;
  dapp: UserQuery_user_lots_edges_node_item_dapp;
}

export interface UserQuery_user_lots_edges_node {
  __typename: "Lot";
  id: string;
  txId: string;
  priceAsset: string;
  price: number;
  total: number;
  left: number;
  cancelled: boolean | null;
  item: UserQuery_user_lots_edges_node_item;
}

export interface UserQuery_user_lots_edges {
  __typename: "LotEdge";
  cursor: string;
  node: UserQuery_user_lots_edges_node;
}

export interface UserQuery_user_lots_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface UserQuery_user_lots {
  __typename: "LotConnection";
  edges: UserQuery_user_lots_edges[] | null;
  pageInfo: UserQuery_user_lots_pageInfo;
}

export interface UserQuery_user {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
  lots: UserQuery_user_lots | null;
}

export interface UserQuery {
  user: UserQuery_user | null;
}

export interface UserQueryVariables {
  address: string;
  lotsCursorInfo?: CursorInfo | null;
}
