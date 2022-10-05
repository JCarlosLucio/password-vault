import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';

import { VaultItem } from '../utils/types';
import FormWrapper from './FormWrapper';

const Vault = ({
  vault = [],
  vaultKey = '',
}: {
  vault: VaultItem[];
  vaultKey: string;
}) => {
  const { control, register, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vault',
  });
  return (
    <FormWrapper
      onSubmit={handleSubmit(({ vault }) => {
        console.log(vault);
      })}
    >
      {fields.map((field, index) => {
        return (
          <Box key={field.id} display="flex" alignItems="flex-end" my="4">
            <FormControl>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Input
                type="url"
                id="website"
                placeholder="Website"
                {...register(`vault.${index}.website`, {
                  required: 'Website is required',
                })}
              />
            </FormControl>

            <FormControl ml="2">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                placeholder="Username"
                {...register(`vault.${index}.username`, {
                  required: 'Username is required',
                })}
              />
            </FormControl>

            <FormControl ml="2">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                {...register(`vault.${index}.password`, {
                  required: 'Password is required',
                })}
              />
            </FormControl>

            <Button
              bg="red.500"
              color="white"
              fontSize="2xl"
              ml="2"
              type="button"
              onClick={() => remove(index)}
            >
              -
            </Button>
          </Box>
        );
      })}

      <Button
        onClick={() => append({ website: '', username: '', password: '' })}
      >
        Add
      </Button>

      <Button ml="2" bg="teal.500" type="submit">
        Save Vault
      </Button>
    </FormWrapper>
  );
};

export default Vault;
