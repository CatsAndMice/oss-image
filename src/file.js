import $ from "jquery"
import upload from "./upload";

$(() => {
    $(document).on('paste', event => {
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
        upload(new Array(file));
    }
    );
    $('.upload .content').on('click', function () {
        $('#file').click();
    });
    $('#file').on('change', () => {
        upload(Array.from($('#file')[0].files));
    }
    );
    $('#dragbox').on('dragover', e => {
        e.preventDefault();
    }
    );
    $('#dragbox').on('dragenter', e => {
        e.preventDefault();
        $('.upload').addClass('dragenter');
    }
    );
    $('#dragbox').on('dragleave', e => {
        e.preventDefault();
        $('.upload').removeClass('dragenter');
    }
    );
    $('#dragbox').on('drop', e => {
        e.preventDefault();
        $('.upload').removeClass('dragenter');
        let files = e.originalEvent.dataTransfer.files;
        upload(files);
    }
    );
});

function del(obj) {
    var item = obj.parentNode.parentNode;
    item.parentNode.removeChild(item);
}
function sel(obj) {
    for (var i = 0; i < document.querySelectorAll('#Imgs' + obj.id).length; i++) {
        ; document.querySelectorAll('#Imgs' + obj.id)[i].parentElement.nextElementSibling.value = document.querySelectorAll('#Imgs' + obj.id)[i].value;
    }
}
function copyAll(obj) {
    var xkx = "";
    for (var i = 0; i < document.querySelectorAll('#show').length; i++) {
        ; var xkx = xkx + document.querySelectorAll('#show')[i].value + '\n';
    }
    var txa = document.createElement('textarea');
    txa.value = xkx;
    document.body.appendChild(txa);
    txa.select();
    var res = document.execCommand('copy');
    document.body.removeChild(txa);
    console.log('copy success');
    console.log(xkx);
    if (browserRedirect()) {
        alert('设备类型为手机，有一定几率复制失败！请查看剪切板是否成功复制');
    }
}
function oCopy(obj) {
    obj.select();
    document.execCommand("Copy");
    if (browserRedirect()) {
        alert('设备类型为手机，有一定几率复制失败！请查看剪切板是否成功复制');
    }
}



