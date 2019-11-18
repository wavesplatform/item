/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LotFilter, CursorInfo } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MoreLotsQuery
// ====================================================

export interface MoreLotsQuery_lots_edges_node_item_params {
  __typename: "ItemParams";
  txId: string;
  name: string;
  version: number;
  imageUrl: string;
  storageImageUrl: string | null;
  misc: any | null;
}

export interface MoreLotsQuery_lots_edges_node_item_dapp {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface MoreLotsQuery_lots_edges_node_item {
  __typename: "Item";
  id: string;
  txId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  params: MoreLotsQuery_lots_edges_node_item_params;
  dapp: MoreLotsQuery_lots_edges_node_item_dapp;
}

export interface MoreLotsQuery_lots_edges_node {
  __typename: "Lot";
  id: string;
  txId: string;
  priceAsset: string;
  price: number;
  total: number;
  left: number;
  cancelled: boolean | null;
  item: MoreLotsQuery_lots_edges_node_item;
}

export interface MoreLotsQuery_lots_edges {
  __typename: "LotEdge";
  cursor: string;
  node: MoreLotsQuery_lots_edges_node;
}

export interface MoreLotsQuery_lots_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface MoreLotsQuery_lots {
  __typename: "LotConnection";
  edges: MoreLotsQuery_lots_edges[] | null;
  pageInfo: MoreLotsQuery_lots_pageInfo;
}

export interface MoreLotsQuery {
  lots: MoreLotsQuery_lots | null;
}

export interface MoreLotsQueryVariables {
  filter?: LotFilter | null;
  cursorInfo?: CursorInfo | null;
}
