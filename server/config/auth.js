module.exports = {

    'facebookAuth' : {
        'clientID'      : '686369048200032', // your App ID
        'clientSecret'  : '573f530fcde1729482a6d8ff2af70bb2', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    }
}
