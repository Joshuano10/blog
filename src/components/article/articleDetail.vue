<template>
    <div class="articleDetail">
        <div class="wrapper">
            <h2>{{article.title}}</h2>
            <div class="info">
                <span>分类：{{article.category.name}}</span>
                <span>时间：{{article.time}}</span>
            </div>
            <div class="content">
                <p v-html="article.hContent"></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getQueryString} from '../../util/url.js';

export default {
    data() {
        return {
            article: {}
        };
    },
    activated() {
        console.log(getQueryString('_id'));
        axios.get('/api/articles', {
            params: {
                _id: getQueryString('_id')
            }
        }).then((res) => {
            console.log(res.data);
            if (res.data.errno === 0) {
                this.article = res.data.articles;
            } else {

            }
        });
    }
};
</script>

<style>
.articleDetail {
    position: absolute;
    top: 118px;
    bottom: 0px;
    width: 100%;
    background-color: #fff;
}
.articleDetail .wrapper {
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;
    word-wrap: break-word;
    background-color: #f6f6f6;
}
.articleDetail h2 {
    font-size: 30px;
    font-weight: 700;
    margin: 20px;
    line-height: 40px;
    text-align: center;
}
.articleDetail .info {
    text-align: center;
}
.articleDetail .info span {
    font-size: 14px;
    text-align: center;
    margin-right: 20px;
}
.articleDetail .content {
    margin: 20px 60px;
    padding-bottom: 20px;
    font-size: 16px;
    line-height: 26px;
}
</style>
