// ===== GM Polyfill =====
(function(){
    const _g = {
        get(k, d) { try { return JSON.parse(localStorage.getItem('__gm_'+k)); } catch(e) {} return d; },
        set(k, v) { localStorage.setItem('__gm_'+k, JSON.stringify(v)); },
    };
    window.GM_getValue = (k,d)=>_g.get(k,d);
    window.GM_setValue = (k,v)=>_g.set(k,v);
    window.GM_deleteValue = (k)=>{ localStorage.removeItem('__gm_'+k); };
    window.GM = window.GM || {};
    window.GM.getValue = (k,d)=>Promise.resolve(_g.get(k,d));
    window.GM.setValue = (k,v)=>{ _g.set(k,v); return Promise.resolve(); };
    window.GM_xmlhttpRequest = function(d){
        fetch(d.url, { method: d.method || 'GET', headers: d.headers || {}, body: d.data || null })
            .then(r=>r.text().then(t=>d.onload&&d.onload({responseText:t,status:r.status,finalUrl:r.url})))
            .catch(e=>d.onerror&&d.onerror(e));
        return { abort() {} };
    };
    window.GM_registerMenuCommand = (cap,fn)=>{
        console.log('[GM]', cap);
        if(!document.body) return;
        const b=document.createElement('button');
        b.textContent=cap;
        b.style.cssText='position:fixed;bottom:60px;right:20px;z-index:9999;padding:4px 10px;background:#333;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;';
        b.onclick=fn;
        document.body.appendChild(b);
    };
    window.unsafeWindow = window;
})();

// ===== 在这里粘贴你5个脚本的去头代码 =====
// 把下面每个脚本的 // ==UserScript== 到 // ==/UserScript== 之间的内容删掉，
// 只保留后面的 (function(){ ... })(); 部分，按顺序粘贴进来


// 
(async () => {
  const shouldNotifyUserAboutChanges = true;
  const userLanguage = navigator.language || navigator.userLanguage;
  const i18nText = {
    zhSimplified: {
      closeText: `<br>双击关闭此消息👆`,
      updateText: `BTYS 版本 ${GM_info.script.version}<br>
        Hi，这次更新修复了一个小问题🛠️<br>
        当打开自动滚动与记忆视频进度时<br>
        如果一个视频播放完并跳转到了下一个<br>
        此时回到上一个视频应该是从头开始的而不是从最后开始🤔<br>
        这个逻辑才是正确的📢<br>
        现在已经修复了这个问题🎉<br>
      `,
      newInstallationText: `
        欢迎使用 Better YouTube Shorts🎉<br>
        请检查 Tampermonkey 菜单中的设置🛠️<br>
        里面还有更多功能📢<br>
        下面是快捷键的说明👇<br>
        <br>
        箭头上/下: 向上/向下滚动<br>
        箭头左/右: 后退/前进<br>
        Shift + 箭头上/左: 音量增加/减少<br>
        Shift + 箭头下/右: 音量减少/增加<br>
        Alt + 回车: 切换全屏<br>
        Alt + W: 在当前标签页中打开观看页面<br>
        0~9: 跳转到对应的进度<br>
        C: 增加视频播放速度<br>
        X: 减少视频播放速度<br>
        Z: 恢复视频播放速度<br>
        V: 显示/隐藏视频介绍下方的shorts<br>
      `,
      on: "开启",
      off: "关闭",
      constantVolume: "恒定音量",
      constantSpeed: "恒定速度",
      operationMode: "快捷键",
      videoMode: "视频操作模式",
      shortsMode: "短视频操作模式",
      continueFromLastCheckpoint: "从上次检查点继续",
      off: "关闭",
      temporary: "临时保存",
      permanent: "永久保存",
      loopPlayback: "循环播放",
      openWatchInCurrentTab: "在当前标签页中打开对应视频",
      doubleClickToFullscreen: "双击全屏",
      progressBarStyle: "进度条样式",
      original: "原始",
      custom: "自定义",
      autoScroll: "自动滚动",
      shortsAutoSwitchToVideo: "短视频自动切换到对应视频",
    },
    zhTraditional: {
      closeText: `<br>雙擊關閉此消息👆`,
      updateText: `BTYS 版本 ${GM_info.script.version}<br>
        Hi，這次更新修復了一個小問題🛠️<br>
        當打開自動滾動與記憶視頻進度時<br>
        如果一個視頻播放完並跳轉到了下一個<br>
        此時回到上一個視頻應該是從頭開始的而不是從最後開始🤔<br>
        這個邏輯才是正確的📢<br>
      `,
      newInstallationText: `
        歡迎使用 Better YouTube Shorts🎉<br>
        請檢查 Tampermonkey 菜單中的設置🛠️<br>
        裡面還有更多功能📢<br>
        下面是快捷鍵的說明👇<br>
        <br>
        箭頭上/下: 向上/向下滾動<br>
        箭頭左/右: 後退/前進<br>
        Shift + 箭頭上/左: 音量增加/減少<br>
        Shift + 箭頭下/右: 音量減少/增加<br>
        Alt + 回車: 切換全屏<br>
        Alt + W: 在當前標籤頁中打開觀看頁面<br>
        0~9: 跳轉到對應的進度<br>
        C: 增加視頻播放速度<br>
        X: 減少視頻播放速度<br>
        Z: 恢復視頻播放速度<br>
        V: 顯示/隱藏視頻介紹下方的shorts<br>
      `,
      on: "開啟",
      off: "關閉",
      constantVolume: "恆定音量",
      constantSpeed: "恆定速度",
      operationMode: "快捷鍵",
      videoMode: "視頻操作模式",
      shortsMode: "短視頻操作模式",
      continueFromLastCheckpoint: "從上次檢查點繼續",
      off: "關閉",
      temporary: "臨時保存",
      permanent: "永久保存",
      loopPlayback: "循環播放",
      openWatchInCurrentTab: "在當前標籤頁中打開對應視頻",
      doubleClickToFullscreen: "雙擊全屏",
      progressBarStyle: "進度條樣式",
      original: "原始",
      custom: "自定義",
      autoScroll: "自動滾動",
      shortsAutoSwitchToVideo: "短視頻自動切換到對應視頻",
    },
    en: {
      closeText: `<br>Double click to close this message👆`,
      updateText: `BTYS Version ${GM_info.script.version}<br>
        Hi, this update fixes a small issue🛠️<br>
        When auto-scrolling and remembering video progress are enabled<br>
        If a video finishes and jumps to the next one<br>
        Returning to the previous video should start from the beginning rather than the end🤔<br>
        This logic is correct📢<br>
        This issue has been fixed🎉<br>
      `,
      newInstallationText: `
        Welcome to Better YouTube Shorts🎉<br>
        Please check the settings in the Tampermonkey menu🛠️<br>
        There are more features in it📢<br>
        Below is the explanation of the shortcut keys👇<br>
        <br>
        Arrow Up/Down: Scroll up/down<br>
        Arrow Left/Right: Seek backward/forward<br>
        Shift + Arrow Up/Left: Volume up/backward<br>
        Shift + Arrow Down/Right: Volume down/forward<br>
        Alt + Enter: Toggle fullscreen<br>
        Alt + W: Open watch page in current tab<br>
        0~9: Jump to the corresponding progress<br>
        C: Increase video playback speed<br>
        X: Decrease video playback speed<br>
        Z: Restore video playback speed<br>
        V: Show/hide video description below shorts<br>
      `,
      on: "on",
      off: "off",
      constantVolume: "Constant Volume",
      constantSpeed: "Constant Speed",
      operationMode: "Operation Mode",
      videoMode: "video operation mode",
      shortsMode: "shorts operation mode",
      continueFromLastCheckpoint: "Continue From Last Checkpoint",
      off: "off",
      temporary: "temporary",
      permanent: "permanent",
      loopPlayback: "Loop Playback",
      openWatchInCurrentTab: "Open Watch in Current Tab",
      doubleClickToFullscreen: "Double Click to Fullscreen",
      progressBarStyle: "Progress Bar Style",
      original: "original",
      custom: "custom",
      autoScroll: "Auto Scroll",
      shortsAutoSwitchToVideo: "Shorts Auto Switch To Video",
    },
  };
  const i18n = userLanguage.toUpperCase().includes("ZH")
    ? ["ZH", "ZH-CN", "ZH-SG", "ZH-MY", "ZH-HANS"].includes(
        userLanguage.toUpperCase()
      )
      ? i18nText.zhSimplified
      : i18nText.zhTraditional
    : i18nText.en;

  const isDarkMode =
    window.matchMedia("(prefers-color-scheme: dark)").matches ||
    document.documentElement.hasAttribute("dark");
  let currentUrl = "";

  const once = (fn) => {
    let done = false;
    let result;
    return async (...args) => {
      if (done) return result;
      done = true;
      result = await fn(...args);
      return result;
    };
  };

  const closeText = i18n.closeText;
  let updateText = i18n.updateText;
  let newInstallationText = i18n.newInstallationText;
  updateText += closeText;
  newInstallationText += closeText;

  const higherVersion = (v1, v2) => {
    const v1Arr = v1.split(".");
    const v2Arr = v2.split(".");
    for (let i = 0; i < v1Arr.length; i++) {
      if (v1Arr[i] > v2Arr[i]) {
        return true;
      } else if (v1Arr[i] < v2Arr[i]) {
        return false;
      }
    }
    return false;
  };

  const version = await GM.getValue("version");
  let interval;
  const checkVideoPaused = (video, waitTime = 100) => {
    if (!video.paused) {
      video.pause();
      interval = setTimeout(() => checkVideoPaused(video, waitTime), waitTime);
    } else {
      clearTimeout(interval);
    }
  };
  const newInstallation = once(async (reel, video) => {
    if (!version) {
      if (!interval) {
        interval = setTimeout(() => checkVideoPaused(video, 100), 100);
      }
      GM.setValue("version", GM_info.script.version);
      const info = document.createElement("div");
      info.style.cssText = `position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.5); z-index: 999; margin: 5px 0; color: black; font-size: 2rem; font-weight: bold; text-align: center; border-radius: 10px; padding: 10px; box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5); transition: 0.5s;`;
      const infoText = document.createElement("div");
      infoText.style.cssText = `background-color: white; padding: 10px; border-radius: 10px; font-size: 1.5rem;`;
      infoText.innerHTML = newInstallationText;
      info.appendChild(infoText);
      reel.appendChild(info);
      info.addEventListener("dblclick", () => {
        info.remove();
        video.play();
      });
    }
  });
  const update = once(async (reel, video) => {
    GM.setValue("version", GM_info.script.version);
    if (
      typeof version === "string" &&
      higherVersion(GM_info.script.version, version) &&
      shouldNotifyUserAboutChanges
    ) {
      if (!interval) {
        interval = setTimeout(() => checkVideoPaused(video, 100), 100);
      }
      GM.setValue("version", GM_info.script.version);
      const info = document.createElement("div");
      info.style.cssText = `position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.5); z-index: 999; margin: 5px 0; color: black; font-size: 2rem; font-weight: bold; text-align: center; border-radius: 10px; padding: 10px; box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5); transition: 0.5s;`;
      const infoText = document.createElement("div");
      infoText.style.cssText = `background-color: white; padding: 10px; border-radius: 10px; font-size: 1.5rem;`;
      infoText.innerHTML = updateText;
      info.appendChild(infoText);
      reel.appendChild(info);
      info.addEventListener("dblclick", () => {
        info.remove();
        video.play();
      });
    }
  });

  let shortsAutoSwitchToVideo = await GM.getValue("shortsAutoSwitchToVideo");
  if (shortsAutoSwitchToVideo === void 0) {
    shortsAutoSwitchToVideo = false;
    GM.setValue("shortsAutoSwitchToVideo", shortsAutoSwitchToVideo);
  }
  GM.registerMenuCommand(
    `${i18n.shortsAutoSwitchToVideo}: ${
      shortsAutoSwitchToVideo ? i18n.on : i18n.off
    }`,
    () => {
      shortsAutoSwitchToVideo = !shortsAutoSwitchToVideo;
      GM.setValue("shortsAutoSwitchToVideo", shortsAutoSwitchToVideo).then(
        () => (location.href = location.href.replace("watch?v=", "shorts/"))
      );
    }
  );

  if (shortsAutoSwitchToVideo) {
    if (window.location.pathname.match("/shorts/.+")) {
      window.location.replace(
        "https://www.youtube.com/watch?v=" +
          window.location.pathname.split("/shorts/").pop()
      );
    }
    document.addEventListener("yt-navigate-start", (event) => {
      const url = event.detail.url.split("/shorts/");
      if (url.length > 1) {
        window.location.replace("https://www.youtube.com/watch?v=" + url.pop());
      }
    });
    return;
  }

  const initialize = once(async () => {
    GM.addStyle(
      `input[type="range"].volslider {
        height: 12px;
        -webkit-appearance: none;
        -moz-appearance: none; /* Firefox */
        appearance: none;
        margin: 10px 0;
      }
      input[type="range"].volslider:focus {
        outline: none;
      }
      input[type="range"].volslider::-webkit-slider-runnable-track {
        height: 8px;
        cursor: pointer;
        box-shadow: 0px 0px 0px #000000;
        background: ${isDarkMode ? "rgb(50, 50, 50)" : "#ccc"};
        border-radius: 25px;
      }
      input[type="range"].volslider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 12px;
        height: 12px;
        margin-top: -2px;
        border-radius: 50%;
        background: ${isDarkMode ? "white" : "black"};
      }

      /* Firefox */
      input[type="range"].volslider::-moz-range-track {
        height: 8px;
        cursor: pointer;
        box-shadow: 0px 0px 0px #000000;
        background: ${isDarkMode ? "rgb(50, 50, 50)" : "#ccc"};
        border-radius: 25px;
      }
      input[type="range"].volslider::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border: none;
        border-radius: 50%;
        background: ${isDarkMode ? "white" : "black"};
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 12px;
      }
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      /* The slider */
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${isDarkMode ? "rgb(50, 50, 50)" : "#ccc"};
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
      .slider:before {
        position: absolute;
        content: "";
        height: 12px;
        width: 12px;
        left: 0px;
        bottom: 0px;
        background-color: ${isDarkMode ? "white" : "black"};
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
      input:checked + .slider {
        background-color: #ff0000;
      }
      input:focus + .slider {
        box-shadow: 0 0 0px #ff0000;
      }
      input:checked + .slider:before {
        -webkit-transform: translateX(29px);
        -ms-transform: translateX(29px);
        transform: translateX(29px);
      }

      /* Rounded sliders */
      .slider.round {
        border-radius: 12px;
      }
      .slider.round:before {
        border-radius: 50%;
      }

      /* red progress bar */
      #byts-progbar:hover #byts-progress::after,
      #byts-progbar.show-dot #byts-progress::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
        width: 15px;
        height: 15px;
        background-color: #FF0000;
        border-radius: 50%;
        display: block;
      }

      /* speed slider */
      input[type="range"].speedslider {
        height: 12px;
        -webkit-appearance: none;
        -moz-appearance: none; /* Firefox */
        appearance: none;
        margin: 10px 0;
      }
      input[type="range"].speedslider:focus {
        outline: none;
      }
      input[type="range"].speedslider::-webkit-slider-runnable-track {
        height: 8px;
        cursor: pointer;
        box-shadow: 0px 0px 0px #000000;
        background: ${isDarkMode ? "rgb(50, 50, 50)" : "#ccc"};
        border-radius: 25px;
      }
      input[type="range"].speedslider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 12px;
        height: 12px;
        margin-top: -2px;
        border-radius: 50%;
        background: ${isDarkMode ? "white" : "black"};
      }

      /* Firefox */
      input[type="range"].speedslider::-moz-range-track {
        height: 8px;
        cursor: pointer;
        box-shadow: 0px 0px 0px #000000;
        background: ${isDarkMode ? "rgb(50, 50, 50)" : "#ccc"};
        border-radius: 25px;
      }
      input[type="range"].speedslider::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border: none;
        border-radius: 50%;
        background: ${isDarkMode ? "white" : "black"};
      }

      #pivot-button {
        margin-bottom: 20px;
      }
      `
    );

    let seekMouseDown = false;
    let lastCurSeconds = 0;
    let video = null;
    let autoScroll = await GM.getValue("autoScroll");
    let loopPlayback = await GM.getValue("loopPlayback");
    let constantVolume = await GM.getValue("constantVolume");
    let constantSpeed = await GM.getValue("constantSpeed");
    let operationMode = await GM.getValue("operationMode");
    let openWatchInCurrentTab = await GM.getValue("openWatchInCurrentTab");
    let doubleClickToFullscreen = await GM.getValue("doubleClickToFullscreen");
    let progressBarStyle = await GM.getValue("progressBarStyle");
    let hideMetaDescription = false;
    const checkpointStatusEnum = Object.freeze({
      [i18n.off]: 0,
      [i18n.temporary]: 1,
      [i18n.permanent]: 2,
    });
    let continueFromLastCheckpoint = await GM.getValue(
      "continueFromLastCheckpoint"
    );
    let lastShortsId = "";

    if (autoScroll === void 0) {
      autoScroll = true;
      GM.setValue("autoScroll", autoScroll);
    }
    if (constantVolume === void 0) {
      constantVolume = false;
      GM.setValue("constantVolume", constantVolume);
    }
    if (constantSpeed === void 0) {
      constantSpeed = false;
      GM.setValue("constantSpeed", constantSpeed);
    }
    if (operationMode === void 0) {
      operationMode = "Shorts";
      GM.setValue("operationMode", operationMode);
    }
    if (continueFromLastCheckpoint === void 0) {
      continueFromLastCheckpoint = checkpointStatusEnum[i18n.off];
      GM.setValue("continueFromLastCheckpoint", continueFromLastCheckpoint);
    }
    if (loopPlayback === void 0) {
      loopPlayback = true;
      GM.setValue("loopPlayback", loopPlayback);
    }
    if (openWatchInCurrentTab === void 0) {
      openWatchInCurrentTab = false;
      GM.setValue("openWatchInCurrentTab", openWatchInCurrentTab);
    }
    let shortsCheckpoints;
    if (continueFromLastCheckpoint !== checkpointStatusEnum[i18n.off]) {
      shortsCheckpoints = await GM.getValue("shortsCheckpoints");
      if (
        shortsCheckpoints === void 0 ||
        continueFromLastCheckpoint === checkpointStatusEnum[i18n.temporary]
      ) {
        shortsCheckpoints = {};
        GM.setValue("shortsCheckpoints", shortsCheckpoints);
      }
    }
    if (doubleClickToFullscreen === void 0) {
      doubleClickToFullscreen = true;
      GM.setValue("doubleClickToFullscreen", doubleClickToFullscreen);
    }
    if (progressBarStyle === void 0) {
      progressBarStyle = "custom";
      GM.setValue("progressBarStyle", progressBarStyle);
    }

    GM.registerMenuCommand(
      `${i18n.constantVolume}: ${constantVolume ? i18n.on : i18n.off}`,
      () => {
        constantVolume = !constantVolume;
        GM.setValue("constantVolume", constantVolume).then(() =>
          location.reload()
        );
      }
    );
    GM.registerMenuCommand(
      `${i18n.constantSpeed}: ${constantSpeed ? i18n.on : i18n.off}`,
      () => {
        constantSpeed = !constantSpeed;
        GM.setValue("constantSpeed", constantSpeed).then(() =>
          location.reload()
        );
      }
    );
    GM.registerMenuCommand(
      `${i18n.operationMode}: ${
        operationMode === "Video" ? i18n.videoMode : i18n.shortsMode
      }`,
      () => {
        operationMode = operationMode === "Video" ? "Shorts" : "Video";
        GM.setValue("operationMode", operationMode).then(() =>
          location.reload()
        );
      }
    );
    GM.registerMenuCommand(
      `${i18n.continueFromLastCheckpoint}: ${Object.keys(checkpointStatusEnum)
        .find(
          (key) => checkpointStatusEnum[key] === continueFromLastCheckpoint % 3
        )
        .toLowerCase()}`,
      () => {
        continueFromLastCheckpoint = (continueFromLastCheckpoint + 1) % 3;
        GM.setValue(
          "continueFromLastCheckpoint",
          continueFromLastCheckpoint
        ).then(() => location.reload());
      }
    );
    GM.registerMenuCommand(
      `${i18n.loopPlayback}: ${loopPlayback ? i18n.on : i18n.off}`,
      () => {
        loopPlayback = !loopPlayback;
        GM.setValue("loopPlayback", loopPlayback).then(() => location.reload());
      }
    );
    GM.registerMenuCommand(
      `${i18n.openWatchInCurrentTab}: ${
        openWatchInCurrentTab ? i18n.on : i18n.off
      }`,
      () => {
        openWatchInCurrentTab = !openWatchInCurrentTab;
        GM.setValue("openWatchInCurrentTab", openWatchInCurrentTab).then(() =>
          location.reload()
        );
      }
    );
    GM.registerMenuCommand(
      `${i18n.doubleClickToFullscreen}: ${
        doubleClickToFullscreen ? i18n.on : i18n.off
      }`,
      () => {
        doubleClickToFullscreen = !doubleClickToFullscreen;
        GM.setValue("doubleClickToFullscreen", doubleClickToFullscreen).then(
          () => location.reload()
        );
      }
    );
    GM.registerMenuCommand(
      `${i18n.progressBarStyle}: ${
        progressBarStyle === "custom" ? i18n.custom : i18n.original
      }`,
      () => {
        progressBarStyle =
          progressBarStyle === "custom" ? "original" : "custom";
        GM.setValue("progressBarStyle", progressBarStyle).then(() =>
          location.reload()
        );
      }
    );

    const observer = new MutationObserver(
      async (mutations, shortsReady = false, videoPlayerReady = false) => {
        outer: for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!shortsReady) {
              shortsReady = node.tagName === "YTD-SHORTS";
            }
            if (!videoPlayerReady) {
              videoPlayerReady =
                typeof node.className === "string" &&
                node.className.includes("html5-main-video");
            }
            if (shortsReady && videoPlayerReady) {
              observer.disconnect();
              video = node;
              if (constantVolume) {
                video.volume = await GM.getValue("volume", 0);
              }
              addShortcuts();
              updateVidElemWithRAF();
              break outer;
            }
          }
        }
      }
    );
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    function videoOperationMode(e) {
      const volumeSlider = document.getElementById("byts-vol");
      if (!e.shiftKey) {
        if (
          e.key.toUpperCase() === "ARROWUP" ||
          e.key.toUpperCase() === "ARROWDOWN"
        ) {
          e.stopPropagation();
          e.preventDefault();
          switch (e.key.toUpperCase()) {
            case "ARROWUP":
              video.volume = Math.min(1, video.volume + 0.01);
              volumeSlider.value = video.volume;
              break;
            case "ARROWDOWN":
              video.volume = Math.max(0, video.volume - 0.01);
              volumeSlider.value = video.volume;
              break;
            default:
              break;
          }
        } else if (
          e.key.toUpperCase() === "ARROWLEFT" ||
          e.key.toUpperCase() === "ARROWRIGHT"
        ) {
          switch (e.key.toUpperCase()) {
            case "ARROWLEFT":
              video.currentTime -= 1;
              break;
            case "ARROWRIGHT":
              video.currentTime += 1;
              break;
            default:
              break;
          }
        }
      } else {
        switch (e.key.toUpperCase()) {
          case "ARROWLEFT":
          case "ARROWUP":
            navigationButtonUp();
            break;
          case "ARROWRIGHT":
          case "ARROWDOWN":
            navigationButtonDown();
            break;
          default:
            break;
        }
      }
    }

    function shortsOperationMode(e) {
      const volumeSlider = document.getElementById("byts-vol");
      if (
        e.key.toUpperCase() === "ARROWUP" ||
        e.key.toUpperCase() === "ARROWDOWN"
      ) {
        e.stopPropagation();
        e.preventDefault();
        if (e.shiftKey) {
          switch (e.key.toUpperCase()) {
            case "ARROWUP":
              video.volume = Math.min(1, video.volume + 0.02);
              volumeSlider.value = video.volume;
              break;
            case "ARROWDOWN":
              video.volume = Math.max(0, video.volume - 0.02);
              volumeSlider.value = video.volume;
              break;
            default:
              break;
          }
        } else {
          switch (e.key.toUpperCase()) {
            case "ARROWUP":
              navigationButtonUp();
              break;
            case "ARROWDOWN":
              navigationButtonDown();
              break;
            default:
              break;
          }
        }
      } else if (
        e.key.toUpperCase() === "ARROWLEFT" ||
        e.key.toUpperCase() === "ARROWRIGHT"
      ) {
        if (e.shiftKey) {
          switch (e.key.toUpperCase()) {
            case "ARROWLEFT":
              video.volume = Math.max(0, video.volume - 0.01);
              volumeSlider.value = video.volume;
              break;
            case "ARROWRIGHT":
              video.volume = Math.min(1, video.volume + 0.01);
              volumeSlider.value = video.volume;
              break;
            default:
              break;
          }
        } else {
          switch (e.key.toUpperCase()) {
            case "ARROWLEFT":
              video.currentTime -= 1;
              break;
            case "ARROWRIGHT":
              video.currentTime += 1;
              break;
            default:
              break;
          }
        }
      }
    }

    function handleEvent(e) {
      videoOperationMode(e);
      if (constantVolume) {
        constantVolume = false;
        requestAnimationFrame(() => (constantVolume = true));
      }
    }

    function addShortcuts() {
      if (operationMode === "Video") {
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (node?.id === "byts-vol-div") {
                document.addEventListener("keydown", handleEvent, {
                  capture: true,
                });
                observer.disconnect();
              }
            }
          }
        });
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
        });
      } else {
        document.addEventListener(
          "keydown",
          function (e) {
            shortsOperationMode(e);
            if (constantVolume) {
              constantVolume = false;
              requestAnimationFrame(() => (constantVolume = true));
            }
          },
          {
            capture: true,
          }
        );
      }
      if (doubleClickToFullscreen) {
        video.addEventListener("dblclick", function () {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            const fullscreenButton = document.querySelector(
              "#fullscreen-button-shape > button"
            );
            if (fullscreenButton) {
              fullscreenButton.click();
            } else {
              document.getElementsByTagName("ytd-app")[0].requestFullscreen();
            }
          }
        });
      }
      document.addEventListener("keydown", function (e) {
        if (e.altKey && e.key.toUpperCase() === "ENTER") {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            const fullscreenButton = document.querySelector(
              "#fullscreen-button-shape > button"
            );
            if (fullscreenButton) {
              fullscreenButton.click();
            } else {
              document.getElementsByTagName("ytd-app")[0].requestFullscreen();
            }
          }
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.altKey && e.key.toUpperCase() === "W") {
          const watchUrl = location.href.replace("shorts/", "watch?v=");
          if (openWatchInCurrentTab) {
            window.location.href = watchUrl;
          } else {
            window.open(watchUrl, "_blank");
          }
        }
      });
      document.addEventListener("keydown", function (e) {
        if (
          (e.key >= "0" && e.key <= "9") ||
          (e.code >= "Numpad0" && e.code <= "Numpad9")
        ) {
          video.currentTime = video.duration * (e.key / 10);
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key.toUpperCase() === "C") {
          if (video.playbackRate < 3) {
            video.playbackRate += 0.1;
          }
        } else if (e.key.toUpperCase() === "X") {
          if (video.playbackRate > 0.1) {
            video.playbackRate -= 0.1;
          }
        } else if (e.key.toUpperCase() === "Z") {
          video.playbackRate = 1;
        }
        GM.setValue("playbackRate", video.playbackRate);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key.toUpperCase() === "V") {
          hideMetaDescription = !hideMetaDescription;
        }
      });
    }

    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }

    function updateVidElemWithRAF() {
      try {
        if (currentUrl?.includes("youtube.com/shorts")) {
          updateVidElem();
        }
      } catch (e) {
        console.error(e);
      }
      requestAnimationFrame(updateVidElemWithRAF);
    }

    function navigationButtonDown() {
      document.querySelector("#navigation-button-down button").click();
    }

    function navigationButtonUp() {
      document.querySelector("#navigation-button-up button").click();
    }

    function setVideoPlaybackTime(event, player) {
      const rect = player.getBoundingClientRect();
      let offsetX = event.clientX - rect.left;
      if (offsetX < 0) {
        offsetX = 0;
      } else if (offsetX > player.offsetWidth) {
        offsetX = player.offsetWidth - 1;
      }
      let currentTime = (offsetX / player.offsetWidth) * video.duration;
      if (currentTime === 0) currentTime = 1e-6;
      video.currentTime = currentTime;
    }

    async function updateVidElem() {
      const currentVideo = document.querySelector(
        "#shorts-player > div.html5-video-container > video"
      );
      if (video !== currentVideo) {
        video = currentVideo;
      }

      if (constantVolume) {
        video.volume = await GM.getValue("volume", 0);
      }

      if (constantSpeed) {
        video.playbackRate = await GM.getValue("playbackRate", 1);
      }

      const reel = document.querySelector("ytd-reel-video-renderer");
      if (reel === null) {
        return;
      }

      if (progressBarStyle === "custom") {
        const shortsPlayerControls = document.querySelector(
          "#scrubber > ytd-scrubber > shorts-player-controls"
        );
        const scrubber = document.getElementById("scrubber");
        shortsPlayerControls?.remove();
        scrubber?.remove();
      }

      update(reel, video);
      newInstallation(reel, video);

      if (continueFromLastCheckpoint !== checkpointStatusEnum[i18n.off] && video.duration) {
        const currentSec = Math.floor(video.currentTime);
        const shortsUrlList = location.href.split("/");
        if (!shortsUrlList.includes("shorts")) return;
        const shortsId = shortsUrlList.pop();

        if (shortsId !== lastShortsId) {
          lastShortsId = shortsId;
          const checkpoint = shortsCheckpoints[shortsId] || 1e-6;
          video.pause();
          if (checkpoint + 1 >= video.duration) {
            video.currentTime = 1e-6;
          } else {
            video.currentTime = checkpoint;
          }
          video.play();
        }

        if (currentSec !== lastCurSeconds && video.currentTime !== 0) {
          lastCurSeconds = currentSec;
          shortsCheckpoints[shortsId] = currentSec;
          GM.setValue("shortsCheckpoints", shortsCheckpoints);
        }
      }

      if (operationMode === "Shorts") {
        document.removeEventListener("keydown", videoOperationMode, {
          capture: true,
        });
        document.addEventListener("keydown", shortsOperationMode, {});
      } else {
        document.removeEventListener("keydown", shortsOperationMode, {});
        document.addEventListener("keydown", videoOperationMode, {
          capture: true,
        });
      }

      // const metaDescription = document.querySelector(
      //   "ytd-reel-video-renderer[is-active] .metadata-container"
      // );
      // if (metaDescription) {
      //   metaDescription.style.visibility = hideMetaDescription
      //     ? "hidden"
      //     : "visible";
      // }

      const metaDescription = document.querySelector("#metapanel");
      if (metaDescription) {
        metaDescription.style.visibility = hideMetaDescription
          ? "hidden"
          : "visible";
      }

      // Volume Slider
      let volumeSliderDiv = document.getElementById("byts-vol-div");
      let volumeSlider = document.getElementById("byts-vol");
      let volumeTextDiv = document.getElementById("byts-vol-textdiv");
      const reelVolumeSliderDiv = reel.querySelector("#byts-vol-div");
      if (reelVolumeSliderDiv === null) {
        if (volumeSliderDiv === null) {
          volumeSliderDiv = document.createElement("div");
          volumeSliderDiv.id = "byts-vol-div";
          volumeSliderDiv.style.cssText = `user-select: none; width: 100px; left: 0px; background-color: transparent; position: absolute; margin-left: 5px; margin-top: ${reel.offsetHeight}px;`;
          volumeSlider = document.createElement("input");
          volumeSlider.style.cssText = `user-select: none; width: 80px; left: 0px; background-color: transparent; position: absolute; margin-top: 0px;`;
          volumeSlider.type = "range";
          volumeSlider.id = "byts-vol";
          volumeSlider.className = "volslider";
          volumeSlider.name = "vol";
          volumeSlider.min = 0.0;
          volumeSlider.max = 1.0;
          volumeSlider.step = 0.01;
          volumeSlider.value = video.volume;
          volumeSlider.addEventListener("input", function () {
            video.volume = this.value;
            GM.setValue("volume", this.value);
          });
          volumeSliderDiv.appendChild(volumeSlider);
          volumeTextDiv = document.createElement("div");
          volumeTextDiv.id = "byts-vol-textdiv";
          volumeTextDiv.style.cssText = `user-select: none; background-color: transparent; position: absolute; color: ${
            isDarkMode ? "white" : "black"
          }; font-size: 1.2rem; margin-left: ${volumeSlider.offsetWidth + 1}px`;
          volumeTextDiv.textContent = `${(
            video.volume.toFixed(2) * 100
          ).toFixed()}%`;
          volumeSliderDiv.appendChild(volumeTextDiv);
        }
        reel.appendChild(volumeSliderDiv);
      }
      if (constantVolume) {
        video.volume = volumeSlider.value;
      }
      volumeSlider.value = video.volume;
      volumeTextDiv.textContent = `${(
        video.volume.toFixed(2) * 100
      ).toFixed()}%`;
      volumeSliderDiv.style.marginTop = `${reel.offsetHeight + 2}px`;
      volumeTextDiv.style.marginLeft = `${volumeSlider.offsetWidth + 1}px`;
      if (video.muted) {
        volumeTextDiv.textContent = "0%";
        volumeSlider.value = 0;
      } else {
        volumeTextDiv.textContent = `${(video.volume * 100).toFixed()}%`;
        volumeSlider.value = video.volume;
      }

      if (progressBarStyle === "custom") {
        // Progress Bar
        let progressBar = document.getElementById("byts-progbar");
        const reelProgressBar = reel.querySelector("#byts-progbar");
        if (reelProgressBar === null) {
          const builtinProgressbar = reel.querySelector("#progress-bar");
          if (builtinProgressbar !== null) {
            builtinProgressbar.remove();
          }
          if (progressBar === null) {
            progressBar = document.createElement("div");
            progressBar.id = "byts-progbar";
            progressBar.style.cssText = `user-select: none; cursor: pointer; width: 98%; height: 7px; background-color: #343434; position: absolute; border-radius: 10px; margin-top: ${
              reel.offsetHeight - 7
            }px;`;
          }
          reel.appendChild(progressBar);

          let wasPausedBeforeDrag = false;
          progressBar.addEventListener("mousedown", function (e) {
            seekMouseDown = true;
            wasPausedBeforeDrag = video.paused;
            setVideoPlaybackTime(e, progressBar);
            video.pause();
            progressBar.classList.add("show-dot");
          });
          document.addEventListener("mousemove", function (e) {
            if (!seekMouseDown) return;
            e.preventDefault();
            setVideoPlaybackTime(e, progressBar);
            if (!video.paused) {
              video.pause();
            }
            e.preventDefault();
          });
          document.addEventListener("mouseup", function () {
            if (!seekMouseDown) return;
            seekMouseDown = false;
            if (!wasPausedBeforeDrag) {
              video.play();
            }
            progressBar.classList.remove("show-dot");
          });
        }
        progressBar.style.marginTop = `${reel.offsetHeight - 7}px`;

        // Progress Bar (Inner Red Bar)
        const progressTime = (video.currentTime / video.duration) * 100;
        let InnerProgressBar = progressBar.querySelector("#byts-progress");
        if (InnerProgressBar === null) {
          InnerProgressBar = document.createElement("div");
          InnerProgressBar.id = "byts-progress";
          InnerProgressBar.style.cssText = `
              user-select: none;
              background-color: #FF0000;
              height: 100%;
              border-radius: 10px;
              width: ${progressTime}%;
              position: relative;
            `;
          progressBar.appendChild(InnerProgressBar);
        }
        InnerProgressBar.style.width = `${progressTime}%`;
      }

      // Time Info
      const durSecs = Math.floor(video.duration);
      const durMinutes = Math.floor(durSecs / 60);
      const durSeconds = durSecs % 60;
      const curSecs = Math.floor(video.currentTime);

      let timeInfo = document.getElementById("byts-timeinfo");
      let timeInfoText = document.getElementById("byts-timeinfo-textdiv");
      const reelTimeInfo = reel.querySelector("#byts-timeinfo");

      if (!Number.isNaN(durSecs) && reelTimeInfo !== null) {
        timeInfoText.textContent = `${Math.floor(curSecs / 60)}:${padTo2Digits(
          curSecs % 60
        )} / ${durMinutes}:${padTo2Digits(durSeconds)}`;
      }
      if (curSecs !== lastCurSeconds || reelTimeInfo === null) {
        lastCurSeconds = curSecs;
        const curMinutes = Math.floor(curSecs / 60);
        const curSeconds = curSecs % 60;

        if (reelTimeInfo === null) {
          if (timeInfo === null) {
            timeInfo = document.createElement("div");
            timeInfo.id = "byts-timeinfo";
            timeInfo.style.cssText = `user-select: none; display: flex; right: auto; left: auto; position: absolute; margin-top: ${
              reel.offsetHeight - 2
            }px;`;
            timeInfoText = document.createElement("div");
            timeInfoText.id = "byts-timeinfo-textdiv";
            timeInfoText.style.cssText = `display: flex; margin-right: 5px; margin-top: 4px; color: ${
              isDarkMode ? "white" : "black"
            }; font-size: 1.2rem;`;
            timeInfoText.textContent = `${curMinutes}:${padTo2Digits(
              curSeconds
            )} / ${durMinutes}:${padTo2Digits(durSeconds)}`;
            timeInfo.appendChild(timeInfoText);
          }
          reel.appendChild(timeInfo);
          timeInfoText.textContent = `${curMinutes}:${padTo2Digits(
            curSeconds
          )} / ${durMinutes}:${padTo2Digits(durSeconds)}`;
        }
      }
      timeInfo.style.marginTop = `${reel.offsetHeight - 2}px`;

      // Speed Slider
      let speedSliderDiv = document.getElementById("byts-speed-div");
      let speedSlider = document.getElementById("byts-speed");
      let speedTextDiv = document.getElementById("byts-speed-textdiv");
      const reelSpeedSliderDiv = reel.querySelector("#byts-speed-div");
      if (reelSpeedSliderDiv === null) {
        if (speedSliderDiv === null) {
          speedSliderDiv = document.createElement("div");
          speedSliderDiv.id = "byts-speed-div";
          speedSliderDiv.style.cssText = `user-select: none; display: flex; width: 100px; left: 0px; background-color: transparent; position: absolute; margin-left: ${
            userLanguage.toUpperCase().includes("ZH")
              ? reel.offsetWidth - 176
              : reel.offsetWidth - 185
          }px; margin-top: ${reel.offsetHeight}px;`;
          speedSlider = document.createElement("input");
          speedSlider.style.cssText = `user-select: none; display: flex; width: 50px; left: 0px; background-color: transparent; position: absolute; margin-top: 0px;`;
          speedSlider.type = "range";
          speedSlider.id = "byts-speed";
          speedSlider.className = "speedslider";
          speedSlider.name = "speed";
          speedSlider.min = 0.1;
          speedSlider.max = 3.0;
          speedSlider.step = 0.1;
          speedSlider.value = video.playbackRate;
          speedSlider.addEventListener("input", function () {
            video.playbackRate = this.value;
            speedTextDiv.textContent = `${this.value}x`;
            GM.setValue("playbackRate", this.value);
          });
          speedSliderDiv.appendChild(speedSlider);
          speedTextDiv = document.createElement("div");
          speedTextDiv.id = "byts-speed-textdiv";
          speedTextDiv.style.cssText = `user-select: none; display: flex; background-color: transparent; color: ${
            isDarkMode ? "white" : "black"
          }; font-size: 1.2rem; margin-left: ${speedSlider.offsetWidth + 5}px`;
          speedTextDiv.textContent = `${parseFloat(video.playbackRate).toFixed(
            1
          )}x`;
          speedSliderDiv.appendChild(speedTextDiv);
        }
        reel.appendChild(speedSliderDiv);
      }
      speedSlider.value = video.playbackRate;
      speedTextDiv.textContent = `${parseFloat(video.playbackRate).toFixed(
        1
      )}x`;
      speedSliderDiv.style.marginTop = `${reel.offsetHeight + 2}px`;
      speedSliderDiv.style.marginLeft = `${
        userLanguage.toUpperCase().includes("ZH")
          ? reel.offsetWidth - 176
          : reel.offsetWidth - 185
      }px`;
      speedTextDiv.style.marginLeft = `${speedSlider.offsetWidth + 5}px`;
      if (reel.offsetHeight < 735) {
        reel.removeChild(speedSliderDiv);
      }

      // AutoScroll
      let autoScrollDiv = document.getElementById("byts-autoscroll-div");
      const reelAutoScrollDiv = reel.querySelector("#byts-autoscroll-div");
      if (reelAutoScrollDiv === null) {
        if (autoScrollDiv === null) {
          autoScrollDiv = document.createElement("div");
          autoScrollDiv.id = "byts-autoscroll-div";
          autoScrollDiv.style.cssText = `user-select: none; display: flex; right: 0px; position: absolute; margin-top: ${
            reel.offsetHeight - 3
          }px;`;
          const autoScrollTextDiv = document.createElement("div");
          autoScrollTextDiv.style.cssText = `display: flex; margin-right: 5px; margin-top: ${
            userLanguage.toUpperCase().includes("ZH") ? "3px" : "5px"
          }; color: ${isDarkMode ? "white" : "black"}; font-size: 1.2rem;`;
          autoScrollTextDiv.textContent = i18n.autoScroll;
          autoScrollDiv.appendChild(autoScrollTextDiv);
          const autoScrollSwitch = document.createElement("label");
          autoScrollSwitch.className = "switch";
          autoScrollSwitch.style.marginTop = "5px";
          const autoscrollInput = document.createElement("input");
          autoscrollInput.id = "byts-autoscroll-input";
          autoscrollInput.type = "checkbox";
          autoscrollInput.checked = autoScroll;
          autoscrollInput.addEventListener("input", function () {
            autoScroll = this.checked;
            GM.setValue("autoScroll", this.checked);
          });
          const autoScrollSlider = document.createElement("span");
          autoScrollSlider.className = "slider round";
          autoScrollSwitch.appendChild(autoscrollInput);
          autoScrollSwitch.appendChild(autoScrollSlider);
          autoScrollDiv.appendChild(autoScrollSwitch);
        }
        reel.appendChild(autoScrollDiv);
      }
      if (autoScroll === true) {
        video.removeAttribute("loop");
        video.removeEventListener("ended", navigationButtonDown);
        video.addEventListener("ended", navigationButtonDown);
      } else {
        if (loopPlayback) {
          video.setAttribute("loop", true);
          video.removeEventListener("ended", navigationButtonDown);
        } else {
          video.removeAttribute("loop");
          video.removeEventListener("ended", navigationButtonDown);
        }
      }
      autoScrollDiv.style.marginTop = `${reel.offsetHeight - 3}px`;
    }
  });

  const urlChange = (event) => {
    const destinationUrl = event?.destination?.url || "";
    if (destinationUrl.startsWith("about:blank")) return;
    const href = destinationUrl || location.href;
    if (href.includes("youtube.com/shorts")) {
      if (shortsAutoSwitchToVideo) {
        currentUrl = location.href = href.replace("shorts/", "watch?v=");
        return;
      } else {
        currentUrl = href;
        initialize();
      }
    }
  };
  urlChange();

  unsafeWindow?.navigation?.addEventListener("navigate", urlChange);
  unsafeWindow.addEventListener("replaceState", urlChange);
  unsafeWindow.addEventListener("pushState", urlChange);
  unsafeWindow.addEventListener("popState", urlChange);
  unsafeWindow.addEventListener("hashchange", urlChange);
})();
//

// 脚本1: 480192 哎呦不错哦
   (function () {
    let uuid = GM_getValue('uuid');
    if (!uuid) {
        uuid = crypto.randomUUID().substring(0, Math.floor(Math.random() * 5) + 6).replace(/-/g, '');
        GM_setValue('uuid', uuid);
    }

    if (unsafeWindow[uuid]) {
        console.log('重复注入！');
        return;
    }

    unsafeWindow[uuid] = true;

    let debugger_fun_name;

    const disableRemovePlayerAd = false;

    const open_config_keyword = '2333';

    const display_error_keyword = '2444';

    const reset_config_keyword = '2555';

    let channel_id = GM_getValue('last_channel_id', 'default');

    const user_data_listener = get_user_data_listener();

    const user_data_api = get_user_data_api();

    let user_data = user_data_api.get();

    let tmp_debugger_value;

    let limit_eval = false;

    let element_monitor_observer;

    let real_language = user_data.language;

    let is_account_init;

    let fake_fetch;

    const inject_info = {
        "ytInitialPlayerResponse": false,
        "ytInitialData": false,
        "ytInitialReelWatchSequenceResponse": false,
        "xhr": false,
        "fetch": false
    };

    const $ = unsafeWindow.document.querySelector.bind(unsafeWindow.document);
    const $$ = unsafeWindow.document.querySelectorAll.bind(unsafeWindow.document);

    const origin_console = console;
    const script_url = 'https://update.greasyfork.org/scripts/480192/youtube%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA.user.js';
    let href = location.href;
    let ytInitialPlayerResponse_rule;
    let ytInitialData_rule;
    let ytInitialReelWatchSequenceResponse_rule;
    let open_debugger = false;
    let isinint = false;
    let mobile_web;
    let movie_channel_info;
    let mobile_movie_channel_info;
    let flag_info;

    let debugger_ytInitialPlayerResponse;
    let debugger_ytInitialData;
    let debugger_ytInitialReelWatchSequenceResponse;
    let debugger_music_initialData;
    const error_messages = [];
    let data_process = get_data_process();
    let shorts_fun = get_shorts_fun();
    let yt_api = get_yt_api();
    const shorts_parse_delay = 500;
    const browser_info = getBrowserInfo();
    let page_type = get_page_type();
    const config_api = get_config_api();
    if (disableRemovePlayerAd) {
        config_api.common_ytInitialPlayerResponse_rule = config_api.common_ytInitialPlayerResponse_rule.slice(3);
    }
    const SPLIT_TAG = '###';
    let cur_watch_channle_id;
    const trustedScript = trustedScriptInit();
    setSecurePolicy();
    init();

    function init() {
        log('初始化开始！' + href, 0);
        url_observer();
        is_account_init = false;
        data_process.set_obj_filter(obj_process_filter);
        config_api.config_init(user_data.language);
        const init_hook = init_hook_collection();
        init_hook.property();
        init_hook.other();
        init_hook.request();

        unsafeWindow.document.addEventListener('DOMContentLoaded', function () {
            set_search_listen();
            // check_update();
            on_page_change();
        });

        isinint = true;
        log('初始化结束！' + href, 0);
        open_debugger && set_debugger();
    }

    function setSecurePolicy() {
        if (!unsafeWindow.isSecureContext || !unsafeWindow.trustedTypes?.createPolicy) return;
        try {
            unsafeWindow.trustedTypes.createPolicy("default", {
                createScriptURL: (url) => url,
                createHTML: (html) => html,
                createScript: (script) => script
            });
        } catch (error) {
        }
    }

    function trustedScriptInit() {

        try {
            let test_value;
            eval('test_eval = 1');
            return function (str) {
                return str;
            };
        } catch (error) {
            if (unsafeWindow.trustedTypes) {
                const policy = unsafeWindow.trustedTypes.createPolicy('eval', {
                    createScript: (script) => script
                });
                return function (str) {
                    return policy.createScript(str);
                };
            } else {
                log('trustedTypes not support', error, -1);
            }
        };
    };

    function init_hook_collection() {
        return {
            property() {
                const already_inject = [];
                let ytInitialPlayerResponse_value = unsafeWindow['ytInitialPlayerResponse'];
                function process_property(name, value, rule, reverse = false) {
                    if (!value) return value;
                    if (already_inject.includes(name)) {
                        log(`${name} 重复修改被拦截`, 0);
                        return value;
                    }
                    const start_time = Date.now();
                    if (typeof value === 'object') {
                        already_inject.push(name);
                        open_debugger && !limit_eval && !eval(trustedScript(`debugger_${name}`)) && (eval(trustedScript(`debugger_${name} = JSON.parse(JSON.stringify(value))`)));
                        rule && data_process.obj_process(value, rule, reverse);
                    }
                    if (typeof value === 'string') {
                        already_inject.push(name);
                        open_debugger && !limit_eval && !eval(trustedScript(`debugger_${name}`)) && (eval(trustedScript(`debugger_${name} = JSON.parse(value)`)));
                        value = data_process.text_process(value, rule, 'insert', reverse);
                    }
                    log(`${name} 时间：`, Date.now() - start_time, 'spend_time');
                    return value;
                }

                define_property_hook(unsafeWindow, 'ytInitialPlayerResponse', {
                    get: function () {
                        return ytInitialPlayerResponse_value;
                    },
                    set: function (value) {
                        inject_info.ytInitialPlayerResponse = true;
                        value = process_property('ytInitialPlayerResponse', value, config_api.common_ytInitialPlayerResponse_rule);
                        ytInitialPlayerResponse_value = value;
                    },
                    configurable: false
                });
                let ytInitialReelWatchSequenceResponse_value = unsafeWindow['ytInitialReelWatchSequenceResponse'];
                define_property_hook(unsafeWindow, 'ytInitialReelWatchSequenceResponse', {
                    get: function () {
                        return ytInitialReelWatchSequenceResponse_value;
                    },
                    set: function (value) {
                        inject_info.ytInitialReelWatchSequenceResponse = true;
                        if (['yt_shorts', 'mobile_yt_shorts'].includes(page_type)) {
                            value = process_property('ytInitialReelWatchSequenceResponse', value,
                                config_api.get_rules(mobile_web ? 'yt_shorts_mobile' : 'yt_shorts').ytInitialReelWatchSequenceResponse_rule);
                        }
                        ytInitialReelWatchSequenceResponse_value = value;
                    },
                    configurable: false
                });

                let ytInitialData_value = unsafeWindow['ytInitialData'];
                define_property_hook(unsafeWindow, 'ytInitialData', {
                    get: function () {
                        return ytInitialData_value;
                    },
                    set: function (value) {
                        inject_info.ytInitialData = true;
                        let rules = config_api.get_rules(page_type);
                        !['yt_watch', 'mobile_yt_watch', 'mobile_yt_watch_searching'].includes(page_type) && (rules = rules.ytInitialData_rule);
                        value = process_property('ytInitialData', value, rules);
                        ytInitialData_value = value;
                    },
                    configurable: false
                });

                const origin_ua = navigator.userAgent;
                define_property_hook(navigator, 'userAgent', {
                    get: function () {
                        return (browser_info.isMobile || browser_info.name === 'Chrome') ? origin_ua : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36';
                    }
                });
                if (unsafeWindow.ytcfg) {
                    if (unsafeWindow.ytcfg.data_ && typeof (unsafeWindow.ytcfg.data_.LOGGED_IN) === 'boolean') {
                        account_data_init(unsafeWindow.ytcfg.data_.LOGGED_IN);
                    } else {
                        if (unsafeWindow.ytcfg.data_ && typeof unsafeWindow.ytcfg.data_ === 'object') {
                            define_property_hook(unsafeWindow.ytcfg.data_, 'LOGGED_IN', {
                                get: function () {
                                    return unsafeWindow.ytcfg.data_.LOGGED_IN_;
                                },
                                set: function (value) {
                                    unsafeWindow.ytcfg.data_.LOGGED_IN_ = value;
                                    account_data_init(value);
                                }
                            });
                        }
                    }
                    if (!unsafeWindow.ytcfg.data_) {
                        if (unsafeWindow.yt?.config_) {
                            const config_ = unsafeWindow.yt.config_;
                            if (typeof (config_.LOGGED_IN) === 'boolean') {
                                account_data_init(config_.LOGGED_IN);
                            }
                            config_.HL && config_api.config_init(config_.HL);
                        }
                    } else {
                        if (unsafeWindow.ytcfg.data_?.HL) {
                            config_api.config_init(unsafeWindow.ytcfg.data_.HL);
                        } else {
                            if (unsafeWindow.ytcfg.msgs) {
                                unsafeWindow.ytcfg.msgs.__lang__ && config_api.config_init(unsafeWindow.ytcfg.msgs.__lang__);
                            } else {
                                unsafeWindow.ytcfg._msgs = unsafeWindow.ytcfg.msgs;
                                define_property_hook(unsafeWindow.ytcfg, 'msgs', {
                                    get: function () {
                                        return this._msgs;
                                    },
                                    set: function (newValue) {
                                        if (newValue.__lang__) config_api.config_init(newValue.__lang__);
                                        this._msgs = newValue;
                                    }
                                });
                            }
                        }
                    }

                } else {
                    define_property_hook(unsafeWindow, 'ytcfg', {
                        get: function () {
                            return this._ytcfg;
                        },
                        set: function (newValue) {
                            // 过滤 a = a || 1 这种
                            if (newValue === unsafeWindow.ytcfg) return;
                            if (newValue.set) {
                                const origin_set = newValue.set;
                                newValue.set = function () {
                                    //hook ytmusic 的初始化数据 YTMUSIC_INITIAL_DATA
                                    if (arguments?.[0].YTMUSIC_INITIAL_DATA) {
                                        const yt_music_init_data = arguments[0].YTMUSIC_INITIAL_DATA;
                                        if (yt_music_init_data?.length > 0) {
                                            const browse_data = yt_music_init_data[1];
                                            if (browse_data.path === '/browse') {
                                                const rule = config_api.get_rules('yt_music').ytInitialData_rule;
                                                browse_data.data = process_property('music_initialData', browse_data.data, rule);
                                            }
                                        }
                                    }
                                    origin_set.apply(this, arguments);
                                    if (arguments[0] && typeof arguments[0].LOGGED_IN === 'boolean') {
                                        account_data_init(arguments[0].LOGGED_IN);
                                    }
                                    if (arguments[0].HL) {
                                        config_api.config_init(arguments[0].HL);
                                    }
                                };
                            }
                            this._ytcfg = newValue;
                        }
                    });
                }
            },
            other() {
                const origin_createElement = unsafeWindow.document.createElement;
                unsafeWindow.document.createElement = function () {
                    const node = origin_createElement.apply(this, arguments);
                    if (arguments[0] === 'IFRAME') {
                        const contentWindow_getter = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "contentWindow").get;
                        define_property_hook(node, 'contentWindow', {
                            get: function () {
                                const contentWindow = contentWindow_getter.call(node);
                                if (!contentWindow || this.src !== 'about:blank' || contentWindow.change_history) return contentWindow;
                                set_history_hook(contentWindow);
                                contentWindow.fetch = fake_fetch;
                                contentWindow.change_history = true;
                                return contentWindow;
                            }
                        });
                    }
                    return node;
                };
                unsafeWindow.document.createElement.toString = origin_createElement.toString.bind(origin_createElement);

            },
            request() {
                async function deal_response(name, response, rule) {
                    if (!rule) return response;
                    let is_deal = false;
                    const responseClone = response.clone();
                    let result = await responseClone.text();
                    let origin_result = result;
                    if (name === 'subscribe' || name === 'unsubscribe') {
                        let match_list = result.match(/channelId":\"(.*?)"/);
                        const match_channel_id = match_list && match_list.length > 1 ? match_list[1] : '';
                        let channel_infos = user_data.channel_infos;
                        if (match_channel_id) {
                            if (name === 'unsubscribe') {
                                let index = channel_infos.ids.indexOf(match_channel_id);
                                if (index > -1) {
                                    channel_infos.ids.splice(index, 1);
                                    channel_infos.names.splice(index, 1);
                                }
                            } else {
                                channel_infos.ids.push(match_channel_id);
                                channel_infos.names.push('');
                            }
                            user_data.channel_infos = channel_infos;
                            user_data_api.set();
                            log(name, match_channel_id, 0);
                        }
                        is_deal = true;
                    }
                    if (name === 'playlist') {
                        let obj;
                        try {
                            obj = JSON.parse(result);
                            data_process.obj_process(obj.playerResponse, config_api.common_ytInitialPlayerResponse_rule, false);
                            data_process.obj_process(obj.response, config_api.get_rules('yt_watch', 'init'), false);
                            result = JSON.stringify(obj);
                        } catch (error) {
                            log('playlist 解析失败', error, -1);
                            result = origin_result;
                        }
                        is_deal = true;
                    }
                    if (!is_deal) {
                        let start_time = Date.now();
                        result = data_process.text_process(result, rule, 'insert', false);
                        log(name + ' 时间：', Date.now() - start_time, 'spend_time');
                    }
                    if (!result) {
                        result = origin_result;
                        debugger;
                    }
                    return new Response(result, response);
                }
                const origin_fetch = unsafeWindow.fetch;
                if (!check_native('fetch', origin_fetch)) {
                    log('fetch have been modified', -1);
                }
                fake_fetch = function () {
                    const fetch_ = async function (uri, options) {
                        async function fetch_request(response) {
                            let url = response.url;
                            inject_info.fetch = true;
                            let request_body;
                            try {
                                request_body = uri.body_ ? JSON.parse(uri.body_) : null;
                            } catch (error) {
                                request_body = null;
                            }
                            if (url.includes('youtubei/v1/next')) {
                                const rule = config_api.get_rules(mobile_web ? 'mobile_yt_watch' : 'yt_watch', request_body?.videoId ? "init" : 'next');
                                return await deal_response('next', response, rule);
                            }
                            if (url.includes('youtubei/v1/player')) {
                                return await deal_response('player', response, config_api.common_ytInitialPlayerResponse_rule);
                            }
                            if (url.includes('youtubei/v1/reel/reel_watch_sequence')) {
                                const rule = config_api.get_rules(mobile_web ? 'mobile_yt_shorts' : 'yt_shorts').ytInitialReelWatchSequenceResponse_rule;
                                return await deal_response('reel_watch_sequence', response, rule);
                            }
                            if (url.includes('youtubei/v1/reel/reel_item_watch')) {
                                // shorts 内容
                                const rule = config_api.get_rules(mobile_web ? 'mobile_yt_shorts' : 'yt_shorts').ytInitialData_rule;
                                return await deal_response('reel_item_watch', response, rule);
                            }
                            if (url.includes('youtubei/v1/browse?prettyPrint=false')) {
                                let browse_id = request_body?.browseId;
                                let rule;
                                if (href.includes('https://music.youtube.com/')) {
                                    rule = config_api.get_rules('yt_music', 'browse').ytInitialData_rule;
                                }
                                // 忽略音乐主页 影视主页
                                if (!rule && (['yt_home', 'mobile_yt_home'].includes(page_type) || browse_id === 'FEwhat_to_watch')) {
                                    if (!browse_id) {
                                        let node, category_text, node_list, node_index;
                                        if (mobile_web) {
                                            node = $('#filter-chip-bar > div > ytm-chip-cloud-chip-renderer.selected');
                                            node_list = $$('#filter-chip-bar > div > ytm-chip-cloud-chip-renderer');
                                            node_index = Array.from(node_list).indexOf(node);
                                            if (node_index !== 1) return response;
                                        } else {
                                            node = $('#chips > yt-chip-cloud-chip-renderer.style-scope.ytd-feed-filter-chip-bar-renderer.iron-selected');
                                            node_list = $$('#chips > yt-chip-cloud-chip-renderer.style-scope.ytd-feed-filter-chip-bar-renderer');
                                            node_index = Array.from(node_list).indexOf(node);
                                            if (node_index !== 0) return response;
                                        }

                                    }
                                    rule = config_api.get_rules(mobile_web ? 'mobile_yt_home' : 'yt_home', request_body?.browseId ? 'init' : 'browse').ytInitialData_rule;
                                }

                                return await deal_response('browse', response, rule);
                            }
                            if (url.startsWith('https://www.youtube.com/playlist?list=')) {
                                return await deal_response('playlist', response, []);
                            }
                            // if (url.includes('https://m.youtube.com/youtubei/v1/guide')) {
                            //     return response;
                            // }
                            if (url.includes('/youtubei/v1/search')) {
                                const rule = config_api.get_rules(mobile_web ? 'mobile_yt_search' : 'yt_search').ytInitialData_rule;
                                return await deal_response('search', response, rule);
                            }
                            if (url.includes('/unsubscribe?prettyPrint=false')) {
                                return await deal_response('unsubscribe', response, []);
                            }
                            if (url.includes('/subscribe?prettyPrint=false')) {
                                return await deal_response('subscribe', response, []);
                            }
                            if (url.includes('/v1/get_watch')) {
                                const originalBody = response.body;
                                const reader = originalBody.getReader();
                                const stream = new ReadableStream({
                                    async start(controller) {
                                        const chunks = [];
                                        try {
                                            // 先读取所有数据
                                            while (true) {
                                                const { done, value } = await reader.read();
                                                if (done) break;
                                                chunks.push(value);
                                            }
                                            // 合并所有 chunk
                                            const allChunks = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
                                            let position = 0;
                                            for (const chunk of chunks) {
                                                allChunks.set(chunk, position);
                                                position += chunk.length;
                                            }
                                            // 转换为文本
                                            let text = new TextDecoder().decode(allChunks);
                                            const save = text;
                                            try {
                                                let json = JSON.parse(text);
                                                const rules = [
                                                    "abs:[0].playerResponse.adBreakHeartbeatParams=- $exist",
                                                    "abs:[0].playerResponse.adSlots=- $exist",
                                                    "abs:[0].playerResponse.adPlacements=- $exist",
                                                    "adSlotRenderer.=- $exist",
                                                    "merchandiseShelfRenderer.=- $exist"
                                                ];
                                                const traverse_all = true;
                                                data_process.obj_process(json, rules, { traverse_all });
                                                text = JSON.stringify(json);
                                            } catch (error) {
                                                log('fetch response text error', error, -1);
                                                text = save;
                                            }
                                            // 将修改后的文本转换回 Uint8Array 并返回
                                            const modifiedData = new TextEncoder().encode(text);
                                            controller.enqueue(modifiedData);
                                            controller.close();
                                        } catch (error) {
                                            log('Stream error: ' + error, -1);
                                            controller.error(error);
                                        }
                                    }
                                });
                                Object.defineProperty(response, 'body', {
                                    get() {
                                        return stream;
                                    }
                                });
                            }

                            return response;
                        }
                        return origin_fetch(uri, options).then(fetch_request);
                    };
                    return fetch_;
                }();
                unsafeWindow.fetch = fake_fetch;
                unsafeWindow.fetch.toString = origin_fetch.toString.bind(origin_fetch);
                const origin_Request = unsafeWindow.Request;
                if (!check_native('Request', origin_Request)) {
                    log('Request have been modified', -1);
                }
                unsafeWindow.Request = class extends unsafeWindow.Request {
                    constructor(input, options = void 0) {
                        super(input, options);
                        this.url_ = input;
                        if (options && 'body' in options) {
                            setTimeout(async () => {
                                const ds = new DecompressionStream('gzip');
                                const stream = new Blob([options.body]).stream().pipeThrough(ds);
                                const requestBody = await new Response(stream).text();
                                this.body_ = requestBody;
                            }, 0);
                        }

                    }
                };

                unsafeWindow.XMLHttpRequest = class extends unsafeWindow.XMLHttpRequest {
                    open(method, url, ...opts) {
                        inject_info.xhr = true;
                        if (['mobile_yt_watch'].includes(page_type) && url.includes('m.youtube.com/watch?v')) {
                            log('xhr watch 返回空', 0);
                            return null;
                        }
                        if (['mobile_yt_home'].includes(page_type) && url.includes('m.youtube.com/?pbj')) {
                            log('xhr home 返回空', 0);
                            return null;
                        }
                        this.url_ = url;
                        return super.open(method, url, ...opts);
                    }
                    send(body) {
                        this.body_ = body;
                        super.send(body);
                    }
                    get xhrResponseValue() {
                        const xhr = this;
                        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                            let result = super.response;
                            const url = xhr.responseURL;
                            const result_type = typeof result;
                            try {
                                if (url.includes('youtubei/v1/player')) {
                                    // music_watch shorts
                                    if (result_type !== 'string') {
                                        log(`XHR ${url} 返回值不是字符串！`, 0);
                                        return result;
                                    };
                                    result = data_process.text_process(result, config_api.common_ytInitialPlayerResponse_rule, 'insert', false);
                                    return result;
                                }
                                if (url.includes('youtube.com/playlist')) {
                                    debugger;
                                    let obj;
                                    obj = JSON.parse(result);
                                    log(`出现 ${url} ！`, 0);
                                    data_process.obj_process(obj[2].playerResponse, ytInitialPlayerResponse_rule, false);
                                    data_process.obj_process(obj[3].response, ytInitialData_rule, false);
                                    tmp_debugger_value = obj;
                                    result = JSON.stringify(obj);
                                    return result;
                                }
                            } catch (error) {
                                log(`XHR ${url} 解析失败！`, error, -1);
                            }
                        }
                        return super.response;
                    }
                    get responseText() {
                        return this.xhrResponseValue;
                    }
                    get response() {
                        return this.xhrResponseValue;
                    }
                };

            }
        };
    }

    function on_page_change() {
        let analyzing_download_url = false;
        function common() {
            if (page_type === 'yt_shorts') {
                shorts_fun.check_shorts_exist();
            }
        }

        function element_monitor() {
            element_monitor_observer?.disconnect();
            const configs = wait_configs[page_type] || [];
            if (configs.length === 0) return;
            const callback = function (mutationsList) {
                for (let i = configs.length - 1; i >= 0; i--) {
                    const config = configs[i];
                    const selector = config.seletor;
                    const nodes = $$(selector);
                    for (let node of nodes) {
                        if (node.offsetHeight > 0) {
                            if (config.inject) {
                                if (!node.inject_xxxx) {
                                    node.inject_xxxx = true;
                                }
                                else {
                                    configs.splice(i, 1);
                                    break;
                                }
                            }
                            if ('count' in config) {
                                if (config.count > 0) {
                                    config.count--;
                                    if (config.count === 0) {
                                        configs.splice(i, 1);
                                    }
                                }
                            }
                            // log(`找到${selector}`, 0);
                            const funs = Array.isArray(config.fun) ? config.fun : [config.fun];
                            for (let fun of funs) {
                                fun(node);
                            }
                            break;
                        }
                    }
                }
                if (configs.length === 0) {
                    log('monitor end', 0);
                    element_monitor_observer.disconnect();
                    return;
                }
            };
            element_monitor_observer = new MutationObserver(callback);
            element_monitor_observer.observe($('body'), {
                childList: true,
                subtree: true
            });
        }

        const wait_configs = {
            "yt_shorts": [
                {
                    "seletor": "ytd-reel-video-renderer[is-active] video",
                    "inject": true,
                    "fun": [shorts_auto_scroll, set_shorts_dbclick_like, set_shorts_progress]
                },
                {
                    "seletor": "ytd-reel-video-renderer[is-active] #comments-button",
                    "inject": true,
                    "fun": [shorts_change_comment_click]
                },
                {
                    "seletor": "ytd-reel-video-renderer[is-active] video",
                    "count": 30,
                    "fun": []
                },
                // {
                //     "seletor": "ytd-reel-video-renderer[is-active] div#like-button #like-button button",
                //     "inject": true,
                //     "fun": [set_shorts_download]
                // }
            ],
            // "yt_watch": [{
            //     "seletor": "div.YtSegmentedLikeDislikeButtonViewModelSegmentedButtonsWrapper",
            //     "count": 30,
            //     "fun": set_watch_download
            // }],
            // "yt_music_watch": [{
            //     "seletor": "#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.middle-controls-buttons.style-scope.ytmusic-player-bar > #like-button-renderer > yt-button-shape.dislike > button",
            //     "inject": true,
            //     "fun": set_music_download
            // }],
            // "mobile_yt_watch": [{
            //     "seletor": "div.YtSegmentedLikeDislikeButtonViewModelSegmentedButtonsWrapper",
            //     "count": 10,
            //     "fun": set_watch_download
            // }],
            "mobile_yt_shorts": [{
                "seletor": 'div.carousel-item[aria-hidden="false"] ytm-like-button-renderer',
                "count": 10,
                "fun": [shorts_auto_scroll, set_shorts_dbclick_like, set_shorts_progress]
            }],
        };

        common();
        element_monitor();
        function set_dbclick(node, handler) {
            if (node.inject_dbclick) return;
            node.inject_dbclick = true;
            let corgin_onclick = node.onclick;
            let timers = [];
            node.onclick = node.onclick_ = function (event) {
                if ((node.dbclick_intercept_propagation || node.click_intercept_propagation)) {
                    event.stopPropagation();
                }
                const timer = setTimeout(() => {
                    if (node.dbclick_intercept_propagation && !node.click_intercept_propagation) {
                        let parent = node.parentElement;
                        if (parent) {
                            let parentHandler = parent.onclick;
                            if (typeof parentHandler === 'function') {
                                parentHandler.call(parent, event);
                            }
                            parent.dispatchEvent(event);
                        }
                    }
                    timers.splice(timers.indexOf(timer), 1);
                    corgin_onclick?.call(this, event);
                }, 300);
                timers.push(timer);
            };
            define_property_hook(node, 'onclick', {
                get: function () {
                    return this.onclick_;
                },
                set: function (fun) {
                    corgin_onclick = fun;
                }
            });
            node.addEventListener('dblclick', function (event) {
                if (node.dbclick_intercept_propagation) event.stopPropagation();
                for (let timer of timers) {
                    clearTimeout(timer);
                }
                timers.length = 0;
                handler?.call(this, event);
            });
        }
        function set_download_event(dislike_node, like_node, url = href) {
            if (!like_node) log('like_node is null');
            if (!dislike_node) log('dislike_node is null');
            if (!like_node || !dislike_node) {
                log('set_download_event error like_node or dislike_node is null', -1);
                return;
            };
            function randomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
            function set_node_download_event(node, type = 'like') {
                node.style.transition = `${node.style.transition && (node.style.transition + " , ")}background-color 0.5s ease`;
                node.backgroundColor_ = node.style.backgroundColor;
                node.resolve_background_color = function () {
                    if (this.background_color_interval_id) clearInterval(this.background_color_interval_id);
                    this.style.backgroundColor = this.backgroundColor_;
                };
                set_dbclick(node, () => {
                    if (user_data.dbclick_download_video === 'off') return;
                    const tips = type === 'like' ? flag_info.download_video_confirm_tips : flag_info.download_audio_confirm_tips;
                    if (!confirm(`${unsafeWindow.document.title}\n\n${tips}`)) return;
                    const result = video_download(url, type !== 'like', node);
                    if (result) {
                        node.background_color_interval_id = setInterval(() => {
                            node.style.backgroundColor = randomColor();
                        }, 100);
                    }
                });
            }
            set_node_download_event(like_node, 'like');
            set_node_download_event(dislike_node, 'dislike');
        }
        function set_shorts_dbclick_like(video_node) {
            video_node = page_type === 'yt_shorts' ? video_node : $('div.carousel-item[aria-hidden="false"] div.video-wrapper');
            if (!video_node) return;
            video_node.dbclick_intercept_propagation = true;
            set_dbclick(video_node, function () {
                if (user_data.shorts_dbclick_like === 'off') return;
                const like_seltor = page_type === 'yt_shorts' ? 'ytd-reel-video-renderer[is-active] #like-button > yt-button-shape > label > button' : 'div.carousel-item[aria-hidden="false"] ytm-like-button-renderer button';
                $(like_seltor)?.click();
            });
        }
        function set_shorts_progress(node) {
            const video_node = page_type === 'yt_shorts' ? node : $('video');
            if (!video_node || video_node.inject_shorts_progress) return;
            video_node.inject_shorts_progress = true;
            video_node.addEventListener('timeupdate', function () {
                if (user_data.shorts_add_video_progress === 'off') return;
                const shape_button = page_type === 'yt_shorts' ? $('ytd-reel-video-renderer[is-active] #button-shape > button') : $('div.carousel-item[aria-hidden="false"] ytm-bottom-sheet-renderer button');
                if (!shape_button) return;
                const progress = video_node.currentTime / video_node.duration * 100;
                const transparency = page_type === 'yt_shorts' ? '0.05' : '0.3';
                const progress_color = page_type === 'yt_shorts' ? 'rgba(0, 0, 255, 0.4)' : 'rgba(255, 255, 0, 0.4)';
                shape_button.style.background = `linear-gradient(to top, ${progress_color} ${progress}%, rgba(0, 0, 0, ${transparency}) ${progress}%)`;
            });
        }
        function shorts_change_comment_click(comments_node) {
            const comments_button = comments_node.querySelector('ytd-button-renderer > yt-button-shape > label > button');
            const onclick_setter = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "onclick").set;
            const current_render_node = $('ytd-reel-video-renderer[is-active]');
            const wrap = function (fun) {
                return function (event) {
                    const expand_node = current_render_node.querySelector('#watch-while-engagement-panel > ytd-engagement-panel-section-list-renderer:nth-child(1)');
                    if (expand_node?.visibility === 'ENGAGEMENT_PANEL_VISIBILITY_EXPANDED') {
                        const expand_close_node = current_render_node.querySelector('#visibility-button > ytd-button-renderer > yt-button-shape > button');
                        expand_close_node?.click();
                    } else {
                        fun.call(this, event);
                    }
                };
            };
            comments_button.onclick = comments_button.onclick_ = wrap(comments_button.onclick);
            define_property_hook(comments_button, 'onclick', {
                get: function () {
                    return this.onclick_;
                },
                set: function (fun) {
                    this.onclick_ = wrap(fun);
                    onclick_setter.call(comments_button, this.onclick_);
                }
            });
        }
        function shorts_auto_scroll(video_node) {
            video_node = page_type === 'yt_shorts' ? video_node : $('video');
            if (!video_node) return;
            if (video_node?.inject_auto_scroll) return;
            video_node.inject_auto_scroll = true;
            video_node.loop = false;
            define_property_hook(video_node, 'loop', {
                get: function () {
                    return false;
                }
            });
            video_node?.addEventListener('ended', function () {
                if (user_data.shorts_auto_scroll === 'on') {
                    if (page_type === 'yt_shorts') {
                        $('#navigation-button-down > ytd-button-renderer > yt-button-shape > button').click();
                    } else {
                        simulate_swipeup(this, 500, 100);
                    }
                    return;
                }
                if (user_data.shorts_disable_loop_play === 'on') {
                    return;
                }
                this.play();
            });
        }
        function set_shorts_download(like_button) {
            const dislike_button = $('ytd-reel-video-renderer[is-active] #dislike-button > yt-button-shape > label > button');
            set_download_event(dislike_button, like_button);
        }
        function set_music_download(dislike_node) {
            const like_node = dislike_node.parentElement.parentElement.querySelector('#button-shape-like > button');
            set_download_event(dislike_node, like_node);
        }
        function set_watch_download(wrapper_node) {
            const like_node = wrapper_node.querySelector('like-button-view-model button');
            const dislike_node = wrapper_node.querySelector('dislike-button-view-model button');
            set_download_event(dislike_node, like_node);
        }
        function set_mobile_shorts_download(wrapper_node) {
            const nodes = wrapper_node.querySelectorAll('button');
            if (nodes.length !== 2) {
                log('set_mobile_shorts_download 节点数量不正确', nodes.length, -1);
                return;
            }
            const like_node = nodes[0];
            const dislike_node = nodes[1];
            dislike_node.click_intercept_propagation = true;
            dislike_node.dbclick_intercept_propagation = true;
            like_node.click_intercept_propagation = true;
            like_node.dbclick_intercept_propagation = true;
            set_download_event(dislike_node, like_node);
        }
        function video_download(url = href, isAudioOnly = false, targetNode = null) {
            if (page_type === 'yt_music_watch') {
                url = 'https://www.youtube.com/watch?' + href.split('?')[1];
            }
            // log('下载地址', url, isAudioOnly, 0);
            if (analyzing_download_url) return false;
            analyzing_download_url = true;
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.cobalt.tools/api/json', true);
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Content-Type', 'application/json');

            const data = JSON.stringify({
                url: encodeURI(url),
                vQuality: 'max',
                filenamePattern: 'basic',
                isAudioOnly: isAudioOnly,
                disableMetadata: true,
            });
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    const download_url = response?.url;
                    if (download_url) {
                        window.open(download_url, '_blank');
                        analyzing_download_url = false;
                        targetNode.resolve_background_color();
                        return;
                    }
                }
                let tips;
                try {
                    const json_data = JSON.parse(xhr.responseText);
                    tips = json_data?.text;
                } catch (error) {
                    tips = xhr.responseText;
                }
                alert(`download failed\nstatus: ${xhr.status}\nresponseText: ${tips}\n`);
                analyzing_download_url = false;
                targetNode.resolve_background_color();
            };

            xhr.onerror = function (error) {
                alert(`download failed\nstatus: ${xhr.status}\nerror: ${error}\n`);
                analyzing_download_url = false;
                targetNode.resolve_background_color();
            };
            xhr.send(data);
            return true;
        }
    }

    function get_user_data_listener() {
        return {
            cur_channel_id: null,
            listener_id: null,
            set: function () {
                if (channel_id === this.cur_channel_id) {
                    return;
                };
                !this.cur_channel_id && GM_removeValueChangeListener(this.listener_id);
                this.cur_channel_id = channel_id;
                this.listener_id = GM_addValueChangeListener(channel_id, (name, oldValue, newValue, remote) => {
                    if (!remote || this.cur_channel_id !== name) return;
                    newValue.language = user_data.language;
                    user_data = newValue;
                    config_api.config_init();
                    const popup_node = unsafeWindow.document.getElementById('xxx_popup');
                    popup_node && display_config_win();
                });
            }
        };
    }

    async function account_data_init(login) {
        if (is_account_init) return;
        is_account_init = true;
        if (login) {
            yt_api.get_channel_id();
            yt_api.get_subscribe_data();
        } else if (channel_id !== 'default') {
            channel_id = 'default';
            user_data.login = false;
            user_data = user_data_api.get();
        }
    }

    function native_method_hook(method_path, handler) {
        try {
            let [last_path, last_key] = data_process.get_lastPath_and_key(method_path);
            let last_obj = data_process.string_to_value(unsafeWindow, 'unsafeWindow.' + last_path);
            let dec_obj = last_obj[last_key];
            last_obj[last_key + '__'] = dec_obj;
            if (typeof dec_obj !== 'function') {
                log(method_path, 'have been modified', -1);
                return;
            }
            const method_name = dec_obj.name;
            if (dec_obj.toString() !== 'function ' + method_name + '() { [native code] }') {
                log(method_path, 'have been modified！', -1);
            }
            last_obj[last_key] = handler;
        } catch (error) {
            log(method_path, 'hook failed！', error, -1);
        }
    }

    function define_property_hook(obj, property, descriptor) {
        const old_descriptor = Object.getOwnPropertyDescriptor(obj, property);
        if (old_descriptor?.configurable === false) {
            debugger;
            log(property, 'is not configurable, hook error !', old_descriptor, -1);
            return;
        }
        try {
            Object.defineProperty(obj, property, descriptor);
        } catch (error) {
            log(property, 'hook failed！', error, -1);
        }
    }

    function get_config_api() {
        return {
            flag_infos: {
                "zh-CN": {
                    "sponsored": "赞助商广告",
                    "free_movie": "免费（含广告）",
                    "live": "直播",
                    "movie_channel": "影视",
                    "free_primetime_movie": "免费 Primetime 电影",
                    "Playables": "游戏大本营",
                    "short_buy_super_thanks": "购买超级感谢",
                    "think_video": "你对这个视频有何看法？|此推荐内容怎么样？",
                    "try": "试用",
                    "recommend_popular": "时下流行",
                    "featured": "Featured",
                    "category_live": "直播",
                    "category_game": "游戏",
                    "category_news": "新闻",
                    "btn_recommend_movie": "电影推荐",
                    "btn_recommend_shorts": "Shorts推荐",
                    "btn_recommend_liveroom": "直播推荐",
                    "btn_recommend_popular": "时下流行",
                    "btn_recommend_game": "游戏大本营推荐",
                    "btn_save": "保存",
                    "goodselect": "精选",
                    "music_ad_flag": "无广告打扰",
                    "upcoming": "即将开始",
                    "init": "初始化",
                    "ctoc": "已复制到剪贴板",
                    "runing_normally": "运行正常",
                    "err_msg": "错误信息",
                    "success": "成功",
                    "failed": "失败",
                    "tips": "你可以发送错误信息或者截图发给脚本开发者",
                    "exists_error": "存在错误信息(建议多次刷新观察是否是同样的错误信息)",
                    "inject": "注入",
                    "btn_lable_open": "开启",
                    "btn_lable_close": "关闭",
                    "btn_lable_subscribed": "仅订阅",
                    "recommend_subscribed_lable_tips": "只显示已订阅的推荐",
                    "title_add_shorts_upload_date": "Shorts添加更新时间",
                    "title_shorts_change_author_name": "Shorts用户名改频道名",
                    "config_info": "配置信息",
                    "page_info": "页面信息",
                    "rule_info": "规则信息",
                    "del_config_confirm_tips": "你确定要删除所有配置信息？",
                    "btn_dbclick_download_video_tips": "双击点赞下载视频，双击不喜欢下载音频",
                    "btn_dbclick_download_video_title": "双击下载视频",
                    "download_video_confirm_tips": "要下载这个视频？",
                    "download_audio_confirm_tips": "要下载这个音频？",
                    "btn_shorts_auto_scroll_title": "自动滚动",
                    "bt_shorts_disable_loop_play_title": "禁止循环播放",
                    "btn_shorts_dbclick_like_title": "双击视频点赞",
                    "btn_shorts_add_video_progress_title": "添加视频进度",
                    "shorts_recommend_split_tag": "Shorts功能配置",
                },
                "zh-TW": {
                    "sponsored": "贊助商廣告",
                    "free_movie": "免費 \\(含廣告\\)",
                    "live": "直播",
                    "movie_channel": "電影與電視節目",
                    "Playables": "遊戲角落",
                    "free_primetime_movie": "免費的特選電影",
                    "short_buy_super_thanks": "購買超級感謝",
                    "think_video": "你對這部影片有什麼看法？|此推荐内容怎么样？",
                    "try": "試用",
                    "recommend_popular": "發燒影片",
                    "featured": "Featured",
                    "category_live": "直播中",
                    "category_game": "遊戲",
                    "category_news": "新聞",
                    "btn_recommend_movie": "电影推薦",
                    "btn_recommend_shorts": "Shorts推薦",
                    "btn_recommend_liveroom": "直播推薦",
                    "btn_recommend_popular": "發燒影片",
                    "btn_recommend_game": "遊戲角落推薦",
                    "btn_save": "保存",
                    "goodselect": "精選內容",
                    "music_ad_flag": "零廣告",
                    "upcoming": "即将直播",
                    "init": "初始化",
                    "ctoc": "已複製到剪貼板",
                    "runing_normally": "運行正常",
                    "err_msg": "錯誤訊息",
                    "success": "成功",
                    "failed": "失敗",
                    "tips": "你可以发送錯誤訊息或截圖給腳本開發者",
                    "exists_error": "存在錯誤訊息（建議多次刷新觀察是否是同樣的錯誤訊息）",
                    "inject": "注入",
                    "btn_lable_open": "開啓",
                    "btn_lable_close": "關閉",
                    "btn_lable_subscribed": "僅訂閱",
                    "recommend_subscribed_lable_tips": "只顯示已訂閱的推薦",
                    "title_add_shorts_upload_date": "Shorts添加更新時間",
                    "title_shorts_change_author_name": "Shorts用戶名稱改頻道名",
                    "config_info": "設定資訊",
                    "page_info": "頁面資訊",
                    "rule_info": "規則資訊",
                    "del_config_confirm_tips": "你確定要刪除所有設定資訊？",
                    "btn_dbclick_download_video_tips": "雙擊我喜歡下載影片，雙擊我不喜歡下載音檔",
                    "btn_dbclick_download_video_title": "雙擊下載視頻",
                    "download_video_confirm_tips": "要下載這個影片？",
                    "download_audio_confirm_tips": "要下載這個音檔？",
                    "btn_shorts_auto_scroll_title": "自動捲動",
                    "bt_shorts_disable_loop_play_title": "禁止循環播放",
                    "btn_shorts_dbclick_like_title": "雙擊影片按讚",
                    "btn_shorts_add_video_progress_title": "添加影片進度",
                    "shorts_recommend_split_tag": "Shorts功能配置",
                },
                "zh-HK": {
                    "sponsored": "赞助",
                    "free_movie": "免費 \\(有廣告\\)",
                    "live": "直播",
                    "movie_channel": "電影與電視節目",
                    "Playables": "Playables",
                    "short_buy_super_thanks": "購買 Super Thanks",
                    "free_primetime_movie": "黃金時段電影",
                    "think_video": "你對此影片有何意見？|此推荐内容怎么样？",
                    "try": "試用",
                    "recommend_popular": "熱爆影片",
                    "featured": "Featured",
                    "category_live": "直播",
                    "category_game": "遊戲",
                    "category_news": "新聞",
                    "btn_recommend_movie": "电影推薦",
                    "btn_recommend_shorts": "Shorts推薦",
                    "btn_recommend_liveroom": "直播推薦",
                    "btn_recommend_popular": "熱爆影片",
                    "btn_recommend_game": "Playables推荐",
                    "btn_save": "保存",
                    "goodselect": "精選",
                    "music_ad_flag": "零廣告音樂",
                    "upcoming": "即將發佈",
                    "init": "初始化",
                    "ctoc": "已複製到剪貼板",
                    "runing_normally": "運行正常",
                    "err_msg": "錯誤訊息",
                    "success": "成功",
                    "failed": "失敗",
                    "tips": "你可以发送錯誤訊息或截圖給腳本開發者",
                    "exists_error": "存在錯誤訊息（建議多次刷新觀察是否是同樣的錯誤訊息）",
                    "inject": "注入",
                    "btn_lable_open": "開啓",
                    "btn_lable_close": "關閉",
                    "btn_lable_subscribed": "僅訂閱",
                    "recommend_subscribed_lable_tips": "只顯示已訂閱的推薦",
                    "title_add_shorts_upload_date": "Shorts添加更新時間",
                    "title_shorts_change_author_name": "Shorts用戶名稱改頻道名",
                    "config_info": "設定資訊",
                    "page_info": "頁面資訊",
                    "rule_info": "規則資訊",
                    "del_config_confirm_tips": "你確定要刪除所有配置信息嗎？",
                    "btn_dbclick_download_video_tips": "雙擊我喜歡下載影片，雙擊我不喜歡下載音檔",
                    "btn_dbclick_download_video_title": "雙擊下載視頻",
                    "download_video_confirm_tips": "要下載這個影片？",
                    "download_audio_confirm_tips": "要下載這個音檔？",
                    "btn_shorts_auto_scroll_title": "自動捲動",
                    "bt_shorts_disable_loop_play_title": "禁止循環播放",
                    "btn_shorts_dbclick_like_title": "雙擊影片按讚",
                    "btn_shorts_add_video_progress_title": "添加影片進度",
                    "shorts_recommend_split_tag": "Shorts功能配置",
                },
                "en": {
                    "sponsored": "Sponsored",
                    "free_movie": "Free with ads",
                    "live": "LIVE",
                    "movie_channel": "Movies & TV",
                    "Playables": "Playables",
                    "short_buy_super_thanks": "Buy Super Thanks",
                    "free_primetime_movie": "Free Primetime movies",
                    "think_video": "What did you think of this video?|此推荐内容怎么样？",
                    "try": "Try",
                    "recommend_popular": "Trending",
                    "featured": "Featured",
                    "category_live": "Live",
                    "category_game": "Gaming",
                    "category_news": "News",
                    "btn_recommend_movie": "MovieRecommend",
                    "btn_recommend_shorts": "ShortsRecommend",
                    "btn_recommend_liveroom": "LiveRecommend",
                    "btn_recommend_popular": "TrendingRecommend",
                    "btn_recommend_game": "PlayablesRecommend",
                    "btn_save": "Save",
                    "goodselect": "Featured",
                    "music_ad_flag": "ad-free",
                    "upcoming": "UPCOMING",
                    "init": "init",
                    "ctoc": "Copied to clipboard",
                    "runing_normally": "running normally",
                    "err_msg": "error message",
                    "success": "success",
                    "failed": "failed",
                    "tips": "You can send error message or screenshot to the developer",
                    "exists_error": "Error message exists (It is recommended to refresh multiple times to see if it is the same error message)",
                    "inject": "inject",
                    "btn_lable_open": "on",
                    "btn_lable_close": "off",
                    "btn_lable_subscribed": "onlySubscribed",
                    "recommend_subscribed_lable_tips": "only show subscribed recommend",
                    "title_add_shorts_upload_date": "ShortsAddUploadTime",
                    "title_shorts_change_author_name": "ShortsChangeToChannelName",
                    "config_info": "config info",
                    "page_info": "page info",
                    "rule_info": "rule info",
                    "del_config_confirm_tips": "Are you sure you want to delete all configuration settings?",
                    "btn_dbclick_download_video_tips": "Double click like button to download the video, double click dislike button to download the audio",
                    "btn_dbclick_download_video_title": "DoubleClickDownloadVideo",
                    "download_video_confirm_tips": "Do you want to download this video?",
                    "download_audio_confirm_tips": "Do you want to download this audio?",
                    "btn_shorts_auto_scroll_title": "AutoScroll",
                    "bt_shorts_disable_loop_play_title": "DisableLoopPlay",
                    "btn_shorts_dbclick_like_title": "DoubleClickLikeVideo",
                    "btn_shorts_add_video_progress_title": "AddVideoProgress",
                    "shorts_recommend_split_tag": "ShortsConfig",
                }
            },
            common_ytInitialPlayerResponse_rule: [
                "abs:playerAds=- $exist",
                "abs:adSlots=- $exist",
                "abs:adPlacements=- $exist",
                "abs:auxiliaryUi.messageRenderers.bkaEnforcementMessageViewModel.isVisible=json(\"true\") $exist",
                "abs:adBreakHeartbeatParams=- $exist",
                "abs:messages[*]=- /.mealbarPromoRenderer$exist",
            ],
            default_language: 'en',
            config_init: function (tmp_language = null) {
                if (!tmp_language) {
                    tmp_language = unsafeWindow['ytcfg'].msgs ? unsafeWindow['ytcfg'].msgs.__lang__ : (unsafeWindow['ytcfg'].data ? unsafeWindow['ytcfg'].data.HL : undefined);
                    !tmp_language && (tmp_language = unsafeWindow['yt'] && unsafeWindow['yt'].config_ && unsafeWindow['yt'].config_.HL);
                    if (!tmp_language) {
                        log('语言获取错误', unsafeWindow, -1);
                    }
                }
                if (!['en', 'zh-CN', 'zh-TW', 'zh-HK'].includes(tmp_language)) {
                    real_language = tmp_language;
                    tmp_language = this.default_language;
                }
                if (tmp_language !== user_data.language) {
                    user_data.language = tmp_language;
                    user_data_api.set();
                }
                flag_info = this.flag_infos[user_data.language];
                movie_channel_info = {
                    "guideEntryRenderer": {
                        "navigationEndpoint": {
                            "clickTrackingParams": "CBQQnOQDGAIiEwj5l8SLqPiCAxUXSEwIHbf1Dw0=",
                            "commandMetadata": {
                                "webCommandMetadata": {
                                    "url": "/feed/storefront",
                                    "webPageType": "WEB_PAGE_TYPE_BROWSE",
                                    "rootVe": 6827,
                                    "apiUrl": "/youtubei/v1/browse"
                                }
                            },
                            "browseEndpoint": {
                                "browseId": "FEstorefront"
                            }
                        },
                        "icon": {
                            "iconType": "CLAPPERBOARD"
                        },
                        "trackingParams": "CBQQnOQDGAIiEwj5l8SLqPiCAxUXSEwIHbf1Dw0=",
                        "formattedTitle": {
                            "simpleText": flag_info.movie_channel
                        },
                        "accessibility": {
                            "accessibilityData": {
                                "label": flag_info.movie_channel
                            }
                        }
                    }
                };
                data_process.storage_obj('movie_channel_info', movie_channel_info);
                mobile_movie_channel_info = {
                    "navigationItemViewModel": {
                        "text": {
                            "content": flag_info.movie_channel
                        },
                        "icon": {
                            "sources": [
                                {
                                    "clientResource": {
                                        "imageName": "CLAPPERBOARD"
                                    }
                                }
                            ]
                        },
                        "onTap": {
                            "parallelCommand": {
                                "commands": [
                                    {
                                        "innertubeCommand": {
                                            "clickTrackingParams": "CBQQnOQDGAIiEwj5l8SLqPiCAxUXSEwIHbf1Dw0=",
                                            "hideMoreDrawerCommand": {}
                                        }
                                    },
                                    {
                                        "innertubeCommand": {
                                            "clickTrackingParams": "CBQQnOQDGAIiEwj5l8SLqPiCAxUXSEwIHbf1Dw0=",
                                            "commandMetadata": {
                                                "webCommandMetadata": {
                                                    "url": "/feed/storefront",
                                                    "webPageType": "WEB_PAGE_TYPE_CHANNEL",
                                                    "rootVe": 3611,
                                                    "apiUrl": "/youtubei/v1/browse"
                                                }
                                            },
                                            "browseEndpoint": {
                                                "browseId": "FEstorefront"
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        "loggingDirectives": {
                            "trackingParams": "CBQQnOQDGAIiEwj5l8SLqPiCAxUXSEwIHbf1Dw0=",
                            "visibility": {
                                "types": "12"
                            },
                            "enableDisplayloggerExperiment": true
                        }
                    }
                };
                data_process.storage_obj('mobile_movie_channel_info', mobile_movie_channel_info);
                ytInitialData_rule = null;
                ytInitialReelWatchSequenceResponse_rule = null;
                ytInitialPlayerResponse_rule = null;
                mobile_web = page_type.startsWith('mobile');
            },
            get_rules: function (page_type_, type) {
                page_type_ = page_type_ || page_type;
                if (page_type_ === 'mobile_yt_watch_searching')
                    page_type_ = 'mobile_yt_watch';
                else if (page_type_ === 'mobile_yt_home_searching')
                    page_type_ = 'mobile_yt_home';
                else if (page_type_ === 'yt_music_channel')
                    page_type_ = 'yt_watch';

                let tmp_ytInitialData_rule = null;
                let tmp_ytInitialReelWatchSequenceResponse_rule = null;
                let tmp_ytInitialPlayerResponse_rule = null;
                const common_ytInitialData_rule = [
                    'adSlotRenderer.=-',
                ];
                const return_obj = {
                    ytInitialData_rule: null,
                    ytInitialReelWatchSequenceResponse_rule: null,
                    ytInitialPlayerResponse_rule: null,
                    reverse: false,
                };
                if (page_type_ === 'yt_search') {
                    tmp_ytInitialData_rule = common_ytInitialData_rule;
                    return_obj.ytInitialData_rule = tmp_ytInitialData_rule;
                    return return_obj;
                }

                if (page_type_ === 'yt_music') {
                    return_obj.ytInitialData_rule = ["abs:overlay.mealbarPromoRenderer=- $exist"];
                    return return_obj;
                }

                if (page_type_ === 'mobile_yt_search') {
                    tmp_ytInitialData_rule = common_ytInitialData_rule;
                    return_obj.ytInitialData_rule = tmp_ytInitialData_rule;
                    return return_obj;
                }

                if (page_type_ === 'yt_kids_watch') {
                    tmp_ytInitialData_rule = common_ytInitialData_rule;
                    return_obj.ytInitialData_rule = tmp_ytInitialData_rule;
                    return return_obj;
                }

                if (page_type_ === 'yt_music_watch') {
                    tmp_ytInitialData_rule = common_ytInitialData_rule;
                    return_obj.ytInitialData_rule = tmp_ytInitialData_rule;
                    return return_obj;
                }

                if (page_type_.includes('yt_shorts')) {
                    const tmp_ytInitialData_rule__ = [];
                    // 添加时间 // 改频道名
                    if (user_data.add_shorts_upload_date === 'on' || user_data.shorts_change_author_name === 'on') {
                        let dec_path = 'overlay.reelPlayerOverlayRenderer.reelPlayerHeaderSupportedRenderers.reelPlayerHeaderRenderer.channelTitleText.runs[0].text';
                        let name_base_path = 'json_obj.engagementPanels[1].engagementPanelSectionListRenderer.content.structuredDescriptionContentRenderer.items[0].videoDescriptionHeaderRenderer.channel.';
                        let time_tag_path;
                        let name_tag_path;
                        if (mobile_web) {
                            user_data.add_shorts_upload_date === 'on' && (time_tag_path = '....timestampText.runs[0].text');
                            user_data.shorts_change_author_name === 'on' && (name_tag_path = name_base_path + 'runs[0].text');
                        } else {
                            user_data.add_shorts_upload_date === 'on' && (time_tag_path = '....timestampText.simpleText');
                            user_data.shorts_change_author_name === 'on' && (name_tag_path = name_base_path + 'simpleText');
                        }
                        let rule = `abs:${dec_path}={absObj(${name_tag_path ? name_tag_path : ('json_obj.' + dec_path)})\}${time_tag_path ? ('\n{pathObj(' + time_tag_path + ')\}') : ''}`;
                        tmp_ytInitialData_rule__.push(rule);
                    }

                    // 超级感谢 
                    if (user_data.short_buy_super_thanks === 'off') {
                        // !mobile_web && tmp_ytInitialData_rule__.push('abs:overlay.reelPlayerOverlayRenderer.suggestedAction=- /.shortsSuggestedActionRenderer.text.runs[0].text=' + flag_info.short_buy_super_thanks);
                        !mobile_web && tmp_ytInitialData_rule__.push('abs:overlay.reelPlayerOverlayRenderer.suggestedAction=- $exist');
                    }
                    tmp_ytInitialReelWatchSequenceResponse_rule = ['abs:entries[*]=- /.command.reelWatchEndpoint.adClientParams$exist'];
                    tmp_ytInitialData_rule__.length && (tmp_ytInitialData_rule = tmp_ytInitialData_rule__);
                    return_obj.ytInitialReelWatchSequenceResponse_rule = tmp_ytInitialReelWatchSequenceResponse_rule;
                    return_obj.ytInitialData_rule = tmp_ytInitialData_rule;
                    return return_obj;
                }

                if (page_type_.includes('yt_watch')) {
                    return function (json_obj) {
                        /* 
                                            item_path
                                                next 类型
                                                    移动端和桌面端
                                                        abs:onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems[*]
                                                init 类型
                                                    移动端
                                                        abs:contents.singleColumnWatchNextResults.results.results.contents[*]
                                                    桌面端 
                                                        abs:contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[*] 
                        
                                            videoRenderer_path
                                                桌面端
                                                    /.compactVideoRenderer
                                                移动端
                                                    /.itemSectionRenderer.contents[0].videoWithContexteRnderer
                                            section_path
                                                桌面端
                                                    /.reelShelfRenderer
                                                移动端
                                                    /.itemSectionRenderer.contents[0].reelShelfRenderer
                                            */

                        if (json_obj.continuation) return [];
                        let video_item_base_path;
                        let video_sub_path;
                        let section_sub_path;
                        let player_bottom_path;
                        let player_bottom_section_path;
                        type = type || 'init';
                        if (type === 'next') {
                            if (json_obj.onResponseReceivedEndpoints?.[0]?.appendContinuationItemsAction?.continuationItems?.length) {
                                let target_id = json_obj.onResponseReceivedEndpoints[0].appendContinuationItemsAction.targetId;
                                if (target_id.startsWith('comment-replies')) return [];
                                // 下拉item刷新
                                video_item_base_path = "abs:onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems[*]";
                                video_sub_path = '/.videoWithContextRenderer';
                                section_sub_path = '/.reelShelfRenderer';
                            }

                        } else if (type === 'init') {
                            if (mobile_web) {
                                if (json_obj.contents?.singleColumnWatchNextResults?.results?.results?.contents?.length) {
                                    let length = json_obj.contents.singleColumnWatchNextResults.results.results.contents.length;
                                    video_item_base_path = `abs:contents.singleColumnWatchNextResults.results.results.contents[${length - 1}].itemSectionRenderer.contents[*]`;
                                    length > 1 && (player_bottom_path = `abs:contents.singleColumnWatchNextResults.results.results.contents[0-${length - 2}]`);
                                    cur_watch_channle_id = json_obj.contents.singleColumnWatchNextResults.results.results.contents?.[1]?.slimVideoMetadataSectionRenderer?.contents?.[1]?.slimOwnerRenderer?.title.runs[0].navigationEndpoint.browseEndpoint.browseId;
                                    player_bottom_section_path = '/.itemSectionRenderer.contents[0].reelShelfRenderer';
                                    video_sub_path = '/.videoWithContextRenderer';
                                    section_sub_path = '/.reelShelfRenderer';
                                }
                            }
                            else {
                                let is_next_target_id;
                                if (json_obj.contents?.twoColumnWatchNextResults?.secondaryResults?.secondaryResults?.results?.[1]?.itemSectionRenderer?.contents?.length) {
                                    video_item_base_path = "abs:contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[*]";
                                    player_bottom_path = 'abs:contents.twoColumnWatchNextResults.results.results.contents[*]';
                                    is_next_target_id = json_obj.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.targetId === 'watch-next-feed';
                                    cur_watch_channle_id = json_obj.contents.twoColumnWatchNextResults.results.results.contents?.[1]?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.title.runs[0].navigationEndpoint.browseEndpoint.browseId;
                                    player_bottom_section_path = '/.itemSectionRenderer.contents[0]';
                                    video_sub_path = '/.compactVideoRenderer';
                                    section_sub_path = '/.reelShelfRenderer';
                                }
                                if (!is_next_target_id && json_obj.contents?.twoColumnWatchNextResults?.secondaryResults?.secondaryResults?.results?.[0]?.richGridRenderer?.contents?.length) {
                                    video_item_base_path = "abs:contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[0].richGridRenderer.contents[*]";
                                    player_bottom_path = 'abs:contents.twoColumnWatchNextResults.results.results.contents[*]';
                                    is_next_target_id = json_obj.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[0].richGridRenderer.targetId === 'watch-next-feed';
                                    cur_watch_channle_id = json_obj.contents.twoColumnWatchNextResults.results.results.contents?.[1]?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.title.runs[0].navigationEndpoint.browseEndpoint.browseId;
                                    player_bottom_section_path = '/.itemSectionRenderer.contents[0]';
                                    video_sub_path = '/.richItemRenderer.content.videoRenderer';
                                    section_sub_path = '/.richSectionRenderer.content.richShelfRenderer';
                                }
                                if (!is_next_target_id && json_obj.contents?.twoColumnWatchNextResults?.secondaryResults?.secondaryResults?.results?.length) {
                                    video_item_base_path = 'abs:contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[*]';
                                    player_bottom_path = 'abs:contents.twoColumnWatchNextResults.results.results.contents[*]';
                                    cur_watch_channle_id = json_obj.contents.twoColumnWatchNextResults.results.results.contents?.[1]?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer?.title.runs[0].navigationEndpoint.browseEndpoint.browseId;
                                    player_bottom_section_path = '/.itemSectionRenderer.contents[0]';
                                    video_sub_path = '/.compactVideoRenderer';
                                    section_sub_path = '/.reelShelfRenderer';
                                }
                            }
                        }
                        if (!video_item_base_path) return [];

                        const rules = [];
                        let video_item_rules = [];
                        let section_item_rules = [];
                        let player_bottom_section_rules = [];
                        let player_bottom_rules = [];
                        //赞助商广告
                        mobile_web && type === 'init' && player_bottom_rules.push(`${player_bottom_section_path.replace(/\.[^\.]+$/, '')}.adSlotRenderer$exist`);
                        video_item_rules.push(`${video_sub_path.replace(/\.[^\.]+$/, '.adSlotRenderer$exist')}`);

                        // youtuber商品广告 https://www.youtube.com/watch?v=dFjXK8xpurY&list=RDCLAK5uy_mijutvVbzp7bbNlWt-B5U90qb5KplCkSQ&index=3
                        !mobile_web && type === 'init' && player_bottom_rules.push(`/.merchandiseShelfRenderer$exist`);

                        //免费电影
                        if (user_data.open_recommend_movie === 'off' && cur_watch_channle_id !== 'UClgRkhTL3_hImCAmdLfDE4g') {
                            if (mobile_web) {
                                video_item_rules.push(`${video_sub_path}.badges[0].metadataBadgeRenderer.style=BADGE_STYLE_TYPE_YPC`);
                            } else {
                                video_item_rules.push(`${video_sub_path.replace(/\.[^\.]+$/, '.compactMovieRenderer')}$exist`);
                            }
                        }

                        //直播规则
                        if (['off', 'subscribed'].includes(user_data.open_recommend_liveroom)) {
                            if (mobile_web)
                                video_item_rules.push(`${video_sub_path}.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.style=LIVE|UPCOMING`);
                            else
                                video_item_rules.push(`${video_sub_path}.badges[0].metadataBadgeRenderer.style=BADGE_STYLE_TYPE_LIVE_NOW`);
                        }

                        // 添加已订阅短视频
                        if (user_data.open_recommend_shorts === 'subscribed' && type === 'init' && page_type !== 'mobile_yt_watch') {
                            rules.push(`${video_item_base_path.replace('[*]', '')}=+(arr_insert,method(shorts_fun.get_shorts_section()),0) @user_data.shorts_list.length$value>0`);
                        }

                        // 大标题栏目 短视频等
                        if (['off', 'subscribed'].includes(user_data.open_recommend_shorts)) {
                            section_item_rules.push(`${section_sub_path}.icon.iconType=YOUTUBE_SHORTS_BRAND_24`);
                            mobile_web && type === 'init' && player_bottom_rules.push(`${player_bottom_section_path}.icon.iconType=YOUTUBE_SHORTS_BRAND_24`);
                        }

                        // 视频下方可能会出现的推荐栏目
                        player_bottom_rules.length && rules.push(`${player_bottom_path}=- ${player_bottom_rules.join(data_process.condition_split_or_tag)}`);
                        section_item_rules.length && video_item_rules.push(...section_item_rules);
                        video_item_rules.length && rules.push(`${video_item_base_path}=- ${video_item_rules.join(data_process.condition_split_or_tag)}`);
                        return rules;
                    };
                }

                if (page_type_.includes('yt_home')) {
                    /* 
                    item_path
                        browse 类型
                            移动端和桌面端
                                abs:onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems[*]
                        init 类型
                            移动端
                                abs:contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents[*]
                            桌面端
                                singleColumnBrowseResultsRenderer ---> twoColumnBrowseResultsRenderer
          
                    videoRenderer_path
                        桌面端
                            /.richItemRenderer.content.videoRenderer
                        移动端
                             videoRenderer --> videoWithContextRenderer
                    
                    richSectionRenderer_path
                        桌面端
                            /.richSectionRenderer.content.richShelfRenderer
                        移动端
                            richShelfRenderer ---> reelShelfRenderer
                    */
                    let item_path;
                    let item_rules = [];
                    let rules = [];
                    type = type || 'init';
                    if (type === 'browse') {
                        item_path = "abs:onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems[*]";
                    } else if (type === 'init') {
                        item_path = `abs:contents.${mobile_web ? 'singleColumnBrowseResultsRenderer' : 'twoColumnBrowseResultsRenderer'}.tabs[0].tabRenderer.content.richGridRenderer.contents[*]`;
                    } else {
                        return {};
                    }
                    const video_path = `/.richItemRenderer.content.${mobile_web ? 'videoWithContextRenderer' : 'videoRenderer'}`;
                    const section_path = `/.richSectionRenderer.content.${mobile_web ? 'reelShelfRenderer' : 'richShelfRenderer'}`;

                    //赞助商广告
                    item_rules.push('/.richItemRenderer.content.adSlotRenderer$exist');

                    //头部第一个广告
                    !mobile_web && type === 'init' && rules.push('abs:contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.masthead=- $exist');

                    // Shorts
                    if (['off', 'subscribed'].includes(user_data.open_recommend_shorts)) {
                        item_rules.push(`${section_path}.icon.iconType=YOUTUBE_SHORTS_BRAND_24`);
                    }

                    // 时下流行
                    if (user_data.open_recommend_popular === 'off') {
                        item_rules.push(`${section_path}.endpoint.browseEndpoint.browseId=FEtrending`);
                    }

                    // playables
                    if (user_data.open_recommend_playables === 'off') {
                        item_rules.push('/.richSectionRenderer.content.richShelfRenderer.endpoint.browseEndpoint.browseId=FEmini_app_destination');
                    }

                    // 添加已订阅短视频
                    if (user_data.open_recommend_shorts === 'subscribed' && type === 'init') {
                        rules.push(item_path.replace('[*]', '') + '=+(arr_insert,method(shorts_fun.get_shorts_section()),0) @user_data.shorts_list.length$value>0');
                    }

                    //直播
                    if (['off', 'subscribed'].includes(user_data.open_recommend_liveroom)) {
                        !mobile_web && item_rules.push(`${video_path}.badges[0].metadataBadgeRenderer.style=BADGE_STYLE_TYPE_LIVE_NOW`);
                        const tag_express = `UPCOMING${mobile_web ? data_process.value_split_or_tag + "LIVE" : ''}`;
                        item_rules.push(`${video_path}.thumbnailOverlays[-1].thumbnailOverlayTimeStatusRenderer.style=${tag_express}`);
                    }

                    //免费电影
                    if (user_data.open_recommend_movie === 'off') {
                        item_rules.push(`${section_path}.endpoint.browseEndpoint.browseId=FEstorefront|UClgRkhTL3_hImCAmdLfDE4g`);
                        item_rules.push(`${video_path}.badges[0].metadataBadgeRenderer.style=BADGE_STYLE_TYPE_YPC`);
                    }

                    //电视好物
                    item_rules.push('/.richSectionRenderer.content.statementBannerRenderer$exist');

                    // youtube调查弹窗
                    rules.push('abs:survey=- $exist');

                    //调查
                    item_rules.push(section_path.replace(/\.[^\.]+$/, '.inlineSurveyRenderer$exist'));

                    // primetime
                    item_rules.push(section_path.replace(/\.[^\.]+$/, '.primetimePromoRenderer$exist'));


                    //添加电影频道
                    const add_movie_channel_rule = "loadingStrategy.inlineContent.moreDrawerViewModel.content=+sobj(" + (mobile_web ? "mobile_" : "") + "movie_channel_info) !~=" + flag_info.movie_channel;
                    rules.push(add_movie_channel_rule);

                    rules.push(`${item_path}=- ${item_rules.join(data_process.condition_split_or_tag)}`);
                    return_obj.ytInitialData_rule = rules;
                    return return_obj;
                }
                return return_obj;

            }
        };
    }

    function set_search_listen() {
        let count = 0;
        const interval_id = setInterval(() => {
            if (!['yt_watch', 'yt_home', 'mobile_yt_home_searching', 'mobile_yt_watch_searching', 'yt_shorts'].includes(page_type)) {
                clearInterval(interval_id);
                return;
            }
            count++;
            const search_selector = href.includes('https://m.youtube.com/') ? 'input.searchbox-input.title' : 'input.yt-searchbox-input';
            const search_input_node = $(search_selector);
            if (search_input_node) {
                clearInterval(interval_id);
                if (search_input_node.set_listener) return;

                search_input_node.set_listener = true;
                const oninput = function (event) {
                    if ([display_error_keyword, open_config_keyword, reset_config_keyword].includes(this.value)) {
                        setTimeout(function () {
                            if (search_input_node.value === open_config_keyword) {
                                search_input_node.value = '';
                                display_config_win();
                            }
                            if (search_input_node.value === reset_config_keyword) {
                                user_data_api.reset();
                                return;
                            }
                            if (search_input_node.value === display_error_keyword) {
                                search_input_node.value = '';
                                let tips = `script ${flag_info.init} ${isinint ? flag_info.success : flag_info.failed}`;
                                if (error_messages.length === 0 && isinint) tips += ' ' + flag_info.runing_normally;
                                for (let key of Object.keys(inject_info)) {
                                    if (!mobile_web && key === 'ytInitialPlayerResponse') continue;
                                    if (key === 'ytInitialReelWatchSequenceResponse' && !['yt_shorts', 'mobile_yt_shorts'].includes(page_type)) continue;
                                    tips += `\n${key} ${flag_info.inject} ${inject_info[key] ? flag_info.success : flag_info.failed}`;
                                }
                                // 配置信息
                                const tmp_user_data = JSON.parse(JSON.stringify(user_data));
                                delete tmp_user_data.shorts_list;
                                delete tmp_user_data.channel_infos;
                                tips += `\n\n${flag_info.config_info}\n${JSON.stringify(tmp_user_data, null, 2)}\n\n${flag_info.page_info}\npage_type: ${page_type}\nhref: ${href}`;
                                tips += `\n\nbrowser_info\n${JSON.stringify(browser_info, null, 2)}`;
                                // 规则信息
                                // tips += `\n\n${flag_info.rule_info}\nytInitialData_rule: \n${ytInitialData_rule && ytInitialData_rule.join('\n')}\n\nytInitialPlayerResponse_rule: \n${ytInitialPlayerResponse_rule && ytInitialPlayerResponse_rule.join('\n')}
                                // \n\nytInitialReelWatchSequenceResponse_rule: \n${ytInitialReelWatchSequenceResponse_rule && ytInitialReelWatchSequenceResponse_rule.join('\n')}`;
                                //账号信息
                                const str_channel_id = '' + channel_id;
                                tips += `\n\naccount_info\nchannel_id: ${(str_channel_id === 'default' || str_channel_id.length <= 10) ? str_channel_id : (str_channel_id.slice(0, 5) + '...' + str_channel_id.slice(-5))}`;
                                tips += `\nreal_language：${real_language}`;
                                if (error_messages.length !== 0) {
                                    tips += `\n\n${flag_info.exists_error}\n-----------${flag_info.err_msg}(${flag_info.ctoc})-----------------\n${error_messages.join('\n')}\n\n${flag_info.tips}`;
                                }
                                display_error_win(tips);
                            }
                        }, 500);
                    }
                };
                search_input_node.addEventListener('input', oninput);
            } else if (count > 50) {
                clearInterval(interval_id);
                log('搜索框未找到', -1);
            }
        }, 200);

    }

    function simulate_swipeup(target, start, end) {
        function createAndDispatchTouchEvent(type, target, clientY) {
            const touches = type !== 'touchend' && [new Touch({
                identifier: 0,
                target: target,
                clientY: clientY
            })] || [];
            let touchEvent = new TouchEvent(type, {
                touches: touches,
                bubbles: true,
                cancelable: true
            });
            target.dispatchEvent(touchEvent);
        }
        createAndDispatchTouchEvent('touchstart', target, start);
        createAndDispatchTouchEvent('touchmove', target, end);
        createAndDispatchTouchEvent('touchend', target);
    }

    function getCookie(cookieName) {
        const name = cookieName + "=";
        let decodedCookie;
        try {
            decodedCookie = decodeURIComponent(document.cookie);
        } catch (error) {
            log('cookie decode error', error, -1);
            return null;
        }
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const cookie = cookieArray[i].trim();

            if (cookie.startsWith(name)) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }

    function copyToClipboard(text) {
        GM_setClipboard(text, "text");
        // if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
        // const textarea = unsafeWindow.document.createElement("textarea");
        // textarea.value = text;
        // unsafeWindow.document.body.appendChild(textarea);
        // textarea.select();
        // unsafeWindow.document.execCommand('copy');
        // unsafeWindow.document.body.removeChild(textarea);
    }

    function check_native(name, fun) {
        const fun_str = fun.toString();
        if (browser_info.name !== 'Firefox') {
            return `function ${name}() { [native code] }` === fun_str;
        } else {
            return `function ${name}() {\n    [native code]\n}` === fun_str;
        }
    }

    function set_history_hook(window_obj) {
        const wrap = function (type) {
            const origin = window_obj.history[type];
            return function () {
                let rv;
                try {
                    rv = origin.apply(this, arguments);
                } catch (error) {
                    log('history hook error', error, 0);
                    return;
                }
                let url = arguments[2] || location.href;
                url.startsWith('/') && (url = location.origin + url);
                !url.startsWith('http') && (url = location.origin + '/' + url);
                url_change(url);
                return rv;
            };
        };
        window_obj.history.pushState = wrap('pushState');
        window_obj.history.replaceState = wrap('replaceState');
    }

    function url_observer() {
        // if (unsafeWindow.navigation) {
        //     unsafeWindow.navigation.addEventListener('navigate', (event) => {
        //         url_change(event);
        //     });
        //     return;
        // }
        set_history_hook(unsafeWindow);
        unsafeWindow.addEventListener('popstate', function (event) {
            url_change(event);
        });
        unsafeWindow.addEventListener('hashchange', function (event) {
            url_change(event);
        });
    }

    function url_change(event = null) {
        let destination_url;
        if (typeof (event) === 'object')
            destination_url = event?.destination?.url || '';
        else
            destination_url = event;

        if (destination_url.startsWith('about:blank')) return;
        if (destination_url === href) return;
        href = destination_url || location.href;
        log('网页url改变 href -> ' + href, 0);
        const tmp_page_type = get_page_type();
        if (tmp_page_type !== page_type) {
            page_type = tmp_page_type;
            config_api.config_init();
            set_search_listen();
        }
        on_page_change();
    }

    function get_page_type(url = href) {
        if (!url) return 'other';
        url.startsWith('/') && (url = location.origin + url);
        const base_url = url.split('?')[0];
        let tmp_page_type;
        if (base_url.match('https://www.youtube.com/?$')) tmp_page_type = 'yt_home';
        else if (base_url.match('https://m.youtube.com/?#?$')) tmp_page_type = 'mobile_yt_home';
        else if (base_url.match('https://www.youtube.com/watch$')) tmp_page_type = 'yt_watch';
        else if (base_url.match('https://m.youtube.com/watch$')) tmp_page_type = 'mobile_yt_watch';
        else if (base_url.match('https://www.youtube.com/results$')) tmp_page_type = 'yt_search';
        else if (base_url.match('https://m.youtube.com/results$')) tmp_page_type = 'mobile_yt_search';
        else if (base_url.startsWith('https://www.youtube.com/shorts')) tmp_page_type = 'yt_shorts';
        else if (base_url.startsWith('https://m.youtube.com/shorts')) tmp_page_type = 'mobile_yt_shorts';
        else if (base_url.match('https://www.youtubekids.com/watch$')) tmp_page_type = 'yt_kids_watch';
        else if (base_url.match('https://music.youtube.com/?$')) tmp_page_type = 'yt_music_home';
        else if (base_url.match('https://music.youtube.com/watch$')) tmp_page_type = 'yt_music_watch';
        else if (base_url.match('https://m.youtube.com/#searching$')) tmp_page_type = 'mobile_yt_home_searching';
        else if (base_url.startsWith('https://www.youtube.com/playlist')) tmp_page_type = 'yt_watch_playlist';
        else if (base_url.includes('channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ')) tmp_page_type = 'yt_music_channel';
        else tmp_page_type = 'other';
        if (tmp_page_type === 'mobile_yt_watch' && href.endsWith('#searching')) tmp_page_type = 'mobile_yt_watch_searching';
        return tmp_page_type;
    }

    function set_debugger() {
        while (!debugger_fun_name) {
            let tmp = crypto.randomUUID().substring(0, Math.floor(Math.random() * 4) + 3).replace(/-/g, '');
            tmp = tmp.match('[a-z].+')?.[0];
            if (tmp && !unsafeWindow[tmp]) {
                debugger_fun_name = tmp;
            }
        }
        log(`debugger_fun_name： ${debugger_fun_name}`, 0);
        const debugger_config_info = {
            'ytInitialPlayerResponse': debugger_ytInitialPlayerResponse,
            'ytInitialData': debugger_ytInitialData,
            'ytInitialReelWatchSequenceResponse': debugger_ytInitialReelWatchSequenceResponse,
            'music_initialData': debugger_music_initialData,
            'inject_info': inject_info,
            'info': [
                'ytInitialData_rule',
                'ytInitialPlayerResponse_rule',
                'is_account_init',
                'user_data',
                'mobile_web',
                'page_type',
                'tmp_debugger_value',
            ],
        };
        unsafeWindow[debugger_fun_name] = function (action = null) {
            const keys = Object.keys(debugger_config_info);
            if (!action && action !== 0) { debugger; return; }
            if (action === 'ytInitialPlayerResponse') log('ytInitialPlayerResponse', debugger_ytInitialPlayerResponse, 0);
            if (action === 'ytInitialData') log('ytInitialData', debugger_ytInitialData, 0);
            if (action === 'inject_info') log('inject_info', inject_info, 0);
            if (action === 'info') {
                if (limit_eval) {
                    log('eval限制使用了', 0);
                } else {
                    for (let key of debugger_config_info['info']) {
                        log(key, eval(trustedScript(key)), 0);
                    }
                }
                return;
            }
            if (action === 'list') {
                keys.forEach(function (key, index) {
                    log(index, key, 0);
                });
            }
            if (typeof (action) === 'number') {
                if (action < keys.length) {
                    unsafeWindow[debugger_fun_name](keys[action]);
                } else if (action >= keys.length) {
                    keys.forEach(function (key) {
                        unsafeWindow[debugger_fun_name](key);
                    });
                }
            }
        };
    }

    function log() {
        const arguments_arr = [...arguments];
        const flag = arguments_arr.pop();
        if (flag === -1) {
            error_messages.push(arguments_arr.join(' '));
        }
        if (flag === 999) arguments_arr.unshift('-----test---test-----');
        if (flag !== 0 && flag !== 999) arguments_arr.push(getCodeLocation());
        if (flag === 0 || flag === 999) {
            const array_length = arguments_arr.length;
            const color = flag === 0 ? 'orange' : 'blue';
            const css_str = `color: ${color};font-size: 20px`;
            for (let i = 0; i < array_length; i++) {
                if (typeof (arguments_arr[i]) === 'string') {
                    arguments_arr[i] = '%c' + arguments_arr[i];
                    i === (array_length - 1) ? arguments_arr.push(css_str) : (arguments_arr.splice(i + 1, 0, css_str));
                    break;
                }
            }
        }
        if ([-1, 0, 999].includes(flag) || open_debugger) flag === -1 ? origin_console.error(...arguments_arr) : origin_console.log(...arguments_arr);
    }

    function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browserName;
        let browserVersion;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        if (userAgent.indexOf("Firefox") > -1) {
            browserName = "Firefox";
            browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1) {
            browserName = "Opera";
            browserVersion = userAgent.match(/(OPR|Opera)\/([0-9.]+)/)[2];
        } else if (userAgent.indexOf("Edg") > -1) {
            browserName = "Edge";
            browserVersion = userAgent.match(/Edg\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("Chrome") > -1) {
            browserName = "Chrome";
            browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("Safari") > -1) {
            browserName = "Safari";
            browserVersion = userAgent.match(/Version\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:") > -1) {
            browserName = "Internet Explorer";
            browserVersion = userAgent.match(/(MSIE |rv:)([0-9.]+)/)[2];
        } else {
            browserName = "Unknown";
            browserVersion = "N/A";
        }

        return {
            name: browserName,
            version: browserVersion,
            isMobile: isMobile,
        };
    }

    function getCodeLocation() {
        if (['Firefox'].includes(browser_info.name)) return "";
        const callstack = new Error().stack.split("\n");
        callstack.shift();
        while (callstack.length && callstack[0].includes("-extension://")) {
            callstack.shift();
        }
        if (!callstack.length) {
            return "";
        }
        return '\n' + callstack[0].trim();
    }

    function display_error_win(msg) {
        const container = unsafeWindow.document.createElement("div");
        container.className = "popup";
        container.id = "infoBox";
        container.innerHTML = `
        <h2 class="recommend-title" style="user-select:none;font-weight:bold;font-size:large;background-color:#3498db;color:#ffffff;border:none;padding:5px 10px;border-radius:5px;text-align:center;margin:0 auto;width:100px;">信息(message)</h2>
        <label id="infoText" style="color: #000; font-size:large;display:block;text-align:center;margin-top:10px;min-width:200px;min-height:50px;width:auto;max-height:200px;overflow:auto;"></label>
        <div style="display:flex;justify-content:space-around;margin-top:10px;">
            <button class="btn" id="copyBtn" style="cursor:pointer;background-color:#3498db;color:#ffffff;border:none;padding:5px 10px;border-radius:5px;">复制(copy)</button>
            <button class="btn" id="closeBtn2" style="cursor:pointer;background-color:#3498db;color:#ffffff;border:none;padding:5px 10px;border-radius:5px;">关闭(close)</button>
        </div>`;

        container.style.cssText = 'z-index:999999999;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:20px;background-color:#ffffff;border:1px solid #3498db;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.3);width:auto;max-width:80%;max-height:80vh;overflow-y:auto;';
        unsafeWindow.document.body.appendChild(container);
        unsafeWindow.document.getElementById('infoText').innerText = msg;

        unsafeWindow.document.getElementById('copyBtn').addEventListener('click', () => {
            copyToClipboard(msg);
            unsafeWindow.document.getElementById('infoBox').remove();
            alert('复制成功!(copy success)');
        });
        unsafeWindow.document.getElementById('closeBtn2').addEventListener('click', () => {
            unsafeWindow.document.getElementById('infoBox').remove();
        });
    }

    function display_config_win() {
        const css_str = '.popup{ z-index:999999999; position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:20px;background-color:#ffffff;border:1px solid #3498db;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.3);width:200px; max-height: 80vh;overflow-y: auto;}.btn{cursor:pointer;background-color:#3498db;color:#ffffff;border:none;padding:5px 10px;margin:0 auto;border-radius:5px;display:block;margin-top:10px;}.recommend-title{user-select: none;font-weight:bold;font-size: large;background-color:#3498db;color:#ffffff;border:none;padding:5px;padding-left:10px;border-radius:5px;width:180px;text-align:start;}.select-group{cursor:pointer;padding:5px;list-style-type:none;margin:0;padding-left:0;user-select: none;}.item-group{list-style-type:none;margin:0;padding-left:0;} .close-btn{position:absolute;top:5px;right:5px;cursor:pointer;border:none;background-color:floralwhite;} label{font-size: large;}';
        const style = unsafeWindow.document.createElement("style");
        style.textContent = css_str;
        $('body').appendChild(style);
        let win_config;
        const home_watch_config = {
            "recommend_btn": [
                {
                    "id": "open_recommend_shorts",
                    "title": "btn_recommend_shorts",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                        {
                            "tag": "btn_lable_subscribed",
                            "value": "subscribed",
                            "tips": "recommend_subscribed_lable_tips",
                            "condition": {
                                "login_status": true
                            }
                        }
                    ]
                }, {
                    "id": "open_recommend_liveroom",
                    "title": "btn_recommend_liveroom",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                        {
                            "tag": "btn_lable_subscribed",
                            "value": "subscribed",
                            "tips": "recommend_subscribed_lable_tips",
                            "condition": {
                                "login_status": true
                            }
                        }
                    ]
                }
                ,
                {
                    "id": "open_recommend_movie",
                    "title": "btn_recommend_movie",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                },
                {
                    "id": "open_recommend_popular",
                    "title": "btn_recommend_popular",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                },
                {
                    "id": "open_recommend_playables",
                    "title": "btn_recommend_game",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                }

            ]
        };
        const shorts_config = {
            "recommend_btn": [
                {
                    "id": "add_shorts_upload_date",
                    "title": "title_add_shorts_upload_date",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                },
                {
                    "id": "shorts_change_author_name",
                    "title": "title_shorts_change_author_name",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                },
                {
                    "id": "short_buy_super_thanks",
                    "title": "short_buy_super_thanks",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                },
                {
                    "id": "shorts_disable_loop_play",
                    "title": "bt_shorts_disable_loop_play_title",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                },
                {
                    "id": "shorts_auto_scroll",
                    "title": "btn_shorts_auto_scroll_title",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                },
                {
                    "id": "shorts_add_video_progress",
                    "title": "btn_shorts_add_video_progress_title",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                },
                {
                    "id": "shorts_dbclick_like",
                    "title": "btn_shorts_dbclick_like_title",
                    "items": [
                        {
                            "tag": "btn_lable_open",
                            "value": "on",
                        },
                        {
                            "tag": "btn_lable_close",
                            "value": "off",
                        },
                    ]
                }
            ]
        };
        // if (page_type === 'yt_shorts') {
        // shorts_config.recommend_btn.push();
        // }
        const common_config = {
            "recommend_btn": [
                // {
                //     "id": "dbclick_download_video",
                //     "title": "btn_dbclick_download_video_title",
                //     "tips": "btn_dbclick_download_video_tips",
                //     "items": [
                //         {
                //             "tag": "btn_lable_open",
                //             "tips": "btn_dbclick_download_video_tips",
                //             "value": "on",
                //         },
                //         {
                //             "tag": "btn_lable_close",
                //             "value": "off",
                //         },
                //     ]
                // }
            ]
        };
        if (['mobile_yt_home_searching', 'mobile_yt_watch_searching'].includes(page_type)) {
            home_watch_config.recommend_btn.push({ "split_line": true, "title": "shorts_recommend_split_tag" });
            home_watch_config.recommend_btn.push(...shorts_config.recommend_btn);
        }
        ['yt_home', 'yt_watch', 'mobile_yt_watch_searching', 'mobile_yt_home_searching'].includes(page_type) && (win_config = home_watch_config);
        ['yt_shorts'].includes(page_type) && (win_config = shorts_config);
        win_config && (win_config.recommend_btn.push(...common_config.recommend_btn));
        if (!win_config) return;
        const popup_node = unsafeWindow.document.getElementById('xxx_popup');
        if (popup_node) {
            popup_node.remove_popup_listener('rm');
        }
        const popup = unsafeWindow.document.createElement('div');
        popup.id = 'xxx_popup';
        popup.className = 'popup';
        const close_btn = unsafeWindow.document.createElement('button');
        close_btn.className = 'close-btn';
        close_btn.innerHTML = 'x';
        close_btn.addEventListener('click', remove_popup_hander
        );
        popup.append(close_btn);
        const item_groups = [];
        const item_group = unsafeWindow.document.createElement('ul');
        item_group.className = 'item-group';
        win_config.recommend_btn.forEach(recommend_item_info => {
            if (recommend_item_info.split_line) {
                let p = unsafeWindow.document.createElement('h1');
                p.style.fontSize = 'large';
                p.style.textAlign = 'center';
                p.style.color = 'red';
                p.style.padding = '20px 20px';
                p.style.fontWeight = 'bold';
                p.style.p;
                p.innerText = flag_info[recommend_item_info.title];
                item_groups.push(p);
                return;
            }
            const recommend_id = recommend_item_info.id;
            const recommend_title = flag_info[recommend_item_info.title];
            const recommend_tips = recommend_item_info.tips && flag_info[recommend_item_info.tips];
            const select_item_infos = recommend_item_info.items || [];
            const select_items = [];
            const item = unsafeWindow.document.createElement('li');
            const select_group = unsafeWindow.document.createElement('ul');
            select_group.className = 'select-group';
            select_group.id = recommend_id;
            select_item_infos.forEach(select_item_info => {
                const tag = flag_info[select_item_info.tag];
                const value = select_item_info.value;
                const tips = flag_info[select_item_info.tips];
                const condition = select_item_info.condition;
                const select_item = unsafeWindow.document.createElement('li');
                const input = unsafeWindow.document.createElement('input');
                input.type = 'radio';
                input.name = recommend_id + '_option';
                input.id = recommend_id + '_' + value;
                input.value = value;
                if (condition && condition.login_status) {
                    if (condition.login_status !== user_data.login) {
                        input.disabled = true;
                    }
                }
                if (user_data[recommend_id] === value) {
                    input.checked = true;
                }
                input.addEventListener('click', () => {
                    handle_recommend_radio(input);
                });
                const label = unsafeWindow.document.createElement('label');
                label.htmlFor = input.id;
                label.innerText = tag;
                tips && (label.title = tips);
                select_item.append(input, label);
                select_items.push(select_item);
            });
            const recommend_title_div = unsafeWindow.document.createElement('div');
            recommend_title_div.className = 'recommend-title';
            recommend_title_div.innerText = recommend_title;
            recommend_tips && (recommend_title_div.title = recommend_tips);
            select_group.append(...select_items);
            item.append(recommend_title_div, select_group);
            item_groups.push(item);
        });
        item_group.append(...item_groups);
        popup.append(item_group);
        unsafeWindow.document.body.append(popup);

        function remove_popup_hander(event) {
            if ((event.target && !popup.contains(event.target)) || event.target === close_btn || event === 'rm') {
                popup.remove();
                unsafeWindow.document.removeEventListener('click', remove_popup_hander);
                if (['mobile_yt_watch_searching', 'mobile_yt_home_searching'].includes(page_type)) {
                    history.back();
                }
            }
        }
        popup.remove_popup_listener = remove_popup_hander;
        unsafeWindow.document.addEventListener('click', remove_popup_hander);

        return;
        // 隐藏搜索推荐元素
        let count = 0;
        const interval_id = setInterval(() => {
            if (count = 30)
                clearInterval(interval_id);
            count++;
            let class_name;
            if (['yt_home', , 'yt_watch', 'yt_shorts'].includes(page_type)) class_name = 'gstl_50';
            if (['mobile_yt_home', , 'mobile_yt_watch'].includes(page_type)) class_name = 'searchbox-dropdown';
            if (class_name) {
                let nodes = unsafeWindow.document.getElementsByClassName(class_name);
                if (nodes.length) {
                    nodes = Array.from(nodes);
                    nodes.forEach(function (node) {
                        node.style.display = 'none';
                        setTimeout(() => {
                            node.style.display = '';
                        }, 100);
                    });
                }
            }
        }, 100);
    }

    function handle_recommend_radio(input_obj) {
        user_data[input_obj.parentNode.parentNode.id] = input_obj.value;
        user_data_api.set();
        config_api.config_init(user_data.language);
    }

    function display_update_win() {
        function btn_click() {
            const btn = this;
            if (btn.id === 'go_btn') {
                location.href = script_url;
            }
            container.remove();
        }
        const css_str = "#update_tips_win { z-index:9999999999; display: flex; position: fixed; bottom: 20px; right: 20px; padding: 10px 20px; background-color: #fff; border: 1px solid #ccc; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px; } .btn { margin: 0 10px; display: inline-block; padding: 5px 10px; background-color: #3498db; color: #fff; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease; } .btn:hover { background-color: #2980b9; }";
        const style = unsafeWindow.document.createElement("style");
        style.innerText = css_str;
        $('body').appendChild(style);
        const container = unsafeWindow.document.createElement("div");
        container.id = "update_tips_win";
        const span = unsafeWindow.document.createElement("span");
        span.textContent = GM_info.script.name + '有更新了！！';
        container.appendChild(span);
        const go_btn = unsafeWindow.document.createElement("button");
        go_btn.textContent = 'GO';
        go_btn.id = 'go_btn';
        go_btn.className = 'btn';
        go_btn.onclick = btn_click;
        container.appendChild(go_btn);
        const no_btn = unsafeWindow.document.createElement("button");
        no_btn.textContent = 'NO';
        no_btn.className = 'btn';
        no_btn.id = 'no_btn';
        no_btn.onclick = btn_click;
        container.appendChild(no_btn);
        $('body').appendChild(container);
    }

    function check_update() {
        const script_handler = GM_info.scriptHandler;
        if (['Via'].includes(script_handler)) return;
        const last_check_time = GM_getValue('last_check_time', 0);
        if ((Date.now() - last_check_time) < 1000 * 60 * 60 * 24) return;
        GM_xmlhttpRequest({
            method: 'GET',
            url: script_url,
            onload: function (response) {
                const onlineScript = response.responseText;
                // 从线上脚本中提取版本号和元数据信息
                const onlineMeta = onlineScript.match(/@version\s+([^\s]+)/i);
                const onlineVersion = onlineMeta ? onlineMeta[1] : '';
                if (onlineVersion > GM_info.script.version) {
                    display_update_win();
                }
            }
        });
        GM_setValue('last_check_time', Date.now());
    }

    function obj_process_filter(path_info, json_obj) {
        if (!['yt_home', 'yt_watch', 'mobile_yt_home', 'mobile_yt_watch'].includes(page_type)) return false;
        if (!user_data.login || user_data.channel_infos.ids.length === 0) return false;

        if (user_data.open_recommend_shorts === 'subscribed' && path_info.condition_value === 'YOUTUBE_SHORTS_BRAND_24') {
            if (path_info.express.includes('YOUTUBE_SHORTS_BRAND_24')) {
                let video_list_path;
                video_list_path = path_info.conform_value_path.split('["icon"]')[0] + (page_type === 'yt_home' ? '["contents"]' : '["items"]');
                const video_list = data_process.string_to_value(json_obj, video_list_path) || [];
                shorts_fun.node_parse(video_list);
            }
        }

        if (user_data.open_recommend_liveroom === 'subscribed' && ['UPCOMING', 'LIVE', 'BADGE_STYLE_TYPE_LIVE_NOW'].includes(path_info.condition_value)) {
            if (path_info.express.includes('UPCOMING')) {
                try {
                    const match = JSON.stringify(data_process.string_to_value(json_obj, path_info.deal_path)).match(/"browseId"\:"(.*?)"/);
                    let id;
                    if (match && match.length > 1) id = match[1];
                    if (!id) {
                        log('id获取失败\n' + JSON.stringify(path_info), -1);
                    }
                    if (user_data.channel_infos.ids.includes(id)) {
                        const index = user_data.channel_infos.ids.indexOf(id);
                        const name = user_data.channel_infos.names[index];
                        log('不过滤 ' + name + (path_info.condition_value === 'UPCOMING' ? ' 等待发布的直播' : ' 正在进行的直播'), 'shorts');
                        return true;
                    }
                    let msg = `过滤 ${id} ${path_info.condition_value === 'UPCOMING' ? ' 等待发布的直播' : ' 正在进行的直播'}`;
                    log(msg, 'shorts');
                } catch (error) {
                    log(error, -1);
                }
            }
        }
        return false;
    }

    function get_shorts_fun() {
        class ShortsFun {
            constructor() {
                this.parsing = false;
                this.shorts_list = [];
            }
            node_parse(video_list) {
                !user_data.shorts_list && (user_data.shorts_list = []);
                let video_id, title, views_lable, thumbnail_url;
                let count = 0;
                for (let video_info of video_list) {
                    count++;
                    if (page_type === "yt_home") {
                        video_id = video_info.richItemRenderer.content.reelItemRenderer.videoId;
                        title = video_info.richItemRenderer.content.reelItemRenderer.headline.simpleText;
                        views_lable = video_info.richItemRenderer.content.reelItemRenderer.viewCountText.simpleText;
                        thumbnail_url = video_info.richItemRenderer.content.reelItemRenderer.thumbnail.thumbnails[0].url;
                    }
                    if (page_type === "yt_watch") {
                        video_id = video_info.reelItemRenderer.videoId;
                        title = video_info.reelItemRenderer.headline.simpleText;
                        views_lable = video_info.reelItemRenderer.viewCountText.simpleText;
                        thumbnail_url = video_info.reelItemRenderer.thumbnail.thumbnails[0].url;
                    }
                    if (["mobile_yt_home", "mobile_yt_watch"].includes(page_type)) {
                        video_id = video_info.shortsLockupViewModel.entityId.replace('shorts-shelf-item-', '');
                        title = video_info.shortsLockupViewModel.overlayMetadata.primaryText.content;
                        views_lable = video_info.shortsLockupViewModel.overlayMetadata.secondaryText.content;
                        thumbnail_url = video_info.shortsLockupViewModel.thumbnail.sources[0].url;
                    }
                    this.shorts_list.push({
                        id: video_id,
                        title: title,
                        views_lable: views_lable,
                        thumbnail_url: thumbnail_url
                    });
                    if (!this.parsing) {
                        this.parsing = true;
                        setTimeout(() => {
                            this.parse_shorts_list();
                        }, shorts_parse_delay);
                    }

                }

            }
            get_shorts_section() {
                if (!user_data.shorts_list || !user_data.shorts_list.length) return;
                let root, item_path;
                const items = [];
                if (page_type == 'yt_home') {
                    root = {
                        "richSectionRenderer": {
                            "content": {
                                "richShelfRenderer": {
                                    "title": {
                                        "runs": [
                                            {
                                                "text": "Shorts"
                                            }
                                        ]
                                    },
                                    "contents": [],
                                    "trackingParams": "CNMEEN-DAyITCOGA_NHuz4UDFWdqTAgdfF4E-Q==",
                                    "menu": {
                                        "menuRenderer": {
                                            "trackingParams": "CNMEEN-DAyITCOGA_NHuz4UDFWdqTAgdfF4E-Q==",
                                            "topLevelButtons": [
                                                {
                                                    "buttonRenderer": {
                                                        "style": "STYLE_OPACITY",
                                                        "size": "SIZE_DEFAULT",
                                                        "isDisabled": false,
                                                        "serviceEndpoint": {
                                                            "clickTrackingParams": "CNYEEKqJCRgMIhMI4YD80e7PhQMVZ2pMCB18XgT5",
                                                            "commandMetadata": {
                                                                "webCommandMetadata": {
                                                                    "sendPost": true,
                                                                    "apiUrl": "/youtubei/v1/feedback"
                                                                }
                                                            },
                                                            "feedbackEndpoint": {
                                                                "feedbackToken": "AB9zfpIcTXNyA3lbF_28icb4umRJ5AveSSTqmF7T9gE8k-Sw7HrOTLE5wzA2TScqfTByCI-cR9nPuVMSWAgbNuuaruVBYx2-2dGAzujQTL8KGMOyCFM_wmGhkLTSdUBQzsFQRHEibpg_",
                                                                "uiActions": {
                                                                    "hideEnclosingContainer": true
                                                                },
                                                                "actions": [
                                                                    {
                                                                        "clickTrackingParams": "CNYEEKqJCRgMIhMI4YD80e7PhQMVZ2pMCB18XgT5",
                                                                        "replaceEnclosingAction": {
                                                                            "item": {
                                                                                "notificationMultiActionRenderer": {
                                                                                    "responseText": {
                                                                                        "runs": [
                                                                                            {
                                                                                                "text": "Shelf will be hidden for "
                                                                                            },
                                                                                            {
                                                                                                "text": "30"
                                                                                            },
                                                                                            {
                                                                                                "text": " days"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    "buttons": [
                                                                                        {
                                                                                            "buttonRenderer": {
                                                                                                "style": "STYLE_BLUE_TEXT",
                                                                                                "text": {
                                                                                                    "simpleText": "Undo"
                                                                                                },
                                                                                                "serviceEndpoint": {
                                                                                                    "clickTrackingParams": "CNgEEPBbGAAiEwjhgPzR7s-FAxVnakwIHXxeBPk=",
                                                                                                    "commandMetadata": {
                                                                                                        "webCommandMetadata": {
                                                                                                            "sendPost": true,
                                                                                                            "apiUrl": "/youtubei/v1/feedback"
                                                                                                        }
                                                                                                    },
                                                                                                    "undoFeedbackEndpoint": {
                                                                                                        "undoToken": "AB9zfpLpAillN1hH9cyfSbyPRWwAhTOJo6mUTu-ony4HASc0KgCEy0ifaIrDUdJJEk4OXiPC43EMPZBEK8WGiIqeci4r97TGpabAUk84dEh7tHzF7-rsziFBGZjY92Jyk3YujrF2_wxC",
                                                                                                        "actions": [
                                                                                                            {
                                                                                                                "clickTrackingParams": "CNgEEPBbGAAiEwjhgPzR7s-FAxVnakwIHXxeBPk=",
                                                                                                                "undoFeedbackAction": {
                                                                                                                    "hack": true
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                },
                                                                                                "trackingParams": "CNgEEPBbGAAiEwjhgPzR7s-FAxVnakwIHXxeBPk="
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "trackingParams": "CNcEEKW8ASITCOGA_NHuz4UDFWdqTAgdfF4E-Q=="
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        "icon": {
                                                            "iconType": "DISMISSAL"
                                                        },
                                                        "tooltip": "Not interested",
                                                        "trackingParams": "CNYEEKqJCRgMIhMI4YD80e7PhQMVZ2pMCB18XgT5",
                                                        "accessibilityData": {
                                                            "accessibilityData": {
                                                                "label": "Not interested"
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "showMoreButton": {
                                        "buttonRenderer": {
                                            "style": "STYLE_OPACITY",
                                            "size": "SIZE_DEFAULT",
                                            "text": {
                                                "runs": [
                                                    {
                                                        "text": "Show more"
                                                    }
                                                ]
                                            },
                                            "icon": {
                                                "iconType": "EXPAND"
                                            },
                                            "accessibility": {
                                                "label": "Show more"
                                            },
                                            "trackingParams": "CNUEEJnjCyITCOGA_NHuz4UDFWdqTAgdfF4E-Q=="
                                        }
                                    },
                                    "isExpanded": false,
                                    "icon": {
                                        "iconType": "YOUTUBE_SHORTS_BRAND_24"
                                    },
                                    "isTopDividerHidden": false,
                                    "isBottomDividerHidden": false,
                                    "showLessButton": {
                                        "buttonRenderer": {
                                            "style": "STYLE_OPACITY",
                                            "size": "SIZE_DEFAULT",
                                            "text": {
                                                "runs": [
                                                    {
                                                        "text": "Show less"
                                                    }
                                                ]
                                            },
                                            "icon": {
                                                "iconType": "COLLAPSE"
                                            },
                                            "accessibility": {
                                                "label": "Show less"
                                            },
                                            "trackingParams": "CNQEEPBbIhMI4YD80e7PhQMVZ2pMCB18XgT5"
                                        }
                                    }
                                }
                            },
                            "trackingParams": "CNIEEOOXBRgEIhMI4YD80e7PhQMVZ2pMCB18XgT5",
                            "fullBleed": false
                        }
                    };
                    item_path = 'root.richSectionRenderer.content.richShelfRenderer.contents';
                }
                if (['mobile_yt_watch', 'yt_watch'].includes(page_type)) {
                    root = {
                        "reelShelfRenderer": {
                            "title": {
                                "runs": [
                                    {
                                        "text": "Shorts"
                                    }
                                ]
                            },
                            "items": [],
                            "trackingParams": "CM4CEN-DAxgEIhMInKOvhY3QhQMVGcCXCB04HQR6",
                            "icon": {
                                "iconType": "YOUTUBE_SHORTS_BRAND_24"
                            }
                        }
                    };
                    item_path = 'root.reelShelfRenderer.items';
                }
                if (page_type == 'mobile_yt_home') {
                    root = {
                        "richSectionRenderer": {
                            "content": {
                                "reelShelfRenderer": {
                                    "title": {
                                        "runs": [
                                            {
                                                "text": "Shorts"
                                            }
                                        ]
                                    },
                                    "button": {
                                        "menuRenderer": {
                                            "trackingParams": "CHYQ34MDIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                            "topLevelButtons": [
                                                {
                                                    "buttonRenderer": {
                                                        "style": "STYLE_DEFAULT",
                                                        "size": "SIZE_DEFAULT",
                                                        "isDisabled": false,
                                                        "serviceEndpoint": {
                                                            "clickTrackingParams": "CLMBEKqJCRgPIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                                            "commandMetadata": {
                                                                "webCommandMetadata": {
                                                                    "sendPost": true,
                                                                    "apiUrl": "/youtubei/v1/feedback"
                                                                }
                                                            },
                                                            "feedbackEndpoint": {
                                                                "feedbackToken": "AB9zfpJSnrbvskPWkpziyGduKV-4gTxm30-eNNYDobzecpLq84dL6HwCxdX_zbvm_OmxSKdlsngHEE1CF7JKYGiyDVYV_Q7p9ihGCzOYcnqKcAJfNnSp-U-njcnKLgCWu_USr-2prW3x",
                                                                "uiActions": {
                                                                    "hideEnclosingContainer": true
                                                                },
                                                                "actions": [
                                                                    {
                                                                        "clickTrackingParams": "CLMBEKqJCRgPIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                                                        "replaceEnclosingAction": {
                                                                            "item": {
                                                                                "notificationMultiActionRenderer": {
                                                                                    "responseText": {
                                                                                        "runs": [
                                                                                            {
                                                                                                "text": "Shelf will be hidden for "
                                                                                            },
                                                                                            {
                                                                                                "text": "30"
                                                                                            },
                                                                                            {
                                                                                                "text": " days"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    "buttons": [
                                                                                        {
                                                                                            "buttonRenderer": {
                                                                                                "style": "STYLE_MONO_TONAL",
                                                                                                "text": {
                                                                                                    "runs": [
                                                                                                        {
                                                                                                            "text": "Undo"
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                "serviceEndpoint": {
                                                                                                    "clickTrackingParams": "CLUBEPBbGAAiEwip6oDKjtCFAxXPeUwIHaYIDQk=",
                                                                                                    "commandMetadata": {
                                                                                                        "webCommandMetadata": {
                                                                                                            "sendPost": true,
                                                                                                            "apiUrl": "/youtubei/v1/feedback"
                                                                                                        }
                                                                                                    },
                                                                                                    "undoFeedbackEndpoint": {
                                                                                                        "undoToken": "AB9zfpK-nY3vxgYDkvJSkuFdbeBltD0r4XdLzoFqxz6OPnmJrroOAxKfUuDny8kPjB9yyWzwEerOZqe90BakCPEJXycRSrH8sZAdnlWpEs0n0lx6qOFERE6o5jkK3mgbcVCM-Al38oGV",
                                                                                                        "actions": [
                                                                                                            {
                                                                                                                "clickTrackingParams": "CLUBEPBbGAAiEwip6oDKjtCFAxXPeUwIHaYIDQk=",
                                                                                                                "undoFeedbackAction": {
                                                                                                                    "hack": true
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                },
                                                                                                "trackingParams": "CLUBEPBbGAAiEwip6oDKjtCFAxXPeUwIHaYIDQk="
                                                                                            }
                                                                                        }
                                                                                    ],
                                                                                    "trackingParams": "CLQBEKW8ASITCKnqgMqO0IUDFc95TAgdpggNCQ=="
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        "icon": {
                                                            "iconType": "DISMISSAL"
                                                        },
                                                        "tooltip": "Not interested",
                                                        "trackingParams": "CLMBEKqJCRgPIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                                        "accessibilityData": {
                                                            "accessibilityData": {
                                                                "label": "Not interested"
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "items": [

                                    ],
                                    "trackingParams": "CHYQ34MDIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                    "icon": {
                                        "iconType": "YOUTUBE_SHORTS_BRAND_24"
                                    }
                                }
                            },
                            "trackingParams": "CHUQ45cFGAEiEwip6oDKjtCFAxXPeUwIHaYIDQk=",
                            "fullBleed": false
                        }
                    };
                    item_path = 'root.richSectionRenderer.content.reelShelfRenderer.items';
                }
                let shorts;
                while (shorts = user_data.shorts_list.pop()) {
                    const id = shorts['id'];
                    const title = shorts['title'];
                    const ago_str = shorts['ago_str'];
                    const author = shorts['author_name'];
                    const views_lable = shorts['views_lable'] + (author ? (' · ' + author) : '') + (ago_str ? (' · ' + ago_str) : '');
                    const thumbnail_url = shorts['thumbnail_url'];
                    let tmp_item;
                    if (['yt_home', 'yt_watch'].includes(page_type)) {
                        tmp_item = {
                            "reelItemRenderer": {
                                "videoId": id,
                                "headline": {
                                    "simpleText": title
                                },
                                "thumbnail": {
                                    "thumbnails": [
                                        {
                                            "url": thumbnail_url,
                                            "width": 405,
                                            "height": 720
                                        }
                                    ],
                                    "isOriginalAspectRatio": true
                                },
                                "viewCountText": {
                                    "accessibility": {
                                        "accessibilityData": {
                                            "label": views_lable
                                        }
                                    },
                                    "simpleText": views_lable
                                },
                                "navigationEndpoint": {
                                    "clickTrackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6mgEFCCUQ-B0=",
                                    "commandMetadata": {
                                        "webCommandMetadata": {
                                            "url": "/shorts/" + id,
                                            "webPageType": "WEB_PAGE_TYPE_SHORTS",
                                            "rootVe": 37414
                                        }
                                    },
                                    "reelWatchEndpoint": {
                                        "videoId": id,
                                        "playerParams": "8AEBoAMCyAMluAQGogYVAdXZ-jvMfGWnXiNDPh0oiMSTJMUn",
                                        "thumbnail": {
                                            "thumbnails": [
                                                {
                                                    "url": "https://i.ytimg.com/vi/" + id + "/frame0.jpg",
                                                    "width": 1080,
                                                    "height": 1920
                                                }
                                            ],
                                            "isOriginalAspectRatio": true
                                        },
                                        "overlay": {
                                            "reelPlayerOverlayRenderer": {
                                                "style": "REEL_PLAYER_OVERLAY_STYLE_SHORTS",
                                                "trackingParams": "CO4CELC1BCITCJyjr4WN0IUDFRnAlwgdOB0Eeg==",
                                                "reelPlayerNavigationModel": "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED"
                                            }
                                        },
                                        "params": "CAYwAg%3D%3D",
                                        "sequenceProvider": "REEL_WATCH_SEQUENCE_PROVIDER_RPC",
                                        "sequenceParams": "CgtLRmRCbnpnSjJZWSoCGAZQGWgA",
                                        "loggingContext": {
                                            "vssLoggingContext": {
                                                "serializedContextData": "CgIIDA%3D%3D"
                                            },
                                            "qoeLoggingContext": {
                                                "serializedContextData": "CgIIDA%3D%3D"
                                            }
                                        },
                                        "ustreamerConfig": "CAwSHDFIakVXUytucVRyTENNWlgzMXdDZmYwamZQQ0U="
                                    }
                                },
                                "menu": {
                                    "menuRenderer": {
                                        "items": [
                                            {
                                                "menuServiceItemRenderer": {
                                                    "text": {
                                                        "runs": [
                                                            {
                                                                "text": "Report"
                                                            }
                                                        ]
                                                    },
                                                    "icon": {
                                                        "iconType": "FLAG"
                                                    },
                                                    "serviceEndpoint": {
                                                        "clickTrackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6",
                                                        "commandMetadata": {
                                                            "webCommandMetadata": {
                                                                "sendPost": true,
                                                                "apiUrl": "/youtubei/v1/flag/get_form"
                                                            }
                                                        },
                                                        "getReportFormEndpoint": {
                                                            "params": "EgtLRmRCbnpnSjJZWUABWABwAXgB2AEA6AEA"
                                                        }
                                                    },
                                                    "trackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6"
                                                }
                                            },
                                            {
                                                "menuServiceItemRenderer": {
                                                    "text": {
                                                        "runs": [
                                                            {
                                                                "text": "Not interested"
                                                            }
                                                        ]
                                                    },
                                                    "icon": {
                                                        "iconType": "NOT_INTERESTED"
                                                    },
                                                    "serviceEndpoint": {
                                                        "clickTrackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6",
                                                        "commandMetadata": {
                                                            "webCommandMetadata": {
                                                                "sendPost": true,
                                                                "apiUrl": "/youtubei/v1/feedback"
                                                            }
                                                        },
                                                        "feedbackEndpoint": {
                                                            "feedbackToken": "AB9zfpIBjY8nLioWtHjvUvMvrLXfhPMooShdpv91xgNNrZuxibAl6QyPeYMe7faEHcrSUm-TIqvLe2ThmYQpNRUy9rPbV1k3jjrvqqc5cOLBvnV8oN0Kbrq3-K9IjJXYitJPyOzJU0uy",
                                                            "actions": [
                                                                {
                                                                    "clickTrackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6",
                                                                    "replaceEnclosingAction": {
                                                                        "item": {
                                                                            "notificationMultiActionRenderer": {
                                                                                "responseText": {
                                                                                    "runs": [
                                                                                        {
                                                                                            "text": "Video removed"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                "buttons": [
                                                                                    {
                                                                                        "buttonRenderer": {
                                                                                            "style": "STYLE_BLUE_TEXT",
                                                                                            "text": {
                                                                                                "runs": [
                                                                                                    {
                                                                                                        "text": "Undo"
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "serviceEndpoint": {
                                                                                                "clickTrackingParams": "CO0CEPBbGAAiEwico6-FjdCFAxUZwJcIHTgdBHo=",
                                                                                                "commandMetadata": {
                                                                                                    "webCommandMetadata": {
                                                                                                        "sendPost": true,
                                                                                                        "apiUrl": "/youtubei/v1/feedback"
                                                                                                    }
                                                                                                },
                                                                                                "undoFeedbackEndpoint": {
                                                                                                    "undoToken": "AB9zfpK74nsMbZ4OfNgKTgA9g0w3Q8o72jdm384D3y82OAuy2KgvTUOAn-iII915ZC_7aqAxTK-XNir21X_T3WQEeAzdy4hCZ6o0f12hfdHW8xI1js1WB_CEn3EW27P9_1vu5dw2kDeW",
                                                                                                    "actions": [
                                                                                                        {
                                                                                                            "clickTrackingParams": "CO0CEPBbGAAiEwico6-FjdCFAxUZwJcIHTgdBHo=",
                                                                                                            "undoFeedbackAction": {
                                                                                                                "hack": true
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            },
                                                                                            "trackingParams": "CO0CEPBbGAAiEwico6-FjdCFAxUZwJcIHTgdBHo="
                                                                                        }
                                                                                    }
                                                                                ],
                                                                                "trackingParams": "COwCEKW8ASITCJyjr4WN0IUDFRnAlwgdOB0Eeg=="
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    "trackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6",
                                                    "accessibility": {
                                                        "accessibilityData": {
                                                            "label": "Not interested"
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                "menuNavigationItemRenderer": {
                                                    "text": {
                                                        "runs": [
                                                            {
                                                                "text": "Send feedback"
                                                            }
                                                        ]
                                                    },
                                                    "icon": {
                                                        "iconType": "FEEDBACK"
                                                    },
                                                    "navigationEndpoint": {
                                                        "clickTrackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6",
                                                        "commandMetadata": {
                                                            "webCommandMetadata": {
                                                                "ignoreNavigation": true
                                                            }
                                                        },
                                                        "userFeedbackEndpoint": {
                                                            "additionalDatas": [
                                                                {
                                                                    "userFeedbackEndpointProductSpecificValueData": {
                                                                        "key": "video_id",
                                                                        "value": id
                                                                    }
                                                                },
                                                                {
                                                                    "userFeedbackEndpointProductSpecificValueData": {
                                                                        "key": "lockup",
                                                                        "value": "shelf"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    "trackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6",
                                                    "accessibility": {
                                                        "accessibilityData": {
                                                            "label": "Send feedback"
                                                        }
                                                    }
                                                }
                                            }
                                        ],
                                        "trackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6",
                                        "accessibility": {
                                            "accessibilityData": {
                                                "label": "More actions"
                                            }
                                        }
                                    }
                                },
                                "trackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6QIazp8Dzs9CrKA==",
                                "accessibility": {
                                    "accessibilityData": {
                                        "label": title + " - play Short"
                                    }
                                },
                                "style": "REEL_ITEM_STYLE_AVATAR_CIRCLE",
                                "dismissalInfo": {
                                    "feedbackToken": "AB9zfpLIJd1aRU9JzdOjpgeJBW2QvHH79sx6dM6ZCDEzyc5qrISZBSpNRe5lerckNHwQ10BOwEQhlquLlHP-nkuA4VSSCXX0XgMJHBnKWBxlIXkQ1pLIUjd6cQKhrCUioDfix7xn5Ecj"
                                },
                                "videoType": "REEL_VIDEO_TYPE_VIDEO",
                                "loggingDirectives": {
                                    "trackingParams": "COsCEIf2BBgAIhMInKOvhY3QhQMVGcCXCB04HQR6",
                                    "visibility": {
                                        "types": "12"
                                    },
                                    "enableDisplayloggerExperiment": true
                                }
                            }
                        };
                    }
                    if (page_type == "yt_home") {
                        tmp_item = {
                            "richItemRenderer": {
                                "content": tmp_item,
                                "trackingParams": "CJsFEJmNBRgAIhMI4YD80e7PhQMVZ2pMCB18XgT5"
                            }
                        };
                    }
                    if (["mobile_yt_home", "mobile_yt_watch"].includes(page_type)) {
                        tmp_item = {
                            "shortsLockupViewModel": {
                                "entityId": "shorts-shelf-item-" + id,
                                "accessibilityText": title + ", " + views_lable + " - play Short",
                                "thumbnail": {
                                    "sources": [
                                        {
                                            "url": thumbnail_url,
                                            "width": 405,
                                            "height": 720
                                        }
                                    ]
                                },
                                "onTap": {
                                    "innertubeCommand": {
                                        "clickTrackingParams": "CK8BEIf2BBgAIhMIqeqAyo7QhQMVz3lMCB2mCA0JWg9GRXdoYXRfdG9fd2F0Y2iaAQUIJBCOHg==",
                                        "commandMetadata": {
                                            "webCommandMetadata": {
                                                "url": "/shorts/" + id,
                                                "webPageType": "WEB_PAGE_TYPE_SHORTS",
                                                "rootVe": 37414
                                            }
                                        },
                                        "reelWatchEndpoint": {
                                            "videoId": id,
                                            "playerParams": "8AEBoAMByAMkuAQFogYVAdXZ-jveUoR0s0_R7sLGUd85_xAk",
                                            "thumbnail": {
                                                "thumbnails": [
                                                    {
                                                        "url": "https://i.ytimg.com/vi/" + id + "/frame0.jpg",
                                                        "width": 1080,
                                                        "height": 1920
                                                    }
                                                ],
                                                "isOriginalAspectRatio": true
                                            },
                                            "overlay": {
                                                "reelPlayerOverlayRenderer": {
                                                    "style": "REEL_PLAYER_OVERLAY_STYLE_SHORTS",
                                                    "trackingParams": "CLIBELC1BCITCKnqgMqO0IUDFc95TAgdpggNCQ==",
                                                    "reelPlayerNavigationModel": "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED"
                                                }
                                            },
                                            "params": "CAUwAg%3D%3D",
                                            "sequenceProvider": "REEL_WATCH_SEQUENCE_PROVIDER_RPC",
                                            "sequenceParams": "CgtwblVoZV9PUTE2byoCGAVQGWgA",
                                            "loggingContext": {
                                                "vssLoggingContext": {
                                                    "serializedContextData": "CgIIDA%3D%3D"
                                                },
                                                "qoeLoggingContext": {
                                                    "serializedContextData": "CgIIDA%3D%3D"
                                                }
                                            },
                                            "ustreamerConfig": "CAwSHDFIakVXUytucVRyTENNWlgzMXdDZmYwamZQQ0U="
                                        }
                                    }
                                },
                                "inlinePlayerData": {
                                    "onVisible": {
                                        "innertubeCommand": {
                                            "clickTrackingParams": "CK8BEIf2BBgAIhMIqeqAyo7QhQMVz3lMCB2mCA0JMgZnLWhpZ2haD0ZFd2hhdF90b193YXRjaJoBBQgkEI4e",
                                            "commandMetadata": {
                                                "webCommandMetadata": {
                                                    "url": "/watch?v=" + id + "&pp=YAHIAQG6AwIYAugFAQ%3D%3D",
                                                    "webPageType": "WEB_PAGE_TYPE_WATCH",
                                                    "rootVe": 3832
                                                }
                                            },
                                            "watchEndpoint": {
                                                "videoId": id,
                                                "playerParams": "YAHIAQG6AwIYAugFAQ%3D%3D"
                                            }
                                        }
                                    }
                                },
                                "menuOnTap": {
                                    "innertubeCommand": {
                                        "clickTrackingParams": "CK8BEIf2BBgAIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                        "showSheetCommand": {
                                            "panelLoadingStrategy": {
                                                "inlineContent": {
                                                    "sheetViewModel": {
                                                        "content": {
                                                            "listViewModel": {
                                                                "listItems": [
                                                                    {
                                                                        "listItemViewModel": {
                                                                            "title": {
                                                                                "content": "Not interested"
                                                                            },
                                                                            "leadingImage": {
                                                                                "sources": [
                                                                                    {
                                                                                        "clientResource": {
                                                                                            "imageName": "NOT_INTERESTED"
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "rendererContext": {
                                                                                "commandContext": {
                                                                                    "onTap": {
                                                                                        "innertubeCommand": {
                                                                                            "clickTrackingParams": "CK8BEIf2BBgAIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                                                                            "commandMetadata": {
                                                                                                "webCommandMetadata": {
                                                                                                    "sendPost": true,
                                                                                                    "apiUrl": "/youtubei/v1/feedback"
                                                                                                }
                                                                                            },
                                                                                            "feedbackEndpoint": {
                                                                                                "feedbackToken": "AB9zfpJnMNgSEnsvYAu4UXP6IN5z0VfAt-OZOs8ypsKND9Mv5RhoELjmgb_vxVOvvYoiM2f8q9QFcdGMOEOCSk7LPYMnGshEHKcis4oeot-Z5OsgYpmOP3DbMXgFHUgQhOUAjL-FIj5y",
                                                                                                "actions": [
                                                                                                    {
                                                                                                        "clickTrackingParams": "CK8BEIf2BBgAIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                                                                                        "replaceEnclosingAction": {
                                                                                                            "item": {
                                                                                                                "notificationMultiActionRenderer": {
                                                                                                                    "responseText": {
                                                                                                                        "runs": [
                                                                                                                            {
                                                                                                                                "text": "Video removed"
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    "buttons": [
                                                                                                                        {
                                                                                                                            "buttonRenderer": {
                                                                                                                                "style": "STYLE_BLUE_TEXT",
                                                                                                                                "text": {
                                                                                                                                    "runs": [
                                                                                                                                        {
                                                                                                                                            "text": "Undo"
                                                                                                                                        }
                                                                                                                                    ]
                                                                                                                                },
                                                                                                                                "serviceEndpoint": {
                                                                                                                                    "clickTrackingParams": "CLEBEPBbGAAiEwip6oDKjtCFAxXPeUwIHaYIDQk=",
                                                                                                                                    "commandMetadata": {
                                                                                                                                        "webCommandMetadata": {
                                                                                                                                            "sendPost": true,
                                                                                                                                            "apiUrl": "/youtubei/v1/feedback"
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    "undoFeedbackEndpoint": {
                                                                                                                                        "undoToken": "AB9zfpI_UgAQH8eSODf7gCfkDtllqeFC5Qr38N7cNnlz8NmYZ78F2KiuX3KZNcumX2jfVXRzNfd2M0V7vud8UdS2Hz7SshgqVTn2TOJApWBlkIPTbUYWuQkX2CSbVKZw1p3wIHkjQOH7",
                                                                                                                                        "actions": [
                                                                                                                                            {
                                                                                                                                                "clickTrackingParams": "CLEBEPBbGAAiEwip6oDKjtCFAxXPeUwIHaYIDQk=",
                                                                                                                                                "undoFeedbackAction": {
                                                                                                                                                    "hack": true
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        ]
                                                                                                                                    }
                                                                                                                                },
                                                                                                                                "trackingParams": "CLEBEPBbGAAiEwip6oDKjtCFAxXPeUwIHaYIDQk="
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ],
                                                                                                                    "trackingParams": "CLABEKW8ASITCKnqgMqO0IUDFc95TAgdpggNCQ=="
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        "listItemViewModel": {
                                                                            "title": {
                                                                                "content": "Send feedback"
                                                                            },
                                                                            "leadingImage": {
                                                                                "sources": [
                                                                                    {
                                                                                        "clientResource": {
                                                                                            "imageName": "FEEDBACK"
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "rendererContext": {
                                                                                "commandContext": {
                                                                                    "onTap": {
                                                                                        "innertubeCommand": {
                                                                                            "clickTrackingParams": "CK8BEIf2BBgAIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                                                                            "commandMetadata": {
                                                                                                "webCommandMetadata": {
                                                                                                    "ignoreNavigation": true
                                                                                                }
                                                                                            },
                                                                                            "userFeedbackEndpoint": {
                                                                                                "additionalDatas": [
                                                                                                    {
                                                                                                        "userFeedbackEndpointProductSpecificValueData": {
                                                                                                            "key": "video_id",
                                                                                                            "value": id
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        "userFeedbackEndpointProductSpecificValueData": {
                                                                                                            "key": "lockup",
                                                                                                            "value": "shelf"
                                                                                                        }
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "indexInCollection": 0,
                                "menuOnTapA11yLabel": "More actions",
                                "overlayMetadata": {
                                    "primaryText": {
                                        "content": title,
                                        "styleRuns": [
                                            {
                                                "startIndex": 0,
                                                "fontName": "",
                                                "fontSize": 0,
                                                "fontColor": 4294967295
                                            }
                                        ]
                                    },
                                    "secondaryText": {
                                        "content": views_lable,
                                        "styleRuns": [
                                            {
                                                "startIndex": 0,
                                                "fontName": "",
                                                "fontSize": 0,
                                                "fontColor": 4294967295
                                            }
                                        ]
                                    }
                                },
                                "loggingDirectives": {
                                    "trackingParams": "CK8BEIf2BBgAIhMIqeqAyo7QhQMVz3lMCB2mCA0J",
                                    "visibility": {
                                        "types": "12"
                                    },
                                    "enableDisplayloggerExperiment": true
                                }
                            }
                        };
                    }
                    items.push(tmp_item);
                }
                if (item_path) {
                    eval(trustedScript(item_path + ' = items'));
                    user_data_api.set();
                    return root;
                }
                return {};
            }
            get_shorts_info(video_id) {
                return new Promise((resolve, reject) => {
                    let basic_url, author_id_reg, author_name_reg, upload_date_reg, ago_reg;
                    if (page_type.startsWith('mobile')) {
                        basic_url = 'https://m.youtube.com/shorts/';
                        author_id_reg = /"channelId":"(.*?)"/;
                        author_name_reg = /"ownerChannelName":"(.*?)"/;
                        // upload_date_reg = /"uploadDate":"(.*?)"/;
                        ago_reg = /timestampText.*?:\\x22(.*?)\\x22\\x7d/;

                    } else {
                        basic_url = 'https://www.youtube.com/shorts/';
                        author_id_reg = /"browseId":"([a-zA-Z0-9\-_]+)","canonicalBaseUrl"/;
                        author_name_reg = /"channel":\{"simpleText":"(.*?)"/;
                        // upload_date_reg = /"uploadDate":"(.*?)"/;
                        ago_reg = /"timestampText":{"simpleText":"(.*?)"}/;
                    }
                    const url = basic_url + video_id;
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.setRequestHeader('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7');
                    let author_id = '';
                    let author_name = '';
                    // let upload_date_str = '';
                    let ago_str = '';
                    // let upload_date;
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            let match;
                            const result = xhr.responseText;
                            match = result.match(author_id_reg);
                            if (match && match.length > 1) author_id = match[1];
                            match = result.match(author_name_reg);
                            if (match && match.length > 1) author_name = match[1];
                            match = result.match(ago_reg);
                            if (match && match.length > 1) ago_str = match[1];
                            resolve({
                                id: video_id,
                                author_id: author_id,
                                author_name: author_name,
                                ago_str: ago_str
                            });
                        } else {
                            reject(xhr.responseText);
                        }
                    };
                    xhr.onerror = function () {
                        reject(new Error('XHR request failed'));
                    };
                    xhr.send();
                });
            }
            parse_shorts_list() {
                if (!this.shorts_list.length) return;
                const { id, title, views_lable, thumbnail_url } = this.shorts_list.pop();
                this.get_shorts_info(id).then((author_info) => {
                    const { author_id, author_name, ago_str } = author_info;
                    if (author_id && user_data.channel_infos.ids.includes(author_id)) {
                        if (user_data.shorts_list.some((value) => { return value.id === id; })) {
                            log('已存在' + author_name + '的短视频：' + title, 'shorts');
                        } else {
                            log('不过滤' + author_name + '的短视频：' + title, 'shorts');
                            const shorts_info = {
                                id: id,
                                title: title,
                                author_id: author_id,
                                author_name: author_name,
                                views_lable: views_lable,
                                from: page_type,
                                thumbnail_url: thumbnail_url,
                                ago_str: ago_str,
                            };
                            user_data.shorts_list.push(shorts_info);
                            user_data_api.set();
                        }
                    } else {
                        log('过滤' + author_name + '的短视频：' + title, 'shorts');
                    }
                }
                ).finally(() => {
                    if (this.shorts_list.length > 0)
                        setTimeout(() => { this.parse_shorts_list(); }, shorts_parse_delay);
                    else
                        this.parsing = false;
                });
            }
            check_shorts_exist() {
                const short_id = href.split('/').pop();
                for (let i = 0; i < user_data.shorts_list.length; i++) {
                    if (user_data.shorts_list[i].id === short_id) {
                        user_data.shorts_list.splice(i, 1);
                        user_data_api.set();
                        return;
                    }
                }
            }
            get_interval_tag(upload_date_str) {
                if (!upload_date_str) return '';
                const uploadDate = new Date(upload_date_str);
                const currentDate = new Date();
                const timeDifference = Math.abs(currentDate - uploadDate); // Difference in milliseconds
                const secondsDifference = timeDifference / 1000;
                const minutesDifference = secondsDifference / 60;
                const hoursDifference = minutesDifference / 60;
                const daysDifference = hoursDifference / 24;
                const weeksDifference = daysDifference / 7;
                const monthsDifference = weeksDifference / 4.345; // Average number of weeks in a month
                const yearsDifference = monthsDifference / 12;
                if (secondsDifference < 60) {
                    return `${Math.floor(secondsDifference)} seconds ago`;
                } else if (minutesDifference < 60) {
                    return `${Math.floor(minutesDifference)} minutes ago`;
                } else if (hoursDifference < 24) {
                    return `${Math.floor(hoursDifference)} hours ago`;
                } else if (daysDifference < 7) {
                    return `${Math.floor(daysDifference)} days ago`;
                } else if (weeksDifference < 4.345) {
                    return `${Math.floor(weeksDifference)} weeks ago`;
                } else if (monthsDifference < 12) {
                    return `${Math.floor(monthsDifference)} months ago`;
                } else {
                    return `${Math.floor(yearsDifference)} years ago`;
                }
            }
        };
        return new ShortsFun();
    }

    function get_yt_api() {
        return {
            get_subscribe_data: function (retry = 0) {
                const headers = {
                    "authority": "www.youtube.com",
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                };
                const url = "https://www.youtube.com/feed/channels";
                const requestConfig = {
                    method: 'GET',
                    headers: headers,
                    url: url
                };
                const save_this = this;
                GM_xmlhttpRequest({
                    ...requestConfig,
                    onload: function (response) {
                        const tmp_channel_names = [];
                        const tmp_channel_ids = [];
                        const regex = /var ytInitialData \= (.*?);\<\/script\>/;
                        try {
                            const match = response.responseText.match(regex);
                            const ytInitialData_obj = JSON.parse(match[1]);
                            const items = ytInitialData_obj.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items;
                            for (let item of items) {
                                const channel_name = item.channelRenderer.title.simpleText;
                                const match_channel_id = item.channelRenderer.channelId;
                                tmp_channel_ids.push(match_channel_id);
                                tmp_channel_names.push(channel_name);
                            }
                            if (tmp_channel_ids.length > 0) {
                                user_data.channel_infos.ids = tmp_channel_ids;
                                user_data.channel_infos.names = tmp_channel_names;
                                user_data_api.set();
                            }
                            log('获取关注列表成功' + user_data.channel_infos.ids.length + '个', 0);
                        } catch (error) {
                            if (retry < 3) {
                                setTimeout(() => { save_this.get_subscribe_data(retry + 1); }, 1000);
                            }
                            log('获取关注列表失败\n', error, -1);
                        }
                    },
                    onerror: function (error) {
                        if (retry < 3) {
                            setTimeout(() => { save_this.get_subscribe_data(retry + 1); }, 1000);
                        }
                        log('获取关注列表失败\n', error, -1);
                    },
                });
            },
            get_authorization: function () {
                function Vja() {
                    function a() {
                        e[0] = 1732584193;
                        e[1] = 4023233417;
                        e[2] = 2562383102;
                        e[3] = 271733878;
                        e[4] = 3285377520;
                        u = q = 0;
                    }
                    function b(x) {
                        for (var y = l, C = 0; 64 > C; C += 4)
                            y[C / 4] = x[C] << 24 | x[C + 1] << 16 | x[C + 2] << 8 | x[C + 3];
                        for (C = 16; 80 > C; C++)
                            x = y[C - 3] ^ y[C - 8] ^ y[C - 14] ^ y[C - 16],
                                y[C] = (x << 1 | x >>> 31) & 4294967295;
                        x = e[0];
                        var E = e[1]
                            , H = e[2]
                            , R = e[3]
                            , T = e[4];
                        for (C = 0; 80 > C; C++) {
                            if (40 > C) {
                                if (20 > C) {
                                    var X = R ^ E & (H ^ R);
                                    var la = 1518500249;
                                } else
                                    X = E ^ H ^ R,
                                        la = 1859775393;
                            } else
                                60 > C ? (X = E & H | R & (E | H),
                                    la = 2400959708) : (X = E ^ H ^ R,
                                        la = 3395469782);
                            X = ((x << 5 | x >>> 27) & 4294967295) + X + T + la + y[C] & 4294967295;
                            T = R;
                            R = H;
                            H = (E << 30 | E >>> 2) & 4294967295;
                            E = x;
                            x = X;
                        }
                        e[0] = e[0] + x & 4294967295;
                        e[1] = e[1] + E & 4294967295;
                        e[2] = e[2] + H & 4294967295;
                        e[3] = e[3] + R & 4294967295;
                        e[4] = e[4] + T & 4294967295;
                    }
                    function c(x, y) {
                        if ("string" === typeof x) {
                            x = unescape(encodeURIComponent(x));
                            for (var C = [], E = 0, H = x.length; E < H; ++E)
                                C.push(x.charCodeAt(E));
                            x = C;
                        }
                        y || (y = x.length);
                        C = 0;
                        if (0 == q)
                            for (; C + 64 < y;)
                                b(x.slice(C, C + 64)),
                                    C += 64,
                                    u += 64;
                        for (; C < y;)
                            if (h[q++] = x[C++],
                                u++,
                                64 == q)
                                for (q = 0,
                                    b(h); C + 64 < y;)
                                    b(x.slice(C, C + 64)),
                                        C += 64,
                                        u += 64;
                    }
                    function d() {
                        var x = []
                            , y = 8 * u;
                        56 > q ? c(m, 56 - q) : c(m, 64 - (q - 56));
                        for (var C = 63; 56 <= C; C--)
                            h[C] = y & 255,
                                y >>>= 8;
                        b(h);
                        for (C = y = 0; 5 > C; C++)
                            for (var E = 24; 0 <= E; E -= 8)
                                x[y++] = e[C] >> E & 255;
                        return x;
                    }
                    for (var e = [], h = [], l = [], m = [128], p = 1; 64 > p; ++p)
                        m[p] = 0;
                    var q, u;
                    a();
                    return {
                        reset: a,
                        update: c,
                        digest: d,
                        digestString: function () {
                            for (var x = d(), y = "", C = 0; C < x.length; C++)
                                y += "0123456789ABCDEF".charAt(Math.floor(x[C] / 16)) + "0123456789ABCDEF".charAt(x[C] % 16);
                            return y;
                        }
                    };
                }
                const sapisid_cookie = getCookie('SAPISID') || getCookie('APISID') || getCookie('__Secure-3PAPISID');
                if (sapisid_cookie) {
                    const timestamp = Math.floor(Date.now() / 1000);
                    const b = Vja();
                    b.update(timestamp + ' ' + sapisid_cookie + ' https://www.youtube.com');
                    const hash_value = b.digestString().toLowerCase();
                    return 'SAPISIDHASH ' + timestamp + '_' + hash_value;
                }
                return '';
            },
            get_channel_id: function (retry = 0) {
                const authorization = this.get_authorization();
                if (!authorization) {
                    log('获取authorization失败', 0);
                    return;
                }
                const url = "https://www.youtube.com/youtubei/v1/account/account_menu";
                const params = {
                    "prettyPrint": "false"
                };
                const data = {
                    "context": {
                        "client": {
                            "clientName": "WEB",
                            "clientVersion": "2.20240308.00.00",
                        },
                    },
                };
                const jsonData = JSON.stringify(data);
                const headers = {
                    "authorization": authorization,
                    "content-type": "application/json",
                    "origin": "https://www.youtube.com",
                    "referer": "https0://www.youtube.com/",
                };
                const requestConfig = {
                    method: 'POST',
                    headers: headers,
                    data: jsonData,
                    url: url + "?" + new URLSearchParams(params),
                };

                GM_xmlhttpRequest({
                    ...requestConfig,
                    onload: function (response) {
                        const match = response.responseText.match(/"browseId"\:"(.*?)"/);
                        if (match && match.length > 1) {
                            const tmp_id = match[1];
                            if (tmp_id && tmp_id != channel_id) {
                                channel_id = tmp_id;
                                user_data = user_data_api.get();
                                GM_setValue('last_channel_id', channel_id);
                            }
                            log('获取channel_id成功' + channel_id, 0);
                        } else {
                            if (retry < 3) {
                                setTimeout(() => { yt_api.get_channel_id(retry + 1); }, 500);
                            } else {
                                log('获取channel_id失败', response, response.responseText, -1);
                            }
                        }
                    },
                    onerror: function (error) {
                        if (retry < 3) {
                            setTimeout(() => { yt_api.get_channel_id(retry + 1); }, 500);
                            yt_api.get_channel_id(retry + 1);
                        } else {
                            log('获取channel_id失败', error, 0);
                        }
                    },
                });
            }
        };
    }

    function get_user_data_api() {
        return {
            get() {
                const default_user_data = {
                    "open_recommend_shorts": 'on',
                    "open_recommend_movie": 'on',
                    "open_recommend_popular": 'on',
                    "open_recommend_liveroom": 'on',
                    "open_recommend_playables": "on",
                    "add_shorts_upload_date": 'on',
                    "shorts_change_author_name": 'on',
                    "short_buy_super_thanks": 'on',
                    "shorts_auto_scroll": 'off',
                    "shorts_add_video_progress": 'off',
                    "shorts_dbclick_like": 'off',
                    "shorts_disable_loop_play": 'off',
                    "dbclick_download_video": 'off',
                    "language": 'zh-CN',
                    "channel_infos": {
                        "ids": [],
                        "names": []
                    },
                    "shorts_list": [],
                    "watch_page_config": {
                        "shop_banner": "on"
                    },
                    "login": false,
                };
                let diff = false;
                user_data_listener.set();
                let tmp_user_data = GM_getValue(channel_id);
                if (!tmp_user_data) {
                    tmp_user_data = default_user_data;
                    diff = true;
                }
                for (let key in default_user_data) {
                    if (!(key in tmp_user_data)) {
                        diff = true;
                        tmp_user_data[key] = default_user_data[key];
                    }
                }
                const tmp_login = channel_id !== 'default';
                if (tmp_user_data.login !== tmp_login) {
                    diff = true;
                    tmp_user_data.login = tmp_login;
                }
                (diff || this.update(tmp_user_data)) && GM_setValue(channel_id, tmp_user_data);
                return tmp_user_data;
            },
            set() {
                return GM_setValue(channel_id, user_data);
            },
            reset() {
                if (!confirm(flag_info.del_config_confirm_tips)) return;
                const keys = GM_listValues();
                for (let key of keys) {
                    GM_deleteValue(key);
                }
                unsafeWindow.document.location.reload();
            },
            update(tmp_user_data) {
                let diff = false;
                const last_version = GM_getValue('last_version', -1);
                if (last_version === -1 && !tmp_user_data.open_recommend_shorts) {
                    tmp_user_data.open_recommend_shorts = GM_getValue("open_recommend_shorts", "on");
                    tmp_user_data.open_recommend_movie = GM_getValue("open_recommend_movie", "on");
                    tmp_user_data.open_recommend_popular = GM_getValue("open_recommend_popular", "on");
                    tmp_user_data.open_recommend_liveroom = GM_getValue("open_recommend_liveroom", "on");
                    diff = true;
                }
                if (typeof (tmp_user_data.open_recommend_shorts) === 'boolean') {
                    tmp_user_data.open_recommend_shorts = tmp_user_data.open_recommend_shorts ? 'on' : 'off';
                    tmp_user_data.open_recommend_movie = tmp_user_data.open_recommend_movie ? 'on' : 'off';
                    tmp_user_data.open_recommend_popular = tmp_user_data.open_recommend_popular ? 'on' : 'off';
                    tmp_user_data.open_recommend_liveroom = tmp_user_data.open_recommend_liveroom ? 'on' : 'off';
                    diff = true;
                }
                last_version !== GM_info.script.version && GM_setValue("last_version", GM_info.script.version);
                return diff;
            }
        };
    }

    function get_data_process() {
        class DATA_PROCESS {
            constructor() {
                this.limit_eval = false;
                this.obj_filter;
                this.obj_storage = {};
            }
            condition_split_and_tag = '&&';
            condition_split_or_tag = '||';
            value_split_and_tag = '&';
            value_split_or_tag = '|';

            storage_obj(key, obj) {
                this.obj_storage[key] = obj;
            }

            set_obj_filter(obj_filter) {
                if (typeof obj_filter !== 'function') return;
                this.obj_filter = function () {
                    try {
                        obj_filter.apply(this, arguments);
                    } catch (error) {
                        log('obj_filter error', error, -1);
                        return false;
                    }
                };
            };

            text_process(data, values, mode, traverse_all) {
                if (!values) return data;
                const origin_data = data;
                try {
                    mode = mode || 'cover';
                    if (mode === 'reg') {
                        for (let value of values) {
                            const patten_express = value.split(SPLIT_TAG)[0];
                            const replace_value = value.split(SPLIT_TAG)[1];
                            const patten = new RegExp(patten_express, "g");
                            data = data.replace(patten, replace_value);
                        }
                    }
                    if (mode === 'cover') {
                        data = values[0];
                    }
                    if (mode === 'insert') {
                        traverse_all = traverse_all || false;
                        let json_data;
                        try {
                            json_data = JSON.parse(data);
                        } catch (error) {
                            log('text_process JSON parse error', -1);
                            return data;
                        }
                        this.obj_process(json_data, values, traverse_all);
                        data = JSON.stringify(json_data);
                    }
                } catch (error) {
                    log('text_process error', error, -1);
                    data = origin_data;
                }
                return data;
            }

            get_relative_path(basic_path, relative_path) {
                if (relative_path === '/') return basic_path;
                let real_path;
                if (relative_path.startsWith('/.')) {
                    real_path = basic_path + relative_path.slice(1);
                }
                if (relative_path.startsWith('.')) {
                    const reg = /[\.\[]/g;
                    const positions = [];
                    let match;
                    while ((match = reg.exec(basic_path)) !== null) {
                        positions.push(match.index);
                    }
                    if (positions.length === 0) {
                        return basic_path;
                    }
                    const pointer_match = relative_path.match(/^\.+/);
                    const split_index = positions[positions.length - pointer_match[0].length];
                    const relative_attribute = relative_path.slice(pointer_match[0].length);
                    real_path = basic_path.slice(0, split_index) + (relative_attribute ? ((relative_attribute.startsWith('[') ? '' : '.') + relative_attribute) : '');
                }
                return this.convertPathToBracketNotation(real_path);
            }

            value_parse(parse_value, path_info = null, json_obj = null) {
                const formula_match = parse_value.match(/\{.*?\}/g);
                if (formula_match) {
                    for (let express_ of formula_match) {
                        const express = express_.slice(1, -1);
                        if (!express) continue;
                        parse_value = parse_value.replace(express_, this.value_parse(express, path_info, json_obj));
                    }
                }
                const json_math = parse_value.match(/^json\((.*)\)$/);
                if (json_math) return JSON.parse(json_math[1]);
                const obj_match = parse_value.match(/^obj\((.*)\)$/);
                if (obj_match) return this.string_to_value(unsafeWindow, obj_match[1]);
                const storage_obj_match = parse_value.match(/^sobj\((.*)\)$/);
                if (storage_obj_match) return this.string_to_value(this.obj_storage, storage_obj_match[1]);
                const number_match = parse_value.match(/^num\((.*)\)$/);
                if (number_match) return Number(number_match[1]);
                const method_match = parse_value.match(/^method\((.*)\)$/);
                if (method_match) {
                    // eval 限制的时候可以使用num() obj()这些添加数字对象 方法也要放到unsafeWindow里 例：method(b("123",num(23)))
                    // 不限制的时候 不能使用num和obj 方法不需要放到unsafeWindow里 例：method(b("123",23))
                    if (this.limit_eval) {
                        const method_info = method_match[1].match(/(.*?)\((.*)\)$/);
                        const method_name = method_info[1];
                        const method_args_string = method_info[2];
                        const method_args = method_args_string.split(',');
                        const args = [];
                        for (let arg of method_args) {
                            args.push(this.value_parse(arg, path_info, json_obj));
                        }
                        return unsafeWindow[method_name](...args);
                    }
                    return eval(trustedScript(method_match[1]));
                }
                const deal_obj_match = parse_value.match(/^dealObj\((.*)\)$/);
                if (deal_obj_match) {
                    const path_msg = deal_obj_match[1];
                    return this.string_to_value(json_obj.this.get_relative_path(path_info.deal_path, path_msg));
                }
                const path_obj_match = parse_value.match(/^pathObj\((.*)\)$/);
                if (path_obj_match) {
                    const path_msg = path_obj_match[1];
                    return this.string_to_value(json_obj, this.get_relative_path(path_info.path, path_msg));
                }
                const abs_obj_match = parse_value.match(/^absObj\((.*)\)$/);
                if (abs_obj_match) {
                    const abs_path = abs_obj_match[1];
                    return this.string_to_value(json_obj, abs_path);
                }
                const string_match = parse_value.match(/^["'](.*)["']$/);
                if (string_match) return string_match[1];
                if (parse_value === 'undefined') return undefined;
                if (parse_value === 'null') return null;
                return parse_value;
            }

            string_to_value(obj, path) {
                try {
                    if (!this.limit_eval) {
                        return eval(trustedScript(path.replace('json_obj', 'obj')));
                    }
                    let tmp_obj = obj;
                    let matches = path.match(/\[(.*?)\]/g);
                    if (matches) {
                        matches.map((match) => {
                            if (match.includes('["')) {
                                tmp_obj = Reflect.get(tmp_obj, match.replace(/\["|"\]/g, ''));
                            } else {
                                tmp_obj = Reflect.get(tmp_obj, Number(match.replace(/\[|\]/g, '')));
                            }
                        });
                        return tmp_obj;
                    }
                    matches = path.split('.');
                    if (matches) {
                        matches.splice(0, 1);
                        matches.map((match) => {
                            tmp_obj = Reflect.get(tmp_obj, match);
                        });
                        return tmp_obj;
                    }
                } catch (error) {
                    return null;
                }
            }

            get_lastPath_and_key(path) {
                let last_path, last_key;
                let matches = path.match(/\[(.*?)\]/g);
                if (matches && matches.length > 0) {
                    const tmp = matches[matches.length - 1];
                    if (tmp.includes('["')) {
                        last_key = tmp.replace(/\["|"\]/g, '');
                    } else {
                        last_key = Number(tmp.replace(/\[|\]/g, ''));
                    }
                    last_path = path.substring(0, path.lastIndexOf(tmp));
                }
                if (!matches) {
                    matches = path.split('.');
                    if (matches && matches.length > 0) {
                        last_key = matches[matches.length - 1];
                        last_path = path.replace('.' + last_key, '');
                    }
                }
                return [last_path, last_key];
            }

            convertPathToBracketNotation(path) {
                if (!path) return '';
                return path.replace(/\.[\d\w\-\_\$@]+/g, function (match) {
                    return '["' + match.slice(1) + '"]';
                });
            }

            paths_sort(paths_arr, key_name = null, reverse = false) {
                // 路径格式是json_obj["onResponseReceivedActions"][0]["appendContinuationItemsAction"]
                // 支持数组元素是对象，根据里面的某个属性排序
                // 支持数组元素是字符串，根据字符串排序
                if (!Array.isArray(paths_arr)) {
                    throw new Error('paths_arr must be an array');
                }
                if (paths_arr.length === 0) return;
                let tmp_paths_arr = paths_arr;
                if (!key_name) {
                    key_name = 'path';
                    if (typeof paths_arr[0] !== 'string') throw new Error('paths_arr must be a string array');
                    tmp_paths_arr = [];
                    paths_arr.forEach(path => {
                        tmp_paths_arr.push({
                            path: path
                        });
                    });
                }
                const reverse_factor = reverse ? -1 : 1;
                tmp_paths_arr.sort((a, b) => {
                    function get_sort_key(obj) {
                        if (!obj.sort_keys) {
                            const reg = /\["?(.*?)"?\]/g;
                            let matches = [];
                            let match;
                            while (match = reg.exec(obj[key_name])) {
                                if (!match[0].startsWith('["')) {
                                    if (isNaN(match[1])) throw new Error('array index must be a number');
                                    match[1] = parseInt(match[1]);
                                }
                                matches.push(match[1]);
                            }
                            obj.sort_keys = matches;
                        }
                    }
                    if (a[key_name] === b[key_name]) return 0;
                    get_sort_key(a);
                    get_sort_key(b);
                    const a_sort_keys = a.sort_keys;
                    const b_sort_keys = b.sort_keys;
                    if (a_sort_keys.length !== b_sort_keys.length) {
                        return (b_sort_keys.length - a_sort_keys.length) * reverse_factor;
                    }
                    for (let i = 0; i < a_sort_keys.length; i++) {
                        if (a_sort_keys[i] !== b_sort_keys[i]) {
                            return (b_sort_keys[i] > a_sort_keys[i] ? 1 : -1) * reverse_factor;
                        }
                    }
                    return 0;
                });
                if (paths_arr !== tmp_paths_arr) {
                    paths_arr.length = 0;
                    tmp_paths_arr.forEach(path_info => {
                        paths_arr.push(path_info.path);
                    });
                }
            }

            obj_process(json_obj, express_list, traverse_all = false) {
                if (typeof json_obj !== 'object') {
                    log('obj_process不是对象', express_list, -1);
                    return;
                }
                if (typeof express_list === 'function') {
                    try {
                        express_list = express_list(json_obj);
                        if (!express_list || Array.isArray(express_list) && express_list.length === 0) return;
                    } catch (error) {
                        log('obj_process express_list函数执行错误', error, -1);
                        return;
                    }
                }
                const data_this = this;
                const abs_path_info_list = [];
                const relative_path_info_list = [];
                const relative_path_list = [];
                const relative_short_path_list = [];
                if (!json_obj || !express_list) return;
                const is_array_obj = Array.isArray(json_obj);
                try {
                    express_list.forEach(express => {
                        if (!express) return;
                        let reg;
                        const express_type = typeof (express);
                        let matches;
                        let conditions;
                        reg = /^(abs:)?(.*?)(=\-|~=|=\+|=)(\(?([^ ][\s\S]*?)\)?)?( ([\s\S]*))?$/;
                        if (express_type === 'string') {
                            matches = express.match(reg);
                        } else {
                            matches = express.value.match(reg);
                            conditions = express.conditions;
                        }
                        const abs = matches[1];
                        let path = matches[2];
                        const operator = matches[3];
                        let value = matches[4];
                        const condition = matches[7];
                        const path_extral_match = path.match(/\/\..*$|\.+$|\.\(.*$/);
                        let path_extral;
                        if (path_extral_match) {
                            path_extral = path_extral_match[0];
                            path = path.replace(path_extral, '');
                        }
                        let value_mode;
                        if (express_type === 'string') {
                            const mode_match = value?.match(/^\((.*)\)$/);
                            if (mode_match) {
                                // =('arr_insert',value,0)
                                const mode_info = mode_match[1].split(',');
                                value = mode_info[1];
                                const mode = mode_info[0];
                                mode_info.shift();
                                mode_info.shift();
                                value_mode = {
                                    'mode': mode,
                                    'params': mode_info
                                };
                            }
                            if (condition) {
                                // (fffddf|||ffff)&&&(ffff)
                                const tmp_conditions = condition ? condition.split(this.condition_split_and_tag) : [];
                                conditions = {};
                                for (let index = 0; index < tmp_conditions.length; index++) {
                                    conditions['value' + index] = tmp_conditions[index].split(this.condition_split_or_tag);
                                }
                            }
                        }
                        matches = path.match(/\[([\*\d\-,]*)\]$/);
                        let array_index;
                        if (matches) {
                            path = path.replace(/\[([\*\d\-,]*)\]$/, '');
                            array_index = matches[1];
                        }
                        if (abs) {
                            add_data_to_abs_path({
                                "path": `json_obj${is_array_obj ? '' : '.'}` + path,
                                "express": express,
                                "relative_path": path,
                                "operator": operator,
                                "value": value,
                                "condition": conditions,
                                "array_index": array_index,
                                "path_extral": path_extral,
                                "value_mode": value_mode
                            });
                        } else {
                            relative_path_list.push(path);
                            const tmp_short_path = path.split('.').pop();
                            relative_short_path_list.push(tmp_short_path);
                            relative_path_info_list.push({
                                "express": express,
                                "path": path,
                                "operator": operator,
                                "value": value,
                                "value_mode": value_mode,
                                "conditions": conditions,
                                "array_index": array_index,
                                "path_extral": path_extral
                            });
                        }
                    });
                    if (relative_path_list.length > 0) {
                        const dec_list = [];
                        const dec_index_list = [];
                        obj_property_traverse(json_obj, '', {
                            "short_keys": relative_short_path_list,
                            "real_keys": relative_path_list
                        }, dec_list, dec_index_list, traverse_all);
                        for (let i = 0; i < dec_index_list.length; i++) {
                            const real_index = dec_index_list[i];
                            const real_path_info = relative_path_info_list[real_index];
                            const tmp_path = 'json_obj' + dec_list[i];
                            add_data_to_abs_path({
                                "path": tmp_path,
                                "express": real_path_info.express,
                                "relative_path": real_path_info.path,
                                "operator": real_path_info.operator,
                                "value": real_path_info.value,
                                "condition": real_path_info.conditions,
                                "array_index": real_path_info.array_index,
                                "path_extral": real_path_info.path_extral,
                                "value_mode": real_path_info.value_mode
                            });
                        }
                    }
                    try {
                        this.paths_sort(abs_path_info_list, 'deal_path');
                    } catch (error) {
                        abs_path_info_list.sort((a, b) => a < b ? 1 : -1);
                    }
                    for (let path_info of abs_path_info_list) {
                        if (!this.obj_conditional(path_info, json_obj)) continue;
                        if (this.obj_filter && this.obj_filter(path_info, json_obj)) continue;
                        obj_modify(json_obj, path_info);
                    }
                } catch (error) {
                    log('obj_process处理失败', error, -1);
                }

                function add_data_to_abs_path(params) {
                    let { path, express, relative_path, operator, value, condition, array_index, path_extral, value_mode } = params;
                    let tmp;
                    path = data_this.convertPathToBracketNotation(path);
                    if (array_index === undefined) {
                        tmp = {};
                        path = path;
                        tmp.path = path;
                        tmp.relative_path = relative_path;
                        tmp.operator = operator;
                        tmp.value = value;
                        tmp.value_mode = value_mode;
                        tmp.condition = condition;
                        tmp.path_extral = path_extral;
                        tmp.express = express;
                        add_path(tmp);
                        return;
                    }
                    let array_index_list = [];
                    if (array_index === '*') {
                        let array_length;
                        try {
                            array_length = data_this.string_to_value(json_obj, path)?.length || 0;
                            if (!array_length) return;
                        } catch (error) {
                            log('obj_process获取数组长度失败--->' + path, error, -1);
                            return;
                        }
                        array_index_list = Array.from({ length: array_length }, (_, i) => i);
                    } else if (array_index.includes(',')) {
                        let is_error = false;
                        array_index_list = array_index.split(',').map(item => {
                            if (is_error) return;
                            if (isNaN(item)) {
                                is_error = true;
                                return;
                            }
                            return Number(item);
                        });
                        if (is_error) {
                            return log('obj_process数组索引格式错误--->' + path, -1);
                        }
                    } else if (array_index.includes('-')) {
                        const index_arr = array_index.split('-');
                        if (index_arr.length !== 2) return log('obj_process数组索引格式错误--->' + path, -1);
                        const start = Number(index_arr[0]);
                        const end = Number(index_arr[1]);
                        if (isNaN(start) || isNaN(end)) {
                            return log('obj_process数组索引格式错误--->' + path, -1);
                        }
                        array_index_list = Array.from({ length: end - start + 1 }, (_, i) => start + i);
                    } else if (!isNaN(array_index)) {
                        array_index_list = [array_index];
                    } else {
                        return log('obj_process数组索引格式错误--->' + path, -1);
                    }
                    for (let tmp_index = array_index_list.length - 1; tmp_index >= 0; tmp_index--) {
                        tmp = {};
                        tmp.path = path + "[" + array_index_list[tmp_index] + "]";
                        tmp.operator = operator;
                        tmp.value = value;
                        tmp.value_mode = value_mode;
                        tmp.condition = condition;
                        tmp.path_extral = path_extral;
                        tmp.relative_path = relative_path;
                        tmp.express = express;
                        add_path(tmp);
                    }
                    function add_path(path_info) {
                        path_info.deal_path = path_extral ? data_this.get_relative_path(path, path_extral) : path_info.path;
                        abs_path_info_list.push(path_info);
                    }
                }

                function obj_property_traverse(obj, cur_path, dec_infos, dec_list, dec_index_list, traverse_all = false) {
                    if (Array.isArray(obj)) {
                        obj.forEach((tmp_obj, index) => {
                            const tmp_path = cur_path + '[' + index + ']';
                            if (!tmp_obj || typeof (tmp_obj) !== 'object') return;
                            obj_property_traverse(tmp_obj, tmp_path, dec_infos, dec_list, dec_index_list, traverse_all);
                        });
                        return;
                    }
                    Object.keys(obj).forEach((key) => {
                        const tmp_path = cur_path + '.' + key;
                        let deal = false;
                        for (let i = 0; i < dec_infos["short_keys"].length; i++) {
                            if (dec_infos["short_keys"][i] === key) {
                                const len = dec_infos["real_keys"][i].length;
                                if (tmp_path.slice(tmp_path.length - len) === dec_infos["real_keys"][i]) {
                                    dec_list.push(tmp_path);
                                    dec_index_list.push(i);
                                    if (!deal && traverse_all && typeof (obj[key]) === 'object') {
                                        obj_property_traverse(obj[key], tmp_path, dec_infos, dec_list, dec_index_list, traverse_all);
                                    }
                                    deal = true;
                                }
                            }
                        }
                        const value = obj[key];
                        if (deal || !value || typeof (value) !== 'object') return;
                        obj_property_traverse(value, tmp_path, dec_infos, dec_list, dec_index_list, traverse_all);
                    });
                }

                function obj_modify(json_obj, path_info) {
                    const path = path_info['deal_path'];
                    const operator = path_info['operator'];
                    let value = path_info['value'];
                    const [last_path, last_key] = data_this.get_lastPath_and_key(path);
                    const last_obj = data_this.string_to_value(json_obj, last_path);
                    if (!last_obj) {
                        debugger;
                        return log('obj_modify处理失败，找不到对象--->' + path_info, -1);
                    }
                    if (operator === '=-') {
                        const is_array = typeof last_key === 'number';
                        if (is_array)
                            last_obj.splice(last_key, 1);
                        else
                            delete last_obj[last_key];
                        log('依据：' + path_info.express, 'obj_process');
                        log('删除属性-->' + path, 'obj_process');
                        return;
                    }
                    if (operator === '=') {
                        value = data_this.value_parse(value, path_info, json_obj);
                        last_obj[last_key] = value;
                        log('依据：' + path_info.express, 'obj_process');
                        log('修改属性-->' + path, 'obj_process');
                    }
                    const dec_obj = last_obj[last_key];
                    if (!dec_obj) {
                        return log('obj_modify处理失败，找不到对象--->' + path_info, -1);
                    }
                    if (operator === '=+') {
                        value = data_this.value_parse(value, path_info, json_obj);
                        if (dec_obj === null || dec_obj === undefined) throw new Error('dec_obj is null');
                        let type_ = typeof dec_obj;
                        if (Array.isArray(dec_obj)) type_ = 'array';
                        if (type_ === 'array') {
                            const mode_info = path_info.value_mode;
                            if (mode_info) {
                                try {
                                    mode_info.mode === 'arr_insert' && last_obj[last_key].splice(Number(mode_info.params[0]), 0, value);
                                } catch (error) {
                                    log(error, -1);
                                }
                            } else {
                                last_obj[last_key].push(value);
                            }
                        }
                        if (type_ === 'string' || type_ === 'number') last_obj[last_key] = last_obj[last_key] + value;
                        log('依据：' + path_info.express, 'obj_process');
                        log('修改属性-->' + path, 'obj_process');
                    }
                    if (operator === '~=') {
                        const search_value = value.split(SPLIT_TAG)[0];
                        const replace_value = value.split(SPLIT_TAG)[1];
                        last_obj[last_key] = dec_obj.replace(new RegExp(search_value, 'g'), replace_value);
                        log('依据：' + path_info.express, 'obj_process');
                        log('修改属性-->' + path, 'obj_process');
                    }
                }
            }

            path_process(json_obj, path) {
                if (path.includes('[-')) {
                    const match = path.match(/\[(-\d+)\]/);
                    const index = parseInt(match[1]);
                    const dec_obj_path = path.slice(0, match.index);
                    const array_length = this.string_to_value(json_obj, dec_obj_path + '["length"]');
                    if (!array_length) return path;
                    const real_index = array_length + index;
                    path = path.replace(`[${index}`, `[${real_index}`);
                    return this.path_process(json_obj, path);
                }
                return path;
            }

            value_conditional(value, condition_express) {
                const reg = /(\$text|\$value|\$exist|\$notexist)?((>=|<=|>|<|!~=|!=|~=|=))?(.*)/;
                const match = condition_express.match(reg);
                const condition_type = match[1] || '$text';
                const condition_operator = match[2];
                const condition_test_value = match[4];
                const operator_reg = /(>=|<=|>|<|!~=|!=|~=|=)?(.*)$/;
                if (condition_type === '$value') {
                    // $value=1|2 或 $value>=1&2
                    if (!['>=', '<=', '>', '<', '='].includes(condition_operator)) return false;
                    const split_tag = condition_test_value.includes(this.value_split_or_tag) && this.value_split_or_tag || this.value_split_and_tag;
                    const condition_test_value_arr = condition_test_value.split(split_tag);
                    let result;
                    for (let test_value of condition_test_value_arr) {
                        const operator_match = test_value.match(operator_reg);
                        const operator = operator_match && operator_match[1] || condition_operator;
                        test_value = operator_match && operator_match[2];
                        if (isNaN(test_value)) {
                            if (split_tag === this.value_split_and_tag) return false; else continue;
                        };
                        test_value = parseInt(test_value);
                        if (operator === '=') result = test_value === value;
                        if (operator === '>=') result = value >= test_value;
                        if (operator === '<=') result = value <= test_value;
                        if (operator === '>') result = value > test_value;
                        if (operator === '<') result = value < test_value;
                        if (!result) {
                            if (split_tag === this.value_split_and_tag) return false; else continue;
                        };
                        return true;
                    }
                }
                if (condition_type === '$exist') {
                    return value !== undefined && value !== null;
                }
                if (condition_type === '$notexist') {
                    return value === undefined || value === null;
                }
                if (condition_type === '$text') {
                    let split_tag;
                    let condition_test_value_arr;
                    if (['!~=', '~='].includes(condition_operator)) {
                        split_tag = this.value_split_and_tag;
                        condition_test_value_arr = [condition_test_value];
                    } else {
                        split_tag = condition_test_value.includes(this.value_split_or_tag) && this.value_split_or_tag || this.value_split_and_tag;
                        condition_test_value_arr = condition_test_value.split(split_tag);
                    }
                    let result;
                    if (typeof (value) === 'object') value = JSON.stringify(value);
                    for (let test_value of condition_test_value_arr) {
                        const operator_match = test_value.match(operator_reg);
                        const operator = operator_match && operator_match[1] || condition_operator;
                        test_value = operator_match && operator_match[2] || test_value;
                        if (operator === '!=') result = test_value !== value;
                        if (operator === '=') result = test_value === value;
                        if (operator === '~=') result = new RegExp(test_value).test(value);
                        if (operator === '!~=') result = !new RegExp(test_value).test(value);
                        if (operator === '>=') result = value.length >= test_value.length;
                        if (operator === '>') result = value.length > test_value.length;
                        if (operator === '<=') result = value.length <= test_value.length;
                        if (operator === '>') result = value.length > test_value.length;
                        if (!result) {
                            if (split_tag === this.value_split_and_tag) return false; else continue;
                        };
                        return true;
                    }
                }
                return false;
            }

            obj_conditional(express_info, json_obj) {
                //json_obj 在eval里直接调用
                if (!express_info['condition']) return true;
                const condition_infos = express_info['condition'];
                // 与 
                for (let condition_list of Object.values(condition_infos)) {
                    let result = false;
                    for (let condition of condition_list) {
                        const reg = /^([a-zA-Z_0-9\/\-\.@\[\]]*)?(.*)/;
                        const match = condition.match(reg);
                        let condition_path = match[1];
                        let mod;
                        if (condition_path) {
                            if (condition_path.startsWith('/')) {
                                mod = 'child';
                            } else if (condition_path.startsWith('.')) {
                                mod = 'parent';
                            } else if (condition_path.startsWith('@')) {
                                mod = 'global';
                            } else {
                                mod = 'other';
                            }
                        } else {
                            condition_path = express_info.path;
                        }
                        const conditional_express = match[2];
                        if (['child', 'parent'].includes(mod)) {
                            // child   /.a.b.c path相对路径
                            // parent  ..a.b.c path相对路径
                            condition_path = this.get_relative_path(express_info.path, condition_path);
                        }
                        if (mod === 'other') {
                            // json_obj里的绝对路径
                            condition_path = this.get_relative_path('json_obj', '/.' + condition_path);
                        }
                        if (mod === 'global') {
                            // 提取全局里的数据
                            condition_path = condition_path.replace('@', this.limit_eval ? 'unsafeWindow.' : '');
                        }
                        let condition_value;
                        try {
                            condition_path = this.path_process(json_obj, condition_path);
                            condition_value = this.string_to_value(mod === 'global' ? unsafeWindow : json_obj, condition_path);
                        } catch (error) {
                            continue;
                        }
                        result = this.value_conditional(condition_value, conditional_express);
                        if (result) {
                            express_info.condition_value = condition_value;
                            express_info.conform_value_path = condition_path;
                            log('条件成立-->', condition, typeof condition_value === 'object' ? '[object Object]' : condition_value, 'obj_process');
                            break;
                        }
                    }
                    if (!result) return false;
                }
                return true;
            }
        }
        return new DATA_PROCESS();
    }
})();

// 脚本2: 555329 网速转换器
   (function() {
    'use strict';

    // --- 配置项 ---
    const CONVERTED_VALUE_ID = 'yt-speed-converter-mbps-display';
    const CONVERTED_VALUE_COLOR = '#42a5f5'; // Material Design Blue

    /**
     * 将 Kbps 字符串转换为 MB/s 字符串
     */
    function convertKbpsToMBps(kbpsString) {
        const kbps = parseInt(kbpsString, 10);
        if (isNaN(kbps)) return null;
        const mbps = kbps / 8 / 1024;
        return mbps.toFixed(2);
    }

    /**
     * 核心函数：根据原始网速节点，更新我们添加的 MB/s 显示
     * @param {HTMLElement} speedValueSpan - 显示原始 "XXXX Kbps" 的那个 span 元素
     */
    function updateSpeedDisplay(speedValueSpan) {
        if (!speedValueSpan) return;

        // 读取原始文本并进行转换
        const originalText = speedValueSpan.textContent;
        const mbpsValue = convertKbpsToMBps(originalText);
        if (mbpsValue === null) return;

        // 查找或创建用于显示 MB/s 的元素
        let displayEl = document.getElementById(CONVERTED_VALUE_ID);

        if (!displayEl) {
            displayEl = document.createElement('span');
            displayEl.id = CONVERTED_VALUE_ID;
            displayEl.style.marginLeft = '8px';
            displayEl.style.color = CONVERTED_VALUE_COLOR;
            displayEl.style.fontWeight = 'bold';
            // 将其附加到整个 "Connection Speed" 行的末尾
            // speedValueSpan -> parent <span> -> parent <div> (the row)
            if (speedValueSpan.parentElement && speedValueSpan.parentElement.parentElement) {
                 speedValueSpan.parentElement.parentElement.appendChild(displayEl);
            }
        }

        // 更新我们创建的元素的内容
        displayEl.textContent = `(${mbpsValue} MB/s)`;
    }

    /**
     * 当 "详细统计信息" 面板出现时，设置精准的观察者
     * @param {HTMLElement} panelNode - "详细统计信息" 的主面板元素
     */
    function setupSpeedObserver(panelNode) {
        // 1. 精准定位到显示原始网速的那个 <span>
        const labelDivXpath = ".//div[text()='Connection Speed']";
        const labelDiv = document.evaluate(labelDivXpath, panelNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (!labelDiv || !labelDiv.nextElementSibling) return;

        const speedValueSpan = labelDiv.nextElementSibling.querySelector('span:nth-child(2)');

        if (speedValueSpan) {
            // 2. 立即执行一次，显示初始值
            updateSpeedDisplay(speedValueSpan);

            // 3. 创建一个只观察这个特定 <span> 文本变化的观察者
            const speedObserver = new MutationObserver(() => {
                // 当 YouTube 更新网速时，再次调用我们的更新函数
                updateSpeedDisplay(speedValueSpan);
            });

            // 4. 启动观察者，只监视目标节点的文本内容和子节点变化
            speedObserver.observe(speedValueSpan, {
                characterData: true, // 监视文本节点的变化
                childList: true      // 监视子节点（以防万一 YouTube 替换了整个文本节点）
            });

            // 5. 将观察者实例附加到面板节点上，以便在面板关闭时可以断开它
            panelNode.speedObserver = speedObserver;
        }
    }


    /**
     * 设置一个主观察者，用于监视"详细统计信息"面板的出现和消失
     */
    function setupMainObserver() {
        const targetNode = document.getElementById('movie_player');
        if (!targetNode) {
            setTimeout(setupMainObserver, 500);
            return;
        }

        const mainObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                // 监视节点添加
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.classList.contains('html5-video-info-panel')) {
                            // 面板出现了！调用我们的函数来设置精准的内部观察者
                            setupSpeedObserver(node);
                        }
                    });
                }
                // 监视节点移除
                if (mutation.removedNodes.length > 0) {
                     mutation.removedNodes.forEach(node => {
                         if (node.nodeType === 1 && node.classList.contains('html5-video-info-panel')) {
                             // 如果面板被移除，并且我们之前附加了观察者，就断开它，防止内存泄漏
                             if (node.speedObserver) {
                                 node.speedObserver.disconnect();
                             }
                             // 同时移除我们创建的显示元素，以防下次打开时残留
                             const displayEl = document.getElementById(CONVERTED_VALUE_ID);
                             if(displayEl) displayEl.remove();
                         }
                     });
                }
            }
        });

        mainObserver.observe(targetNode, { childList: true });
    }

    // 启动脚本
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupMainObserver);
    } else {
        setupMainObserver();
    }

})();

// 脚本3: 504796 双语字幕
(function () {
    'use strict';

    // 设置
    const DEFAULT_LANG = 'zh';
    let TARGET_LANG = DEFAULT_LANG;
    const DEFAULT_TRANS_SERVICE = 'youtube';
    let TRANS_SERVICE = DEFAULT_TRANS_SERVICE;
    let LAST_FAILED_SERVICE = null; // 记录上次失败的服务

    // 获取用户设置
    function getUserSettings() {
        return {
            lang: localStorage.getItem('dualSubTargetLang') || DEFAULT_LANG,
            service: localStorage.getItem('dualSubTransService') || DEFAULT_TRANS_SERVICE
        };
    }

    // 保存用户设置
    function saveUserSettings(lang, service) {
        localStorage.setItem('dualSubTargetLang', lang);
        localStorage.setItem('dualSubTransService', service);
        TARGET_LANG = lang;
        TRANS_SERVICE = service;
    }

    // 添加设置菜单
    function addSettingsMenu() {
        if (typeof GM_registerMenuCommand === 'function') {
            GM_registerMenuCommand('设置翻译语言', async () => {
                const userInput = prompt('请输入目标语言的ISO 639-1代码（例如：zh 中文, en 英文, ja 日语）：', TARGET_LANG);
                if (userInput) {
                    saveUserSettings(userInput.trim(), TRANS_SERVICE);
                    alert(`翻译目标语言已设置为：${userInput.trim()}`);
                }
            });

            GM_registerMenuCommand('选择翻译引擎', async () => {
                const userInput = prompt('请选择翻译引擎（输入数字）：\n1. YouTube 翻译\n2. Google 翻译', TRANS_SERVICE === 'youtube' ? '1' : '2');
                if (userInput) {
                    const service = userInput.trim() === '1' ? 'youtube' : 'google';
                    saveUserSettings(TARGET_LANG, service);
                    LAST_FAILED_SERVICE = null; // 重置失败记录
                    alert(`翻译引擎已设置为：${service === 'youtube' ? 'YouTube 翻译' : 'Google 翻译'}`);
                }
            });
        }
    }

    // 初始化设置
    const settings = getUserSettings();
    TARGET_LANG = settings.lang;
    TRANS_SERVICE = settings.service;
    addSettingsMenu();

    // 谷歌翻译API
    async function googleTranslate(text) {
        try {
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TARGET_LANG}&dt=t&q=${encodeURIComponent(text)}`);
            if (!response.ok) throw new Error('Google API请求失败');
            const data = await response.json();
            return data[0][0][0];
        } catch (error) {
            console.error('Google翻译失败:', error);
            return null; // 返回null表示翻译失败
        }
    }

    async function enableDualSubtitles() {
        // 获取翻译后的字幕数据
        async function fetchTranslatedSubtitles(url, preferredService = TRANS_SERVICE) {
            // 如果上次失败的服务和当前首选服务相同，自动切换到另一个服务
            if (LAST_FAILED_SERVICE === preferredService) {
                preferredService = preferredService === 'youtube' ? 'google' : 'youtube';
                console.log(`上次${LAST_FAILED_SERVICE}翻译失败，自动切换到${preferredService}`);
            }

            async function tryYouTubeTranslation() {
                const cleanUrl = url.replace(/(^|[&?])tlang=[^&]*/g, '') + `&tlang=${TARGET_LANG}&translate_h00ked`;
                try {
                    const response = await fetch(cleanUrl, { method: 'GET' });
                    if (!response.ok) throw new Error('YouTube翻译请求失败');
                    const data = await response.json();
                    // 验证返回的数据是否有效
                    if (!data.events || data.events.length === 0) throw new Error('YouTube返回的字幕数据无效');
                    return data;
                } catch (error) {
                    console.error('YouTube翻译失败:', error);
                    LAST_FAILED_SERVICE = 'youtube';
                    return null;
                }
            }

            async function tryGoogleTranslation() {
                try {
                    const response = await fetch(url, { method: 'GET' });
                    if (!response.ok) throw new Error('获取原字幕失败');
                    const data = await response.json();
                    const translatedData = JSON.parse(JSON.stringify(data));

                    // 批量收集需要翻译的文本
                    const textToTranslate = translatedData.events
                        .filter(event => event.segs)
                        .map(event => ({
                            text: event.segs.map(seg => seg.utf8).join('').trim(),
                            event: event
                        }))
                        .filter(item => item.text);

                    // 批量翻译
                    const results = await Promise.all(
                        textToTranslate.map(async ({ text, event }) => {
                            const translatedText = await googleTranslate(text);
                            if (translatedText === null) throw new Error('Google翻译失败');
                            return { event, translatedText };
                        })
                    );

                    // 更新翻译结果
                    results.forEach(({ event, translatedText }) => {
                        event.segs = [{ utf8: translatedText }];
                    });

                    return translatedData;
                } catch (error) {
                    console.error('谷歌翻译失败:', error);
                    LAST_FAILED_SERVICE = 'google';
                    return null;
                }
            }

            // 尝试首选服务
            let result = null;
            if (preferredService === 'youtube') {
                result = await tryYouTubeTranslation();
                if (!result) {
                    console.log('YouTube翻译失败，尝试使用谷歌翻译');
                    result = await tryGoogleTranslation();
                }
            } else {
                result = await tryGoogleTranslation();
                if (!result) {
                    console.log('谷歌翻译失败，尝试使用YouTube翻译');
                    result = await tryYouTubeTranslation();
                }
            }

            return result;
        }

        // 编辑距离计算
        function levenshteinDistance(s1, s2) {
            if (s1.length === 0) return s2.length;
            if (s2.length === 0) return s1.length;

            const matrix = Array.from({ length: s1.length + 1 }, (_, i) => Array(s2.length + 1).fill(0).map((_, j) => (i === 0 ? j : i)));

            for (let i = 1; i <= s1.length; i++) {
                for (let j = 1; j <= s2.length; j++) {
                    matrix[i][j] = (s1[i - 1] === s2[j - 1])
                        ? matrix[i - 1][j - 1]
                        : Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
                }
            }

            return matrix[s1.length][s2.length];
        }

        // Jaccard相似度计算
        function jaccardSimilarity(str1, str2) {
            const set1 = new Set(str1.split(''));
            const set2 = new Set(str2.split(''));
            const intersection = [...set1].filter(x => set2.has(x)).length;
            const union = new Set([...set1, ...set2]).size;
            return intersection / union;
        }

        // 相似度计算
        function calculateSimilarity(s1, s2) {
            const maxLength = Math.max(s1.length, s2.length);
            const levenshteinSimilarity = 1 - (levenshteinDistance(s1, s2) / maxLength);
            const jaccardSim = jaccardSimilarity(s1, s2);
            return (levenshteinSimilarity * 0.7) + (jaccardSim * 0.3);
        }

        // 合并字幕
        function mergeSubtitles(defaultSubs, translatedSubs) {
            const mergedSubs = JSON.parse(JSON.stringify(defaultSubs));
            const translatedEvents = translatedSubs.events.filter(event => event.segs);
            const translatedMap = new Map(translatedEvents.map(event => [event.tStartMs, event]));

            for (let i = 0; i < mergedSubs.events.length; i++) {
                const defaultEvent = mergedSubs.events[i];
                if (!defaultEvent.segs) continue;

                const translatedEvent = [...translatedMap.keys()].reduce((closest, tStartMs) => {
                    return (Math.abs(tStartMs - defaultEvent.tStartMs) < Math.abs(closest - defaultEvent.tStartMs)) ? tStartMs : closest;
                }, Infinity);

                const eventToMerge = translatedMap.get(translatedEvent);
                if (eventToMerge) {
                    const defaultText = defaultEvent.segs.map(seg => seg.utf8).join('').trim();
                    const translatedText = eventToMerge.segs.map(seg => seg.utf8).join('').trim();

                    const timeOverlap = Math.min(defaultEvent.tStartMs + defaultEvent.dDurationMs, eventToMerge.tStartMs + eventToMerge.dDurationMs) - Math.max(defaultEvent.tStartMs, eventToMerge.tStartMs);
                    
                    if (timeOverlap > 0) {
                        const similarity = calculateSimilarity(defaultText, translatedText);
                        // 使用0.6容错率
                        if (similarity < 0.6) {
                            defaultEvent.segs = [{
                                utf8: `${defaultText}\n${translatedText}`,
                                tStartMs: defaultEvent.tStartMs,
                                dDurationMs: defaultEvent.dDurationMs
                            }];
                        }
                    }
                }
            }

            return JSON.stringify(mergedSubs);
        }

        // ajax-hook代理
        ah.proxy({
            onResponse: async (response, handler) => {
                if (response.config.url.includes('/api/timedtext') && !response.config.url.includes('&translate_h00ked')) {
                    try {
                        const defaultSubs = JSON.parse(response.response);
                        const translatedSubs = await fetchTranslatedSubtitles(response.config.url);
                        if (translatedSubs) {
                            response.response = mergeSubtitles(defaultSubs, translatedSubs);
                        }
                    } catch (error) {
                        console.error("处理字幕时出错:", error);
                    }
                }
                handler.resolve(response);
            }
        });
    }

    enableDualSubtitles();
})();

// 脚本4: 508784 HD Plus
(async function () {
    "use strict";

    if (
        typeof GM === "undefined" ||
        typeof GM.getValue !== "function" ||
        typeof GM.setValue !== "function"
    ) {
        throw new Error(
            "[YouTube HD Plus] requires GM.getValue and GM.setValue support."
        );
    }

    const body = document.body;
    const head = document.head;

    const $host = location.hostname;
    const isMobile = $host.includes("m.youtube");
    const isMusic = $host.includes("music.youtube");
    const isEmbed = isVideoPage("embed");

    let manualOverride = false;
    let settingsClicked = false;

    const listQuality = [144, 240, 360, 480, 720, 1080, 1440, 2160, 4320];

    /**
     * You can change the config here in the script.
     * @namespace
     */
    const options = {
        preferred_quality: undefined, // Value from listQuality.
        preferred_premium: undefined, // true or false.
        show_ui: undefined, // true or false.
        updated_id: "",
    };

    const labels = {
        premium: "Preferred Premium;", // Remove ";" to set your own label.
        quality: "Preferred Quality;", // Remove ";" to set your own label.
    };

    const icons = {
        premium: `{"svg":{"viewBox":"-12 -12 147 119"},"path":{"d":"M1 28 20 1a3 3 0 0 1 3-1h77a3 3 0 0 1 3 1l19 27a3 3 0 0 1 1 2 3 3 0 0 1-1 2L64 94a3 3 0 0 1-4 0L1 32a3 3 0 0 1-1-1 3 3 0 0 1 1-3m44 5 17 51 17-51Zm39 0L68 82l46-49ZM56 82 39 33H9zM28 5l13 20L56 5Zm39 0 15 20L95 5Zm33 2L87 27h28zM77 27 61 7 47 27Zm-41 0L22 7 8 27Z"}}`,
        quality: `{"svg":{"viewBox":"-12 -12 147 131"},"path":{"fill-rule":"evenodd","d":"M89.8 56.3c-.925.267-1.862.484-2.8.7l-2.1-2.5c-1.447-1.791-4.18-1.847-6-.4l-4 3.6c-1.785 1.575-2.014 4.318-.5 6.1l1.8 2.1c-.595.898-1.098 1.848-1.6 2.8l-3.2-.2c-2.373-.142-4.362 1.565-4.5 4L67 80c.529 1.974 2.318 2.752 3.6 2.8l2.7.2c.263 1.056.643 2.074 1 3.1l-2.5 2c-1.624 1.298-1.722 3.357-1.3 4.6.854 2.08 2.104 4.051 3.5 5.9 1.533 1.77 4.28 1.831 6 .4l2-2a13 13 0 0 0 1.2.8l1.4.7.2.1-.2 3.2a4.2 4.2 0 0 0 4 4.5l5.4.4c2.4.178 4.427-1.605 4.5-3.9l.2-2.7c1.144-.244 2.23-.639 3.3-1.1l2 2.4c1.213 1.415 3.22 1.686 4.6 1.2.887-.3 5.542-3.716 6.6-5.7.865-1.642.35-3.582-.6-4.7l-1.8-2.1c.595-.898 1.098-1.848 1.6-2.8l3.2.2a4.115 4.115 0 0 0 4.5-4l.4-5.5c.124-2.228-1.387-4.394-3.9-4.5l-2.7-.2c-.222-1.07-.628-2.077-1-3.1l2.5-2.1c1.427-1.21 2.03-3.55.4-6-1.354-2.214-2.274-4.385-4.8-5.1m-20 7c-8 .683-13.871 7.818-13 15.8 1.374 12.585 17.215 17.308 25.258 7.534S105.614 62.924 93 64m1 7.8a6.4 6.4 0 0 0-5.8 7c.556 5.661 7.668 7.838 11.297 3.458S99.667 71.294 94 71.8M5.2 15.9v-5.1a5.6 5.6 0 0 1 5.6-5.6H24V16Zm23.8 0V5.2h21v10.7ZM93.2 5.2a5.6 5.6 0 0 1 5.7 5.6v5.1h-18V5.2ZM55.3 15.9V5.2h20.4v10.7ZM24 86.9H10.8a5.6 5.6 0 0 1-5.6-5.6v-5.7H24Zm5 0V75.6h21V87Zm17.5-56c-.348-.261-3.94-2.2-4.1 2.1v25.6c0 2.216 2.592 3.376 4.2 2l18.775-13.152c1.017-.88 1.13-1.996.025-3.048M10.8 0C4.835 0 0 4.835 0 10.8v70.5C.055 87.226 4.874 92 10.8 92h49c-.035-1.268.318-2.502.7-3.7L59 86.8h-3.7V75.5h.7c.073-1.752-.311-4.056.946-5.231L5.2 70.3V21h93.6v19.2c2.12.018 3.675.325 4.8.7l.4.1V10.8C104 4.835 99.165 0 93.2 0ZM113 57c-1.605-.52-3.349-.203-4.4.7l-2.1 1.8c-.868-.655-1.814-1.152-2.8-1.6l.2-3.3c.137-2.274-1.431-4.333-4-4.5l-5.4-.4c-2.465-.183-4.416 1.662-4.5 3.9l-.2 2.7"}}`,
        check_mark: `{"svg":{"viewBox":"-32 -32 186.9 153.8"},"path":{"d":"M1.2 55.5a3.7 3.7 0 0 1 5-5.5l34.1 30.9 76.1-79.7a3.8 3.8 0 0 1 5.4 5.1L43.2 88.7a3.7 3.7 0 0 1-5.2.2L1.2 55.5z"}}`,
        arrow: `{"svg":{"class":"transform-icon-svg","viewBox":"0 0 24 24"},"path":{"d":"M8.793 5.293a1 1 0 000 1.414L14.086 12l-5.293 5.293a1 1 0 101.414 1.414L16.914 12l-6.707-6.707a1 1 0 00-1.414 0Z"}}`,
    };

    /**
     * @param {string} name
     * @param {Record<string, string | number | boolean>} [attributes]
     * @param {Node[]} [append]
     * @returns {SVGElement}
     */
    function createNS(name, attributes = {}, append = []) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", name);
        for (const k in attributes) el.setAttributeNS(null, k, attributes[k]);
        return (el.append(...append), el);
    }

    for (const name in icons) {
        const icon = JSON.parse(icons[name]);
        icon.svg = { ...icon.svg, width: "100%", height: "100%" };
        icons[name] = createNS("svg", icon.svg, [createNS("path", icon.path)]);
    }

    /**
     * @param {string} key
     * @param {any} value
     */
    function saveOption(key, value) {
        GM.setValue(key, value);
        if (key in options) options[key] = value;
    }

    for (const key in labels) {
        const storageKeyLabel = `label_${key}`;
        let label = labels[key];
        if (label.endsWith(";")) {
            label = await GM.getValue(storageKeyLabel, label);
        } else saveOption(storageKeyLabel, label);
        labels[key] = label.replace(/;$/, "");
    }

    /** DO NOT CHANGE */
    const fallbackOptions = {
        preferred_quality: 1080,
        preferred_premium: true,
        show_ui: true,
    };

    /**
     * @param {boolean} [init]
     */
    async function loadOptions(init) {
        for (const key in options) {
            const value = options[key];
            const defaultValue = value ?? fallbackOptions[key];
            const saved = await GM.getValue(key, defaultValue);
            const lastDefaultKey = `last_default_${key}`;
            const lastDefault = await GM.getValue(lastDefaultKey);
            const isDefaultChange = init && lastDefault !== value;

            if (isDefaultChange) saveOption(lastDefaultKey, value);
            if (isDefaultChange && value !== undefined) saveOption(key, value);
            else options[key] = saved;
        }
    }

    await loadOptions(true);

    /**
     * @param {string} [prefix=id]
     * @returns {string}
     */
    function generateId(prefix = "id") {
        return prefix + (Date.now() + Math.random() * 10e20).toString(36);
    }

    const proxyName = generateId("ythdp-proxy-");
    const proxyFunction = function () {
        function handleAPI(ev) {
            const [id, elementId, fn, ...args] = ev.detail.split("|");
            const player = document.getElementById(elementId);
            const detail = { id, response: player?.[fn]?.(...args) };
            document.dispatchEvent(
                new CustomEvent("receiver-proxyName", { detail })
            );
        }

        function spoofData(ev) {
            const item = ev.target.closest?.("[proxyName]");
            if (item) item.data = {};
        }

        const create = (name) => document.createElement(name);
        const container = document.body.appendChild(create("ythdp-elements"));
        container.style.display = "none";
        container.append(create("ytd-toggle-menu-service-item-renderer"));

        document.addEventListener("proxyName", handleAPI);
        window.addEventListener("touchstart", spoofData, true);
        window.addEventListener("mousedown", spoofData, true);
    }.toString();

    const policyOptions = { createScript: (script) => script };
    const proxyPolicy = window.trustedTypes
        ? window.trustedTypes.createPolicy(proxyName, policyOptions)
        : policyOptions;
    const script = head.appendChild(document.createElement("script"));
    script.textContent = proxyPolicy.createScript(
        `(${proxyFunction.replace(/proxyName/g, proxyName)})();`
    );

    /** @type {Map<string, (response: any) => void>}  */
    const APIQueue = new Map();

    document.addEventListener("receiver-" + proxyName, (ev) => {
        const { id, response } = ev.detail;
        APIQueue.get(id)(response);
        APIQueue.delete(id);
    });

    /**
     * @param {string} elementId
     * @param {'getAvailableQualityData' | 'setPlaybackQualityRange' | 'playVideo' | 'loadVideoById'} name
     * @param {string[]} [args]
     * @returns {Promise<any>}
     */
    function API(elementId, name, ...args) {
        const id = generateId(name);
        const detail = [id, elementId, name, ...args].join("|");
        return new Promise((resolve) => {
            APIQueue.set(id, resolve);
            document.dispatchEvent(new CustomEvent(proxyName, { detail }));
        });
    }

    /**
     * @param {Document | HTMLElement} context
     * @param {string} query
     * @param {boolean} [all=false]
     * @returns {HTMLElement | NodeListOf<HTMLElement> | null}
     */
    function find(context, query, all = false) {
        return context[all ? "querySelectorAll" : "querySelector"](query);
    }

    /**
     * @param {string} query
     * @param {boolean} [cache=true]
     * @returns {() => (HTMLElement | null)}
     */
    function $(query, cache = true) {
        let element = null;
        return () => (cache && element) || (element = find(document, query));
    }

    const caches = {
        /** @type {Record<string, HTMLElement[]>} */
        player: {},
        /** @type {Set<Text>} */
        text_quality: new Set(),
        /** @type {Set<HTMLElement>} */
        toggle_premium: new Set(),
    };

    const element = {
        movie_player: $("#movie_player", !isMobile),
        short_player: $("#shorts-player"),
        link: $("link[rel=canonical]"),
        offline: $("[class*=offline][style*='v=']", false),
        m_bottom_container: $("bottom-sheet-container:not(:empty)", false),
        popup: $("[class*=popup-container]:not([aria-hidden=true]) #items"),
    };

    const style = head.appendChild(document.createElement("style"));
    style.textContent = /*css*/ `
        [dir=rtl] svg.transform-icon-svg { transform: scale(-1, 1); }
        #items.ytmusic-menu-popup-renderer { width: 250px !important; }
        .ythdp-icon { fill: currentColor; }
        .ythdp-toggle [role=button][hidden] { display: inherit !important; }
    `;

    /**
     * @param {MutationCallback} callback
     * @param {Node} [target]
     * @param {MutationObserverInit} [options]
     */
    function observer(callback, target = body, options) {
        const mutation = new MutationObserver(callback);
        mutation.observe(target, options || { subtree: true, childList: true });
        callback([], mutation);
    }

    /**
     * @param {string} label
     * @returns {number}
     */
    function parseQualityLabel(label) {
        return parseInt(label.replace(/^\D+/, "").slice(0, 4));
    }

    /**
     * @typedef {object} QualityData
     * @property {any} formatId
     * @property {string} qualityLabel
     * @property {string} quality
     * @property {boolean} isPlayable
     * @property {object} paygatedQualityDetails
     */

    /**
     * @param {QualityData[]} data
     * @returns {number}
     */
    function getPreferredQuality(data) {
        let preferred = 0;
        let min = Infinity;

        for (const d of data) {
            const q = parseQualityLabel(d.qualityLabel);
            if (q < min) min = q;
            if (q <= options.preferred_quality && q > preferred) preferred = q;
        }

        return preferred || min;
    }

    /**
     * @param {QualityData[]} qualityData
     * @returns {QualityData | undefined}
     */
    function getQuality(qualityData) {
        let premium, normal;
        const preferred = getPreferredQuality(qualityData);

        if (!isFinite(preferred)) return;

        for (const data of qualityData) {
            if (
                data.isPlayable &&
                parseQualityLabel(data.qualityLabel) === preferred
            ) {
                if (data.paygatedQualityDetails) premium = data;
                else normal = data;
            }
        }

        return (options.preferred_premium && premium) || normal;
    }

    /** @type {(() => Promise<void>) | null} */
    let pendingTask = null;
    let isExecuting = false;

    async function runTasks() {
        if (isExecuting) return;
        isExecuting = true;
        try {
            while (pendingTask) {
                const task = pendingTask;
                pendingTask = null;
                await task();
            }
        } catch (e) {}
        isExecuting = false;
    }

    function setVideoQuality() {
        if (manualOverride) return;

        pendingTask = async () => {
            const id = this.id;
            const qualityData = await API(id, "getAvailableQualityData");
            const selected = getQuality(qualityData || []);

            if (selected) {
                await API(
                    id,
                    "setPlaybackQualityRange",
                    selected.quality,
                    selected.quality,
                    selected.formatId
                );
            }
        };

        runTasks();
    }

    /**
     * @param {HTMLElement} [element]
     * @returns {HTMLElement | undefined}
     */
    function togglePremium(element) {
        if (element) caches.toggle_premium.add(element);
        for (const toggle of caches.toggle_premium) {
            toggle.removeAttribute("hidden");
            toggle.toggleAttribute("checked", options.preferred_premium);
            toggle.setAttribute("aria-checked", options.preferred_premium);
        }
        return element;
    }

    /**
     * @param {Text} [nodeText]
     * @returns {Text | undefined}
     */
    function setTextQuality(nodeText) {
        if (nodeText) caches.text_quality.add(nodeText);
        for (const text of caches.text_quality) {
            text.textContent = options.preferred_quality + "p";
        }
        return nodeText;
    }

    /**
     * @param {keyof options} optionKey
     * @param {any} newValue
     * @param {HTMLElement} player
     * @param {boolean} [clearOverride]
     */
    function savePreferred(optionKey, newValue, player, clearOverride) {
        if (clearOverride) manualOverride = false;
        saveOption(optionKey, newValue);
        saveOption("updated_id", generateId());
        (togglePremium(), setTextQuality());
        setVideoQuality.call(player);
    }

    /**
     * @param {string} className
     * @param {Node[]} [append]
     * @returns {HTMLDivElement}
     */
    function itemElement(className = "", append = []) {
        const el = document.createElement("div");
        el.className = "ytp-menuitem" + (className ? "-" + className : "");
        return (el.append(...append), el);
    }

    /**
     * @param {HTMLElement[]} elements
     */
    function removeAttributes(elements) {
        const preserveAttributes = ["role", "class"];
        for (const element of elements) {
            element.textContent = "";
            for (const attr of element.attributes) {
                if (!preserveAttributes.includes(attr.name))
                    element.removeAttribute(attr.name);
            }
        }
    }

    /**
     * @param {NodeListOf<HTMLElement>} element
     * @returns {HTMLElement}
     */
    function firstOnly(element) {
        for (let i = element.length; --i; ) element[i].remove();
        return element[0];
    }

    /**
     * @param {HTMLElement} element
     * @returns {HTMLElement}
     */
    function removeDisabled(element) {
        const query = "[disabled], [aria-disabled=true], [class*=disabled]";
        const items = [element, ...find(element, query, true)];

        for (const item of items) {
            item.removeAttribute("disabled");
            item.setAttribute("aria-disabled", false);
            item.className = item.className.replace(/disabled/g, "");
        }

        return element;
    }

    let selectedLabel = document.createTextNode("");

    /**
     * @param {Object} param
     * @param {HTMLElement} param.menuItem
     * @param {SVGSVGElement | undefined} [param.icon]
     * @param {string} [param.label]
     * @param {boolean} [param.selected=true]
     */
    function parseItem({
        menuItem,
        icon = icons.quality,
        label = labels.quality,
        selected = true,
    }) {
        const item = body.appendChild(removeDisabled(menuItem.cloneNode(true)));
        const iIcon = firstOnly(
            find(item, "c3-icon, yt-icon, [role=img]", true)
        );
        const iTexts = find(item, "[role=text], yt-formatted-string", true);
        const iText = firstOnly(iTexts);
        const button = find(item, "button");
        const optionLabel = iText.cloneNode();
        const optionIcon = iIcon.cloneNode();
        const wrapperIcon = (icon) => {
            return itemElement(
                " ythdp-icon yt-icon-shape yt-spec-icon-shape ytSpecIconShapeHost",
                [icon]
            );
        };

        item.setAttribute(proxyName, "");
        item.setAttribute("use-icons", "");
        iText.after(optionLabel, optionIcon);
        removeAttributes([iIcon, iText, optionIcon, optionLabel]);
        iText.textContent = label;

        if (button) button.style.width = "100%";
        if (icon) iIcon.append(wrapperIcon(icon.cloneNode(true)));
        if (selected) {
            optionIcon.append(wrapperIcon(icons.arrow));
            optionIcon.style.width = "18px";
            optionLabel.className = iTexts[iTexts.length - 1].className;
            optionLabel.style.marginInline = "auto 0";
            optionLabel.append(setTextQuality(selectedLabel));
            if (iTexts.length === 1) {
                optionLabel.style.fontSize = "1.4rem";
                optionLabel.style.opacity = "0.7";
            }
        } else optionIcon.remove();

        return item;
    }

    /**
     * @param {HTMLElement} menuItem
     * @returns {{items: HTMLElement[], preferredIndex: number}}
     */
    function listQualityToItem(menuItem) {
        const name = "preferred_quality";
        const tempIndex = listQuality.indexOf(options[name]);
        const preferredIndex = listQuality.length - 1 - tempIndex;
        const items = listQuality.map((quality, i) => {
            const icon = tempIndex === i && icons.check_mark;
            const label = quality + "p";
            const item = parseItem({ menuItem, icon, label, selected: false });
            item.addEventListener("click", () => {
                body.click();
                body.dispatchEvent(new Event("tap"));
                savePreferred(name, quality, element.movie_player(), true);
            });
            return item;
        });
        return { items: items.reverse(), preferredIndex };
    }

    /**
     * @param {HTMLElement} player
     */
    function addVideoListener(player) {
        const cache = caches.player[player.id];
        const video = find(player, "video");
        if (!cache || cache[1] !== video) {
            caches.player[player.id] = [player, video];
            const fn = setVideoQuality.bind(player);
            const types = ["playing", "resize"];
            for (const type of types) video.addEventListener(type, fn);
        }
    }

    /**
     * @param {'watch' | 'shorts' | 'embed'} [type]
     * @returns {boolean}
     */
    function isVideoPage(type) {
        const types = type || "watch shorts clip embed";
        return types.includes(location.pathname.split("/")[1] || "!");
    }

    function resetState() {
        manualOverride = false;
    }

    /**
     * @param {MouseEvent} ev
     * @param {string} query
     */
    function setManualOverride(ev, query) {
        const item = ev.target.closest?.(query);
        if (item) {
            const selected = parseQualityLabel(item.textContent);
            manualOverride = listQuality.includes(selected);
        }
    }

    function resizeWindow() {
        document.dispatchEvent(new Event("resize", { bubbles: true }));
    }

    async function syncOptions() {
        if ((await GM.getValue("updated_id")) !== options.updated_id) {
            (await loadOptions(), togglePremium(), setTextQuality());
            for (const id in caches.player) {
                const [player, video] = caches.player[id];
                if (!video.paused) setVideoQuality.call(player);
            }
        }
    }

    if (options.show_ui) {
        (function checkOptions() {
            setTimeout(() => syncOptions().then(checkOptions), 1000);
        })();
    }

    (function music() {
        if (!isMusic) return;

        /**
         * @param {HTMLElement} menu
         * @returns {boolean}
         */
        function initPopup(menu) {
            const menuItem = find(menu, "ytmusic-menu-service-item-renderer");
            if (!menuItem) return false;

            const item = parseItem({ menuItem });
            const addItem = () => {
                if (settingsClicked && !menu.contains(item)) menu.append(item);
            };

            item.addEventListener("click", () => {
                menu.textContent = "";
                menu.append(...listQualityToItem(item).items);
                resizeWindow();
            });

            find(item, "yt-icon:last-child").style.marginLeft = 0;
            observer(addItem, menu, { childList: true });
            return true;
        }

        function musicSetSettingsClicked(/** @type {MouseEvent} */ ev) {
            settingsClicked = !!ev.target.closest?.(
                "#main-panel [class*=menu], .middle-controls-buttons [class*=menu]"
            );
        }

        if (options.show_ui) {
            window.addEventListener("tap", musicSetSettingsClicked, true);
            window.addEventListener("click", musicSetSettingsClicked, true);
        }

        observer((_, observe) => {
            const player = element.movie_player();
            const menu = settingsClicked && element.popup();

            if (player && !caches.player[player.id]) addVideoListener(player);
            if ((menu && initPopup(menu)) || (!options.show_ui && player)) {
                observe.disconnect();
            }
        });
    })();

    (function mobile() {
        if (!isMobile && !isEmbed) return;

        let menuStep = 0;

        /**
         * @param {HTMLElement} container
         * @param {HTMLElement} item
         */
        function customMenu(container, item) {
            const menu = item.parentElement;
            const content = find(container, "[style*='max-height']");
            const { items, preferredIndex } = listQualityToItem(item);

            menu.textContent = "";
            menu.append(...items);

            const preferred = items[preferredIndex];
            const preferredHeight = preferred.offsetHeight;
            const scrollTarget =
                preferredHeight * preferredIndex -
                parseInt(content.style.maxHeight) / 2 +
                preferredHeight / 2;

            content.scrollTo(0, scrollTarget);
            resizeWindow();
        }

        function mobileQualityMenu() {
            if (!settingsClicked) return;

            const container = element.m_bottom_container();

            if (container) {
                const menuItem =
                    find(container, "[role=menuitem]") ||
                    find(container, "[role=listitem]") ||
                    find(container, "ytm-menu-service-item-renderer");

                if (menuItem) {
                    settingsClicked = false;
                    const item = parseItem({ menuItem });
                    item.addEventListener("click", (ev) => {
                        menuStep = -1;
                        ev.stopPropagation();
                        customMenu(container, menuItem);
                    });
                    menuItem.parentElement.append(item);
                }
            }
        }

        function mobileSetSettingsClicked(/** @type {MouseEvent} */ ev) {
            if (isVideoPage() && !element.m_bottom_container()) {
                settingsClicked = !!ev.target.closest?.(
                    "player-top-controls .player-settings-icon, shorts-video ytm-bottom-sheet-renderer"
                );
            }
        }

        function mobileSetOverride(ev) {
            if (manualOverride) return;
            if (!element.m_bottom_container()) menuStep = 0;
            if (menuStep++ >= 2) setManualOverride(ev, "[role=menuitem]");
        }

        function mobilePlayerUpdated(/** @type {CustomEvent} */ ev) {
            if (isVideoPage() && ev.detail.type === "newdata") resetState();
        }

        const videoIdRegex = /(?:shorts\/|watch\?v=|clip\/)([^#&?]*)/;

        /**
         * @returns {string | boolean}
         */
        function getVideoId() {
            const id = element.link().href.match(videoIdRegex);
            return !!id && location.href.includes(id[0]) && id[1];
        }

        function registerPlayer() {
            const player = element.movie_player();

            if (player) {
                addVideoListener(player);

                if (
                    player.closest("[playable=true]") &&
                    player.className.includes("unstarted-mode")
                ) {
                    const id = getVideoId();
                    const elemId = player.id;

                    if (id) {
                        if (element.offline()) API(elemId, "loadVideoById", id);
                        API(elemId, "playVideo");
                    }
                }
            }
        }

        if (options.show_ui) {
            window.addEventListener("click", mobileSetSettingsClicked, true);
        }

        window.addEventListener("click", mobileSetOverride, true);
        document.addEventListener("video-data-change", mobilePlayerUpdated);

        observer(() => {
            if (!isEmbed && isVideoPage()) registerPlayer();
            mobileQualityMenu();
        });
    })();

    (function desktop() {
        if (isMusic || isMobile) return;

        /**
         * @param {SVGElement} svg
         * @param {string} textLabel
         * @param {Boolean} [checkbox]
         * @returns {{item: HTMLDivElement, content: HTMLDivElement}}
         */
        function createMenuItem(svg, textLabel, checkbox) {
            const inner = checkbox ? [itemElement("toggle-checkbox")] : [];
            const content = itemElement("content", inner);
            const label = itemElement("label", [textLabel]);
            const icon = itemElement("icon ythdp-icon", [svg.cloneNode(true)]);
            return { item: itemElement("", [icon, label, content]), content };
        }

        /**
         * @param {HTMLElement} item
         * @param {HTMLElement} player
         * @returns {HTMLElement}
         */
        function premiumOption(item, player) {
            const name = "preferred_premium";
            const toggle = find(item, "[role=button]") || item;
            item.addEventListener("click", () => {
                savePreferred(name, !options[name], player);
            });
            return togglePremium(toggle);
        }

        /**
         * @param {HTMLElement} player
         * @returns {HTMLElement}
         */
        function premiumMenu(player) {
            return premiumOption(
                createMenuItem(icons.premium, labels.premium, true).item,
                player
            );
        }

        /**
         * @returns {HTMLElement}
         */
        function shortPremiumItem() {
            const item = parseItem({
                menuItem: find(body, "ytd-toggle-menu-service-item-renderer"),
                label: labels.premium,
                icon: icons.premium,
                selected: false,
            });
            item.classList.add("ythdp-toggle");
            find(item, ".toggle-label").textContent = "";
            premiumOption(item, element.short_player());
            return item;
        }

        /**
         * @param {HTMLElement} content
         * @param {HTMLElement} player
         */
        function qualityOption(content, player) {
            const name = "preferred_quality";
            const text = document.createTextNode("");

            content.style.cursor = "pointer";
            content.style.wordSpacing = "2rem";
            content.append("< ", text, " >");
            content.addEventListener("click", (ev) => {
                const threshold = content.clientWidth / 2;
                const contentLeft = content.getBoundingClientRect().left;
                const clickPos = ev.clientX - contentLeft;
                const length = listQuality.length - 1;
                let pos = listQuality.indexOf(options[name]);

                if (
                    (clickPos < threshold && pos > 0 && pos--) ||
                    (clickPos > threshold && pos < length && ++pos)
                ) {
                    savePreferred(name, listQuality[pos], player, true);
                }
            });

            setTextQuality(text);
        }

        /**
         * @param {HTMLElement} player
         * @returns {HTMLElement}
         */
        function qualityMenu(player) {
            const menu = createMenuItem(icons.quality, labels.quality);

            menu.item.style.cursor = "default";
            menu.content.style.fontSize = "130%";

            qualityOption(menu.content, player);
            return menu.item;
        }

        /**
         * @returns {HTMLElement}
         */
        function shortQualityItem() {
            const menuItem = find(
                body,
                "ytd-menu-service-item-renderer, yt-list-item-view-model"
            );
            let item = parseItem({ menuItem, selected: false });
            let button = item;

            if (item.nodeName.toLowerCase() === "yt-list-item-view-model") {
                const oldItem = item;
                item = item.cloneNode(true);
                button = find(item, "button");
                oldItem.remove();
            }

            const container = find(
                item,
                "yt-formatted-string:last-of-type, [role=text]:last-of-type"
            );
            const option = document.createElement("div");

            item.firstElementChild.style.userSelect = button.style.userSelect =
                "none";
            item.firstElementChild.style.cursor = button.style.cursor =
                "default";
            container.append(option);
            container.style.minWidth = "130px";
            option.style.margin = container.style.margin = "0 auto";
            option.style.width = "fit-content";

            qualityOption(option, element.short_player());
            return item;
        }

        function setOverride(ev) {
            if (!manualOverride) setManualOverride(ev, "[role=menuitemradio]");
        }

        function playerUpdated(/** @type {CustomEvent} */ ev) {
            if (isVideoPage()) {
                const player = [
                    element.movie_player(),
                    element.short_player(),
                ].find((player) => ev.target.contains(player));

                if (player) {
                    resetState();
                    addVideoListener(player);
                }
            }
        }

        function attachShortMenuItem(/** @type {MouseEvent} */ ev) {
            if (isVideoPage("shorts") && ev.target.closest("#menu-button")) {
                const menu = element.popup();
                const items = [shortPremiumItem(), shortQualityItem()];
                const addItems = () => {
                    if (!menu.contains(items[0])) menu.append(...items);
                };
                observer(addItems, menu, { childList: true });
                window.removeEventListener("click", attachShortMenuItem);
            }
        }

        if (options.show_ui && !isEmbed) {
            window.addEventListener("click", attachShortMenuItem);
        }

        /**
         * @param {HTMLElement} player
         */
        function attachDesktopSettings(player) {
            addVideoListener(player);
            if (options.show_ui) {
                const settings = find(player, ".ytp-settings-menu");
                if (settings) {
                    const panel = find(settings, ".ytp-panel-menu");
                    panel.append(premiumMenu(player), qualityMenu(player));
                    settings.addEventListener("click", setOverride, true);
                }
            }
        }

        let c4Player = null;

        /** Special case for c4-player  */
        observer(() => {
            const player = document.getElementById("c4-player");
            if (player && c4Player !== player) attachDesktopSettings(player);
            c4Player = player;
        });

        observer((_, observe) => {
            const moviePlayer = element.movie_player();
            const shortPlayer = element.short_player();

            if (shortPlayer) addVideoListener(shortPlayer);
            if (moviePlayer) {
                observe.disconnect();
                document.addEventListener("yt-player-updated", playerUpdated);
                attachDesktopSettings(moviePlayer);
            }
        });
    })();
})();


// 脚本5: 526798 Auto-Resume
(function () {
    'use strict';

    const api = youtubeHelperApi;
    if (!api) return console.error('Helper API not found. Likely incompatible script manager or extension settings.');

    const CONSTANTS = {
        DAYS_TO_REMEMBER: 90,
        DAYS_TO_REMEMBER_SHORTS: 1,
        DAYS_TO_REMEMBER_PREVIEWS: 10 / (24 * 60), // 10 minutes
        MIN_PROCESS_THRESHOLD: 1.5,
        STATIC_FINISH_SECONDS: 15,
        CLEANUP_INTERVAL_MS: 300000,
        MAX_COMPLETED_VIDEOS: 100000,
        STORAGE_PREFIX: 'YT_AUTO_RESUME_',
        COMPLETED_KEY: 'COMPLETED_VIDEOS_LIST',
        LAST_CLEANUP_KEY: 'lastCleanupTimestamp',
    };

    const StorageManager = {
        activeStorageKey: null,
        completedVideosCache: new Set(),
        sessionPlaylistCache: new Map(),
        sessionSyncedVideos: new Set(),

        resolvePlaylistId: (rawId) => rawId === 'WL' ? null : rawId,

        async init() {
            CrossTabSyncManager.init();
            const completedArray = await api.storage.load(CONSTANTS.STORAGE_PREFIX + CONSTANTS.COMPLETED_KEY, []);
            StorageManager.completedVideosCache = new Set(Array.isArray(completedArray) ? completedArray : []);
        },

        async getValue(key) {
            try { return await api.storage.load(CONSTANTS.STORAGE_PREFIX + key); } 
            catch (e) { console.error(`Failed to load storage key "${key}"`, e); return null; }
        },

        async setValue(key, value) {
            try { await api.storage.save(CONSTANTS.STORAGE_PREFIX + key, value); } 
            catch (e) { console.error(`Failed to set storage key "${key}"`, e); }
        },

        async deleteValue(key) {
            await api.storage.delete(CONSTANTS.STORAGE_PREFIX + key);
        },

        async getPlaybackData(videoId, rawPlaylistId, forceFresh = false) {
            const playlistId = StorageManager.resolvePlaylistId(rawPlaylistId);
            
            if (playlistId) {
                let playlistData = StorageManager.sessionPlaylistCache.get(playlistId);
                if (!playlistData || forceFresh) {
                    playlistData = await StorageManager.getValue(playlistId) || {};
                    StorageManager.sessionPlaylistCache.set(playlistId, playlistData);
                }
                const isCompleted = playlistData?.completedVideos?.includes(videoId) || false;
                const savedData = isCompleted ? null : playlistData?.videos?.[videoId];
                return { isCompleted, savedData };
            } else {
                if (forceFresh) {
                    const freshList = await StorageManager.getValue(CONSTANTS.COMPLETED_KEY) || [];
                    StorageManager.completedVideosCache = new Set(Array.isArray(freshList) ? freshList : []);
                }
                const isCompleted = StorageManager.completedVideosCache.has(videoId);
                const savedData = isCompleted ? null : await StorageManager.getValue(videoId);
                return { isCompleted, savedData };
            }
        },

        async writeVideoState(videoId, rawPlaylistId, action, data = {}) {
            const playlistId = StorageManager.resolvePlaylistId(rawPlaylistId);
            const { timestamp, duration, videoType } = data;

            try {
                if (playlistId) {
                    await api.storage.update(CONSTANTS.STORAGE_PREFIX + playlistId, (stored) => {
                        const merged = stored || { lastWatchedVideoId: '', videos: {}, completedVideos: [] };
                        merged.videos = merged.videos || {};
                        merged.completedVideos = merged.completedVideos || [];

                        if (action === 'SAVE_PROGRESS') {
                            merged.videos[videoId] = { timestamp, duration, lastUpdated: Date.now(), videoType: 'playlist' };
                            merged.lastWatchedVideoId = videoId;
                            merged.completedVideos = merged.completedVideos.filter(id => id !== videoId);
                        } else if (action === 'DELETE_PROGRESS') {
                            delete merged.videos[videoId];
                        } else if (action === 'MARK_COMPLETED') {
                            if (!merged.completedVideos.includes(videoId)) {
                                merged.completedVideos.push(videoId);
                                if (merged.completedVideos.length > CONSTANTS.MAX_COMPLETED_VIDEOS) {
                                    merged.completedVideos.shift();
                                }
                            }
                            delete merged.videos[videoId];
                        } else if (action === 'REMOVE_COMPLETED') {
                            merged.completedVideos = merged.completedVideos.filter(id => id !== videoId);
                        }
                        return merged;
                    }, null, { strategy: 'optimistic' });
                } else {
                    if (action === 'SAVE_PROGRESS') {
                        await api.storage.update(CONSTANTS.STORAGE_PREFIX + videoId, () => ({ timestamp, duration, lastUpdated: Date.now(), videoType }), null, { strategy: 'optimistic' });
                        if (StorageManager.completedVideosCache.has(videoId)) {
                            StorageManager.completedVideosCache.delete(videoId);
                            await api.storage.update(CONSTANTS.STORAGE_PREFIX + CONSTANTS.COMPLETED_KEY, list => Array.isArray(list) ? list.filter(id => id !== videoId) : [], [], { strategy: 'optimistic' });
                        }
                    } else if (action === 'DELETE_PROGRESS') {
                        await StorageManager.deleteValue(videoId);
                    } else if (action === 'MARK_COMPLETED') {
                        StorageManager.completedVideosCache.add(videoId);
                        await StorageManager.deleteValue(videoId);
                        await api.storage.update(CONSTANTS.STORAGE_PREFIX + CONSTANTS.COMPLETED_KEY, (list) => {
                            const filtered = Array.isArray(list) ? list.filter(id => id !== videoId) : [];
                            filtered.push(videoId);
                            if (filtered.length > CONSTANTS.MAX_COMPLETED_VIDEOS) filtered.shift();
                            return filtered;
                        }, [], { strategy: 'optimistic' });
                    } else if (action === 'REMOVE_COMPLETED') {
                        StorageManager.completedVideosCache.delete(videoId);
                        await api.storage.update(CONSTANTS.STORAGE_PREFIX + CONSTANTS.COMPLETED_KEY, list => Array.isArray(list) ? list.filter(id => id !== videoId) : [], [], { strategy: 'optimistic' });
                    }
                }
                
                CrossTabSyncManager.broadcastUpdate(action, videoId, playlistId);
                if (playlistId) StorageManager.sessionPlaylistCache.delete(playlistId);

            } catch (error) {
                console.error(`Failed to write video state: ${action}`, error);
            }
        },

        syncNativeProgress(videoId, rawPlaylistId, timestamp, duration) {
            const playlistId = StorageManager.resolvePlaylistId(rawPlaylistId);
            const syncKey = `${playlistId || 'standalone'}_${videoId}`;
            if (StorageManager.sessionSyncedVideos.has(syncKey)) return;
            StorageManager.sessionSyncedVideos.add(syncKey);
            setTimeout(async () => {
                if (duration > 0 && (timestamp / duration) >= 0.99) {
                    await StorageManager.writeVideoState(videoId, playlistId, 'MARK_COMPLETED');
                } else {
                    await StorageManager.writeVideoState(videoId, playlistId, 'SAVE_PROGRESS', { timestamp, duration, videoType: 'regular' });
                }
                CrossTabSyncManager.dirtyVideoIds.delete(videoId);
            }, 1000);
        },

        isExpired(statusObject) {
            if (!statusObject?.lastUpdated || isNaN(statusObject.lastUpdated)) return true;
            let daysToExpire = CONSTANTS.DAYS_TO_REMEMBER;
            if (statusObject.videoType === 'short') daysToExpire = CONSTANTS.DAYS_TO_REMEMBER_SHORTS;
            else if (statusObject.videoType === 'preview') daysToExpire = CONSTANTS.DAYS_TO_REMEMBER_PREVIEWS;
            return Date.now() - statusObject.lastUpdated > daysToExpire * 86400 * 1000;
        },

        async cleanUpExpiredStatuses() {
            try {
                const now = Date.now();
                const lastCleanup = await StorageManager.getValue(CONSTANTS.LAST_CLEANUP_KEY) || 0;
                if (now - lastCleanup < CONSTANTS.CLEANUP_INTERVAL_MS) return;
                
                await StorageManager.setValue(CONSTANTS.LAST_CLEANUP_KEY, now);
                
                const keys = await api.storage.list();
                const targetKeys = keys.filter(k => k.startsWith(CONSTANTS.STORAGE_PREFIX) && k !== (CONSTANTS.STORAGE_PREFIX + CONSTANTS.COMPLETED_KEY)).map(k => k.substring(CONSTANTS.STORAGE_PREFIX.length));

                await Promise.all(targetKeys.map(async (key) => {
                    if (key === CONSTANTS.LAST_CLEANUP_KEY) return;
                    const storedData = await StorageManager.getValue(key);
                    if (!storedData) return;

                    if (storedData.videos !== undefined || storedData.completedVideos !== undefined) {
                        let hasChanged = false;
                        if (storedData.videos) {
                            for (const [videoId, data] of Object.entries(storedData.videos)) {
                                if (StorageManager.isExpired(data)) {
                                    delete storedData.videos[videoId];
                                    hasChanged = true;
                                }
                            }
                        }

                        const noActive = Object.keys(storedData.videos || {}).length === 0;
                        const noCompleted = (storedData.completedVideos || []).length === 0;

                        if (noActive && noCompleted) {
                            await StorageManager.deleteValue(key);
                        } else if (hasChanged) {
                            await StorageManager.setValue(key, storedData);
                        }
                    } else {
                        if (StorageManager.isExpired(storedData)) {
                            await StorageManager.deleteValue(key);
                        }
                    }
                }));
            } catch (error) {
                console.error(`Cleanup failed:`, error);
            }
        },
    };

    const CrossTabSyncManager = {
        dirtyVideoIds: new Set(),
        
        init() {
            api.broadcast.subscribe(CONSTANTS.STORAGE_PREFIX);
            api.eventTarget.addEventListener(api.broadcast.EVENT_PREFIX + CONSTANTS.STORAGE_PREFIX, (e) => {
                const envelope = e.detail;
                if (!envelope || !envelope.data) return;
                
                if (envelope.sourceInstanceId === api.instance.id) return;
                
                const payload = envelope.data;

                if (payload.playlistId) {
                    StorageManager.sessionPlaylistCache.delete(payload.playlistId);
                }

                if (payload.action === 'MARK_COMPLETED' && !payload.playlistId) StorageManager.completedVideosCache.add(payload.videoId);
                else if ((payload.action === 'REMOVE_COMPLETED' || payload.action === 'SAVE_PROGRESS') && !payload.playlistId) StorageManager.completedVideosCache.delete(payload.videoId);

                CrossTabSyncManager.dirtyVideoIds.add(payload.videoId);
            });

            setInterval(() => CrossTabSyncManager.refreshDirtyThumbnails(), 1000);
        },

        broadcastUpdate(action, videoId, playlistId) {
            api.broadcast.notify(CONSTANTS.STORAGE_PREFIX, { action, videoId, playlistId });
            CrossTabSyncManager.dirtyVideoIds.add(videoId);
        },

        refreshDirtyThumbnails() {
            if (CrossTabSyncManager.dirtyVideoIds.size === 0) return;
            const parentsToUpdate = [];

            ThumbnailEnhancer.visibleParents.forEach(parent => {
                const watchLink = parent.querySelector('a[href*="?v="], a[href*="&v="]');
                if (!watchLink) return;
                try {
                    const url = new URL(watchLink.href, window.location.origin);
                    const videoId = watchLink.data?.watchEndpoint?.videoId || url.searchParams.get('v');
                    if (CrossTabSyncManager.dirtyVideoIds.has(videoId)) {
                        parent.removeAttribute(ThumbnailEnhancer.processedAttribute);
                        parentsToUpdate.push(parent);
                    }
                } catch(e) {}
            });

            if (parentsToUpdate.length > 0) {
                ThumbnailEnhancer._overrideNativeResume(parentsToUpdate);
            }
            CrossTabSyncManager.dirtyVideoIds.clear();
        }
    };

    const NavigationInterceptor = {
        removeTimestampFromNodeHrefs(linkedElement) {
            linkedElement.forEach((element) => {
                try {
                    const url = new URL(element.href);
                    if (!url.searchParams.has('t')) return;
                    url.searchParams.delete('t');
                    element.href = url.toString();
                    element.setAttribute('data-timestamp-removed', 'true');
                    if (element.data?.watchEndpoint?.startTimeSeconds) delete element.data.watchEndpoint.startTimeSeconds;
                } catch (error) {
                    console.error(`Could not parse and modify URL: ${element.href}`, error);
                }
            });
        },

        interceptLinksWithUntimedVersion() {
            document.documentElement.addEventListener('click', (event) => {
                const anchor = event.target.closest('a');
                if (!anchor || !anchor.href || !anchor.hasAttribute('data-timestamp-removed')) return;

                const isNewTabClick = event.button !== 0 || event.ctrlKey || event.metaKey;
                if (isNewTabClick) return;

                event.preventDefault();
                event.stopImmediatePropagation();
                history.pushState(null, '', anchor.href);
                window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
            }, true);
        }
    };

    const ThumbnailEnhancer = {
        visibleParents: new Set(),
        observer: null,
        processedAttribute: 'resume-overridden',
        nativeProgressSelector: [
            'ytm-thumbnail-overlay-resume-playback-renderer',
            'ytd-thumbnail-overlay-resume-playback-renderer',
            'yt-thumbnail-bottom-overlay-view-model'
        ].join(','),
        globalHotZoneSelectors: [
            '#container.style-scope.ytd-player',
            'video.video-stream.html5-main-video',
            '#inline-preview-player',
            'ytd-video-preview',
        ],

        isEnteringHotZone(targetElement, contentParent) {
            if (!targetElement) return { isHot: false, element: null };
            if (targetElement === contentParent || contentParent.contains(targetElement)) {
                return { isHot: true, element: contentParent };
            }

            for (const selector of ThumbnailEnhancer.globalHotZoneSelectors) {
                const matchedElement = targetElement.closest(selector);
                if (matchedElement) {
                    return { isHot: true, element: matchedElement };
                }
            }

            return { isHot: false, element: null };
        },

        _parseTimeToSeconds(timeString) {
            if (!timeString) return 0;
            const cleaned = timeString.replace(/[^0-9:]/g, '');
            if (!cleaned) return 0;
            const parsed = cleaned.split(':').reverse().reduce((total, part, index) => total + Number(part) * 60 ** index, 0);
            return isNaN(parsed) ? 0 : parsed;
        },

        async _overrideNativeResume(contentParents) {
            const dataReadPromises = contentParents.map(async (contentParent) => {
                try {
                    if (contentParent.hasAttribute(ThumbnailEnhancer.processedAttribute)) return null;
                    contentParent.setAttribute(ThumbnailEnhancer.processedAttribute, 'processing');

                    const watchLinks = Array.from(contentParent.querySelectorAll('a[href*="?v="], a[href*="&v="]'));
                    if (contentParent.matches?.('a[href*="?v="], a[href*="&v="]')) watchLinks.push(contentParent);

                    const timedLinks = Array.from(contentParent.querySelectorAll('a[href*="?t="], a[href*="&t="]'));
                    if (contentParent.matches?.('a[href*="?t="], a[href*="&t="]')) timedLinks.push(contentParent);

                    if (!watchLinks[0]) {
                        contentParent.removeAttribute(ThumbnailEnhancer.processedAttribute);
                        return null;
                    }

                    const videoData = watchLinks[0]?.data?.watchEndpoint;
                    let videoId;
                    try {
                        videoId = videoData?.videoId || new URL(watchLinks[0].href, window.location.origin).searchParams.get('v');
                    } catch (e) { videoId = null; }
                    if (!videoId) {
                        contentParent.removeAttribute(ThumbnailEnhancer.processedAttribute);
                        return null;
                    }

                    let playlistId;
                    try {
                        playlistId = new URL(watchLinks[0].href, window.location.origin).searchParams.get('list');
                    } catch (e) { playlistId = null; }

                    const { isCompleted, savedData } = await StorageManager.getPlaybackData(videoId, playlistId);

                    return { contentParent, watchLinks, timedLinks, videoId, playlistId, isCompleted, savedData };
                } catch (error) {
                    console.error('Failed to read data for element:', contentParent, error);
                    contentParent.removeAttribute(ThumbnailEnhancer.processedAttribute);
                    return null;
                }
            });

            const processingData = (await Promise.all(dataReadPromises)).filter(Boolean);

            for (const data of processingData) {
                const { contentParent, watchLinks, timedLinks, videoId, playlistId, isCompleted, savedData } = data;

                try {
                    contentParent.setAttribute(ThumbnailEnhancer.processedAttribute, 'true');
                    const contentParentRef = new WeakRef(contentParent);

                    const hotZoneMouseLeaveListener = (event) => {
                        const currentContentParent = contentParentRef.deref();
                        if (!currentContentParent) return;

                        const newTargetCheck = ThumbnailEnhancer.isEnteringHotZone(event.relatedTarget, currentContentParent);

                        if (newTargetCheck.isHot) {
                            newTargetCheck.element.addEventListener('mouseleave', hotZoneMouseLeaveListener, { once: true });
                        } else {
                            currentContentParent.removeAttribute(ThumbnailEnhancer.processedAttribute);
                            ThumbnailEnhancer._overrideNativeResume([currentContentParent]);
                        }
                    };

                    contentParent.addEventListener('mouseleave', hotZoneMouseLeaveListener, { once: true });

                    let urlTimestamp = null;
                    if (timedLinks[0]) {
                        try {
                            const tUrl = new URL(timedLinks[0].href, window.location.origin);
                            urlTimestamp = parseInt(tUrl.searchParams.get('t'), 10);
                        } catch(e) {}
                    }

                    const videoData = watchLinks[0]?.data?.watchEndpoint;
                    let startTime = savedData?.timestamp ?? videoData?.startTimeSeconds ?? urlTimestamp;

                    let videoLength = savedData?.duration;
                    if (!videoLength || videoLength < (savedData?.timestamp || 0)) {
                        videoLength = 0;
                        const timeTextEls = contentParent.querySelectorAll('ytm-thumbnail-overlay-time-status-renderer, ytd-thumbnail-overlay-time-status-renderer > #text, .badge-shape-wiz__text, .ytBadgeShapeText');
                        for (const el of timeTextEls) {
                            const parsed = ThumbnailEnhancer._parseTimeToSeconds(el.innerText);
                            if (parsed > 0) {
                                videoLength = parsed;
                                break;
                            }
                        }
                    }

                    let roundedPercentage = 0;
                    let overrideVisibility = false;

                    if (isCompleted) {
                        roundedPercentage = 100;
                        overrideVisibility = true;
                    } else if (savedData?.timestamp !== undefined && savedData?.duration) {
                        const completePercentage = (savedData.timestamp / savedData.duration) * 100;
                        if (completePercentage >= 99) {
                            StorageManager.writeVideoState(videoId, playlistId, 'MARK_COMPLETED');
                        }
                        roundedPercentage = Math.min(100, Math.max(1, completePercentage));
                        overrideVisibility = true;
                    } else {
                        const existingBar = contentParent.querySelector(ThumbnailEnhancer.nativeProgressSelector);
                        let nativeWidthPercent = 0;
                        if (existingBar) {
                            const fill = existingBar.querySelector('.thumbnail-overlay-resume-playback-progress, #progress, .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment') || existingBar;
                            if (fill?.style?.width) nativeWidthPercent = parseFloat(fill.style.width);
                        }

                        let calculatedPercent = 0;
                        if (startTime && videoLength) calculatedPercent = (startTime / videoLength) * 100;

                        const finalNativePercent = calculatedPercent > 0 ? calculatedPercent : nativeWidthPercent;

                        if (finalNativePercent > 0 && !isNaN(finalNativePercent)) {
                            if (finalNativePercent >= 99) {
                                StorageManager.writeVideoState(videoId, playlistId, 'MARK_COMPLETED');
                            } else if (!startTime && videoLength > 0) {
                                startTime = (finalNativePercent / 100) * videoLength;
                            }
                            
                            roundedPercentage = Math.min(100, Math.max(1, finalNativePercent));
                            overrideVisibility = true;

                            if (startTime && videoLength && savedData?.timestamp === undefined && finalNativePercent < 99) {
                                StorageManager.syncNativeProgress(videoId, playlistId, startTime, videoLength);
                            }
                        }
                    }

                    if (overrideVisibility) {
                        const barFills = ThumbnailEnhancer._buildProgressBar(contentParent, roundedPercentage);
                        if (barFills && barFills.length > 0) {
                            barFills.forEach(barFill => {
                                const hostElement = barFill.closest('ytm-thumbnail-overlay-resume-playback-renderer, ytd-thumbnail-overlay-resume-playback-renderer, yt-thumbnail-bottom-overlay-view-model') || barFill.parentElement;
                                barFill.style.transition = 'width 1s linear';
                                if (roundedPercentage > 0) {
                                    barFill.style.width = `${roundedPercentage}%`;
                                    if (hostElement) {
                                        hostElement.style.transition = 'opacity 0.5s ease-out';
                                        hostElement.style.opacity = '1';
                                        hostElement.style.display = '';
                                        hostElement.removeAttribute('hidden');
                                    }
                                } else {
                                    barFill.style.width = '0%';
                                    if (hostElement) {
                                        hostElement.style.transition = 'opacity 0.5s ease-out';
                                        hostElement.style.opacity = '0';
                                        hostElement.style.display = 'none';
                                    }
                                }
                            });
                        }
                    }

                    NavigationInterceptor.removeTimestampFromNodeHrefs(timedLinks);
                } catch (error) {
                    console.error('Failed to process resume preview for element:', contentParent, error);
                    contentParent.removeAttribute(ThumbnailEnhancer.processedAttribute);
                }
            }
        },

        _getRendererParent(node) {
            const selectors = ['ytd-playlist-panel-video-renderer', 'ytd-rich-item-renderer', 'ytd-compact-video-renderer', 'ytd-video-renderer', 'ytd-grid-video-renderer', 'ytm-compact-video-renderer', 'ytm-item-section-renderer'].join(', ');
            return node.closest(selectors) || (api.page.isMobile ? node.parentElement : node.parentElement?.parentElement);
        },

        _observeWatchLinksIn(root) {
            const links = Array.from(root.querySelectorAll('a[href*="?v="], a[href*="&v="]'));
            for (const link of links) {
                if (!link.querySelector('yt-image, yt-thumbnail-view-model, .video-thumbnail-img')) continue;
                const parent = ThumbnailEnhancer._getRendererParent(link);
                if (parent && !parent.hasAttribute(ThumbnailEnhancer.processedAttribute) && !parent.classList.contains('ytd-playlist-sidebar-renderer')) {
                    parent.setAttribute('data-ytar-observed', 'true');
                    ThumbnailEnhancer.observer.observe(parent);
                }
            }
        },

        _buildProgressBar(contentParent, roundedPercentage) {
            if (api.page.isMobile) {
                const fills = Array.from(contentParent.querySelectorAll('.thumbnail-overlay-resume-playback-progress'));
                const container = contentParent.querySelector('.videoThumbnailGroupOverlayBottomLeftRightGroup');
                if (fills.length === 0 && container && roundedPercentage > 0) {
                    const renderer = document.createElement('ytm-thumbnail-overlay-resume-playback-renderer');
                    renderer.classList.add('videoThumbnailGroupResumePlayback');
                    renderer.setAttribute('data-yt-auto-resume-injected', 'true');
                    const fill = document.createElement('div');
                    fill.classList.add('thumbnail-overlay-resume-playback-progress');
                    renderer.appendChild(fill);
                    container.appendChild(renderer);
                    fills.push(fill);
                }
                return fills;
            }

            if (contentParent.querySelector('yt-thumbnail-view-model')) {
                const fills = Array.from(contentParent.querySelectorAll('.ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment'));
                const viewModel = contentParent.querySelector('yt-thumbnail-view-model');
                if (fills.length === 0 && viewModel && roundedPercentage > 0) {
                    const overlay = document.createElement('yt-thumbnail-bottom-overlay-view-model');
                    overlay.classList.add('ytThumbnailBottomOverlayViewModelHost');
                    overlay.setAttribute('data-yt-auto-resume-injected', 'true');
                    const host = document.createElement('yt-thumbnail-overlay-progress-bar-view-model');
                    host.classList.add('ytThumbnailOverlayProgressBarHost', 'ytThumbnailOverlayProgressBarHostLarge');
                    const barContainer = document.createElement('div');
                    barContainer.classList.add('ytThumbnailOverlayProgressBarHostWatchedProgressBar', 'ytThumbnailOverlayProgressBarHostUseLegacyBar');
                    const fill = document.createElement('div');
                    fill.classList.add('ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment');
                    barContainer.appendChild(fill);
                    host.appendChild(barContainer);
                    overlay.appendChild(host);
                    viewModel.appendChild(overlay);
                    fills.push(fill);
                }
                return fills;
            } else {
                const fills = Array.from(contentParent.querySelectorAll('#progress.ytd-thumbnail-overlay-resume-playback-renderer'));
                const overlays = contentParent.querySelector('#overlays.ytd-thumbnail');
                if (fills.length === 0 && overlays && roundedPercentage > 0) {
                    const renderer = document.createElement('ytd-thumbnail-overlay-resume-playback-renderer');
                    renderer.classList.add('style-scope', 'ytd-thumbnail');
                    renderer.setAttribute('data-yt-auto-resume-injected', 'true');
                    const fill = document.createElement('div');
                    fill.id = 'progress';
                    fill.classList.add('style-scope', 'ytd-thumbnail-overlay-resume-playback-renderer');
                    renderer.appendChild(fill);
                    overlays.appendChild(renderer);
                    fills.push(fill);
                }
                return fills;
            }
        },

        start() {
            ThumbnailEnhancer.observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const contentParent = entry.target;
                        ThumbnailEnhancer.visibleParents.add(contentParent);
                        ThumbnailEnhancer._overrideNativeResume([contentParent]);
                    } else {
                        ThumbnailEnhancer.visibleParents.delete(entry.target);
                    }
                }
            }, { rootMargin: '100px' });

            const watchLinkScanner = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType !== Node.ELEMENT_NODE) continue;

                        const timedLinks = Array.from(node.querySelectorAll('a[href*="?t="], a[href*="&t="]'));
                        if (node.matches('a[href*="?t="], a[href*="&t="]')) timedLinks.push(node);
                        
                        timedLinks.forEach(link => {
                            try {
                                const url = new URL(link.href, window.location.origin);
                                if (url.searchParams.has('t')) {
                                    const v = url.searchParams.get('v');
                                    const list = url.searchParams.get('list');
                                    const t = parseInt(url.searchParams.get('t'), 10);
                                    if (v && t && !isNaN(t)) {
                                        StorageManager.getPlaybackData(v, list, false).then(({ isCompleted, savedData }) => {
                                            if (!isCompleted && !savedData) {
                                                StorageManager.writeVideoState(v, list, 'SAVE_PROGRESS', { timestamp: t, duration: 0, videoType: 'regular' });
                                            }
                                        });
                                    }
                                }
                            } catch (e) {}
                        });

                        const watchLinks = Array.from(node.querySelectorAll('a[href*="?v="], a[href*="&v="]'));
                        if (node.matches('a[href*="?v="], a[href*="&v="]')) watchLinks.push(node);

                        watchLinks.forEach(link => {
                            const isVideoThumbnail = link.querySelector('yt-image, yt-thumbnail-view-model, .video-thumbnail-img');
                            if (!isVideoThumbnail) return;

                            const rendererContentParent = ThumbnailEnhancer._getRendererParent(link);
                            if (rendererContentParent && !rendererContentParent.hasAttribute(ThumbnailEnhancer.processedAttribute) && !rendererContentParent.classList.contains('ytd-playlist-sidebar-renderer')) {
                                rendererContentParent.setAttribute('data-ytar-observed', 'true');
                                ThumbnailEnhancer.observer.observe(rendererContentParent);
                            }
                        });

                        const progressBars = node.matches(ThumbnailEnhancer.nativeProgressSelector) ? [node] : Array.from(node.querySelectorAll(ThumbnailEnhancer.nativeProgressSelector));
                        progressBars.forEach(progressBar => {
                            if (progressBar.hasAttribute('data-yt-auto-resume-injected') || progressBar.closest('[data-yt-auto-resume-injected]')) return;
                            
                            const parent = ThumbnailEnhancer._getRendererParent(progressBar);
                            if (parent && parent.hasAttribute(ThumbnailEnhancer.processedAttribute)) {
                                parent.removeAttribute(ThumbnailEnhancer.processedAttribute);
                                ThumbnailEnhancer._overrideNativeResume([parent]);
                            }
                        });
                    }
                }
            });

            const targetSelector = api.page.isMobile ? 'ytm-app' : 'ytd-page-manager';
            
            document.addEventListener('yt-navigate-finish', () => {
                const targetNode = document.querySelector(targetSelector);
                if (targetNode) {
                    ThumbnailEnhancer._observeWatchLinksIn(targetNode);
                    CrossTabSyncManager.refreshDirtyThumbnails();
                }
            });

            const bootstrapper = new MutationObserver((mutations, me) => {
                const targetNode = document.querySelector(targetSelector);
                if (targetNode) {
                    me.disconnect();
                    watchLinkScanner.observe(targetNode, { childList: true, subtree: true });
                    
                    ThumbnailEnhancer._observeWatchLinksIn(targetNode);
                }
            });

            const existingNode = document.querySelector(targetSelector);
            if (existingNode) {
                watchLinkScanner.observe(existingNode, { childList: true, subtree: true });
                ThumbnailEnhancer._observeWatchLinksIn(existingNode);
            } else {
                bootstrapper.observe(document.body, { childList: true, subtree: true });
            }
        }
    };

    const PlaybackController = {
        abortController: null,
        trackingInterval: null,
        lastPlaylistId: null,

        async getPlaylistWhenReady(playerApi, signal) {
            return new Promise((resolve, reject) => {
                const initialPlaylist = playerApi.getPlaylist();
                if (initialPlaylist?.length > 0) return resolve(initialPlaylist);

                let pollerInterval;
                const cleanup = () => clearInterval(pollerInterval);

                let attempts = 0;
                pollerInterval = setInterval(() => {
                    if (signal?.aborted) {
                        cleanup();
                        return reject(new DOMException('Aborted', 'AbortError'));
                    }
                    const playlist = playerApi.getPlaylist();
                    if (playlist?.length > 0) {
                        cleanup();
                        resolve(playlist);
                    } else if (++attempts >= 50) {
                        cleanup();
                        reject(new Error('Playlist not found after 5s.'));
                    }
                }, 100);
            });
        },

        applySeek(playerApi, timeToSeek) {
            if (!playerApi || isNaN(timeToSeek) || timeToSeek < CONSTANTS.MIN_PROCESS_THRESHOLD) return;
            const deltaT = Math.abs(timeToSeek - api.video.realCurrentProgress);
            if (isNaN(deltaT) || deltaT < CONSTANTS.MIN_PROCESS_THRESHOLD) return;

            const videoElement = api.player.videoElement;
            if (!videoElement) return;

            const releaseLock = () => {
                if (videoElement._ytAutoResumeSeekPending) videoElement._ytAutoResumeSeekPending = false;
            };

            if (videoElement._ytAutoResumeRetryPending) return;
            if (videoElement.seeking && !videoElement._ytAutoResumeSeekPending) {
                videoElement._ytAutoResumeRetryPending = true;
                const targetVideoId = api.video.id;

                const runRetry = () => {
                    videoElement._ytAutoResumeRetryPending = false;
                    if (api.video.id === targetVideoId) {
                        setTimeout(() => PlaybackController.applySeek(playerApi, timeToSeek), 0);
                    }
                };
                videoElement.addEventListener('seeked', runRetry, { once: true });
                return;
            }

            videoElement.addEventListener('seeked', releaseLock, { once: true });
            videoElement._ytAutoResumeSeekPending = true;
            setTimeout(releaseLock, 5000); 
            
            playerApi.seekTo(timeToSeek, true);
        },

        async resumePlayback(navigatedFromPlaylistId = null) {
            if (PlaybackController.abortController?.signal.aborted) return;
            
            try {
                const playerApi = api.apiProxy;
                const videoId = api.video.id;
                const rawPlaylistId = api.video.playlistId;
                const playlistId = StorageManager.resolvePlaylistId(rawPlaylistId);
                const inPlaylist = !!playlistId;

                const { isCompleted, savedData } = await StorageManager.getPlaybackData(videoId, rawPlaylistId, true);
                if (PlaybackController.abortController?.signal.aborted) return;

                if (isCompleted) return;
                if (playerApi.getPlayerSize().width === 0) return;

                let lastPlaybackTime;
                let videoToResumeId = videoId;

                if (inPlaylist) {
                    const playlistData = await StorageManager.getValue(playlistId);
                    if (!playlistData?.videos) return;
                    
                    const lastWatched = playlistData.lastWatchedVideoId;
                    if (playlistId !== navigatedFromPlaylistId && lastWatched && videoId !== lastWatched) {
                        videoToResumeId = lastWatched;
                    }
                    lastPlaybackTime = playlistData.videos?.[videoToResumeId]?.timestamp;
                } else {
                    lastPlaybackTime = savedData?.timestamp;
                }

                if (lastPlaybackTime) {
                    if (inPlaylist && videoId !== videoToResumeId) {
                        const playlist = await PlaybackController.getPlaylistWhenReady(playerApi, PlaybackController.abortController?.signal);
                        if (PlaybackController.abortController?.signal.aborted) return;
                        const index = playlist.indexOf(videoToResumeId);
                        if (index !== -1) playerApi.playVideoAt(index);
                    } else {
                        setTimeout(() => PlaybackController.applySeek(playerApi, lastPlaybackTime), 0);
                    }
                }
            } catch (error) {
                console.error(`Failed to resume playback: `, error);
            }
        },

        startTracking() {
            if (PlaybackController.trackingInterval) clearInterval(PlaybackController.trackingInterval);
            
            PlaybackController.trackingInterval = setInterval(async () => {
                if (PlaybackController.abortController?.signal.aborted) {
                    PlaybackController.stopTracking();
                    return;
                }

                const videoElement = api.player.videoElement;
                if (!videoElement || videoElement.paused || videoElement.seeking) return;

                const lockStatus = await api.concurrency.acquireLock(StorageManager.activeStorageKey, 2500);
                if (!lockStatus || !lockStatus.acquired) return;

                const videoId = api.video.id;
                const duration = api.video.lengthSeconds;
                const currentTime = api.video.realCurrentProgress;

                if (!videoId || isNaN(duration) || isNaN(currentTime) || currentTime < CONSTANTS.MIN_PROCESS_THRESHOLD) return;

                const finishThreshold = Math.min(1 + duration * 0.01, CONSTANTS.STATIC_FINISH_SECONDS);
                const isFinished = duration - currentTime < finishThreshold;
                
                const videoType = ((pageType) => {
                    switch (pageType) {
                        case 'shorts': return 'short';
                        case 'watch': return 'regular';
                        default: return 'preview';
                    }
                })(api.page.type);

                if (isFinished) {
                    await StorageManager.writeVideoState(videoId, api.video.playlistId, 'MARK_COMPLETED');
                } else {
                    await StorageManager.writeVideoState(videoId, api.video.playlistId, 'SAVE_PROGRESS', { timestamp: currentTime, duration, videoType });
                }
            }, 1000);
        },

        stopTracking() {
            if (PlaybackController.trackingInterval) {
                clearInterval(PlaybackController.trackingInterval);
                PlaybackController.trackingInterval = null;
            }
            if (StorageManager.activeStorageKey) {
                api.concurrency.releaseLock(StorageManager.activeStorageKey).catch(console.error);
            }
        },

        processVideo() {
            PlaybackController.teardown();
            PlaybackController.abortController = new AbortController();
            const signal = PlaybackController.abortController.signal;
            
            const videoId = api.video.id;
            if (!videoId) return;

            StorageManager.activeStorageKey = StorageManager.resolvePlaylistId(api.video.playlistId) || videoId;
            api.concurrency.acquireLock(StorageManager.activeStorageKey, 2500).catch(console.error);

            if (api.video.isCurrentlyLive || api.video.isTimeSpecified) {
                PlaybackController.lastPlaylistId = api.video.playlistId;
                return;
            }

            const videoElement = api.player.videoElement;
            if (!videoElement) return;

            let hasAttemptedResume = false;
            const resumeHook = () => {
                if (signal.aborted || api.player.videoElement?.seeking || api.player.videoElement?._ytAutoResumeSeekPending) return;
                if (!hasAttemptedResume) {
                    hasAttemptedResume = true;
                    
                    const isPreview = api.page.type !== 'watch' && api.page.type !== 'shorts';
                    if (isPreview) {
                        api.player.videoElement.addEventListener('timeupdate', () => {
                            if (!signal.aborted) PlaybackController.resumePlayback(PlaybackController.lastPlaylistId);
                        }, { once: true, signal });
                    } else {
                        PlaybackController.resumePlayback(PlaybackController.lastPlaylistId);
                    }
                }
            };

            videoElement.addEventListener('timeupdate', resumeHook, { signal });
            PlaybackController.lastPlaylistId = api.video.playlistId;

            api.eventTarget.addEventListener(api.EVENTS.VIDEO_PLAY, PlaybackController.startTracking, { signal });
            api.eventTarget.addEventListener(api.EVENTS.VIDEO_PAUSE, PlaybackController.stopTracking, { signal });
            api.eventTarget.addEventListener(api.EVENTS.VIDEO_ENDED, PlaybackController.stopTracking, { signal });
            
            videoElement.addEventListener('timeupdate', () => {
                if (!PlaybackController.trackingInterval && !api.player.videoElement?.paused && !api.player.videoElement?.seeking) {
                    PlaybackController.startTracking();
                }
            }, { signal });

            if (!videoElement.paused) PlaybackController.startTracking();
        },

        teardown() {
            if (PlaybackController.abortController) PlaybackController.abortController.abort();
            PlaybackController.stopTracking();
            if (StorageManager.activeStorageKey) {
                api.concurrency.releaseLock(StorageManager.activeStorageKey).catch(console.error);
            }
        }
    };

    const AutoResumeApp = {
        async start() {
            try {
                await StorageManager.init();

                StorageManager.cleanUpExpiredStatuses();
                setInterval(() => StorageManager.cleanUpExpiredStatuses(), CONSTANTS.CLEANUP_INTERVAL_MS);

                NavigationInterceptor.interceptLinksWithUntimedVersion();

                window.addEventListener('pagehide', () => PlaybackController.teardown());
                
                document.addEventListener('yt-autonav-pause-player-ended', async () => {
                    PlaybackController.stopTracking();
                    if (api.video.id) await StorageManager.writeVideoState(api.video.id, api.video.playlistId, 'MARK_COMPLETED');
                });

                ThumbnailEnhancer.start();
                api.eventTarget.addEventListener(api.EVENTS.API_READY, () => PlaybackController.processVideo());
            } catch (error) {
                console.error(`Initialization failed: `, error);
            }
        },
    };

    AutoResumeApp.start();
})();