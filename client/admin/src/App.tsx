import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./providers/data-provider.provider";
import { UserCreationForm } from "./modules/users/UserCreationForm";
import { UserList } from "./modules/users/UserList";
import { UserModificationForm } from "./modules/users/UserModificationForm";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider(import.meta.env.VITE_API_BASE_URL)}
  >
    <Resource
      name="players"
      list={UserList}
      create={UserCreationForm}
      edit={UserModificationForm}
    />
  </Admin>
);
