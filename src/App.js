import { render } from "preact"
import { useRef, useState, useEffect } from "preact/hooks"
import { html, ListenPaste } from "./utils"
import Empty from "antd/es/empty"
import UploadView from "./UploadView";
import FileItem from "./FileItem";
import ossUpload from "./ossUpload"
import { IMAGE_TYPE } from "./const"
const maxSize = 1024 * 1024 * 3;

const getFileInfo = (file) => {
    const fileName = file.name;
    const fileNameSplitValues = fileName.split('\\');
    const imageName = fileNameSplitValues[fileNameSplitValues.length - 1];
    const startIndex = imageName.lastIndexOf('.');
    const ext = imageName.substring(startIndex, imageName.length).toUpperCase();
    const fileSize = file.size;
    return { ext, size: fileSize };
}




const App = () => {
    const input = useRef()
    const [list, setList] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)
    const callUpload = () => {
        const { current } = input
        current.click()
    }

    const uploadFile = (fileItem) => {
        const { ext, size } = getFileInfo(fileItem)
        if (!IMAGE_TYPE.includes(ext)) {
            alert('文件类型错误,请上传图片类型');
            return;
        }

        if (size > maxSize) {
            alert('上传的文件不能超过' + maxSize / 1024 / 1024 + 'MB');
            return;
        }

        ossUpload(fileItem).then(url => {
            if (url) {
                const newList = list.concat([{ url, file: fileItem }])
                setList(newList)
            }
        })
    }

    const concatAndSetList = (files = []) => {
        files.forEach(file => {
            uploadFile(file)
        })
    }

    const onChange = () => {
        const { current } = input
        const files = Array.from(current.files)
        concatAndSetList(files)
    }

    const onDelete = (file) => {
        const index = list.indexOf(file)
        const newList = list.splice(0)
        newList.splice(index, 1)
        setList(newList)
    }

    ListenPaste((files) => {
        concatAndSetList(files)
    })

    useEffect(() => {
        const len = list.length
        setIsEmpty(len === 0)
    })

    return html`
    <input ref=${input} onchange=${onChange} type="file" multiple="multiple" style="display: none;"></input>
    <div class="container">
        <${UploadView} callUpload=${callUpload}/>
        <div class="filelist">
        <div class="title">上传列表
            <div class="copyall" style="display:none">
                <button onclick="sel(this);" name="xkx" id="_url">URL</button>
                <button onclick="sel(this);" name="xkx" id="_html">HTML</button>
                <button onclick="sel(this);" name="xkx" id="_markdown">MD</button>
            </div>
        </div>
        <div class="list">
        ${isEmpty ? html`<${Empty} className="empty" description=${false}/>` :
            list.map((l, index) => {
                return html`<${FileItem} fileItem=${l} key=${index} onDelete=${onDelete}/>`
            })
        }
        </div>
    </div>
    </div>
    `
}
render(html`<${App}/>`, document.body)