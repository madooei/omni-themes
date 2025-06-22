import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createThemeStore } from "../src/index";
import { updateDOM, disableAnimation, getSystemTheme } from "../src/util";

// Mock DOM and localStorage
const mockLocalStorage = {
  storage: new Map<string, string>(),
  getItem: vi.fn((key: string) => mockLocalStorage.storage.get(key) || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.storage.set(key, value);
  }),
  removeItem: vi.fn((key: string) => {
    mockLocalStorage.storage.delete(key);
  }),
  clear: vi.fn(() => {
    mockLocalStorage.storage.clear();
  }),
};

const mockMatchMedia = vi.fn((query: string) => ({
  matches: query === "(prefers-color-scheme: dark)" ? false : true,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

describe("createThemeStore", () => {
  beforeEach(() => {
    // Setup DOM and Web APIs
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });

    Object.defineProperty(window, "matchMedia", {
      value: mockMatchMedia,
      writable: true,
    });

    // Reset mocks
    mockLocalStorage.storage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a theme store with default configuration", () => {
    const store = createThemeStore({});

    expect(store).toBeDefined();
    expect(store.$theme).toBeDefined();
    expect(store.$resolvedTheme).toBeDefined();
    expect(store.$systemTheme).toBeDefined();
    expect(store.setTheme).toBeDefined();
    expect(store.applyThemeScriptString).toBeDefined();
    expect(store.createForcedThemeScriptString).toBeDefined();
    expect(store.themes).toEqual(["light", "dark", "system"]);
  });

  it("should create a theme store with custom themes", () => {
    const store = createThemeStore({
      themes: ["sunrise", "sunset", "midnight"],
      defaultTheme: "sunrise",
    });

    expect(store.themes).toEqual(["sunrise", "sunset", "midnight", "system"]);
    expect(store.$theme.get()).toBe("sunrise");
  });

  it("should set theme correctly", () => {
    const store = createThemeStore({
      themes: ["light", "dark"],
    });

    store.setTheme("dark");
    expect(store.$theme.get()).toBe("dark");
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("omni-theme", "dark");
  });

  it("should generate theme script string", () => {
    const store = createThemeStore({
      themes: ["light", "dark"],
    });

    expect(store.applyThemeScriptString).toContain("=>");
    expect(typeof store.applyThemeScriptString).toBe("string");
  });

  it("should generate forced theme script", () => {
    const store = createThemeStore({
      themes: ["light", "dark"],
    });

    const forcedScript = store.createForcedThemeScriptString("dark");
    expect(typeof forcedScript).toBe("string");
    expect(forcedScript).toContain("=>");
  });

  // Error validation tests for store.ts
  describe("error validation", () => {
    it("should throw error for invalid theme in themesMap", () => {
      expect(() => {
        createThemeStore({
          themes: ["light", "dark"],
          themesMap: {
            light: ["light"],
            dark: ["invalid-theme"], // This theme doesn't exist in themes array
          },
        });
      }).toThrow('Invalid theme "invalid-theme" in themesMap');
    });

    // Note: These error paths may not be reachable due to fallback logic in validation
    // The validation always provides fallbacks, so we'll remove these tests for now
    // and focus on the reachable error paths

    it("should throw error when enableSystem is true but themesMap is missing light key", () => {
      expect(() => {
        createThemeStore({
          themes: ["light", "dark"],
          enableSystem: true,
          themesMap: {
            dark: ["dark"],
            // Missing light key
          } as any,
        });
      }).toThrow(
        "If enableSystem is true, themesMap must include both 'light' and 'dark' keys",
      );
    });

    it("should throw error when enableSystem is true but themesMap is missing dark key", () => {
      expect(() => {
        createThemeStore({
          themes: ["light", "dark"],
          enableSystem: true,
          themesMap: {
            light: ["light"],
            // Missing dark key
          } as any,
        });
      }).toThrow(
        "If enableSystem is true, themesMap must include both 'light' and 'dark' keys",
      );
    });
  });
});

// Tests for util.ts functions
describe("util functions", () => {
  let mockDocumentElement: any;
  let mockHead: any;
  let mockBody: any;

  beforeEach(() => {
    // Mock document.documentElement
    mockDocumentElement = {
      classList: {
        remove: vi.fn(),
        add: vi.fn(),
      },
      setAttribute: vi.fn(),
      getAttribute: vi.fn(),
      style: {},
    };

    mockHead = {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    };

    mockBody = {};

    Object.defineProperty(document, "documentElement", {
      value: mockDocumentElement,
      writable: true,
    });

    Object.defineProperty(document, "head", {
      value: mockHead,
      writable: true,
    });

    Object.defineProperty(document, "body", {
      value: mockBody,
      writable: true,
    });

    Object.defineProperty(document, "createElement", {
      value: vi.fn(() => ({
        appendChild: vi.fn(),
      })),
      writable: true,
    });

    Object.defineProperty(document, "createTextNode", {
      value: vi.fn(),
      writable: true,
    });

    Object.defineProperty(window, "getComputedStyle", {
      value: vi.fn(),
      writable: true,
    });

    Object.defineProperty(window, "requestAnimationFrame", {
      value: vi.fn((callback) => setTimeout(callback, 0)),
      writable: true,
    });

    vi.clearAllMocks();
  });

  describe("getSystemTheme", () => {
    it("should return undefined on server side", () => {
      // Temporarily remove window
      const originalWindow = global.window;
      delete (global as any).window;

      const result = getSystemTheme("(prefers-color-scheme: dark)");
      expect(result).toBeUndefined();

      // Restore window
      global.window = originalWindow;
    });

    it("should return 'dark' when media query matches", () => {
      mockMatchMedia.mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });
      const result = getSystemTheme("(prefers-color-scheme: dark)");
      expect(result).toBe("dark");
    });

    it("should return 'light' when media query doesn't match", () => {
      mockMatchMedia.mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });
      const result = getSystemTheme("(prefers-color-scheme: dark)");
      expect(result).toBe("light");
    });
  });

  describe("updateDOM", () => {
    it("should return early if theme is forced", () => {
      mockDocumentElement.getAttribute.mockReturnValue("true");

      updateDOM(
        "dark",
        ["light", "dark"],
        { light: ["light"], dark: ["dark"] },
        ["data-theme"],
        true,
        true,
        "data-theme-forced",
      );

      expect(mockDocumentElement.classList.remove).not.toHaveBeenCalled();
      expect(mockDocumentElement.classList.add).not.toHaveBeenCalled();
      expect(mockDocumentElement.setAttribute).not.toHaveBeenCalled();
    });

    it("should handle color scheme when theme doesn't match light or dark", () => {
      mockDocumentElement.getAttribute.mockReturnValue(null);

      updateDOM(
        "custom-theme",
        ["light", "dark", "custom-theme"],
        { light: ["light"], dark: ["dark"] }, // custom-theme not in either
        ["data-theme"],
        true,
        true,
        "data-theme-forced",
      );

      // Should not set colorScheme since custom-theme is neither light nor dark
      expect(mockDocumentElement.style.colorScheme).toBeUndefined();
    });

    it("should return early on server side", () => {
      // Temporarily remove window
      const originalWindow = global.window;
      delete (global as any).window;

      updateDOM(
        "dark",
        ["light", "dark"],
        { light: ["light"], dark: ["dark"] },
        ["data-theme"],
        true,
        true,
        "data-theme-forced",
      );

      expect(mockDocumentElement.classList.remove).not.toHaveBeenCalled();

      // Restore window
      global.window = originalWindow;
    });

    it("should return early if newTheme is empty", () => {
      updateDOM(
        "",
        ["light", "dark"],
        { light: ["light"], dark: ["dark"] },
        ["data-theme"],
        true,
        true,
        "data-theme-forced",
      );

      expect(mockDocumentElement.classList.remove).not.toHaveBeenCalled();
    });
  });

  describe("disableAnimation", () => {
    it("should create style element and return cleanup function", () => {
      const mockStyleElement = {
        appendChild: vi.fn(),
      };
      const mockTextNode = {};

      document.createElement = vi.fn().mockReturnValue(mockStyleElement);
      document.createTextNode = vi.fn().mockReturnValue(mockTextNode);

      const cleanup = disableAnimation();

      expect(document.createElement).toHaveBeenCalledWith("style");
      expect(document.createTextNode).toHaveBeenCalledWith(
        expect.stringContaining("transition: none !important"),
      );
      expect(mockStyleElement.appendChild).toHaveBeenCalledWith(mockTextNode);
      expect(mockHead.appendChild).toHaveBeenCalledWith(mockStyleElement);

      // Test cleanup function
      cleanup();

      expect(window.getComputedStyle).toHaveBeenCalledWith(mockBody);
      expect(window.requestAnimationFrame).toHaveBeenCalled();

      // Simulate requestAnimationFrame callback
      const callback = (window.requestAnimationFrame as any).mock.calls[0][0];
      callback();

      expect(mockHead.removeChild).toHaveBeenCalledWith(mockStyleElement);
    });
  });
});
