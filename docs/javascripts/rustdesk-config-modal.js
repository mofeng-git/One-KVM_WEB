(function () {
  var dialog;
  var activeConfig;

  var CONFIGS = {
    rustdesk:
      "eyJ0aXRsZSI6eyJ6aCI6IlJ1c3REZXNrIOWFrOWFseacjeWKoeWZqOmFjee9riIsImVuIjoiUnVzdERlc2sgUHVibGljIFNl" +
      "cnZlciBDb25maWcifSwiY2FyZHMiOlt7Im5hbWUiOnsiemgiOiLmnI3liqHlmaggMSIsImVuIjoiU2VydmVyIDEifSwiZmll" +
      "bGRzIjpbW3siemgiOiJJRCDmnI3liqHlmagiLCJlbiI6IklEIFNlcnZlciJ9LCIxNTQuOTQuMjM3LjIxOSJdLFt7InpoIjoi" +
      "5Lit57un5pyN5Yqh5ZmoIiwiZW4iOiJSZWxheSBTZXJ2ZXIifSwiMTU0Ljk0LjIzNy4yMTk6MjExMTciXSxbeyJ6aCI6Iuac" +
      "jeWKoeWZqOWvhumSpSIsImVuIjoiS2V5In0sIkVDM2tMSExENlhlN0JsaHZLRUllbkNNaFM4eUNnSk9XT0s1RXdhaTc0NTg9" +
      "Il1dfSx7Im5hbWUiOnsiemgiOiLmnI3liqHlmaggMiIsImVuIjoiU2VydmVyIDIifSwiZmllbGRzIjpbW3siemgiOiJJRCDm" +
      "nI3liqHlmagiLCJlbiI6IklEIFNlcnZlciJ9LCI3OS4xMjcuMTI5LjE0OSJdLFt7InpoIjoi5Lit57un5pyN5Yqh5ZmoIiwi" +
      "ZW4iOiJSZWxheSBTZXJ2ZXIifSwiNzkuMTI3LjEyOS4xNDk6MjExMTciXSxbeyJ6aCI6IuacjeWKoeWZqOWvhumSpSIsImVu" +
      "IjoiS2V5In0sIlZIRlVPQlArWTRWSW41bDd5b0FNRmwyMklNS0I2ZkZ2ajNGdm5xb0xjMzg9Il1dfV19",
    easytier:
      "eyJ0aXRsZSI6eyJ6aCI6IkVhc3lUaWVyIOWFrOWFseiKgueCuemFjee9riIsImVuIjoiRWFzeVRpZXIgUHVibGljIFBlZXIg" +
      "Q29uZmlnIn0sImNhcmRzIjpbeyJuYW1lIjp7InpoIjoi5o6o6I2Q5a+5562J6IqC54K5IiwiZW4iOiJSZWNvbW1lbmRlZCBQ" +
      "ZWVycyJ9LCJmaWVsZHMiOltbeyJ6aCI6IuacjeWKoeWZqCAxIiwiZW4iOiJTZXJ2ZXIgMSJ9LCJ0Y3A6Ly8xNTQuOTQuMjM3" +
      "LjIxOToxMTAxMCJdLFt7InpoIjoi5pyN5Yqh5ZmoIDIiLCJlbiI6IlNlcnZlciAyIn0sInRjcDovLzc5LjEyNy4xMjkuMTQ5" +
      "OjExMDEwIl1dfV19",
    webrtc:
      "eyJ0aXRsZSI6eyJ6aCI6IldlYlJUQyBTVFVOL1RVUk4g5YWs5YWx5pyN5Yqh6YWN572uIiwiZW4iOiJXZWJSVEMgU1RVTi9U" +
      "VVJOIFB1YmxpYyBTZXJ2aWNlIENvbmZpZyJ9LCJjYXJkcyI6W3sibmFtZSI6eyJ6aCI6IuacjeWKoeWZqCAxIiwiZW4iOiJT" +
      "ZXJ2ZXIgMSJ9LCJmaWVsZHMiOltbeyJ6aCI6IlNUVU4vVFVSTiDmnI3liqHlmagiLCJlbiI6IlNUVU4vVFVSTiBTZXJ2ZXIi" +
      "fSwiMTU0Ljk0LjIzNy4yMTk6MzQ3OCJdLFt7InpoIjoi55So5oi35ZCNIiwiZW4iOiJVc2VybmFtZSJ9LCJvbmUta3ZtIl0s" +
      "W3siemgiOiLlr4bnoIEiLCJlbiI6IlBhc3N3b3JkIn0sIjYzRkJPTFd1eGI1d2tYRkF6YkRqTGRaQS80MTZITDlxIl1dfSx7" +
      "Im5hbWUiOnsiemgiOiLmnI3liqHlmaggMiIsImVuIjoiU2VydmVyIDIifSwiZmllbGRzIjpbW3siemgiOiJTVFVOL1RVUk4g" +
      "5pyN5Yqh5ZmoIiwiZW4iOiJTVFVOL1RVUk4gU2VydmVyIn0sIjc5LjEyNy4xMjkuMTQ5OjM0NzgiXSxbeyJ6aCI6IueUqOaI" +
      "t+WQjSIsImVuIjoiVXNlcm5hbWUifSwib25lLWt2bSJdLFt7InpoIjoi5a+G56CBIiwiZW4iOiJQYXNzd29yZCJ9LCJOWDBu" +
      "MWpuMHowSDBxa2JYeU1RYWZWTTZ0NlJ0ejR5aSJdXX1dfQ==",
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char];
    });
  }

  function base64ToUtf8(value) {
    var binary = atob(value);
    var bytes = new Uint8Array(binary.length);

    for (var i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }

    return new TextDecoder().decode(bytes);
  }

  function decodeConfig(name) {
    var data = CONFIGS[name];

    if (!data) {
      throw new Error("Unknown public config: " + name);
    }

    return JSON.parse(base64ToUtf8(data));
  }

  function currentLanguage() {
    return document.documentElement.lang === "en" ? "en" : "zh";
  }

  function localized(value, lang) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[lang] || value.en || value.zh || "";
    }

    return value;
  }

  function ensureDialog() {
    if (dialog) {
      return dialog;
    }

    dialog = document.createElement("dialog");
    dialog.className = "rustdesk-config-dialog";
    dialog.innerHTML =
      '<form method="dialog" class="rustdesk-config-dialog__shell">' +
      '  <div class="rustdesk-config-dialog__head">' +
      '    <h2 class="rustdesk-config-dialog__title"></h2>' +
      '    <button class="rustdesk-config-dialog__close" value="cancel" aria-label="Close">&times;</button>' +
      "  </div>" +
      '  <div class="rustdesk-config-dialog__body">' +
      '    <div class="rustdesk-config-dialog__content"></div>' +
      "  </div>" +
      "</form>";
    document.body.appendChild(dialog);

    dialog.addEventListener("close", function () {
      dialog.querySelector(".rustdesk-config-dialog__title").textContent = "";
      dialog.querySelector(".rustdesk-config-dialog__content").innerHTML = "";
      activeConfig = null;
    });

    return dialog;
  }

  function renderConfig(config) {
    var lang = currentLanguage();
    var html = config.cards
      .map(function (card) {
        var rows = card.fields
          .map(function (field) {
            return (
              "<dt>" +
              escapeHtml(localized(field[0], lang)) +
              "</dt><dd><code>" +
              escapeHtml(field[1]) +
              "</code></dd>"
            );
          })
          .join("");

        return (
          '<section class="rustdesk-config-card">' +
          "  <h3>" +
          escapeHtml(localized(card.name, lang)) +
          "</h3>" +
          '  <dl class="rustdesk-config-list">' +
          rows +
          "  </dl>" +
          "</section>"
        );
      })
      .join("");

    dialog.querySelector(".rustdesk-config-dialog__title").textContent = localized(config.title, lang);
    dialog.querySelector(".rustdesk-config-dialog__content").innerHTML = html;
  }

  function openConfigDialog(configName) {
    var modal = ensureDialog();
    activeConfig = decodeConfig(configName);
    renderConfig(activeConfig);

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }

    modal.querySelector(".rustdesk-config-dialog__close").focus();
  }

  function initPublicConfigButtons() {
    document.querySelectorAll("[data-public-config]").forEach(function (button) {
      if (button.dataset.publicConfigReady === "true") {
        return;
      }

      button.dataset.publicConfigReady = "true";
      button.addEventListener("click", function () {
        try {
          openConfigDialog(button.dataset.publicConfig);
        } catch (err) {
          console.error("Invalid public config payload.", err);
        }
      });
    });
  }

  if (window.document$) {
    window.document$.subscribe(initPublicConfigButtons);
  } else {
    document.addEventListener("DOMContentLoaded", initPublicConfigButtons);
  }
})();
