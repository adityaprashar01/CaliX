import "server-only";

export function trackServer(
  _userId: string,
  _event: string,
  _props?: Record<string, unknown>,
) {
  // Stub — full PostHog integration in Prompt 10
}

export function captureClient(
  _event: string,
  _props?: Record<string, unknown>,
) {
  // Stub — full PostHog client integration in Prompt 10
}
