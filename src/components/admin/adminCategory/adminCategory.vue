<template>
    <div class="adminCategory">
        <h2>分类列表</h2>
        <el-table
            :data="categorys"
            height="400"
            slot="暂无分类"
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
                label="操作"
                width="120">
                <template scope="scope">
                    <el-button type="text" size="small" @click="showpage(categorys[scope.$index])">编辑</el-button>
                    <el-button type="text" size="small" @click="{dialogVisible = true, currentIndex = scope.$index}">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button size="small" class="add" @click="showpage()">
            添加分类
        </el-button>
        <categoryPage ref="categoryPage"></categoryPage>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            size="tiny">
            <span>确定删除吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="danger" @click="deleteCategory()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import categoryPage from './categoryPage.vue';

export default {
    data() {
        return {
            categorys: [],
            dialogVisible: false,
            currentIndex: -5
        };
    },
    methods: {
        showpage(category) {
            let selectCategory = category || {};
            this.$refs.categoryPage.show(selectCategory);
        },
        deleteCategory() {
            this.dialogVisible = false;
            axios.get('/api/admin/deleteCategory', {
                params: {
                    _id: this.categorys[this.currentIndex]._id
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
        axios.get('/api/categorys').then((res) => {
            this.categorys = res.data.categorys;
            console.log(this.categorys);
        });
    },
    components: {
        categoryPage
    }
};
</script>

<style>
.adminCategory {
    position: relative;
}
.adminCategory h2 {
    font-size: 26px;
    margin-bottom: 15px;
}
.adminCategory .add {
    margin-top: 20px;
}
</style>
