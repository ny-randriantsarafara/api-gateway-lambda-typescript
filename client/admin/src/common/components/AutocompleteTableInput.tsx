// AutocompleteTableInput.js
import React, { useState, useEffect } from 'react';
import { useInput, useDataProvider } from 'react-admin';
import {
  Autocomplete,
  Select,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  SelectChangeEvent,
} from '@mui/material';

export type AutocompleteTableInputProps = React.PropsWithChildren<{
  source: string;
  reference: string;
  target: string;
  label: string;
}>;

const AutocompleteTableInput: React.FC<AutocompleteTableInputProps> = ({
  source,
  reference,
  target,
  label,
  children,
}) => {
  const dataProvider = useDataProvider();
  const {
    id,
    field: { value, onChange, ...otherFieldAttributes },
    fieldState,
  } = useInput({ defaultValue: [], source });

  const [choices, setChoices] = useState<any[]>([]);

  useEffect(() => {
    dataProvider.getList<any>(reference, { filter: {} }).then(({ data }) => {
      setChoices(data);
    });
  }, [dataProvider, reference]);

  useEffect(() => {
    if (value && value.length > 0) {
      const selectedIds = value.map((item: any) => item.id);
      setChoices(prevChoices => prevChoices.filter(choice => !selectedIds.includes(choice.id)));
    }
  }, [value]);

  const handleAdd = (event: React.SyntheticEvent, newValue: any) => {
    console.log(newValue, value);
    if (newValue && !value.some((item: any) => item.id === newValue.id)) {
      onChange([...(value || []), newValue]);
    }
  };

  const handleRemove = (item: any) => {
    onChange(value.filter((val: any) => val.id !== item.id));
    setChoices([...choices, item]);
  };

  return (
    <div>
      <Autocomplete
        options={choices}
        getOptionLabel={option => option[target]}
        onChange={handleAdd}
        renderInput={params => <TextField {...params} label={label} />}
      />
      {children ? (
        React.cloneElement(children as React.ReactElement, { selectedValues: value, handleRemove })
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Selected Values</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value &&
              value.map((val: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{val[target]}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleRemove(val)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AutocompleteTableInput;
