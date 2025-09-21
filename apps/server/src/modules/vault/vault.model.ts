import { getModelForClass, prop, type Ref } from '@typegoose/typegoose';

import { User } from '../user/user.model';

export class Vault {
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @prop({ type: () => String, default: '' })
  data: string;

  @prop({ type: () => String, required: true })
  salt: string;
}

export const VaultModel = getModelForClass(Vault, {
  schemaOptions: {
    timestamps: true,
  },
});
