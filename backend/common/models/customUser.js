'use strict';

module.exports = function(CustomUser) {
  CustomUser.afterRemote('login', function(ctx, result, next) {
    CustomUser.find({where: {id: ctx.result.userId}}, function(err, users) {
      if (users[0].boozeApiKey) {
        result.hasApiToken = true;
      } else {
        result.hasApiToken = false;
      }
      next();
    });
  });
};
