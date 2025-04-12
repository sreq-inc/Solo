import { useTheme } from "../context/ThemeContext";
import clsx from "clsx";

type Tab = "body" | "auth";

type TabComponentProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export const TabComponent = ({ activeTab, onTabChange }: TabComponentProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        "border-b",
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      )}
    >
      <nav className="flex -mb-px">
        <button
          onClick={() => onTabChange("body")}
          className={clsx(
            "py-2 px-4 text-sm font-medium",
            activeTab === "body"
              ? theme === "dark"
                ? "border-b-2 border-purple-500 text-purple-400"
                : "border-b-2 border-purple-600 text-purple-600"
              : theme === "dark"
              ? "text-gray-400 hover:text-gray-300 hover:border-gray-700"
              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
        >
          Body
        </button>
        <button
          onClick={() => onTabChange("auth")}
          className={clsx(
            "ml-8 py-2 px-4 text-sm font-medium",
            activeTab === "auth"
              ? theme === "dark"
                ? "border-b-2 border-purple-500 text-purple-400"
                : "border-b-2 border-purple-600 text-purple-600"
              : theme === "dark"
              ? "text-gray-400 hover:text-gray-300 hover:border-gray-700"
              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
        >
          Auth
        </button>
      </nav>
    </div>
  );
};
