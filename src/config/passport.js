import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import prisma from './database.js';
import { config } from 'dotenv';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookStrategy } from 'passport-facebook';

config();

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) return done(null, false, { message: 'Incorrect email or password.' });

      if (!user.password) return done(null, false, { message: 'User registered via social network. Use social login.' });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return done(null, false, { message: 'Incorrect email or password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true }
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// === GOOGLE ===
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value;

//         let user = await prisma.user.findUnique({ where: { email } });

//         if (!user) {
//           user = await prisma.user.create({
//             data: {
//               email,
//               username: profile.displayName,
//               googleId: profile.id,
//               roleId: 1,
//             },
//           });
//         }

//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

// === FACEBOOK ===
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: `${process.env.BACKEND_URL}/api/auth/facebook/callback`,
//       profileFields: ["id", "displayName", "emails"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value;

//         let user = await prisma.user.findUnique({ where: { email } });

//         if (!user) {
//           user = await prisma.user.create({
//             data: {
//               email,
//               username: profile.displayName || "Unknown",
//               facebookId: profile.id,
//               roleId: 1,
//             },
//           });
//         }

//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

export default passport;