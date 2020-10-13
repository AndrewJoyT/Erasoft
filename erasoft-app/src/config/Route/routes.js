const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// initial
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// setup & connect db
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'erasoft_app'
})
db.getConnection((err)=>{
    if(err) throw err;
    console.log("Database connect")
});
// endpoin rest api
// table user
app.get('/user',(req,res)=>{  
    const query = "SELECT * FROM user";
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
app.get('/user/:email',(req,res)=>{
    const query = `SELECT * FROM user WHERE email='${req.params.email}'`
    db.query(query,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send(result[0])
        }else{
            res.send(false)
        }
    })
})
app.get('/user/id/:id',(req,res)=>{
    const query = `SELECT * FROM user WHERE id='${req.params.id}'`
    db.query(query,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send(result[0])
        }else{
            res.send(false)
        }
    })
})
app.post('/user',(req,res)=>{
    const query=`INSERT INTO user VALUE(
                "",
                "${req.body.name}",
                "${req.body.email}",
                "${req.body.password}")`
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// table article
app.get('/article',(req,res)=>{
    const query = "SELECT * FROM article ORDER BY date_created DESC";
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
app.get('/article/:id',(req,res)=>{
    const query = `SELECT * FROM article WHERE id="${req.params.id}"`;
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result[0])
    })
})
app.get('/article/user/:id',(req,res)=>{
    const query = `SELECT * FROM article WHERE user_id="${req.params.id}"`;
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
app.post('/article',(req,res)=>{
    const query = `INSERT INTO article VALUE(
                    "",
                    "${req.body.title}",
                    "${req.body.content}",
                    "${req.body.user_id}",
                    "${req.body.views}",
                    "${req.body.comments}",
                    "${new Date().getTime()}")`
    db.query(query,(err,result)=>{
        if(err)throw err;
        res.send(result)
    })
})
app.put('/article/:id',(req,res)=>{
    const query = `UPDATE article SET 
                    title="${req.body.title}",
                    content="${req.body.content}",
                    views="${req.body.views}",
                    comments="${req.body.comments}"
                    WHERE id="${req.params.id}"`
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
app.delete('/article/:id',(req,res)=>{
    const query = `DELETE FROM article WHERE id="${req.params.id}"`
    db.query(query,(err,result)=>{
        if(err)throw err
        res.send(result)
    })
})

// table comment
app.post('/comment',(req,res)=>{
    const query = `INSERT INTO comment VALUE(
                    "",
                    "${req.body.user_id}",
                    "${req.body.text}",
                    "${req.body.article_id}",
                    "${new Date().getTime()}")`
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
app.get('/comment/article_id/:id',(req,res)=>{
    const query = `SELECT * FROM comment WHERE article_id="${req.params.id}"`
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
app.put('/comment/:id',(req,res)=>{
    const query = `UPDATE comment SET 
                    text="${req.body.text}"
                    WHERE id="${req.params.id}"`
    db.query(query,(err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
app.delete('/comment/:id',(req,res)=>{
    const query = `DELETE FROM comment WHERE id="${req.params.id}"`
    db.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/',(req,res)=>{
    res.send("HAllo")
})
app.listen(3000,()=>{
    console.log('running port 3000')
})