export interface TimeValueValue {
  minutes: number;
  seconds: number;
}

export interface DistanceValue {
  value: number;
  unit: string;
}

export interface RepeatBlockValue {
  count: number;
}

export interface RecoveryTimeValue {
  value: number;
  unit: string;
}

export interface RecoveryValue {
  label: string;
}

export interface DetailsLevelValue {
  level: number;
  marker: string;
}

export declare class TokenSlice {
  tag: string;
  children: TokenSlice[];
  childCount(): number;
  getChild(index: number): TokenSlice;
  hasSliceValue(): boolean;
  getSliceValueKind(): string;
  hasRepeatBlockValue(): boolean;
  getAsRepeatBlockValue(): RepeatBlockValue;
  hasTimeValueValue(): boolean;
  getAsTimeValueValue(): TimeValueValue;
  hasDistanceValue(): boolean;
  getAsDistanceValue(): DistanceValue;
  hasRecoveryTimeValue(): boolean;
  getAsRecoveryTimeValue(): RecoveryTimeValue;
  hasRecoveryValue(): boolean;
  getAsRecoveryValue(): RecoveryValue;
  hasDetailsLevelValue(): boolean;
  getAsDetailsLevelValue(): DetailsLevelValue;
  toString(): string;
}

export declare class Parser {
  constructor(source: string, detectors: unknown[]);
  start(): void;
  getResults(): TokenSlice[];
  getCount(): number;
}

export declare class StandardDetectors {
  static create(): unknown[];
}

export declare function parseTokens(input: string): TokenSlice[];
