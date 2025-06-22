import './style.css';
import { 
  themes, 
  $theme, 
  $resolvedTheme, 
  $systemTheme, 
  setTheme, 
  applyThemeScriptString 
} from './theme-store';
import type { ThemeName } from './theme-store';

// Apply theme script for FOUC prevention
function injectThemeScript() {
  const existingScript = document.getElementById('theme-script');
  if (existingScript) {
    existingScript.innerHTML = applyThemeScriptString;
  }
}

// Initialize theme system
function initializeThemeSystem() {
  // Inject the theme script immediately
  injectThemeScript();
  
  console.log('🎨 Omni-Themes initialized with themes:', themes);
  console.log('📊 Current theme state:', {
    theme: $theme.get(),
    resolvedTheme: $resolvedTheme.get(),
    systemTheme: $systemTheme.get(),
  });
}

// Theme selector functionality
function setupThemeSelector() {
  const themeSelector = document.getElementById('theme-selector') as HTMLSelectElement;
  
  if (themeSelector) {
    // Populate theme options
    themes.forEach(theme => {
      const option = document.createElement('option');
      option.value = theme;
      option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
      themeSelector.appendChild(option);
    });

    // Set initial value
    themeSelector.value = $theme.get();

    // Handle theme changes
    themeSelector.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      if (target.value) {
        setTheme(target.value as ThemeName);
        showThemeNotification(`Switched to ${target.value} theme`);
      }
    });

    // Listen for theme changes from other sources
    $theme.listen((theme) => {
      themeSelector.value = theme;
    });
  }
}

// Random theme functionality
function setupRandomTheme() {
  const randomBtn = document.getElementById('random-theme') as HTMLButtonElement;
  
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      const currentTheme = $theme.get();
      const availableThemes = themes.filter(t => t !== currentTheme);
      const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
      
      if (randomTheme) {
        setTheme(randomTheme as ThemeName);
        showThemeNotification(`🎲 Random theme: ${randomTheme}`);
      }
    });
  }
}

// Auto cycle themes functionality
function setupThemeCycling() {
  const cycleBtn = document.getElementById('cycle-themes') as HTMLButtonElement;
  let cycleInterval: NodeJS.Timeout | null = null;
  let currentIndex = 0;
  let isCycling = false;

  if (cycleBtn) {
    cycleBtn.addEventListener('click', () => {
      if (isCycling) {
        // Stop cycling
        if (cycleInterval) {
          clearInterval(cycleInterval);
          cycleInterval = null;
        }
        isCycling = false;
        cycleBtn.textContent = '🔄 Auto Cycle';
        cycleBtn.classList.remove('btn-primary');
        showThemeNotification('Auto-cycling stopped');
      } else {
        // Start cycling
        isCycling = true;
        cycleBtn.textContent = '⏹️ Stop Cycle';
        cycleBtn.classList.add('btn-primary');
        
        const nonSystemThemes = themes.filter(t => t !== 'system');
        currentIndex = 0;
        
        cycleInterval = setInterval(() => {
          setTheme(nonSystemThemes[currentIndex] as ThemeName);
          showThemeNotification(`🔄 Auto-cycle: ${nonSystemThemes[currentIndex]}`);
          currentIndex = (currentIndex + 1) % nonSystemThemes.length;
        }, 2500);
        
        showThemeNotification('Auto-cycling started (2.5s intervals)');
      }
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      if (cycleInterval) {
        clearInterval(cycleInterval);
      }
    });
  }
}

// Update theme information displays
function updateThemeInfo() {
  const currentThemeEl = document.getElementById('current-theme');
  const systemThemeEl = document.getElementById('system-theme');
  const resolvedThemeEl = document.getElementById('resolved-theme');

  if (currentThemeEl) currentThemeEl.textContent = $theme.get();
  if (systemThemeEl) systemThemeEl.textContent = $systemTheme.get() || 'unknown';
  if (resolvedThemeEl) resolvedThemeEl.textContent = $resolvedTheme.get();
}

// Display available themes
function displayAvailableThemes() {
  const availableThemesEl = document.getElementById('available-themes');
  
  if (availableThemesEl) {
    availableThemesEl.innerHTML = themes.map(theme => 
      `<span class="btn btn-small" style="margin: 0.25rem;">${theme}</span>`
    ).join('');
  }
}

// Display store state
function displayStoreState() {
  const storeStateEl = document.getElementById('store-state');
  
  if (storeStateEl) {
    const state = {
      theme: $theme.get(),
      resolved: $resolvedTheme.get(),
      system: $systemTheme.get(),
      storage: localStorage.getItem('omni-theme-vanilla-demo'),
    };
    
    storeStateEl.innerHTML = Object.entries(state)
      .map(([key, value]) => `<div><strong>${key}:</strong> ${value || 'null'}</div>`)
      .join('');
  }
}

// Display CSS variables
function displayCSSVariables() {
  const cssVarsEl = document.getElementById('css-vars');
  
  if (cssVarsEl) {
    const rootStyles = getComputedStyle(document.documentElement);
    const variables = [
      '--bg-primary',
      '--bg-secondary', 
      '--text-primary',
      '--accent-primary',
      '--border-color'
    ];
    
    cssVarsEl.innerHTML = variables
      .map(varName => {
        const value = rootStyles.getPropertyValue(varName).trim();
        return `<div><code>${varName}:</code> <span style="color: ${value}">${value}</span></div>`;
      })
      .join('');
  }
}

// Clear storage functionality
function setupStorageControls() {
  const clearStorageBtn = document.getElementById('clear-storage') as HTMLButtonElement;
  const storageStatusEl = document.getElementById('storage-status');
  
  if (clearStorageBtn) {
    clearStorageBtn.addEventListener('click', () => {
      localStorage.removeItem('omni-theme-vanilla-demo');
      showThemeNotification('Theme storage cleared');
      
      // Reset to system preference or default
      const systemTheme = $systemTheme.get();
      if (systemTheme) {
        setTheme('system');
      } else {
        setTheme('light');
      }
    });
  }

  // Monitor storage status
  function updateStorageStatus() {
    if (storageStatusEl) {
      const hasStorage = localStorage.getItem('omni-theme-vanilla-demo') !== null;
      storageStatusEl.className = `status-indicator ${hasStorage ? 'status-success' : 'status-warning'}`;
      storageStatusEl.innerHTML = `<span>${hasStorage ? '✓ Storage active' : '⚠ No storage'}</span>`;
    }
  }

  // Initial status
  updateStorageStatus();
  
  // Update on theme changes
  $theme.listen(updateStorageStatus);
}

// Open new tab functionality
function setupNewTabButton() {
  const openNewTabBtn = document.getElementById('open-new-tab') as HTMLButtonElement;
  
  if (openNewTabBtn) {
    openNewTabBtn.addEventListener('click', () => {
      window.open(window.location.href, '_blank');
      showThemeNotification('New tab opened - try changing themes!');
    });
  }
}

// Theme change notification
function showThemeNotification(message: string) {
  // Remove existing notification
  const existing = document.querySelector('.theme-notification');
  if (existing) {
    existing.remove();
  }

  // Create new notification
  const notification = document.createElement('div');
  notification.className = 'theme-notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// Smooth scroll for navigation
function setupSmoothNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (e.target as HTMLAnchorElement).getAttribute('href');
      
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Monitor system theme changes
function setupSystemThemeMonitoring() {
  const systemStatusEl = document.getElementById('system-status');
  
  function updateSystemStatus() {
    if (systemStatusEl) {
      const hasSystemSupport = window.matchMedia('(prefers-color-scheme: dark)').matches !== undefined;
      const currentSystemTheme = $systemTheme.get();
      
      if (hasSystemSupport) {
        systemStatusEl.className = 'status-indicator status-success';
        systemStatusEl.innerHTML = `<span>✓ System: ${currentSystemTheme || 'unknown'}</span>`;
      } else {
        systemStatusEl.className = 'status-indicator status-warning';
        systemStatusEl.innerHTML = '<span>⚠ No system support</span>';
      }
    }
  }

  updateSystemStatus();
  $systemTheme.listen(updateSystemStatus);
}

// Main application initialization
function initializeApp() {
  console.log('🚀 Initializing Omni-Themes Vanilla Demo...');
  
  // Initialize theme system first
  initializeThemeSystem();
  
  // Set up all UI components
  setupThemeSelector();
  setupRandomTheme();
  setupThemeCycling();
  setupStorageControls();
  setupNewTabButton();
  setupSmoothNavigation();
  setupSystemThemeMonitoring();
  
  // Initial data display
  updateThemeInfo();
  displayAvailableThemes();
  displayStoreState();
  displayCSSVariables();
  
  // Set up listeners for real-time updates
  $theme.listen(() => {
    updateThemeInfo();
    displayStoreState();
  });
  
  $resolvedTheme.listen(() => {
    displayCSSVariables();
    updateThemeInfo();
  });
  
  $systemTheme.listen(() => {
    updateThemeInfo();
    displayStoreState();
  });
  
  // Welcome message
  showThemeNotification('🎨 Omni-Themes demo loaded!');
  
  console.log('✅ Demo initialized successfully');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}