// import mongoose from 'mongoose';
// import { TGenericErrorResponse } from '../interface/error';

// export const handleMongooseError = (
//   error: mongoose.Error.ValidationError,
// ): TGenericErrorResponse => {
//   const errorSources = Object.values(error.errors).map(
//     (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
//       return {
//         path: val?.path,
//         message: val?.message,
//       };
//     },
//   );

//   const statusCode = 400;
//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorSources,
//   };
// };

import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleMongooseError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = {
    path: '',
    message: '',
  };
  if (err) {
    errorSources.path = err.errors.name.path;
    errorSources.message = err.errors.name?.message;
  }

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleMongooseError;
