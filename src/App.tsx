import { StartScreen } from './components/StartScreen';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <StartScreen />
    </Provider>
  );
}

export default App;
