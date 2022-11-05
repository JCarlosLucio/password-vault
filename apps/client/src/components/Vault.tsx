import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import useSaveVault from 'src/hooks/useSaveVault';

import { encryptVault } from '../utils/crypto';
import { storeVault } from '../utils/storage';
import { VaultItem } from '../utils/types';
import FormWrapper from './FormWrapper';
import PasswordInput from './PasswordInput';

interface VaultProps {
  vault: VaultItem[];
  vaultKey: string;
}

const Vault = ({ vault = [], vaultKey = '' }: VaultProps) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      vault,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vault',
  });

  const { save, isLoading } = useSaveVault();

  return (
    <FormWrapper
      maxW="container.lg"
      mt="12"
      onSubmit={handleSubmit(({ vault }) => {
        const encryptedVault = encryptVault({
          vault: JSON.stringify({ vault }),
          vaultKey,
        });

        storeVault(JSON.stringify(vault));

        save({ encryptedVault });
      })}
    >
      <Heading data-testid="vault-heading">Vault</Heading>

      {fields.length < 1 && (
        <Text my="8">Your vault is empty. Maybe Add something?</Text>
      )}

      {fields.map((field, index) => {
        return (
          <Flex
            key={field.id}
            direction={['column', 'row']}
            align="flex-end"
            my="4"
            gap="3"
          >
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
              <PasswordInput
                id="password"
                placeholder="Password"
                name={`vault.${index}.password`}
                register={register}
                rules={{ required: 'Password is required' }}
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
          </Flex>
        );
      })}
      <Flex justifyContent="space-between" mt="4">
        <Button
          onClick={() => append({ website: '', username: '', password: '' })}
          variant="outline"
          size="lg"
        >
          Add
        </Button>

        <Button
          type="submit"
          isLoading={isLoading}
          variant="gradient"
          size="lg"
        >
          Save Vault
        </Button>
      </Flex>
    </FormWrapper>
  );
};

export default Vault;
