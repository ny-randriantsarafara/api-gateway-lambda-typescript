import { Admin, ListGuesser, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./providers/data-provider.provider";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider(import.meta.env.VITE_API_BASE_URL)}
  >
    <Resource name="players" list={ListGuesser} />
  </Admin>
);
