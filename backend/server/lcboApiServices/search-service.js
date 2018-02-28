'use strict';

module.exports = function(app, req, res, next) {
  if (!req.userIdFromSession) {
    res.statusCode = 401;
    res.send('Not authenticated');
    next();
  } else {
    app.models.CustomUser.find({
      where: {
        id: req.userIdFromSession,
      },
    },
      function(err, users) {
        console.log('user(s) from session Id: ');
        console.log(users);
        app.dataSources.lcboApiSearch.search(req.params.query, users[0].boozeApiKey)
          .then(function(response) {
            // get all item ids
            var itemIds = [];
            for (var i = 0; i < response.result.length; i++) {
              itemIds.push(response.result[i].id);
            }
            app.models.ViewedItemCache.find({
              where: {
                and: [{
                  userId: req.userIdFromSession,
                }, {
                  itemId: {
                    inq: itemIds,
                  },
                }],
              },
            },
            function(err, cachedItems) {
              if (err) {
                res.send(response); // just return whatever we got from lcbo
              } else if (cachedItems) {
                var itemIdSet = new Set();
                for (var i = 0; i < cachedItems.length; i++) {
                  itemIdSet.add(parseInt(cachedItems[i].itemId));
                }
                console.log(itemIdSet);
                for (var j = 0; j < response.result.length; j++) {
                  if (itemIdSet.has(response.result[j].id)) {
                    response.result[j].hasBeenViewed = true;
                    console.log('found cached item: ' + response.result[j].id);
                  }
                }
              }
              res.send(response);
            });
          })
          .catch((error) => res.send(error));
      });
  }
};
