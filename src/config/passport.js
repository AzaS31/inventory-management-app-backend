import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import prisma from './database.js'; 

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) return done(null, false, { message: 'Incorrect email or password.' });

            if (!user.password)  return done(null, false, { message: 'User registered via social network. Use social login.' });
            
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