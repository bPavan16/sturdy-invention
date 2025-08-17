
import { ThemeProvider } from './components/ThemeProvider';
import { ChatInterface } from './components/ChatInterface';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="App">
        <ChatInterface />
      </div>
    </ThemeProvider>
  );
};

export default App;