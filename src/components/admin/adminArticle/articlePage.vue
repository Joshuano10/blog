<template>
    <div class="articlePage" v-show="showflag">
        <h3>编辑页面</h3>
        <label for="title">标题</label>
        <el-input id="title" type="text" class="form-control" placeholder="请输入标题" v-model="title"></el-input>
        <label>分类</label><br>
        <el-select v-model="category._id" placeholder="请选择分类">
            <el-option
              v-for="item in categorys"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
        </el-select>
        <br>
        <label for="description">描述</label>
        <el-input id="description" type="textarea" class="form-control" placeholder="请输入描述(选填)" :rows="2" resize="none" v-model="description"></el-input>
        <label for="content">内容</label>
        <div class="content" id="content">
            <!-- <mavon-editor v-model="content" ref="editor" @imgAdd="$imgAdd" @imgDel="$imgDel"/> -->
            <mavon-editor v-model="content" ref="editor" :subfield="false"  :toolbars="{bold: true,italic: true,header: true,underline: true,strikethrough: true,mark: true, quote: true,link: true, code: true, table: true,htmlcode: true,help: true,undo: true,redo: true, alignright: true,trash: true, alignleft: true,aligncenter: true,preview: true}"/>
        </div>
        <!-- <el-input id="content" type="textarea" class="form-control" placeholder="请输入内容" :rows="8" resize="none" v-model="content"></el-input> -->
        <div class="btn-wrapper">
            <el-button @click="saveArticle()">
                保存
            </el-button>
            <el-button @click="close()">
                取消
            </el-button>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import {isEmptyObject} from '../../../util/isEmpty.js';
import {formatDate} from '../../../util/date.js';

export default {
    data() {
        return {
            categorys: [],
            showflag: false,
            _id: '',
            category: {_id: ''},
            title: '',
            description: '',
            content: '',
            editflag: false,
            img_file: {}
        };
    },
    // computed: {
    //     category() {
    //         return this.value;
    //     }
    // },
    methods: {
        close() {
            this._id = '';
            this.title = '';
            this.category = {};
            this.description = '';
            this.content = '';
            this.editflag = false;
            this.showflag = false;
        },
        show(article) {
            if (!isEmptyObject(article)) {
                this._id = article._id;
                this.title = article.title;
                this.category = article.category;
                this.description = article.description;
                this.content = article.content;
                this.editflag = true;
            }
            this.showflag = true;
        },
        saveArticle() {
            if (this.title === '' || this.content === '' || this.category._id === '') {
                alert('名称，分类，内容不能为空！');
                return;
            }
            if (!this.editflag) {
                axios.post('/api/admin/addArticle', {
                    title: this.title,
                    category: this.category,
                    description: this.description,
                    content: this.$refs.editor.d_value,
                    hContent: this.$refs.editor.d_render,
                    time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
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
                axios.post('/api/admin/editArticle', {
                    _id: this._id,
                    title: this.title,
                    category: this.category,
                    description: this.description,
                    content: this.$refs.editor.d_value,
                    hContent: this.$refs.editor.d_render
                })
                .then((res) => {
                    if (res.data.errno === 0) {
                        alert('编辑成功！');
                        window.location.reload();
                        this.close();
                    } else {
                        alert(res.data.message);
                    }
                });
            }
            // console.log(this.img_file);
            // var formdata = new FormData();
            // for (var _img in this.img_file) {
            //     formdata.append(_img, this.img_file[_img]);
            // }
            // console.log(formdata);
            // axios({
            //     url: '/api/updateimg',
            //     method: 'post',
            //     data: formdata,
            //     headers: { 'Content-Type': 'multipart/form-data' }
            // }).then((res) => {
            //     console.log(res);
            // });
        }
        // $imgAdd(pos, $file) {
        //     this.img_file[pos] = $file;
        // },
        // $imgDel(pos) {
        //     delete this.img_file[pos];
        // }
    },
    created() {
        axios.get('/api/categorys').then((res) => {
            this.categorys = res.data.categorys;
            // console.log(this.categorys);
        });
    }
};
</script>

<style>
.articlePage {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 50;
    background-color: #fff;
}
.articlePage h3 {
    font-size: 24px;
    margin-bottom: 10px;
}
.articlePage .btn-wrapper {
    margin-top: 120px;
}
.articlePage .el-input, .articlePage .el-textarea {
    margin: 10px 0;
}
.articlePage .content {
    margin-top: 10px;
    width: 100%;
    height: 100px;
}
.articlePage .v-note-wrapper{
    min-width: 200px;
    min-height: 200px;
    max-height: 200px;
}
</style>
