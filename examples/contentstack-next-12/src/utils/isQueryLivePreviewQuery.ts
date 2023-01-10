import type { LivePreviewQuery } from "contentstack";

function isQueryLivePreviewQuery(query: any): query is LivePreviewQuery {
  return (
    query !== undefined &&
    "live_preview" in query &&
    "content_type_uid" in query
  );
}

export { isQueryLivePreviewQuery };
