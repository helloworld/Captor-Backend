Clients = new Meteor.Collection('clients');
Messages = new Meteor.Collection('messages');
Router.route('/', function() {
    this.render('Home');
});
if (Meteor.isServer) {
    Router.route('/api/data', {
        where: 'server'
    }).get(function() {
        var req = this.request;
        var res = this.response;
        var query = req.query;
        if (query.username) {
            if (Clients.findOne({
                    username: query.username
                }) == undefined) {
                res.end("User does not exist");
            } else {
                var requestedUser = Clients.findOne({
                    username: query.username
                })
                console.log(requestedUser);
                currentHistory = requestedUser.history;
                history = {
                    history: currentHistory
                }
                currentHistory = JSON.stringify(currentHistory);
                res.end(currentHistory)
            }
        } else {
            res.end("Error: Invalid arguments for new user");
        }
    }).post(function() {
        var req = this.request;
        var res = this.response;
        var query = req.query;
        if (query.username && query.string) {
            if (Clients.findOne({
                    username: query.username
                }) == undefined) {
                res.end("User does not exist");
            } else {
                date = new Date;
                Clients.update({
                    username: query.username
                }, {
                    $push: {
                        history: {
                            text: query.string,
                            date: {
                                day: date.getDate() + "",
                                month:date.getMonth() + "",
                                year: date.getFullYear() + "",
                            }
                        }
                    }
                });
                res.end(query.string + " added");
            }
        } else {
            console.log(query)
            res.end("Error: Invalid arguments for new user");
        }
    });
    Router.route('/api/img', {
        where: 'server'
    }).get(function() {
        var req = this.request;
        var res = this.response;
        var query = req.query;
        if (query.username) {
            if (Clients.findOne({
                    username: query.username
                }) == undefined) {
                res.end("User does not exist");
            } else {
                var requestedUser = Clients.findOne({
                    username: query.username
                })
                console.log(requestedUser);
                requestedImages = requestedUser.history;
                images = {
                    images: requestedImages
                }
                requestedImages = JSON.stringify(requestedImages);
                res.end(requestedImages)
            }
        } else {
            res.end("Error: Invalid arguments for new user");
        }
    }).post(function() {
        var req = this.request;
        var res = this.response;
        var query = req.query;
        console.log(req)
        if (query.username && query.string) {
            if (Clients.findOne({
                    username: query.username
                }) == undefined) {
                res.end("User does not exist");
            } else {
                Clients.update({
                    username: query.username
                }, {
                    $push: {
                        images: {
                            text: query.string,
                            date: {
                                day: date.getDate() + "",
                                month:date.getMonth() + "",
                                year: date.getFullYear() + "",
                            }
                        }
                    }
                });
                res.end(query.string + " added");
            }
        } else {
            console.log(query)
            res.end("fail")
        }
    });
    Router.route('/api/createUser', {
        where: 'server'
    }).post(function() {
    var req = this.request;
    var res = this.response;
    var query = req.query;
    if (query.username) {
        if (Clients.findOne({
                username: query.username
            }) == undefined) {
            Clients.insert({
                username: query.username,
                history: []
            });
            res.end("User " + query.username + " created");
        } else {
            res.end("User already exists.")
        }
    } else {
        res.end("Error: Invalid arguments for new user");
    }
})
}
