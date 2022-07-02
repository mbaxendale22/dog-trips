import { screenOptions } from "../lib/Constants";
import { switchScreens, userLogout } from "../lib/helpers";
import { ScreenButton } from "./ScreenButton";

type Props = {
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
};

export function Stats(props: Props) {
  const { changeScreen } = props;

  function handleLogout() {
    userLogout(changeScreen);
  }

  return (
    <>
      <ScreenButton
        title={"Choose Person"}
        screen={screenOptions.CHOOSE_PERSON}
        changeScreen={changeScreen}
      />

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
      <button onClick={handleLogout} className="btn btn-primary mt-8 mr-[20%]">
        <span className="text-white">log out</span>
      </button>
    </>
  );
}