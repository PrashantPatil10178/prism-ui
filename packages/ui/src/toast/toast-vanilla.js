/**
 * Prism UI Toast - Vanilla JavaScript
 * No dependencies, no frameworks required
 */
(function (global) {
  "use strict";

  let toastContainer = null;
  let toastId = 0;

  // Create toast container
  function ensureContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.setAttribute("data-component", "toaster");
      toastContainer.setAttribute("role", "region");
      toastContainer.setAttribute("aria-label", "Notifications");
      toastContainer.style.cssText =
        "position:fixed;top:16px;right:16px;display:flex;flex-direction:column;gap:12px;max-width:420px;z-index:9999;";
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }

  // Create toast element
  function createToast(options) {
    const {
      title,
      description,
      type = "info",
      duration = 5000,
      action,
    } = options;

    const id = `toast-${++toastId}`;
    const toast = document.createElement("div");
    toast.id = id;
    toast.setAttribute("data-component", "toast");
    toast.setAttribute("data-type", type);
    toast.setAttribute("role", "alert");

    // Build toast HTML
    let html = '<div data-part="content">';
    if (title) {
      html += `<div data-part="title">${escapeHtml(title)}</div>`;
    }
    if (description) {
      html += `<div data-part="description">${escapeHtml(description)}</div>`;
    }
    html += "</div>";

    if (action) {
      html += `<button data-part="action">${escapeHtml(action.label)}</button>`;
    }

    html += '<button data-part="close" aria-label="Close">&times;</button>';
    toast.innerHTML = html;

    // Event listeners
    const closeBtn = toast.querySelector('[data-part="close"]');
    closeBtn.addEventListener("click", () => removeToast(id));

    if (action) {
      const actionBtn = toast.querySelector('[data-part="action"]');
      actionBtn.addEventListener("click", (e) => {
        action.onClick(e);
        if (action.closeOnClick !== false) {
          removeToast(id);
        }
      });
    }

    // Add to container
    const container = ensureContainer();
    container.appendChild(toast);

    // Auto dismiss
    if (duration !== Infinity && duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }

    return id;
  }

  // Remove toast
  function removeToast(id) {
    const toast = document.getElementById(id);
    if (toast) {
      toast.style.animation = "toastSlideOut 0.2s ease forwards";
      setTimeout(() => {
        toast.remove();
        // Clean up container if empty
        if (toastContainer && toastContainer.children.length === 0) {
          toastContainer.remove();
          toastContainer = null;
        }
      }, 200);
    }
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Public API
  const PrismToast = {
    show: function (options) {
      return createToast(options);
    },
    success: function (title, description) {
      return createToast({ title, description, type: "success" });
    },
    error: function (title, description) {
      return createToast({ title, description, type: "error" });
    },
    info: function (title, description) {
      return createToast({ title, description, type: "info" });
    },
    warning: function (title, description) {
      return createToast({ title, description, type: "warning" });
    },
    dismiss: function (id) {
      removeToast(id);
    },
  };

  // Export to global scope
  if (typeof global.PrismUI === "undefined") {
    global.PrismUI = {};
  }
  global.PrismUI.toast = PrismToast;

  // Also support direct window.PrismToast
  global.PrismToast = PrismToast;
})(typeof window !== "undefined" ? window : this);
