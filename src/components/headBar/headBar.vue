<template>
    <div class="headBar">
        <ul>
            <li class="item"><router-link to="/index">主页</router-link></li>
            <li class="item"><router-link to="/article">文章</router-link></li>
            <li class="item"><router-link to="/works">作品</router-link></li>
            <li class="item"><router-link to="/admin">管理</router-link></li>
            <li class="item"><router-link to="/about">关于</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
};
</script>

<style>
.headBar .item {
    display: inline-block;
    margin-right: 25px;
}
.headBar a {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
}
.headBar .act {
    background-color: #eaeaea;
    color: #4e97dc;
}
</style>
