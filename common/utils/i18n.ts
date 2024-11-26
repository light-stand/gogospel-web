import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

const SUPPORTED_LOCALES = ["en", "es"] as const;
const DEFAULT_LOCALE = "en";

function parseAcceptLanguage(header: string): string {
  // Get first preferred language from Accept-Language
  const preferred = header
    .split(",")[0]
    .trim()
    .split("-")[0] // Get primary language tag
    .toLowerCase();

  // Return if supported, otherwise fallback
  return SUPPORTED_LOCALES.includes(preferred as (typeof SUPPORTED_LOCALES)[number])
    ? preferred
    : DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || DEFAULT_LOCALE;
  const locale = parseAcceptLanguage(acceptLanguage);

  return {
    locale,
    messages: (await import(`../../shared/assets/locales/${locale}.json`)).default.translation,
  };
});
