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

      <div className="card w-96 h-96 bg-secondary shadow-xl flex flex-col justify-evenly items-center">
        <p>Stat 1</p>
        <p>Stat 2</p>
        <p>Stat 3</p>
      </div>
    </>
  );
}
