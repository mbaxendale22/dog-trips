import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { StartScreen } from "./components/StartScreen";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StartScreen />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
