/** 轻量 Toast，避免 Arco Message 在 React 19 下的兼容问题 */

function showDemoToast(message: string, className: string, durationMs: number) {
  if (typeof document === "undefined") return;

  const el = document.createElement("div");
  el.className = `fixed left-1/2 top-6 z-[1100] -translate-x-1/2 rounded-lg px-4 py-2.5 text-sm shadow-sm ${className}`;
  el.textContent = message;
  document.body.appendChild(el);

  window.setTimeout(() => {
    el.remove();
  }, durationMs);
}

export function demoToastSuccess(message: string, durationMs = 2500) {
  showDemoToast(
    message,
    "border border-emerald-200 bg-emerald-50 text-emerald-700",
    durationMs,
  );
}

export function demoToastInfo(message: string, durationMs = 2500) {
  showDemoToast(
    message,
    "border border-sky-200 bg-sky-50 text-sky-700",
    durationMs,
  );
}
