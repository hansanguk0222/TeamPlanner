import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { userModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/contants';
import bcrypt from 'bcrypt';
import config from '@/config';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default () => {
  // Local Strategy, 요것은 로그인 할 때 쓴다
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'pw',
      },
      async (email, pw, done) => {
        try {
          const [[user]] = await userModel.login({ email });
          const isMatch = await bcrypt.compare(pw, user.pw);
          if (!isMatch) {
            return done(null, false, { message: ERROR_MESSAGE.NOT_EXIST_USER });
          }
          return done(null, user);
        } catch (err) {
          done(err);
        }
      },
    ),
  );

  // JWT Strategy, 요것은 미들웨어 용으로 토큰 유효한지 검증할 때 쓴다.
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret,
      },
      async (jwtPayload, done) => {
        try {
          const [user] = await userModel.getUserById({ id: +jwtPayload.id });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientPw,
        callbackURL: 'http://localhost:8080/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        return done('null', profile);
      },
    ),
  );
};
