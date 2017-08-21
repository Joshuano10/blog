<template>
    <div class="login">
        <form class="form-horizontal">
            <h1>管理员登录</h1>
            <!-- <div class="form-group">
                <label for="inputUsername" class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-10">
                    <input type="username" class="form-control" id="inputUsername" placeholder="用户名" v-model="username">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword3" placeholder="密码" v-model="pwd">
                </div>
            </div>
            <p class="info">{{info}}</p>
            <div class="form-group login-btn">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-default" @click.prevent="login()">登录</button>
                </div>
            </div> -->
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名">
                    <el-input v-model="username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" auto-complete="off" v-model="pwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <p class="info">{{info}}</p>
                <el-form-item>
                    <el-button class="login-btn" @click.prevent="login()">登录</el-button>
                </el-form-item>
            </el-form>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            pwd: '',
            info: ''
        };
    },
    methods: {
        login() {
            axios.post('/api/admin/login', {
                username: this.username,
                pwd: this.pwd
            }).then((res) => {
                console.log(res.data.message);
                switch (res.data.errno) {
                    case 0:
                        this.info = '';
                        this.$store.commit('isLogin', {
                            username: this.username,
                            pwd: this.pwd
                        });
                        window.sessionStorage.setItem('user', JSON.stringify({
                            username: this.username,
                            pwd: this.pwd
                        }));
                        this.$router.push('../admin');
                        break;
                    case 1:
                    case 2:
                        this.info = res.data.message;
                        break;
                }
            });
        }
    }
};

</script>

<style>
.login {
    position: absolute;
    top: 119px;
    bottom: 20px;
    width: 100%;
    background-color: #fff;
}
.login h1 {
    font-size: 30px;
    text-align: center;
    margin-bottom: 50px;
}
.login .form-horizontal {
    position: relative;
    width: 80%;
    margin: 50px 0 0 100px;
}
.login .info {
    text-align: right;
    color: #ff0000;
}
.login .login-btn {
    margin-top: 10px;
    position: absolute;
    right: 0px;
}
</style>
