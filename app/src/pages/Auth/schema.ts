import { object, string } from 'yup';
import { VALIDATION_ERRORS } from '../../models/Validation/validation';

export const loginInitialValues = {
  phone: '',
  password: '',
};

export const loginValidationSchema = object({
  phone: string().required(VALIDATION_ERRORS.REQUIRED),
  password: string().required(VALIDATION_ERRORS.REQUIRED),
});
