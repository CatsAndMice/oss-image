import { h } from "preact"
import htm from "htm"
export const html = htm.bind(h)

// 监听document粘贴事件
export const ListenPaste = (cb) => {
    document.onpaste = (event) => {
        let clipboardData = event.clipboardData || window.clipboardData || event.originalEvent.clipboardData;
        if (!clipboardData || !clipboardData.items)
            return alert('当前浏览器不支持粘贴上传');
        let items = clipboardData.items;
        let file = null;
        if (items.length === 0)
            return alert('剪切板内无内容或不支持桌面文件');
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                file = items[i].getAsFile();
            }
        }
        if (!file)
            return alert('剪切板内无内容或不支持桌面文件');
        cb([file])
    }
}

export const browserRedirect = () => {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
    var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
    var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
    var bIsUc = sUserAgent.match(/ucweb/i) == 'web';
    var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
    var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
    var bIsAndroid = sUserAgent.match(/android/i) == 'android';
    if (bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid) {
        return 1;
    }
}

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];

}


export const onCopy = (url) => {
    const textarea = document.createElement('textarea')
    textarea.value = url
    textarea.style.position = "absolute"
    textarea.style.left = '10000px'
    textarea.style.top = '10000px'
    document.body.appendChild(textarea)
    textarea.select();
    document.execCommand("Copy");
    textarea.remove()
    if (browserRedirect()) {
        alert('设备类型为手机，有一定几率复制失败！请查看剪切板是否成功复制');
    }
}