import { csCZ, enUS } from "@clerk/localizations";

export const clerkLocalizations = {
  cs: csCZ,
  en: enUS,
};

export type Locale = keyof typeof clerkLocalizations;
