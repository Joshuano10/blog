<template>
    <div class="adminWork">
        <h2>作品列表</h2>
        <el-table
            :data="works"
            height="400"
            slot="暂无作品"
            style="width:100%">
            <el-table-column
                prop="_id"
                label="id">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称">
            </el-table-column>
            <el-table-column
                prop="description"
                label="描述">
            </el-table-column>
            <el-table-column
                prop="img"
                label="图片">
            </el-table-column>
            <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                    <el-button type="text" size="small" @click="showpage(works[scope.$index])">编辑</el-button>
                    <el-button type="text" size="small" @click="{dialogVisible = true, currentIndex = scope.$index}">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button size="small" class="add" @click="showpage()">
            添加作品
        </el-button>
        <workPage ref="workPage"></workPage>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            size="tiny">
            <span>确定删除吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="danger" @click="deleteWork()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import workPage from './workPage.vue';

export default {
    data() {
        return {
            works: [],
            dialogVisible: false,
            currentIndex: -5
        };
    },
    methods: {
        showpage(work) {
            let selectWork = work || {};
            this.$refs.workPage.show(selectWork);
        },
        deleteWork() {
            this.dialogVisible = false;
            axios.get('/api/admin/deleteWork', {
                params: {
                    _id: this.works[this.currentIndex]._id
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
        axios.get('/api/works').then((res) => {
            this.works = res.data.works;
        });
    },
    components: {
        workPage
    }
};
</script>

<style>
.adminWork {
    position: relative;
}
.adminWork h2 {
    font-size: 26px;
    margin-bottom: 15px;
}
.adminWork .add {
    margin-top: 20px;
}
</style>
