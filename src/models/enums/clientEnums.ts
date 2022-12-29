import type { ElTagType } from "../common";
import type { SelectRecord } from "@/components/select";

export enum TokenAuthMethod {
  Unique = "1",
  Standard = "0",
}

export function getTokenAuthMethodLabel(method: TokenAuthMethod): string {
  switch (method) {
    case TokenAuthMethod.Unique:
      return "唯一";
    case TokenAuthMethod.Standard:
      return "标准";
  }
}

export function getTokenAuthMethodTag(method: TokenAuthMethod): ElTagType {
  switch (method) {
    case TokenAuthMethod.Unique:
      return "warning";
    case TokenAuthMethod.Standard:
      return "danger";
  }
}

export function getTokenAuthMethodSelectList(): Array<SelectRecord> {
  return [
    {
      label: "标准",
      value: TokenAuthMethod.Standard,
    },
    {
      label: "唯一",
      value: TokenAuthMethod.Unique,
    },
  ];
}

export enum AuthorizedGrantType {
  Password = "password",
  RefreshToken = "refresh_token",
  Client = "client_credentials",
  Code = "authorization_code",
}

export function grantTypeList(): Array<SelectRecord> {
  return [
    {
      label: "授权码模式",
      value: AuthorizedGrantType.Code,
    },
    {
      label: "密码模式",
      value: AuthorizedGrantType.Password,
    },
    {
      label: "客户端模式",
      value: AuthorizedGrantType.Client,
    },
    {
      label: "允许刷新Token",
      value: AuthorizedGrantType.RefreshToken,
    },
  ];
}

export enum ClientAuthMethod {
  CLIENT_SECRET_BASIC = "client_secret_basic",
  CLIENT_SECRET_POST = "client_secret_post",
  CLIENT_SECRET_JWT = "client_secret_jwt",
  PRIVATE_KEY_JWT = "private_key_jwt",
  NONE = "none",
}

export function getClientAuthMethodList(): Array<SelectRecord> {
  return [
    {
      label: "Client Secret Basic",
      value: ClientAuthMethod.CLIENT_SECRET_BASIC,
    },
    {
      label: "Client Secret Post",
      value: ClientAuthMethod.CLIENT_SECRET_POST,
    },
    {
      label: "Client Secret JWT",
      value: ClientAuthMethod.CLIENT_SECRET_JWT,
    },
    {
      label: "Private Key JWT",
      value: ClientAuthMethod.PRIVATE_KEY_JWT,
    },
    {
      label: "None",
      value: ClientAuthMethod.NONE,
    },
  ];
}
