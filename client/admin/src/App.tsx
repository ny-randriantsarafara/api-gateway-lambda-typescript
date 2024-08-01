import { Admin, Resource } from 'react-admin';
import { Layout } from './Layout';
import { dataProvider } from './providers/data-provider.provider';
import { UserCreate } from './modules/users/UserCreate';
import { UserList } from './modules/users/UserList';
import { UserEdit } from './modules/users/UserEdit';
import { CategoryList } from './modules/categories/CategoryList';
import { CategoryEdit } from './modules/categories/CategoryEdit';
import { CategoryCreate } from './modules/categories/CategoryCreate';
import { CategoryShow } from './modules/categories/CategoryShow';

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider(import.meta.env.VITE_API_BASE_URL)}>
    <Resource name="categories" list={CategoryList} show={CategoryShow} create={CategoryCreate} edit={CategoryEdit} />
    <Resource name="players" list={UserList} create={UserCreate} edit={UserEdit} />
  </Admin>
);
