const express = require("express")
const { v4: uuidv4 } = require('uuid');
const app = express()


var methodOverride = require('method-override')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))



app.use(express.urlencoded({extended:true}))
app.use(express.json())


path = require("path")
app.set("view engine","ejs")
app.set("views", path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"/public")))

const port = 8080;



posts = [
    {
        id: uuidv4(),
        username: "vamshi",
        content: "Building something new today. Let’s make it worth it!"
    },
    {
        id: uuidv4(),
        username: "rajesh",
        content: "Good food. Good mood. That’s the rule."
    },
    {
        id: uuidv4(),
        username: "ramesh",
        content: "Small efforts every day create big change. Keep going!"
    },
    {
        id: uuidv4(),
        username: "ramu",
        content: "Working smarter today. Productivity mode ON."
    },
];

app.get("/",(req,res)=>{
    res.render("home.ejs")
})
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p) => id === p.id )
    if (posts.find((p) => id === p.id )) {
        // console.log(post)
        res.render("show.ejs",{post})   
    } else {
        res.render("error.ejs")
    }
})


app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params
    console.log(req.body)
    let NewContent  = req.body.content
    let post = posts.find((p) => id === p.id )
    post.content = NewContent
    console.log(post)
    // console.log(content)
    res.redirect("/posts")
})
app.get("/posts/:id/update",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p) => id === p.id )
    res.render("update.ejs",{post})
})



app.post("/posts",(req,res)=>{
    let {username,content}=req.body
    let id = uuidv4();
    posts.push({id:id,username:username,content:content})
    // res.send(`response recieved`)
    res.redirect("/posts")
    // console.log("The list is :")
    // console.log(posts)
})


app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params
    posts = posts.filter((p) => id !== p.id )
    console.log(posts)
    res.redirect("/posts")
})


app.get("*",(req,res)=>{
    res.render("error.ejs")
})



app.listen(port,()=>{
    console.log(`port is listening on port :${port}`)
})