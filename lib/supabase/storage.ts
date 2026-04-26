const defaultMarketingAssetsBucket = "jjin-marketing-assets";

function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, "");
}

export function getMarketingStorageBucket() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_MARKETING_ASSETS_BUCKET ??
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ??
    defaultMarketingAssetsBucket
  );
}

export function getPublicStorageUrl(
  objectPath: string,
  fallbackPath = `/${trimSlashes(objectPath)}`,
  bucketName = getMarketingStorageBucket(),
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const normalizedPath = trimSlashes(objectPath);

  if (!supabaseUrl) {
    return fallbackPath;
  }

  const baseUrl = supabaseUrl.replace(/\/+$/g, "");
  const bucket = trimSlashes(bucketName);

  return `${baseUrl}/storage/v1/object/public/${bucket}/${normalizedPath}`;
}
