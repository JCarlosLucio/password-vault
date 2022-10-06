import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';

import { saveVault } from '../api';
import { encryptVault } from '../utils/crypto';
import { storeVault } from '../utils/storage';
import { VaultItem } from '../utils/types';
import FormWrapper from './FormWrapper';

const Vault = ({
  vault = [],
  vaultKey = '',
}: {
  vault: VaultItem[];
  vaultKey: string;
}) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      vault,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vault',
  });

  const mutation = useMutation(saveVault);

  return (
    <FormWrapper
      onSubmit={handleSubmit(({ vault }) => {
        const encryptedVault = encryptVault({
          vault: JSON.stringify({ vault }),
          vaultKey,
        });

        storeVault(JSON.stringify(vault));

        mutation.mutate({ encryptedVault });
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
