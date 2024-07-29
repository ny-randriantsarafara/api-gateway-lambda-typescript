import { Theme, useMediaQuery } from "@mui/material";
import { Datagrid, List, SimpleList, TextField } from "react-admin";

export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.firstName}
          secondaryText={(record) => record.lastName}
        />
      ) : (
        <Datagrid>
          <TextField source="firstName" />
          <TextField source="lastName" />
        </Datagrid>
      )}
    </List>
  );
};
