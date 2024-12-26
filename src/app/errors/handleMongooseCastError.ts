import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

export const handleMongooseCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: error?.name,
      message: error?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'CastError',
    errorSources,
  };
};
