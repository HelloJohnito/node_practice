var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Spaceground    = require("./models/spaceground"),
    User           = require("./models/user"),
    Comment        = require("./models/comment"),
    seedDB         = require("./seeds"),
    flash          = require("connect-flash");

var commentRoutes = require('./routes/comment_routes'),
    spacegroundRoutes = require('./routes/spaceground_routes'),
    indexRoutes = require('./routes/index_routes');



//APP CONFIG
mongoose.Promise = global.Promise; // gets rid of deprecation error
mongoose.connect("mongodb://localhost/camp");  //creates the mongodb
app.use(bodyParser.urlencoded({extended: true})); // allows body parser
app.use(express.static(__dirname + "/public")); //for css
app.use(methodOverride("_method")); // creating puts and delete requests
app.use(flash()); // flash message
app.set("view engine", "ejs");

//seed data
// seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Sentence used to encode and decode.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//add currentuser to every template
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use('/spacegrounds', spacegroundRoutes);
app.use('/spacegrounds/:id/comments', commentRoutes);



app.listen("3000", function(){
  console.log("Server has started");
});
