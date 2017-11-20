let express         = require('express')
let app             = express()
let port            = 3000
let passport        = require('passport')
let passportConfig  = require( __dirname + "/config/passport.js")
let morgan          = require('morgan')
let cookieParser    = require('cookie-parser')
let bodyParser      = require('body-parser')
let session         = require('express-session')
let ejs             = require('ejs')



// middleware
app.use(morgan('dev'))// used for logging requests the console
app.use(cookieParser()) // used for reading cookies from localStorage
app.use(bodyParser.json()) // used for parsing the body of HTTP requesets
app.use(bodyParser.urlencoded({
    extended : false
})) // used for parsing encoded URLS

// middleware for passport
app.use(session({ // this is the session manager. not to be used in production. use a key-value database instead
    secret : "ideally-this-should-be-a-hash",
    saveUninitialized : false,
    resave : true
}))

app.use(passport.initialize())
app.use(passport.session())


// for templating
app.set('view engine', 'ejs')
app.set('views', __dirname + "/../client/views")

// for serving static files like css, js, images, etc
app.use(express.static(__dirname + "/../client/public"))
app.use(express.static(__dirname + "/../node_modules/js-datepicker"))
app.use(express.static(__dirname + "/../client/js"))


app.get('/', function(req, res){
    res.render('index')
})

app.get('/login', function(req, res){
    res.render('login')
})

app.get('/profile', function(req, res){
    res.json(req.user || "there is no user")
})

app.get('/date', function(req, res){
    res.render('date')
})

// protected routes
app.get('/protected', isLoggedIn, function(req, res){
    res.send('hello world from protected')
})


// configure passport
passportConfig(passport)

app.get('/auth/facebook', passport.authenticate('facebook', {   
    scope : ['public_profile', 'email']
}))


app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })
)


app.get('/logout', function(req,res){
    req.logout()
    res.redirect('/')
})

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }    
    return res.redirect('/')
}

app.listen(port, function(err){
    if (err){
        console.log("error: ", err)
    }
    console.log("server is running on port", port)
})
