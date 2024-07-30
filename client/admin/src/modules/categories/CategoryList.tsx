import React from "react";
import { Theme, useMediaQuery } from "@mui/material";
import { Datagrid, List, SimpleList, TextField } from "react-admin";

export const CategoryList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.gender}
          tertiaryText={(record) => record.description}
        />
      ) : (
        <Datagrid>
          <TextField source="name" />
          <TextField source="ageGroup" />
          <TextField source="gender" />
          <TextField source="description" />
        </Datagrid>
      )}
    </List>
  );
};
