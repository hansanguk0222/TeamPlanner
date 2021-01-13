import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { userModel } from '@/models';
import { ERROR_MESSAGE, OK_MESSAGE } from '@/utils/contants';
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
          console.log(await bcrypt.hash(pw, 10));
          const isMatch = await bcrypt.compare(pw, user.pw);
          console.log(isMatch);
          if (!isMatch) {
            return done(null, false, { message: ERROR_MESSAGE.NOT_EXIST_USER });
          }
          return done(null, user, { message: OK_MESSAGE.LOGIN_SUCCESS });
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
          const [user] = await userModel.getUserById({ userId: +jwtPayload.id });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};
