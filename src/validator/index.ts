import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as UserSchema from './user.json';

const ajv = new Ajv();
addFormats(ajv);
// ajv.addSchema(UserSchema)

export const validate = ajv.compile(UserSchema);
