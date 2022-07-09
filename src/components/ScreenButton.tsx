import { switchScreens } from '../lib/helpers';

type Props = {
  title: string;
  screen: string;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
};

export function ScreenButton(props: Props) {
  const { title, screen, changeScreen } = props;

  function handleClick() {
    switchScreens(changeScreen, screen);
  }

  return (
    <button
      className="btn btn-primary ml-[20%] mb-8"
      onClick={() => handleClick()}
    >
      <span className="text-white">{title}</span>
    </button>
  );
}
