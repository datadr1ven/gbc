import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  latestResult(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
  secretKey(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
}

export type ImpureCircuits<T> = {
  getTotalBalance(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, Uint8Array>;
  getBalance(context: __compactRuntime.CircuitContext<T>, pk_0: Uint8Array): __compactRuntime.CircuitResults<T, Uint8Array>;
  nextHole(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array): Uint8Array;
}

export type Circuits<T> = {
  getTotalBalance(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, Uint8Array>;
  getBalance(context: __compactRuntime.CircuitContext<T>, pk_0: Uint8Array): __compactRuntime.CircuitResults<T, Uint8Array>;
  nextHole(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  publicKey(context: __compactRuntime.CircuitContext<T>, sk_0: Uint8Array): __compactRuntime.CircuitResults<T, Uint8Array>;
}

export type Ledger = {
  readonly totalbalance: Uint8Array;
  balances: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
