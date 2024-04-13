require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const PORT = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const userdb = require("./model/userSchema");

const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;
const gmapkey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	})
);

app.use(express.json());

// setup session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new OAuth2Strategy(
		{
			clientID: clientid,
			clientSecret: clientsecret,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await userdb.findOne({ googleId: profile.id });

				if (!user) {
					user = new userdb({
						googleId: profile.id,
						displayName: profile.displayName,
						email: profile.emails[0].value,
						image: profile.photos[0].value,
					});

					await user.save();
				}

				return done(null, user);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

// initial google ouath login
app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:5173/home/",
		failureRedirect: "http://localhost:5173/",
	})
);

app.get("/login/success", async (req, res) => {
	if (req.user) {
		res.status(200).json({ message: "User Login", user: req.user });
	} else {
		res.status(400).json({ message: "Not Authorized" });
	}
});

app.use((req, res, next) => {
	res.setHeader("Cache-Control", "no-store");
	next();
});

app.get("/logout", (req, res) => {
	req.logout(); 
	res.clearCookie("connect.sid"); 
	res.redirect("https://accounts.google.com/logout"); 
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
