import { useTheme } from "../context/ThemeContext";
import clsx from "clsx";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

export const ShortcutsDisplay = () => {
  const { theme } = useTheme();
  const shortcuts = useKeyboardShortcuts();

  const formatShortcut = (shortcut: any) => {
    const keys = [];
    if (shortcut.cmd) keys.push("Cmd");
    if (shortcut.alt) keys.push("Alt");
    if (shortcut.shift) keys.push("Shift");
    keys.push(shortcut.key.toUpperCase());
    return keys.join(" + ");
  };

  return (
    <div
      className={clsx(
        "p-8",
        theme === "dark" ? "text-gray-300" : "text-gray-700"
      )}
    >
      <div className="mb-6 flex flex-row items-center justify-center w-ful">
        <img src="/solo_preview.png" className="h-40" />
      </div>

      <div className="flex flex-col gap-4 mx-8">
        {shortcuts.slice(0, 3).map((shortcut, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center text-sm justify-between p-3 rounded-lg cursor-pointer",
              theme === "dark"
                ? "bg-gray-800/50 hover:bg-gray-800"
                : "bg-gray-100 hover:bg-gray-200",
              "transition-colors"
            )}
          >
            <span className="text-sm">{shortcut.description}</span>
            <kbd
              className={clsx(
                "px-2 py-1 text-xs font-mono rounded",
                theme === "dark"
                  ? "bg-gray-900 text-purple-400 border border-gray-700"
                  : "bg-white text-purple-600 border border-gray-300"
              )}
            >
              {formatShortcut(shortcut)}
            </kbd>
          </div>
        ))}
      </div>

      <div
        className={clsx(
          "mt-8 text-sm",
          theme === "dark" ? "text-gray-500" : "text-gray-600"
        )}
      >
        <p className="italic text-center">
          Tip: Press any shortcut to quickly perform actions
        </p>
      </div>
    </div>
  );
};
