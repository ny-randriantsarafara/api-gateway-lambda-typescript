import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./providers/data-provider.provider";
import { UserForm } from "./modules/users/UserForm";
import { UserList } from "./modules/users/UserList";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider(import.meta.env.VITE_API_BASE_URL)}
  >
    <Resource name="players" list={UserList} create={UserForm} />
  </Admin>
);
