/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  DAPP = "DAPP",
  USER = "USER",
}

export interface CursorInfo {
  after?: string | null;
  first?: number | null;
}

export interface DappInfo {
  name?: string | null;
  url?: string | null;
  description?: string | null;
  iconFile?: any | null;
  pageFile?: any | null;
}

export interface ItemFilter {
  dappAddress?: string | null;
  searchString?: string | null;
  inclusions?: string[] | null;
}

export interface LotFilter {
  seller?: string | null;
}

export interface SigninUser {
  address: string;
  publicKey: string;
  sign: string;
  webappHost: string;
}

export interface UserInfo {
  name?: string | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
