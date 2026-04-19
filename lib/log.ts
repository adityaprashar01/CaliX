import pino from "pino";

export const log = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  redact: {
    paths: ["email", "*.email", "password", "*.password", "token", "*.token"],
    censor: "[REDACTED]",
  },
  transport:
    process.env.NODE_ENV === "development"
      ? { target: "pino/file", options: { destination: 1 } }
      : undefined,
});
