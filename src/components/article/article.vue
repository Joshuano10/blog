<template>
    <div class="article">
        <div class="wrapper">
            <h2>文章列表</h2>
            <ul class="content">
                <li v-for="article in selectedArticles" @click="viewArticle(article)">
                    <el-card class="box-card">
                        <div class="title">{{article.title}}</div>
                        <div class="desc" v-show="article.description">
                            描述：{{article.description}}
                        </div>
                        <span class="category">分类：{{article.category.name}}</span>
                        <span class="time">{{article.time}}</span>
                    </el-card>
                </li>
            </ul>
            <p class="empty" v-show="!selectedArticles.length">暂无文章</p>
        </div>
        <div class="categoryList" v-show="categorys.length>1">
            <ul>
                <p>分类列表</p>
                <li @click="selectCategory()">全部分类</li>
                <li v-for="category in categorys" @click="selectCategory(category)">{{category.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            scrollPos: 0,
            articles: [],
            categorys: [],
            selectedArticles: [],
            showflag: false
        };
    },
    methods: {
        viewArticle(article) {
            this.scrollPos = document.body.scrollTop;
            this.$router.push('/view?_id=' + article._id);
        },
        selectCategory(category) {
            if (!category) {
                this.selectedArticles = this.articles;
                return;
            }
            this.selectedArticles = [];
            this.articles.forEach((article) => {
                if (article.category._id === category._id) {
                    this.selectedArticles.push(article);
                }
            });
        }
    },
    created() {
        axios.get('/api/articles').then((res) => {
            this.articles = res.data.articles;
            this.selectedArticles = this.articles;
        });
        axios.get('/api/categorys').then((res) => {
            this.categorys = res.data.categorys;
        });
    },
    activated() {
        document.body.scrollTop = this.scrollPos;
    }
};
</script>

<style>
.article {
    position: absolute;
    top: 118px;
    bottom: 0px;
    width: 100%;
    background-color: #fff;
}
.article .wrapper {
    width: 50%;
    height: 100%;
    margin: 0 auto;
}
.article h2 {
    font-size: 26px;
    margin: 20px 0 10px 20px;
}
.article .content li {
    cursor: pointer;
}
.article .el-card {
    position: relative;
    margin: 20px 0;
    padding: 15px;
    min-height: 100px;
    background-color: #F9FAFC;
}
.article .title {
    font-size: 24px;
    line-height: 26px;
    font-weight: 700;
    margin: 0 0 25px 2px;
    word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
}
.article .desc, .article .content {
    margin-bottom: 10px;
    line-height: 20px;
    font-size: 13px;
    color: #475669;
    font-weight: 500;
}
.article .desc {
    word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:5;
    -webkit-box-orient:vertical;
    overflow:hidden;
}
.article .time {
    position: absolute;
    bottom: 10px;
    left: 35px;
    font-size: 12px;
    color: #8492A6
}
.article .category {
    position: absolute;
    bottom: 10px;
    left: 190px;
    font-size: 12px;
    color: #8492A6
}
.empty {
    text-align: center;
    margin-top: 250px;
    color: #8492A6;
}
.article .categoryList {
    position: fixed;
    left: 20px;
    top: 185px;
    padding: 30px 30px 30px 20px;
    background-color: #F9FAFC;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.article .categoryList p {
    font-weight: 500;
    margin-bottom: 20px;
}
.article .categoryList li {
    cursor: pointer;
    font-size: 13px;
    line-height: 18px;
    margin: 10px 0 0 10px;
    color: #475669;
}
.article .categoryList li:active {
    color: #387195;
    text-decoration: underline;
    font-weight: 700;
}
</style>
