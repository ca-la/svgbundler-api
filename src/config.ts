function ensure(str: string | undefined): string {
  if (!str) { throw new Error('Missing configuration value'); }
  return str;
}

export const AWS_ACCESS_KEY = ensure(process.env.AWS_ACCESS_KEY);
export const AWS_SECRET_KEY = ensure(process.env.AWS_SECRET_KEY);
export const AWS_S3_BUCKET_NAME = ensure(process.env.AWS_S3_BUCKET_NAME);
export const CLIENT_TOKEN = process.env.CLIENT_TOKEN;
