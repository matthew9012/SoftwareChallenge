'use strict';

module.exports = function(app, req, res, next) {
  if (!req.userIdFromSession) {
    res.statusCode = 401;
    res.send('Not authenticated');
    next();
  } else {
    app.models.CustomUser.find({where: {id: req.userIdFromSession}},
      function(err, users) {
        console.log('user(s) from session Id: ');
        console.log(users);
        app.dataSources.lcboApiSearch.search(req.params.query, users[0].boozeApiKey)
        .then(function(response) {
          res.send(response);
        })
        .catch((error) => res.send(error));
      });
  }
};
