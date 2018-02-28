'use strict';

module.exports = function(ViewHistory) {
  var app = require('../../server/server');
  ViewHistory.observe('after save', function(ctx, next) {
    if (ctx.instance) {
      console.log('updating cache');
      app.models.ViewedItemCache.create({
        userId: ctx.instance.userId,
        itemId: ctx.instance.productId,
      });
    }
    next();
  });
};
