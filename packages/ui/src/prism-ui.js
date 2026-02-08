/**
 * Prism UI - Framework-Agnostic Headless Components
 * Vanilla JS Interactivity Layer
 * Version: 1.1.0
 *
 * Works with ANY framework or plain HTML.
 * No React, Vue, Angular, or any framework dependency required.
 *
 * Usage:
 *   <link rel="stylesheet" href="https://unpkg.com/prism-ui-headless-react@latest/dist/prism-ui.css">
 *   <script src="https://unpkg.com/prism-ui-headless-react@latest/dist/prism-ui.js"></script>
 */
(function (global) {
  "use strict";

  // ──────────────────────────────────────────────
  //  🔘 BUTTON — auto-wires loading spinner
  // ──────────────────────────────────────────────
  function initButtons() {
    document
      .querySelectorAll('[data-component="button"]')
      .forEach(function (btn) {
        if (btn._prismInit) return;
        btn._prismInit = true;

        // If marked loading, add a spinner
        if (btn.getAttribute("data-loading") === "true") {
          _setLoading(btn, true);
        }
      });
  }

  function _setLoading(btn, isLoading) {
    if (isLoading) {
      btn.setAttribute("data-loading", "true");
      btn.setAttribute("aria-busy", "true");
      btn.disabled = true;
    } else {
      btn.removeAttribute("data-loading");
      btn.removeAttribute("aria-busy");
      btn.disabled = false;
    }
  }

  // ──────────────────────────────────────────────
  //  🗂️ TABS — keyboard-accessible tab switching
  // ──────────────────────────────────────────────
  function initTabs() {
    document
      .querySelectorAll('[data-component="tabs"]')
      .forEach(function (tabRoot) {
        if (tabRoot._prismInit) return;
        tabRoot._prismInit = true;

        var triggers = tabRoot.querySelectorAll(
          '[data-component="tabs-trigger"]',
        );
        var panels = tabRoot.querySelectorAll(
          '[data-component="tabs-content"]',
        );

        // Set initial state
        var defaultValue =
          tabRoot.getAttribute("data-default") ||
          (triggers[0] && triggers[0].getAttribute("data-value"));
        if (defaultValue) {
          _activateTab(tabRoot, triggers, panels, defaultValue);
        }

        // Click handler
        triggers.forEach(function (trigger) {
          trigger.setAttribute("role", "tab");
          trigger.addEventListener("click", function () {
            if (trigger.disabled) return;
            var value = trigger.getAttribute("data-value");
            _activateTab(tabRoot, triggers, panels, value);
          });

          // Keyboard navigation
          trigger.addEventListener("keydown", function (e) {
            var triggersArr = Array.from(triggers).filter(function (t) {
              return !t.disabled;
            });
            var idx = triggersArr.indexOf(trigger);
            var next = -1;

            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              next = (idx + 1) % triggersArr.length;
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              next = (idx - 1 + triggersArr.length) % triggersArr.length;
            } else if (e.key === "Home") {
              next = 0;
            } else if (e.key === "End") {
              next = triggersArr.length - 1;
            }

            if (next >= 0) {
              e.preventDefault();
              triggersArr[next].focus();
              triggersArr[next].click();
            }
          });
        });

        // Set ARIA on tab list
        var tabList = tabRoot.querySelector('[data-component="tabs-list"]');
        if (tabList) {
          tabList.setAttribute("role", "tablist");
        }

        panels.forEach(function (panel) {
          panel.setAttribute("role", "tabpanel");
        });
      });
  }

  function _activateTab(root, triggers, panels, value) {
    triggers.forEach(function (t) {
      var isActive = t.getAttribute("data-value") === value;
      t.setAttribute("data-state", isActive ? "active" : "inactive");
      t.setAttribute("aria-selected", isActive ? "true" : "false");
      t.setAttribute("tabindex", isActive ? "0" : "-1");
    });
    panels.forEach(function (p) {
      var isActive = p.getAttribute("data-value") === value;
      p.setAttribute("data-state", isActive ? "active" : "inactive");
      p.hidden = !isActive;
    });
  }

  // ──────────────────────────────────────────────
  //  💬 DIALOG — open / close with backdrop
  // ──────────────────────────────────────────────
  var _activeDialogs = [];

  function openDialog(id) {
    var dialog = document.getElementById(id);
    if (!dialog) return;

    // Create overlay
    var overlay = document.createElement("div");
    overlay.setAttribute("data-component", "dialog-overlay");
    overlay.setAttribute("data-dialog-id", id);
    overlay.addEventListener("click", function () {
      closeDialog(id);
    });
    document.body.appendChild(overlay);

    // Show dialog
    dialog.setAttribute("data-state", "open");
    dialog.style.display = "";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");

    // Trap focus
    var focusable = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length) focusable[0].focus();

    // Close on Escape
    function onEsc(e) {
      if (e.key === "Escape") closeDialog(id);
    }
    document.addEventListener("keydown", onEsc);

    _activeDialogs.push({ id: id, overlay: overlay, onEsc: onEsc });

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  function closeDialog(id) {
    var dialog = document.getElementById(id);
    if (!dialog) return;

    dialog.setAttribute("data-state", "closed");
    dialog.style.display = "none";

    // Remove overlay
    var idx = -1;
    for (var i = 0; i < _activeDialogs.length; i++) {
      if (_activeDialogs[i].id === id) {
        idx = i;
        break;
      }
    }

    if (idx >= 0) {
      var entry = _activeDialogs[idx];
      if (entry.overlay && entry.overlay.parentNode) {
        entry.overlay.parentNode.removeChild(entry.overlay);
      }
      document.removeEventListener("keydown", entry.onEsc);
      _activeDialogs.splice(idx, 1);
    }

    // Restore body scroll if no dialogs open
    if (_activeDialogs.length === 0) {
      document.body.style.overflow = "";
    }
  }

  function initDialogs() {
    // Wire up dialog triggers
    document
      .querySelectorAll("[data-dialog-trigger]")
      .forEach(function (trigger) {
        if (trigger._prismInit) return;
        trigger._prismInit = true;

        var targetId = trigger.getAttribute("data-dialog-trigger");
        trigger.addEventListener("click", function () {
          openDialog(targetId);
        });
      });

    // Wire up dialog close buttons
    document
      .querySelectorAll("[data-dialog-close]")
      .forEach(function (closeBtn) {
        if (closeBtn._prismInit) return;
        closeBtn._prismInit = true;

        var targetId =
          closeBtn.getAttribute("data-dialog-close") ||
          closeBtn.closest('[data-component="dialog-content"]')?.id;
        if (targetId) {
          closeBtn.addEventListener("click", function () {
            closeDialog(targetId);
          });
        }
      });

    // Hide all closed dialogs initially
    document
      .querySelectorAll('[data-component="dialog-content"]')
      .forEach(function (d) {
        if (d.getAttribute("data-state") !== "open") {
          d.style.display = "none";
        }
      });
  }

  // ──────────────────────────────────────────────
  //  🔔 TOAST — notification system
  // ──────────────────────────────────────────────
  var _toastContainer = null;
  var _toastQueue = [];
  var _toastId = 0;

  function _ensureContainer() {
    if (_toastContainer) return _toastContainer;

    _toastContainer = document.createElement("div");
    _toastContainer.setAttribute("data-component", "toast-container");
    _toastContainer.setAttribute("role", "region");
    _toastContainer.setAttribute("aria-label", "Notifications");
    document.body.appendChild(_toastContainer);

    return _toastContainer;
  }

  /**
   * Show a toast notification.
   * @param {Object} options
   * @param {string} options.title - Toast title
   * @param {string} [options.description] - Optional description
   * @param {string} [options.type="info"] - "success" | "error" | "warning" | "info"
   * @param {number} [options.duration=4000] - Auto-dismiss time in ms (0 = manual close)
   * @param {string} [options.action] - Optional action button label
   * @param {function} [options.onAction] - Action button callback
   */
  function showToast(options) {
    if (typeof options === "string") {
      options = { title: options };
    }

    var type = options.type || "info";
    var duration = options.duration !== undefined ? options.duration : 4000;
    var id = ++_toastId;

    var container = _ensureContainer();

    // Build toast element
    var toast = document.createElement("div");
    toast.setAttribute("data-component", "toast");
    toast.setAttribute("data-type", type);
    toast.setAttribute("data-toast-id", id);
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");

    var icon = _getToastIcon(type);

    var html = '<div style="display:flex;gap:12px;align-items:flex-start">';
    html +=
      '<span style="font-size:1.1rem;flex-shrink:0;margin-top:1px">' +
      icon +
      "</span>";
    html += '<div data-part="toast-content">';
    html +=
      '<div data-part="toast-title">' + _escapeHtml(options.title) + "</div>";
    if (options.description) {
      html +=
        '<div data-part="toast-description">' +
        _escapeHtml(options.description) +
        "</div>";
    }
    if (options.action) {
      html +=
        '<button data-part="toast-action">' +
        _escapeHtml(options.action) +
        "</button>";
    }
    html += "</div></div>";
    html +=
      '<button data-part="toast-close" aria-label="Close">&times;</button>';

    toast.innerHTML = html;

    // Wire close button
    toast
      .querySelector('[data-part="toast-close"]')
      .addEventListener("click", function () {
        dismissToast(id);
      });

    // Wire action button
    if (options.action && options.onAction) {
      toast
        .querySelector('[data-part="toast-action"]')
        .addEventListener("click", function () {
          options.onAction();
          dismissToast(id);
        });
    }

    container.appendChild(toast);
    _toastQueue.push({ id: id, el: toast });

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(function () {
        dismissToast(id);
      }, duration);
    }

    return id;
  }

  function dismissToast(id) {
    for (var i = 0; i < _toastQueue.length; i++) {
      if (_toastQueue[i].id === id) {
        var el = _toastQueue[i].el;
        el.style.animation = "toastSlideOut 0.2s ease forwards";
        setTimeout(function () {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 200);
        _toastQueue.splice(i, 1);
        break;
      }
    }
  }

  function _getToastIcon(type) {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "ℹ";
    }
  }

  function _escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Convenience toast methods
  function toastSuccess(title, description) {
    return showToast({
      title: title,
      description: description,
      type: "success",
    });
  }

  function toastError(title, description) {
    return showToast({ title: title, description: description, type: "error" });
  }

  function toastWarning(title, description) {
    return showToast({
      title: title,
      description: description,
      type: "warning",
    });
  }

  function toastInfo(title, description) {
    return showToast({ title: title, description: description, type: "info" });
  }

  // ──────────────────────────────────────────────
  //  🔄 INIT — auto-initialize all components
  // ──────────────────────────────────────────────
  function init() {
    initButtons();
    initTabs();
    initDialogs();
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Also watch for dynamically added elements
  if (typeof MutationObserver !== "undefined") {
    var observer = new MutationObserver(function (mutations) {
      var shouldInit = false;
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length) {
          shouldInit = true;
          break;
        }
      }
      if (shouldInit) init();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  // ──────────────────────────────────────────────
  //  📦 PUBLIC API
  // ──────────────────────────────────────────────
  var PrismUI = {
    // Manual init (for SPAs or dynamic content)
    init: init,
    initButtons: initButtons,
    initTabs: initTabs,
    initDialogs: initDialogs,

    // Dialog controls
    openDialog: openDialog,
    closeDialog: closeDialog,

    // Toast system
    toast: showToast,
    dismissToast: dismissToast,

    // Toast shortcuts
    success: toastSuccess,
    error: toastError,
    warning: toastWarning,
    info: toastInfo,

    // Version
    version: "1.3.0",
  };

  // Expose globally
  global.PrismUI = PrismUI;

  // AMD support
  if (typeof define === "function" && define.amd) {
    define(function () {
      return PrismUI;
    });
  }

  // CommonJS support
  if (typeof module === "object" && module.exports) {
    module.exports = PrismUI;
  }
})(
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
      ? window
      : this,
);
