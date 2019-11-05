/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

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
}

export interface ItemQuery {
  item: ItemQuery_item | null;
}

export interface ItemQueryVariables {
  assetId: string;
}
