/**
 * Global initialization for the server environment.
 * Increases the event listener limit to prevent MaxListenersExceededWarning
 * in development environments where many fetch requests are made concurrently.
 */
if (typeof process !== "undefined" && process.stdout) {
  process.stdout.setMaxListeners(25);
  process.stderr.setMaxListeners(25);
}

export {};
