import React, { Component } from 'react'
import { Upload, Modal, Button, message } from 'antd';
import $ from "jquery"
import { fileIp } from "../../../routes/index"
const success = () => {
    message.success('图片上传成功');
};
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


export default class PicStore extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        picStore: []
    };
    componentWillMount() {
        $.ajax({
            url: fileIp.defaultIp + "/getPicStore"
        }).then(res => {
            var picStore = []
            res.forEach(item => {
                var aaa = {}
                aaa.uid = "-" + item.uid
                aaa.name = item.uid
                aaa.status = "done"
                aaa.url = fileIp.defaultIp + "/getPicStoreItem?name=" + item.uid
                aaa._id = item._id
                picStore.push(aaa)
            })

            this.setState({
                picStore: picStore.reverse()
            })
        })
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    submitClick = (e) => {
        var formdata = new FormData()
        e.preventDefault()
        var picStore = this.state.fileList
        var picGroup = []
        picStore.forEach(item => {
            formdata.append("picture", item.originFileObj)
        })
        $.ajax({
            url: fileIp.defaultIp + "/addPic",
            data: formdata,
            type: 'POST',
            processData: false,//必须
            contentType: false,//必须
            success: function () {
                success()
                window.location.reload(true)
            }
        })
    }
    removeItem = (e) => {
        if (window.confirm("你确定要删除这张照片吗？")) {
            $.ajax({
                url: fileIp.defaultIp + "/removePicStoreItem?_id=" + e._id
            })
            window.location.reload(true)
        }
    }
    render() {
        const { previewVisible, previewImage, fileList, picStore } = this.state;
        const uploadButton = (
            <div>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">

                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    multiple={true}
                >
                    {uploadButton}
                </Upload>
                <Button type="primary" onClick={(e) => { this.submitClick(e) }}>提交</Button>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <hr />
                <Upload
                    listType="picture-card"
                    fileList={picStore}
                    onRemove={(e) => this.removeItem(e)}
                    onPreview={this.handlePreview}
                >
                </Upload>
            </div>
        )
    }
}
