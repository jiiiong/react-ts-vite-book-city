import {Navigate, createBrowserRouter} from 'react-router-dom';

import Home from '@/pages/home';
import Search from '@/pages/search';
import Shelf from '@/pages/shelf';
import Category from '@/pages/category';
import Ranking from '@/pages/ranking';
import BookList from '@/pages/book-list';
import Detail from '@/pages/detail';
import { Chapter } from '@/pages/chapters';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/shelf',
    element: <Shelf />,
  },
  {
    path: '/ranking',
    element: <Ranking />,
  },
  {
    path: '/category',
    element: <Category />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/book-list/:key',
    element: <BookList />,
  },
  {
    path: '/book/:id',
    element: <Detail />,
  },
  {
    path: '/book/:bookId/:chapterId',
    element: <Chapter />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export default AppRouter
