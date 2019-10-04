import { IDataTransaction, IInvokeScriptTransaction, IIssueTransaction, WithId } from '@waves/waves-transactions'

export type TIssueTx = IIssueTransaction & WithId & { sender: string }
export type TDataTx = IDataTransaction & WithId & { sender: string }
export type TInvokeScriptTx = IInvokeScriptTransaction & WithId & { sender: string }
