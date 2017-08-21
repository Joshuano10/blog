<template>
    <div class="works">
        <div class="wrapper">
            <h2>作品列表</h2>
            <el-carousel :interval="4000" type="card" height="500px" v-show="works.length">
                <el-carousel-item v-for="work in works" :key="work._id">
                  <h3>{{work.name}}</h3>
                  <img class="img" :src=work.img height="286">
                  <span class="href"><a :href=work.link>源码</a></span>
                  <span class="href"><a :href=work.demo>demo</a></span>
                  <p class="desc">{{work.description}}</p>
                </el-carousel-item>
              </el-carousel>
              <p class="empty" v-show="!works.length">暂无分类</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            works: []
        };
    },
    created() {
        axios.get('/api/works').then((res) => {
            if (res.data.errno === 0) {
                this.works = res.data.works;
            }
        });
    }
};
</script>

<style>
.works {
    position: absolute;
    top: 118px;
    bottom: 0px;
    width: 100%;
    background-color: #fff;
}
.works .wrapper {
    width: 70%;
    height: 100%;
    margin: 0 auto;
}
.empty {
    text-align: center;
    margin-top: 250px;
    color: #8492A6;
}
.works h2 {
    font-size: 26px;
    margin: 20px 0 10px 20px;
}
.works .el-carousel {
    margin-top: 20px;
}
.works .el-carousel__item{
    padding-top: 20px;
    background-color: #F9FAFC;
    border: 3px solid #d1dbe5;
    border-radius: 8px;
    overflow: hidden;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    text-align: center;
}
.works .el-carousel__item h3 {
    margin-top: 20px;
    color: #324057;
    font-size: 28px;
    opacity: 0.75;
    line-height: 28px;
    margin: 0;
}
.works .img {
    margin: 10px auto 20px;
    display: block;
}
.works .href {
    margin: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #324057;
}
.works .href a:visited,.works .href a:link {
    color: #324057;
}
.works .desc {
    font-size: 14px;
    line-height: 18px;
    word-wrap: break-word;
    margin: 10px 25px;
    color: #324057;
    text-align: left;
}
</style>
