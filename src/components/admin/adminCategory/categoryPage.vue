<template>
    <div class="categoryPage" v-show="showflag">
        <h3>编辑页面</h3>
        <label for="name">名称</label>
        <el-input id="name" type="text" class="form-control" placeholder="请输入名称" v-model="name"></el-input>
        <div class="btn-wrapper">
            <el-button @click="saveCategory()">
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
            editflag: false
        };
    },
    methods: {
        close() {
            this._id = '';
            this.name = '';
            this.editflag = false;
            this.showflag = false;
        },
        show(category) {
            if (!isEmptyObject(category)) {
                this._id = category._id;
                this.name = category.name;
                this.editflag = true;
                console.log('edit!');
            }
            this.showflag = true;
        },
        saveCategory() {
            if (this.nane === '') {
                console.log(this.name);
                alert('名称不能为空！');
                return;
            }
            if (!this.editflag) {
                axios.post('/api/admin/addCategory', {
                    name: this.name
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
                axios.post('/api/admin/editCategory', {
                    _id: this._id,
                    name: this.name
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
.categoryPage {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 50;
    background-color: #fff;
}
.categoryPage h3 {
    font-size: 24px;
    margin-bottom: 10px;
}
.categoryPage .btn-wrapper {
    margin-top: 10px;
}
.categoryPage .el-input {
    margin: 10px 0;
}
</style>
