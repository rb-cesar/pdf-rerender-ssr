import ReactDom from 'react-dom/client';
import { App } from './app/App';

ReactDom.hydrateRoot(document.getElementById('root') as HTMLElement, <App />);
