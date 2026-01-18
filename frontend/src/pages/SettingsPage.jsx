import { useThemeStore, allThemes } from "../store/useThemeStore";

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl font-semibold mb-6 text-(--color-text) mt-16 text-center">
        Choose a Theme
      </h1>

      <div
        className="
        grid
        grid-cols-3
        sm:grid-cols-4
        md:grid-cols-6
        gap-4
        justify-items-center
      "
      >
        {allThemes.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className="flex flex-col items-center gap-2"
          >
            <div
              data-theme={t}
              className={`
                w-14 h-14 rounded-lg overflow-hidden border
                transition
                ${
                  theme === t
                    ? "border-(--color-primary) scale-105"
                    : "border-gray-300 hover:scale-105"
                }
              `}
            >
              <div className="h-1/3 w-full bg-(--color-primary)" />
              <div className="h-1/3 w-full bg-(--color-secondary)" />
              <div className="h-1/3 w-full bg-(--color-bg)" />
            </div>

            <span className="text-xs capitalize text-(--color-text)">{t}</span>
          </button>
        ))}
      </div>

      <div className="pt-8 border-t border-(--color-primary)/30 mt-8">
        <h2 className="text-sm font-medium mb-4 text-(--color-text) text-center">
          Preview
        </h2>

        <div
          data-theme={theme}
          className="rounded-xl p-4 sm:p-6 bg-(--color-bg) text-(--color-text) transition"
        >
          <div
            className="
            mx-auto
            max-w-sm
            sm:max-w-md
            rounded-lg
            p-5
            bg-(--color-bg)
            border
            border-(--color-primary)/30
            space-y-4
          "
          >
            <h3 className="text-center text-lg font-semibold text-(--color-primary)">
              Sample Card
            </h3>

            <p className="text-center text-sm text-(--color-text)/70">
              This is how the app will look with the selected theme.
            </p>

            <div
              className="
              mt-4
              flex
              flex-col
              sm:flex-row
              gap-3
              justify-center
            "
            >
              <button className="px-4 py-2 rounded-md bg-(--color-primary) text-(--color-text)">
                Primary
              </button>

              <button className="px-4 py-2 rounded-md border border-(--color-primary) text-(--color-text)">
                Secondary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
