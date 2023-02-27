import to from "await-to-js"

const callOssFnUpload = async ({ data: info, file }) => {
    const OSS = window.OSS
    const client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'oss-cn-hangzhou',
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: info.AccessKeyId,
        accessKeySecret: info.AccessKeySecret,
        // 从STS服务获取的安全令牌（SecurityToken）。
        stsToken: info.SecurityToken,
        // 填写Bucket名称。
        bucket: 'linglan008-blog'
    });
    const [err, result] = await to(client.put(file.name, new Blob([file])))
    if (err) {
        alert('上传失败')
        return
    }
    return result.url;
}

export default async (file) => {
    const axios = window.axios
    const { data: result } = await axios.get('https://xewqkw.lafyun.com:443/getStsTaken')
    const { status, data } = result
    if (status === 200) {
        return  callOssFnUpload({ data, file })
    }
    return ''
}