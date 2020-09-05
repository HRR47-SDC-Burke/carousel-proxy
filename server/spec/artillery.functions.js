const randomListingID = (context, events, done) => {
  context.vars['id'] = Math.ceil(Math.random() * 10000000);
  return done();
}

module.exports = randomListingID;
