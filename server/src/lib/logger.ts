/**
 * Just a simple logger, nothing complex in here
 * We can use Sentry, etc
 * @param args unknown[]
 */
export const log = (...args: unknown[]): void => {
  console.log("LOGGER: ", ...args);
};
