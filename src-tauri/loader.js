// ==================== GM Polyfill ====================
(function () {
  const _g = {
    get(k, d) {
      try {
        return JSON.parse(localStorage.getItem("__gm_" + k));
      } catch (e) {}
      return d;
    },
    set(k, v) {
      localStorage.setItem("__gm_" + k, JSON.stringify(v));
    },
  };
  window.GM_getValue = (k, d) => _g.get(k, d);
  window.GM_setValue = (k, v) => _g.set(k, v);
  window.GM_deleteValue = (k) => {
    localStorage.removeItem("__gm_" + k);
  };
  window.GM = window.GM || {};
  window.GM.getValue = (k, d) => Promise.resolve(_g.get(k, d));
  window.GM.setValue = (k, v) => {
    _g.set(k, v);
    return Promise.resolve();
  };
  window.GM_xmlhttpRequest = function (details) {
    var xhr = new XMLHttpRequest();
    xhr.open(details.method || "GET", details.url, true);
    if (details.headers) {
      Object.keys(details.headers).forEach(function (h) {
        xhr.setRequestHeader(h, details.headers[h]);
      });
    }
    xhr.onload = function () {
      var resp = {
        responseText: xhr.responseText,
        status: xhr.status,
        finalUrl: xhr.responseURL,
      };
      if (details.onload) details.onload(resp);
    };
    xhr.onerror = function (e) {
      if (details.onerror) details.onerror(e);
    };
    xhr.send(details.data || null);
    return {
      abort: function () {
        xhr.abort();
      },
    };
  };
  window.GM_registerMenuCommand = (cap, fn) => {
    console.log("[GM]", cap);
    if (!document.body) return;
    var b = document.createElement("button");
    b.textContent = cap;
    b.style.cssText =
      "position:fixed;bottom:60px;right:20px;z-index:9999;padding:4px 10px;background:#333;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;";
    b.onclick = fn;
    document.body.appendChild(b);
  };
  window.unsafeWindow = window;
})();

// ==================== 远程加载脚本 ====================
(function () {
  // 替换为你的 scripts.txt 的 raw 地址（确保是 raw.githubusercontent.com）
  var scriptListUrl =
    "https://raw.githubusercontent.com/你的用户名/你的仓库/main/scripts.txt";

  function loadScript(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        var code = xhr.responseText;
        // 剥离 UserScript 元数据
        if (code.indexOf("==/UserScript==") !== -1) {
          code = code.split("==/UserScript==")[1] || code;
        }
        try {
          new Function(code)();
          console.log("[Loader] OK:", url);
        } catch (e) {
          console.error("[Loader] Execute error:", url, e);
        }
      } else {
        console.error("[Loader] HTTP error:", url, xhr.status);
      }
      if (callback) callback();
    };
    xhr.onerror = function () {
      console.error("[Loader] Network error:", url);
      if (callback) callback();
    };
    xhr.send();
  }

  // 获取脚本列表
  var listXhr = new XMLHttpRequest();
  listXhr.open("GET", scriptListUrl, true);
  listXhr.onload = function () {
    if (listXhr.status >= 200 && listXhr.status < 400) {
      var urls = listXhr.responseText
        .split("\n")
        .map(function (s) {
          return s.trim();
        })
        .filter(function (s) {
          return s && s.indexOf("http") === 0;
        });
      var i = 0;
      function next() {
        if (i < urls.length) {
          loadScript(urls[i], next);
          i++;
        }
      }
      next();
    } else {
      console.error("[Loader] Failed to fetch script list:", listXhr.status);
    }
  };
  listXhr.onerror = function () {
    console.error("[Loader] Network error fetching script list");
  };
  listXhr.send();
})();
