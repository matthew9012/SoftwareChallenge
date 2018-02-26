'use strict';
let token = 'MDpjZWMyMDlmYS0xOTllLTExZTgtOTFhZC01MzYxZDg2YTM' +
        'xNzk6akMxWXdZaUpOZ0VqeEhsa2RFY1RhaWFSUVJBbHo0alNrSUZu';

module.exports = function(app, req, res, next) {
  app.dataSources.lcboApiSearch.search(req.params.query, token)
    .then((response) => res.send(response)
    .catch((error) => res.send(error)));
};
