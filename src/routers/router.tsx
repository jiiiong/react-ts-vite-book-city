import {Navigate, createBrowserRouter} from 'react-router-dom';

// import Home from '@/pages/home';
// import Search from '@/pages/search';
// import Shelf from '@/pages/shelf';
// import Category from '@/pages/category';
// import Ranking from '@/pages/ranking';
// import BookList from '@/pages/book-list';
// import Detail from '@/pages/detail';
// import { Chapter } from '@/pages/chapters';
import React from 'react';

const Home = React.lazy(()=> import( '@/pages/home'));
const Search = React.lazy(()=> import( '@/pages/search'));
const Shelf = React.lazy(()=> import( '@/pages/shelf'));
const Category = React.lazy(()=> import( '@/pages/category'));
const Ranking = React.lazy(()=> import( '@/pages/ranking'));
const BookList = React.lazy(()=> import( '@/pages/book-list'));
const Detail = React.lazy(()=> import( '@/pages/detail'));
const Chapter = React.lazy(()=> import('@/pages/chapters').then(
  module => ({default: module.Chapter})
));


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense>
        <Home />
      </React.Suspense>
    ),
  },
  {
    path: "/shelf",
    element: (
      <React.Suspense>
        <Shelf />
      </React.Suspense>
    ),
  },
  {
    path: "/ranking",
    element: (
      <React.Suspense>
        <Ranking />
      </React.Suspense>
    ),
  },
  {
    path: "/category",
    element: (
      <React.Suspense>
        <Category />
      </React.Suspense>
    ),
  },
  {
    path: "/search",
    element: (
      <React.Suspense>
        <Search />
      </React.Suspense>
    ),
  },
  {
    path: "/book-list/:key",
    element: (
      <React.Suspense>
        <BookList />
      </React.Suspense>
    ),
  },
  {
    path: "/book/:id",
    element: (
      <React.Suspense>
        <Detail />
      </React.Suspense>
    ),
  },
  {
    path: "/book/:bookId/:chapterId",
    element: (
      <React.Suspense>
        <Chapter />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element:<React.Suspense><Navigate to="/" /></React.Suspense> ,
  },
]);

export default AppRouter;
