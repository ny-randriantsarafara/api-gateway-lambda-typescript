import { Admin, Resource } from 'react-admin';
import { Layout } from './Layout';
import { dataProvider } from './providers/data-provider.provider';
import { PlayerCreate } from './modules/players/PlayerCreate';
import { PlayerList } from './modules/players/PlayerList';
import { PlayerEdit } from './modules/players/PlayerEdit';
import { CategoryList } from './modules/categories/CategoryList';
import { CategoryEdit } from './modules/categories/CategoryEdit';
import { CategoryCreate } from './modules/categories/CategoryCreate';
import { CategoryShow } from './modules/categories/CategoryShow';

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider(import.meta.env.VITE_API_BASE_URL)}>
    <Resource name="categories" list={CategoryList} show={CategoryShow} create={CategoryCreate} edit={CategoryEdit} />
    <Resource name="players" list={PlayerList} create={PlayerCreate} edit={PlayerEdit} />
  </Admin>
);
