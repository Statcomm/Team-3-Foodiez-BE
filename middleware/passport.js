const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
  } catch (error) {
    done(error);
  }
});
