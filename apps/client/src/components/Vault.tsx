import { Field, Flex, Heading, Icon, Input, Text } from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaGrinBeamSweat } from 'react-icons/fa';

import useSaveVault from '../hooks/useSaveVault';
import { encryptVault } from '../utils/crypto';
import { storeVault } from '../utils/storage';
import { type VaultItem } from '../utils/types';
import FormWrapper from './FormWrapper';
import { Button } from './ui/button';
import { PasswordInput } from './ui/password-input';

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

  const { save, isPending } = useSaveVault();

  return (
    <FormWrapper
      maxW="6xl"
      mt="16"
      pt={['6', '10']}
      gap={['2', '5']}
      overflowX="hidden"
      onSubmit={handleSubmit(({ vault }) => {
        const encryptedVault = encryptVault({
          vault: JSON.stringify({ vault }),
          vaultKey,
        });

        storeVault(JSON.stringify(vault));

        save({ encryptedVault });
      })}
    >
      <Heading
        data-testid="vault-heading"
        size={['3xl', '4xl']}
        letterSpacing="normal"
      >
        Vault
      </Heading>

      {fields.length < 1 && (
        <Flex my="12" direction="column" align="center" gap="5">
          <Icon
            as={FaGrinBeamSweat}
            boxSize="16"
            color="orange.400"
            _dark={{ color: 'yellow.400' }}
          />
          <Text textAlign="center">
            Your vault is empty. Maybe Add something?
          </Text>
        </Flex>
      )}

      {fields.map((field, index) => {
        return (
          <Flex
            key={field.id}
            direction={['column', 'row']}
            align="flex-end"
            my="4"
            gap="3"
            data-state="open"
            _open={{
              animationName: 'fadeIn, slideIn',
              animationDuration: '300ms',
            }}
          >
            <Field.Root>
              <Field.Label htmlFor="website">Website</Field.Label>
              <Input
                type="url"
                id="website"
                placeholder="Website"
                {...register(`vault.${index}.website`, {
                  required: 'Website is required',
                })}
              />
            </Field.Root>

            <Field.Root ml="2">
              <Field.Label htmlFor="username">Username</Field.Label>
              <Input
                id="username"
                placeholder="Username"
                {...register(`vault.${index}.username`, {
                  required: 'Username is required',
                })}
              />
            </Field.Root>

            <Field.Root ml="2">
              <Field.Label htmlFor="password">Password</Field.Label>
              <PasswordInput
                id="password"
                placeholder="Password"
                {...register(`vault.${index}.password`, {
                  required: 'Password is required',
                })}
              />
            </Field.Root>

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
          size="xl"
        >
          Add
        </Button>

        <Button type="submit" loading={isPending} variant="gradient" size="xl">
          Save Vault
        </Button>
      </Flex>
    </FormWrapper>
  );
};

export default Vault;
