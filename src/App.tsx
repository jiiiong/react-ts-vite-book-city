import {RouterProvider} from 'react-router-dom'
import AppRouter from '@/routers/router';

function App() {
  return (
    <RouterProvider router={AppRouter}></RouterProvider>
  );
}

export default App
