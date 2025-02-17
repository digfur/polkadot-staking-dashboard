// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faBullhorn as faBack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { greaterThanZero, planckToUnit, rmCommas } from 'Utils';
import BigNumber from 'bignumber.js';
import { useApi } from 'contexts/Api';
import { useActivePools } from 'contexts/Pools/ActivePools';
import { motion } from 'framer-motion';
import { Announcement as AnnouncementLoader } from 'library/Loader/Announcement';
import { useTranslation } from 'react-i18next';
import { Item } from './Wrappers';

export const Announcements = () => {
  const { t } = useTranslation('pages');
  const { network, consts } = useApi();
  const { selectedActivePool } = useActivePools();
  const { units, unit } = network;
  const { rewardAccountBalance } = selectedActivePool || {};
  const { totalRewardsClaimed } = selectedActivePool?.rewardPool || {};
  const { existentialDeposit } = consts;

  // calculate the latest reward account balance
  const rewardPoolBalance = BigNumber.max(
    0,
    new BigNumber(rewardAccountBalance).minus(existentialDeposit)
  );
  const rewardBalance = planckToUnit(rewardPoolBalance, units);

  // calculate total rewards claimed
  const rewardsClaimed = planckToUnit(
    totalRewardsClaimed
      ? new BigNumber(rmCommas(totalRewardsClaimed))
      : new BigNumber(0),
    network.units
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const listItem = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const announcements = [];

  announcements.push({
    class: 'neutral',
    title: `${rewardsClaimed.decimalPlaces(3).toFormat()} ${unit} ${t(
      'pools.beenClaimed'
    )}`,
    subtitle: `${t('pools.beenClaimedBy', { unit })}`,
  });

  if (greaterThanZero(rewardBalance)) {
    announcements.push({
      class: 'neutral',
      title: `${rewardBalance.decimalPlaces(3).toFormat()} ${unit} ${t(
        'pools.outstandingReward'
      )}`,
      subtitle: `${t('pools.availableToClaim', { unit })}`,
    });
  } else {
    announcements.push(null);
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ width: '100%' }}
    >
      {announcements.map((item, index) =>
        item === null ? (
          <AnnouncementLoader key={`announcement_${index}`} />
        ) : (
          <Item key={`announcement_${index}`} variants={listItem}>
            <h4 className={item.class}>
              <FontAwesomeIcon
                icon={faBack}
                style={{ marginRight: '0.6rem' }}
              />
              {item.title}
            </h4>
            <p>{item.subtitle}</p>
          </Item>
        )
      )}
    </motion.div>
  );
};
