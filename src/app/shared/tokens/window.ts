import { DOCUMENT } from "@angular/common";
import { InjectionToken, inject } from "@angular/core";

export const WINDOW = new InjectionToken<Window>(
  `[WINDOW]: An abstraction over global window object`,
  {
    factory: () => {
      const { defaultView } = inject(DOCUMENT);
      if (!defaultView) {
        throw new Error(`Window is not not available`)
      }
      return defaultView;
    }
  }
)