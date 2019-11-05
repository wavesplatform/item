/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: itemInfo
// ====================================================

export interface itemInfo_params {
  __typename: "ItemParams";
  txId: string;
  name: string;
  version: number;
  imageUrl: string;
  storageImageUrl: string | null;
  misc: any | null;
}

export interface itemInfo_dapp {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface itemInfo {
  __typename: "Item";
  id: string;
  txId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  params: itemInfo_params;
  dapp: itemInfo_dapp;
}
