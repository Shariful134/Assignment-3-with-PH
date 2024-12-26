/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

export const handleDuplicatesError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);

  const extractMEssage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractMEssage} is Allready Exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};
