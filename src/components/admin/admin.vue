<template>
    <div class="admin">
        <div class="left-wrapper">
            <!-- <h3>管理界面</h3>
            <ul>
                <li class="item"><router-link to="/admin/article">文章管理</router-link></li>
                <li class="item"><router-link to="login">退出登录</router-link></li>
            </ul>
            <vsplit></vsplit> -->
            <el-col :span="8">
                <el-menu default-active="1" class="el-menu-vertical-demo">
                    <router-link to="/admin/article"><el-menu-item index="1" selected>文章管理</el-menu-item></router-link>
                    <router-link to="/admin/category"><el-menu-item index="2">分类管理</el-menu-item></router-link>
                    <!-- <router-link to="/admin/category"><el-menu-item index="3">评论管理</el-menu-item></router-link> -->
                    <router-link to="/admin/work"><el-menu-item index="4">作品管理</el-menu-item></router-link>
                </el-menu>
            </el-col>
        </div>
        <div class="right-wrapper">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    components: {
    }
};
</script>

<style>
.admin {
    position: absolute;
    top: 118px;
    bottom: 0;
    width: 100%;
    display: flex;
    background-color: #fff;
}
.admin .left-wrapper {
    position: relative;
    flex: 0 0 150px;
    height: 100%;
}
.admin .el-col-8 {
    margin-top: 70px;
    width: 100%;
}
.admin .right-wrapper {
    flex: 1;
    padding: 30px 0 0 20px;
    /*margin: 30px 0 0 20px;*/
    /*position: absolute;
    left: 150px;
    top: 30px;*/
}
/*.admin .right-wrapper h2 {
    margin: 30px 0 0 20px;
}
.admin .right-wrapper .el-table {

}*/
.admin .el-menu-item.is-active{
    background-color: #d1dbe5;
}

</style>
