import { Region } from "contentstack";
import type { ContentstackClientParams } from "./contentstackClient";

const validRegionValues = new Set<Region>([
  Region.AZURE_NA,
  Region.EU,
  Region.US,
]);

class MissingEnvironmentVariableError extends Error {
  constructor(environmentVariableName: string) {
    super(
      `Missing environment variable ${environmentVariableName}. Make sure to setup your .env file before running application.`
    );
  }
}

if (!process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY) {
  throw new MissingEnvironmentVariableError("NEXT_PUBLIC_CONTENTSTACK_API_KEY");
}

if (!process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN) {
  throw new MissingEnvironmentVariableError(
    "NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN"
  );
}

if (!process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT) {
  throw new MissingEnvironmentVariableError(
    "NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT"
  );
}

if (!process.env.NEXT_PUBLIC_CONTENTSTACK_REGION) {
  throw new MissingEnvironmentVariableError("NEXT_PUBLIC_CONTENTSTACK_REGION");
}

if (!isValidRegionValue(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION)) {
  throw new Error(
    `Invalid value for environment variable NEXT_PUBLIC_CONTENTSTACK_REGION. Expected one of: ${JSON.stringify(
      Array.from(validRegionValues)
    )}`
  );
}

if (!process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN) {
  throw new MissingEnvironmentVariableError(
    "NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN"
  );
}

const contentstackParams: Required<Omit<ContentstackClientParams, "preview">> =
  {
    apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
    deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
    region: process.env.NEXT_PUBLIC_CONTENTSTACK_REGION,
    managementToken: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN,
  };

export { contentstackParams };

function isValidRegionValue(value: string): value is Region {
  // @ts-expect-error
  return validRegionValues.has(value);
}
