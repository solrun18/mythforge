// Shared sentinel for "this field was explicitly skipped."
// Using a single module-level object reference means `value === SKIPPED`
// works correctly across re-renders (reducer state is spread/copied, but
// this constant is never cloned).
export const SKIPPED = Object.freeze({ __skipped: true });
