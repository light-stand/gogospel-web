import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/es";

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);

if (typeof window !== "undefined") {
  // Client-side
  dayjs.locale(window.navigator.language);
} else {
  // Server-side
  const headers = require("next/headers").headers;
  const acceptLanguage = headers().get("accept-language") || "en";
  const primaryLanguage = acceptLanguage.split(",")[0].trim().split("-")[0].toLowerCase();
  dayjs.locale(primaryLanguage);
}
export default dayjs;
