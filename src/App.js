import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/Routers/AppRouter';
import './App.css';
import { AuthProvider } from './components/providers/AuthProvider';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons'
import { NewsProvider } from './components/providers/NewsProvider';


library.add(fas);

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <NewsProvider>
          <AppRouter/>
        </NewsProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
