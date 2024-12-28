// import mongoose from 'mongoose';
// import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// const handleMongooseError = (
//   err: mongoose.Error.ValidationError,
// ): TGenericErrorResponse => {
//   const errorSources: TErrorSources = {
//     path: '',
//     message: '',
//   };
//   if (err) {
//     errorSources.path = err.errors?.name?.path;
//     errorSources.message = err.errors?.name?.message;
//   }

//   const statusCode = 400;

//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorSources,
//   };
// };

// export default handleMongooseError;

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
    errorSources.path = err.errors?.name?.path;
    errorSources.message = err.errors?.name?.message;
  }

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleMongooseError;
