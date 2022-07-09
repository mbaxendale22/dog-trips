import { useAppSelector } from '../hooks/redux';

import { DATES, screenOptions } from '../lib/Constants';
import { switchScreens, userLogout } from '../lib/helpers';
import {
  currentStreakSelector,
  monthlyStatsSelector,
  weeklyStatsSelector
} from '../redux/stats';
import { ScreenButton } from './ScreenButton';

type Props = {
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
};

export function Stats(props: Props) {
  const { changeScreen } = props;
  const monthlyStats = useAppSelector(monthlyStatsSelector);
  const weeklyStats = useAppSelector(weeklyStatsSelector);
  const currentStreak = useAppSelector(currentStreakSelector);

  function handleLogout() {
    userLogout(changeScreen);
  }

  function handleClick() {
    switchScreens(changeScreen, screenOptions.CHOOSE_PERSON);
  }

  return (
    <>
      <ScreenButton
        title={'Person'}
        screen={screenOptions.CHOOSE_PERSON}
        changeScreen={changeScreen}
      />

      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Most Trips in the last Week</div>
          <div className="stat-value">{weeklyStats.person}</div>
          <div className="stat-desc">Num of trips: {weeklyStats.total}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Most Trips in {DATES.currentMonth}</div>
          <div className="stat-value">{monthlyStats.person}</div>
          <div className="stat-desc">{monthlyStats.total}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Latest Streak</div>
          <div className="stat-value">{currentStreak.total}</div>
          <div className="stat-desc">{currentStreak.person}</div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={handleLogout}
          className="btn btn-primary mt-8 mr-[20%]"
        >
          <span className="text-white">log out</span>
        </button>
      </div>
    </>
  );
}
