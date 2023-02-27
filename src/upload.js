import $ from "jquery";
import render from "./render";
import { IMAGE_TYPE } from "./const";
import ossUpload from "./ossUpload";
const startUploadAnimationAndReturnClass = (file) => {
    document.querySelector('.container').classList.add('start');
    let randomClass = Date.now().toString(36);
    render({ randomClass, file });
    return randomClass
}

export default (files) => {
    const maxSize = 1024 * 1024 * 3;
    if (Array.isArray(files)) {
        files.forEach((file) => {
            if (!file) return
            const fileName = file.name;
            const fileNameSplitValues = fileName.split('\\');
            const imageName = fileNameSplitValues[fileNameSplitValues.length - 1];
            const startIndex = imageName.lastIndexOf('.');
            const ext = imageName.substring(startIndex, imageName.length).toUpperCase();
            const fileSize = file.size
            if (!IMAGE_TYPE.includes(ext)) {
                alert('文件类型错误,请上传图片类型');
                $('#file').val(null);
                return false;
            }
            if (fileSize > maxSize) {
                alert('上传的文件不能超过' + maxSize / 1024 / 1024 + 'MB');
                return false;
            }
            const randomClass = startUploadAnimationAndReturnClass(file)
            ossUpload(file, randomClass)
        })
    }

}

// function upload(files = []) {

//     for (let i = 0; i < files.length; i++) {
//         var animateimg = files[i].name;
//         var imgarr = animateimg.split('\\');
//         var myimg = imgarr[imgarr.length - 1];
//         var houzui = myimg.lastIndexOf('.');
//         var ext = myimg.substring(houzui, myimg.length).toUpperCase();
//         var file = files[i];
//         if (!file) {
//             return false;
//         }
//         var fileSize = file.size;

//         if (ext != '.PNG' && ext != '.GIF' && ext != '.JPG' && ext != '.JPEG' && ext != '.BMP' && ext != '.ICO' && ext != '.webp') {
//             alert('文件类型错误,请上传图片类型');
//             $('#file').val(null);
//             return false;
//         } else if (parseInt(fileSize) >= parseInt(maxSize)) {
//             alert('上传的文件不能超过' + maxSize / 1024 / 1024 + 'MB');
//             return false;
//         } else {
//             document.querySelector('.container').classList.add('start')
//             let formData = new FormData();
//             formData.append('image', files[i]);
//             let randomClass = Date.now().toString(36);
//             render({ randomClass, file })

//             $.ajax({
//                 url: api,
//                 type: 'post',
//                 dataType: 'json',
//                 processData: false,
//                 contentType: false,
//                 data: formData,
//                 xhr: () => {
//                     let xhr = $.ajaxSettings.xhr();
//                     if (!xhr.upload)
//                         return;
//                     xhr.upload.addEventListener('progress', e => {
//                         let percent = Math.floor((e.loaded / e.total) * 100);
//                         $('.' + randomClass).find('.progress-inner').css('width', percent + '%');
//                     }
//                         , false);
//                     return xhr;
//                 }
//                 ,
//                 success: res => {
//                     if (type == 'muke') {
//                         var imgSrc = res.data.url.muke
//                     } else if (type == 'vxichina') {
//                         var imgSrc = res.data.url.vxichina
//                     } else if (type == 'qihoo') {
//                         var imgSrc = res.data.url.qihoo
//                     } else if (type == 'catbox') {
//                         var imgSrc = res.data.url.catbox
//                     } else if (type == 'gtimg') {
//                         var imgSrc = res.data.url.gtimg
//                     } else if (type == 'vimcn') {
//                         var imgSrc = res.data.url.vimcn
//                     } else if (type == 'imgbox') {
//                         var imgSrc = res.data.url.imgbox
//                     } else if (type == 'bkimg') {
//                         var imgSrc = res.data.url.bkimg
//                     } else {
//                         var imgSrc = res.data.url
//                     }
//                     $('#file').val(null);
//                     if (res.code === -1) {
//                         $('.' + randomClass).fadeOut();
//                         alert(res.data.url);
//                     } else {
//                         if (res.code === 200 || res.status === 200) {
//                             $('.' + randomClass).find('.progress-inner').addClass('success');
//                             $('.' + randomClass).find('.status-success').show();
//                             $('.' + randomClass).find('.link').attr({
//                                 href: imgSrc,
//                                 target: '_blank'
//                             });
//                             $('.' + randomClass).find('#Imgs_url').attr({
//                                 value: imgSrc
//                             });
//                             $('.' + randomClass).find('#Imgs_html').attr({
//                                 value: '<img src="' + imgSrc + '"/>'
//                             });
//                             $('.' + randomClass).find('#Imgs_Ubb').attr({
//                                 value: '[img]' + imgSrc + '[/img]'
//                             });
//                             $('.' + randomClass).find('#Imgs_markdown').attr({
//                                 value: '![](' + imgSrc + ')'
//                             });
//                             $('.' + randomClass).find('#show').show();
//                             $('.' + randomClass).find('#show').attr({
//                                 value: imgSrc
//                             });
//                             $('.copyall').show();
//                             var tt = $('.filelist .title').html().replace('上传列表', '');
//                             $('.filelist .title').html(tt);
//                         } else {
//                             $('.' + randomClass).find('.progress-inner').addClass('error');
//                             $('.' + randomClass).find('.status-error').show();
//                             $('.' + randomClass).find('#show').show();
//                             $('.' + randomClass).find('#show').attr({
//                                 value: "上传出错！"
//                             });
//                         }
//                     }
//                 }
//                 ,
//                 fail: () => {
//                     $('.' + randomClass).fadeOut();
//                 }
//             });



//         }
//     }
// }