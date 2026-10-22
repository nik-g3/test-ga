import { AppRouter } from './router/AppRouter.tsx';
import { useApp } from './hooks/useApp.ts';

function App() {
  const appState = useApp();

  return (
    <main className="main">
      <div className="main__content">
        <AppRouter appState={appState}></AppRouter>
      </div>
    </main>
  );
}

export default App;
