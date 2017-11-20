let LocalStrategy = require('passport-local').Strategy
let FacebookStrategy = require('passport-facebook').Strategy
let configAuth = require(__dirname + "/auth.js")

var USER;


module.exports = function(passport){
    
    passport.serializeUser(function(user, done){
        done(null, USER)
    })
    
    passport.deserializeUser(function( id, done){
        done(null, USER)

    })

    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    
    
    },
    function(token, refreshToken, profile, done){
        process.nextTick(function(){
            
            console.log(profile)
            USER = profile;

            return done(null, USER)
    
        })
    }))
}




