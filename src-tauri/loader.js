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

// ===== 从远程加载并执行脚本 =====
(async function() {
    // 替换为你的 scripts.txt 的 raw 地址
    const scriptListUrl = 'https://raw.githubusercontent.com/swaqswPake/scripts.txt';
    
    try {
        const response = await fetch(scriptListUrl);
        const text = await response.text();
        const urls = text.split('\n').filter(url => url.trim().startsWith('http'));
        
        for (const url of urls) {
            try {
                const scriptResp = await fetch(url.trim());
                let code = await scriptResp.text();
                // 剥离 UserScript 元数据
                if (code.includes('==/UserScript==')) {
                    code = code.split('==/UserScript==')[1] || code;
                }
                new Function(code)();
                console.log('[Loader] Loaded:', url);
            } catch (e) {
                console.error('[Loader] Failed to load:', url, e);
            }
        }
    } catch (e) {
        console.error('[Loader] Failed to fetch script list:', e);
    }
})();
