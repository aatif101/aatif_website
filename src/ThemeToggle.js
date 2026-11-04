import { useEffect, useState } from "react";

const preference = "(prefers-color-scheme: dark)";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme);
  const [manual, setManual] = useState(
    document.documentElement.hasAttribute("data-manual"),
  );

  useEffect(() => {
    if (manual) return;
    const media = window.matchMedia(preference);
    const sync = () => {
      const next = media.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [manual]);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    setManual(true);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      // Storage can be unavailable in a restricted browser.
    }
  }

  return (
    <button
      className="toggle"
      type="button"
      aria-label="Dark mode"
      aria-pressed={theme === "dark"}
      onClick={toggle}
    >
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
          </>
        ) : (
          <path d="M20 15a8.5 8.5 0 0 1-11-11A8.5 8.5 0 1 0 20 15Z" />
        )}
      </svg>
    </button>
  );
}
