const passport = require('passport')
const passportJWT = require('passport-jwt')
const config = require('../../config')

module.exports = (knex) => {
  // const knexConfig = require('../../knexfile').development
  // const knex = require('knex')(knexConfig)

  /**
   * @description jwt strategy, under the hoods, checks the auth header bearer token.
   * see if that is a valid JWT token (i.e. the signature part is signed using the key
   * config.jwtSecretUsedForSigning)
   */
  const strategy = new passportJWT.Strategy(
    {
      secretOrKey: config.jwtSecretUsedForSigning,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    // after it verified the token is valid
    // passport will execute this function by supplying the decoded jwt payload
    async (payload, done) => {
      // console.log(payload);
      
      let query = knex.from('users')
     

      query.then(users => {

        // console.log(users)

        // check if the user exists in the local memory (imported from ./users)
        // you should use a real database instead. and hash the passwords
        const user = users.find(u => u.id === payload.id)
        
        if (user) {
          // console.log(user,'sdffsfdfsd')

          return done(null, user)
          // after the user object is done(), you can access it in other routers using req.user
        } else {
          return done(new Error('User Not Found!'), null)
        }
      })
    }
  )

  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    /**
     * authenticate
     * @description this middleware applies the strategy defined above, to do authentication
     */
    authenticate: function () {
      // jwt is a session-less authentication method
      return passport.authenticate('jwt', {
        session: false
      })
    }
  }
}
