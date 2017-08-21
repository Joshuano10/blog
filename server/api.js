const express = require('express');
const db = require('./db.js');
const bodyParser = require('body-parser');


const router = express.Router();
const jsonParser = bodyParser.json();

// article
router.post('/admin/login', jsonParser, (req, res) => {
    let username = req.body.username;
    let pwd = req.body.pwd;
    console.log(username + '  ' + pwd);
    db.User.findOne({username}, 'pwd', (err, doc) => {
        if (!doc) {
            res.json({
                errno: 1,
                message: '用户名不存在'
            });
        } else if (doc) {
            if (pwd === doc.pwd) {
                res.json({
                    errno: 0,
                    message: '登录成功'
                });
            } else {
                res.json({
                    errno: 2,
                    message: '密码错误'
                });
            }
        }
    });
});

router.post('/admin/addArticle', jsonParser, (req, res) => {
    let title = req.body.title;
    let category = req.body.category._id;
    let description = req.body.description;
    let content = req.body.content;
    let hContent = req.body.hContent;
    let time = req.body.time;
    db.Article.findOne({title}, (err, doc) => {
        if (doc) {
            res.json({
                errno: 1,
                message: '标题重复！'
            });
        } else {
            let article = new db.Article({
                title,
                category,
                description,
                content,
                hContent,
                time
            });
            article.save();
            res.json({
                errno: 0,
                message: '添加成功'
            });
        }
    });
});

router.post('/admin/editArticle', jsonParser, (req, res) => {
    let _id = req.body._id;
    let title = req.body.title;
    let category = req.body.category._id;
    let description = req.body.description;
    let content = req.body.content;
    let hContent = req.body.hContent;
    db.Article.findByIdAndUpdate(_id, {title, category, description, content, hContent}, (err, doc) => {
        if (err) {
            res.json({
                errno: 1,
                message: '编辑失败'
            });
        } else {
            res.json({
                errno: 0,
                message: '编辑成功'
            });
        }
    });
});

router.get('/admin/deleteArticle', (req, res) => {
    let _id = req.query._id;
    db.Article.remove({_id}, (err) => {
        if (err) {
            res.json({
                errno: 1,
                message: '删除失败'
            });
        } else {
            res.json({
                errno: 0,
                message: '删除成功'
            });
        }
    });
});

router.get('/articles', (req, res) => {
    if (!req.query._id && !req.query.category) {
        db.Article.find({}).populate('category').exec((err, doc) => {
            if (!doc) {
                res.json({
                    errno: 1,
                    message: '暂无文章'
                });
            } else if (doc) {
                res.json({
                    errno: 0,
                    articles: doc
                });
            }
        });
    } else if (req.query._id) {
        let _id = req.query._id;
        db.Article.findById(_id).populate('category').exec((err, doc) => {
            if (!doc) {
                res.json({
                    errno: 1,
                    message: '暂无文章'
                });
            } else if (doc) {
                res.json({
                    errno: 0,
                    articles: doc
                });
            }
        });
    }
});

// category
router.post('/admin/addCategory', jsonParser, (req, res) => {
    let name = req.body.name;
    db.Category.findOne({name}, (err, doc) => {
        if (doc) {
            res.json({
                errno: 1,
                message: '分类重复！'
            });
        } else {
            let category = new db.Category({
                name
            });
            category.save();
            res.json({
                errno: 0,
                message: '添加成功'
            });
        }
    });
});

router.post('/admin/editCategory', jsonParser, (req, res) => {
    let _id = req.body._id;
    let name = req.body.name;
    db.Category.findByIdAndUpdate(_id, {name}, (err, doc) => {
        if (err) {
            res.json({
                errno: 1,
                message: '编辑失败'
            });
        } else {
            res.json({
                errno: 0,
                message: '编辑成功'
            });
        }
    });
});

router.get('/admin/deleteCategory', (req, res) => {
    let _id = req.query._id;
    db.Category.remove({_id}, (err) => {
        if (err) {
            res.json({
                errno: 1,
                message: '删除失败'
            });
        } else {
            res.json({
                errno: 0,
                message: '删除成功'
            });
        }
    });
});

router.get('/categorys', (req, res) => {
    db.Category.find({}, (err, doc) => {
        if (!doc) {
            res.json({
                errno: 1,
                message: '暂无分类'
            });
        } else if (doc) {
            res.json({
                errno: 0,
                categorys: doc
            });
        }
    });
});

// work
router.post('/admin/addWork', jsonParser, (req, res) => {
    let name = req.body.name;
    let link = req.body.link;
    let demo = req.body.demo;
    let description = req.body.description;
    let img = req.body.img;
    db.Work.findOne({name}, (err, doc) => {
        if (doc) {
            res.json({
                errno: 1,
                message: '分类重复！'
            });
        } else {
            let work = new db.Work({
                name,
                link,
                demo,
                description,
                img
            });
            work.save();
            res.json({
                errno: 0,
                message: '添加成功'
            });
        }
    });
})

router.post('/admin/editWork', jsonParser, (req, res) => {
    let _id = req.body._id;
    let name = req.body.name;
    let link = req.body.link;
    let demo = req.body.demo;
    let description = req.body.description;
    let img = req.body.img;
    db.Work.findByIdAndUpdate(_id, {name, link, demo, description, img}, (err, doc) => {
        if (err) {
            res.json({
                errno: 1,
                message: '编辑失败'
            });
        } else {
            res.json({
                errno: 0,
                message: '编辑成功'
            });
        }
    });
});

router.get('/admin/deleteWork', (req, res) => {
    let _id = req.query._id;
    db.Work.remove({_id}, (err) => {
        if (err) {
            res.json({
                errno: 1,
                message: '删除失败'
            });
        } else {
            res.json({
                errno: 0,
                message: '删除成功'
            });
        }
    });
});

router.get('/works', (req, res) => {
    db.Work.find({}, (err, doc) => {
        if (!doc) {
            res.json({
                errno: 1,
                message: '暂无作品'
            });
        } else if (doc) {
            res.json({
                errno: 0,
                works: doc
            });
        }
    });
});

// router.post('/updateimg', jsonParser, (req, res) => {
//
// })

module.exports = router;
