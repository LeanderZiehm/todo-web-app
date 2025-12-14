// src/routes.ts

import TodoListView from './views/TodoListView';
import AllViews from './views/AllView';
import PromptsView from './views/PromptsView';
import TrackerView from './views/TrackerView';
import FilterView from './views/FilterView';

export const appRoutes = [
  { path: '/', label: 'Todos', element: <TodoListView /> },
  // { path: '/todos', label: 'Todos', element: <TodoListView /> }, // todo this is kind of weird having home hidden and this idk
    { path: '/filter', label: 'Filter', element: <FilterView /> },
  { path: '/prompts', label: 'Prompts', element: <PromptsView /> },
  { path: '/tracker', label: 'Tracker', element: <TrackerView /> },
  { path: '/all', label: 'All', element: <AllViews /> },
];
