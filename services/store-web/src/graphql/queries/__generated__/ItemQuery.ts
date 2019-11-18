/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CursorInfo, UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ItemQuery
// ====================================================

export interface ItemQuery_item_params {
  __typename: "ItemParams";
  txId: string;
  name: string;
  version: number;
  imageUrl: string;
  storageImageUrl: string | null;
  misc: any | null;
}

export interface ItemQuery_item_dapp {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface ItemQuery_item_lots_edges_node_seller {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}

export interface ItemQuery_item_lots_edges_node {
  __typename: "Lot";
  id: string;
  txId: string;
  priceAsset: string;
  price: number;
  total: number;
  left: number;
  cancelled: boolean | null;
  seller: ItemQuery_item_lots_edges_node_seller | null;
}

export interface ItemQuery_item_lots_edges {
  __typename: "LotEdge";
  cursor: string;
  node: ItemQuery_item_lots_edges_node;
}

export interface ItemQuery_item_lots_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface ItemQuery_item_lots {
  __typename: "LotConnection";
  edges: ItemQuery_item_lots_edges[] | null;
  pageInfo: ItemQuery_item_lots_pageInfo;
}

export interface ItemQuery_item {
  __typename: "Item";
  id: string;
  txId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  params: ItemQuery_item_params;
  dapp: ItemQuery_item_dapp;
  lots: ItemQuery_item_lots | null;
}

export interface ItemQuery {
  item: ItemQuery_item | null;
}

export interface ItemQueryVariables {
  assetId: string;
  lotsCursorInfo?: CursorInfo | null;
}
