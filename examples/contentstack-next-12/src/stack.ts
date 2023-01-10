import { contentstackParams } from "./contentstackParams";
import contentstack from "contentstack";

const Stack = contentstack.Stack({
  region: contentstackParams.region,
  api_key: contentstackParams.apiKey,
  delivery_token: contentstackParams.deliveryToken,
  environment: contentstackParams.environment,
  live_preview: {
    management_token: contentstackParams.managementToken,
    enable: true,
    host:
      contentstackParams.region === "us"
        ? "api.contentstack.io"
        : `${contentstackParams.region}-api.contentstack.com`,
  },
});

Stack.setHost(
  contentstackParams.region === "us"
    ? "cdn.contentstack.io"
    : `${contentstackParams.region}-cdn.contentstack.com`
);

export { Stack };
