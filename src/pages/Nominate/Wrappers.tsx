// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;

  h3 {
    margin-bottom: 0;
  }
`;

export const StakingAccount = styled.div<{ last: boolean }>`
  margin-bottom: ${(props) => (props.last === true ? 'none' : '1rem')};
  display: flex;
  flex-flow: row wrap;
  h4 {
    color: var(--text-color-secondary);
  }
`;

export const Section = styled.div`
  flex: 1;
  display: flex;
  padding-right: 0.5rem;

  &:last-child {
    padding-right: 0;
  }

  > div {
    flex: 1;
    background: var(--text-color-primary);
    border-radius: 0.75rem;
    margin-right: 1rem;
    padding: 0 1rem;
  }
`;

export const Spacer = styled.div`
  width: 100%;
  height: 1px;
  margin: 0.75rem 0;
`;
