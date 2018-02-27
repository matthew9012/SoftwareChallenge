'use strict';
module.exports = function(CustomUser) {
  var app = require('../../server/server');

  CustomUser.afterRemote('login', function(ctx, result, next) {
    console.log('after login...');
    CustomUser.find({
      where: {
        id: ctx.result.userId,
      },
    }, function(err, users) {
      // Check if user has an LCBO API token
      if (users[0].boozeApiKey) {
        result.hasApiToken = true;
        console.log('user has lcbo api token set');

        // Query for past view history on login
        app.models.ViewHistory.find({
          like: {
            userId: users[0].id,
          },
          order: 'viewDate DESC',
          limit: 100,
        }, function(err, history) {
          console.log('found '  + history.length + ' history items');
          var historyItems = [];
          for (var i = 0; i < history.length; i++) {
            historyItems.push({
              itemId: history[i].productId,
              userId: users[0].id,
            });
          }
          // Populate cache with last n viewed items
          app.models.ViewedItemCache.create(historyItems, function(err, success) {
            if (err) console.log(err);
            if (success) console.log(success);
          });
        });
      } else {
        result.hasApiToken = false;
      }
      next();
    });
  });
};
