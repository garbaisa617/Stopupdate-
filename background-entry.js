(() => {
  const originalFetch = globalThis.fetch.bind(globalThis);

  globalThis.fetch = function (input, ...options) {
    const stack = new Error().stack || "";
    if (stack.includes("otaCheckForUpdate")) {
      const version = chrome.runtime.getManifest().version;
      return Promise.resolve(new Response(JSON.stringify({ version }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }));
    }

    return originalFetch(input, ...options);
  };
})();

importScripts("background.js");
