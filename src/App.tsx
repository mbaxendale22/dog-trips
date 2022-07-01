import { useState } from "react";
import { ChoosePerson } from "./components/ChoosePerson";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const screenOptions = {
    CHOOSE_PERSON: "CHOOSE_PERSON",
    STATS: "stats",
  };
  const [chooseScreen, setChooseScreen] = useState(screenOptions.CHOOSE_PERSON);

  function selectButtonText() {
    if (chooseScreen === screenOptions.CHOOSE_PERSON) {
      return "Show Stats";
    }
    return "Choose Person";
  }

  function handleClick() {
    if (chooseScreen === screenOptions.CHOOSE_PERSON) {
      setChooseScreen(screenOptions.STATS);
    } else {
      setChooseScreen(screenOptions.CHOOSE_PERSON);
    }
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-center items-center border h-screen">
        <button onClick={handleClick} className="btn btn-accent ml-[50%]">
          {selectButtonText()}
        </button>
        {chooseScreen === screenOptions.CHOOSE_PERSON ? (
          <ChoosePerson />
        ) : (
          <div>Stats</div>
        )}
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
