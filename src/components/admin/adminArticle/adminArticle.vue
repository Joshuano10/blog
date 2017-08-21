<template>
    <div class="adminArticle">
        <h2>文章列表</h2>
        <el-table
            :data="articles"
            height="400"
            slot="暂无文章"
            style="width:100%">
            <el-table-column
                prop="_id"
                label="id">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="category.name"
                label="分类">
            </el-table-column>
            <el-table-column
                prop="time"
                label="时间">
            </el-table-column>
            <el-table-column
                prop="hit"
                label="阅读量">
            </el-table-column>
            <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                    <el-button type="text" size="small" @click="showpage(articles[scope.$index])">编辑</el-button>
                    <el-button type="text" size="small" @click="{dialogVisible = true, currentIndex = scope.$index}">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button size="small" class="add" @click="showpage()">
            添加文章
        </el-button>
        <articlePage ref="articlePage"></articlePage>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            size="tiny">
            <span>确定删除吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="danger" @click="deleteArticle()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import articlePage from './articlePage.vue';

export default {
    data() {
        return {
            // addflag: false,
            articles: [],
            dialogVisible: false,
            currentIndex: -5
        };
    },
    methods: {
        showpage(article) {
            let selectArticle = article || {};
            this.$refs.articlePage.show(selectArticle);
        },
        deleteArticle() {
            this.dialogVisible = false;
            // console.log(this.currentIndex);
            axios.get('/api/admin/deleteArticle', {
                params: {
                    _id: this.articles[this.currentIndex]._id
                }
            }).then((res) => {
                if (res.data.errno === 0) {
                    this.dialogVisible = false;
                    alert('删除成功！');
                    window.location.reload();
                } else {
                    alert(res.data.message);
                }
            });
        }
    },
    created() {
        axios.get('/api/articles').then((res) => {
            // console.log(res);
            this.articles = res.data.articles;
        });
    },
    components: {
        articlePage
    }
};
</script>

<style>
.adminArticle {
    position: relative;
    /*padding: 30px 0 0 20px;*/
}
.adminArticle h2 {
    font-size: 26px;
    margin-bottom: 15px;
}
.adminArticle .add {
    margin-top: 20px;
}
</style>
