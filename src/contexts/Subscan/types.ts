// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnySubscan } from 'types';

export interface SubscanContextInterface {
  fetchEraPoints: (v: string, e: number) => void;
  payouts: AnySubscan;
  poolClaims: AnySubscan;
  unclaimedPayouts: AnySubscan;
}
