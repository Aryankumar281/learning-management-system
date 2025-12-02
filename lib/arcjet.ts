import "server-only";
import arcjet, {
  detectBot,
  fixedWindow,
  sensitiveInfo,
  shield,
  slidingWindow,
} from "@arcjet/next";
import { env } from "./env";

export { detectBot, fixedWindow, sensitiveInfo, shield, slidingWindow };

export default arcjet({
  key: env.ARCJET_KEY,
  characteristics: ["fingerprint"],
  // define base rules here, can also be empty if you dont want to have any base rules
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});
