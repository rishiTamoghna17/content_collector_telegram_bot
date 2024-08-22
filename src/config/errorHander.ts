import Sentry from "@sentry/node";
export const erroHandler = ({
  error,
  success,
  statusCode,
}: {
  error: any;
  success: boolean;
  statusCode: number;
}) => {
  Sentry.captureException(error);

  return { data:error, success, statusCode };
};
