import { screenOptions } from "../lib/Constants";
import { switchScreens } from "../lib/helpers";

type Props = {
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
};

export function Stats(props: Props) {
  const { changeScreen } = props;
  function handleClick() {
    switchScreens(changeScreen, screenOptions.CHOOSE_PERSON);
  }
  return (
    <>
      <button className="btn btn-primary ml-[20%] mb-8" onClick={handleClick}>
        <span className="text-white">Choose Person</span>
      </button>

      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Most Trips this Week</div>
          <div className="stat-value">Anna</div>
          <div className="stat-desc">Num of trips</div>
        </div>

        <div className="stat">
          <div className="stat-title">Most Trips this Month</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">Streak</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </>
  );
}
