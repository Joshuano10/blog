<template>
    <div class="workPage" v-show="showflag">
        <h3>编辑页面</h3>
        <label for="name">名称</label>
        <el-input id="name" type="text" class="form-control" placeholder="请输入名称" v-model="name"></el-input>
        <label for="link">源码</label>
        <el-input id="link" type="text" class="form-control" placeholder="请输入源码链接,如http://www.xxx.com" v-model="link"></el-input>
        <label for="demo">demo</label>
        <el-input id="demo" type="text" class="form-control" placeholder="请输入demo链接,可以是相对位置" v-model="demo"></el-input>
        <label for="description">描述</label>
        <el-input id="description" type="textarea" class="form-control" placeholder="请输入描述(180字以内)" :rows="3" resize="none" v-model="description"></el-input>
        <label for="img">图片</label>
        <el-input id="img" type="text" class="form-control" placeholder="请输入图片链接,路径为static/..." v-model="img"></el-input>
        <div class="btn-wrapper">
            <el-button @click="saveWork()">
                保存
            </el-button>
            <el-button @click="close()">
                取消
            </el-button>
        </div>
    </div>
</template>

<script>
// import Vue from 'vue';
import axios from 'axios';
import {isEmptyObject} from '../../../util/isEmpty.js';
// import db from '../../../../server/db.js';

export default {
    data() {
        return {
            showflag: false,
            _id: '',
            name: '',
            link: '',
            demo: '',
            description: '',
            img: '',
            editflag: false
        };
    },
    methods: {
        close() {
            this._id = '';
            this.name = '';
            this.link = '';
            this.demo = '';
            this.description = '';
            this.img = '';
            this.editflag = false;
            this.showflag = false;
        },
        show(work) {
            if (!isEmptyObject(work)) {
                this._id = work._id;
                this.name = work.name;
                this.link = work.link;
                this.demo = work.demo;
                this.description = work.description;
                this.img = work.img;
                this.editflag = true;
            }
            this.showflag = true;
        },
        saveWork() {
            if (this.nane === '' || this.description === '') {
                console.log(this.name);
                alert('名称和描述不能为空！');
                return;
            }
            if (!this.editflag) {
                axios.post('/api/admin/addWork', {
                    name: this.name,
                    link: this.link,
                    demo: this.demo,
                    description: this.description,
                    img: this.img
                })
                .then((res) => {
                    if (res.data.errno === 0) {
                        alert('添加成功！');
                        window.location.reload();
                        this.close();
                    } else {
                        alert(res.data.message);
                    }
                });
            } else {
                axios.post('/api/admin/editWork', {
                    _id: this._id,
                    name: this.name,
                    link: this.link,
                    demo: this.demo,
                    description: this.description,
                    img: this.img
                })
                .then((res) => {
                    if (res.data.errno === 0) {
                        alert('编辑成功！');
                        window.location.reload();
                        this.close();
                    } else {
                        console.log(res.data.errno);
                        alert(res.data.message);
                    }
                });
            }
        }
    }
};
</script>

<style>
.workPage {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 50;
    background-color: #fff;
}
.workPage h3 {
    font-size: 24px;
    margin-bottom: 10px;
}
.workPage .btn-wrapper {
    margin-top: 10px;
}
.workPage .el-input, .workPage .el-textarea {
    margin: 10px 0;
}
</style>
