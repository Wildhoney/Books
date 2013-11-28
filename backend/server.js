var mysql   = require('mysql'),
    socket  = require('socket.io');

// Establish a connection to our MySQL database.
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'books'
});

connection.connect(function(error) {

    // Begin listening on port 8888 for Socket clients.
    var io = socket.listen(8888);

    io.sockets.on('connection', function (socket) {

        /**
         * @method getBooks
         * @return {void}
         */
        var getBooks = function getBooks() {

            // Load all of the books into the application.
            connection.query('SELECT books.*, book_user.user_id AS reader_id ' +
                'FROM books LEFT JOIN book_user ' +
                'ON (books.id = book_user.book_id AND book_user.active = 1)', function(error, result) {
                io.sockets.emit('data/books/loaded', result);
            });

        };

        // Listen for the initiation of the Facebook handshake.
        socket.on('facebook/handshake/initiate', function(data) {

            var crypto  = require('crypto'),
                token   = crypto.createHash('md5').update(data.auth.userID).digest('hex');

            // Use the MD5'd token.
            data.token = token;
            delete data.auth;

            // Insert the user into the database, if s/he doesn't exist already.
            connection.query('INSERT INTO users SET ?', data, function(error, result) {

                console.log(data.token);

                connection.query('SELECT * FROM users WHERE token = ?', data.token, function(error, data) {

                    // Notify everybody that we've completed the handshake.
                    socket.emit('facebook/handshake/complete', token, data[0].id);

                });

            });

        });

        // Requesting all of the data to be loaded!
        socket.on('data/all/request', function() {

            getBooks();

            // Load all of the users into the application.
            connection.query('SELECT * FROM users', function(error, result) {
                socket.emit('data/users/loaded', result);
            });

        });

        // Adding a new book to the collection!
        socket.on('data/book/add', function(model, token) {

            connection.query('SELECT * FROM users WHERE token = ?', token, function(error, data) {

                // Set the user ID!
                model.user_id = data[0].id;

                // Insert the book into the database.
                connection.query('INSERT INTO books SET ?', model, function(error, result) {
                    getBooks();
                });

            });

        });

        // When a user takes a book to read.
        socket.on('data/reading/start', function(model, token) {

            connection.query('SELECT * FROM users WHERE token = ?', token, function(error, data) {

                // Set the user ID!
                model.user_id = data[0].id;

                // Insert the book into the database.
                connection.query('INSERT INTO book_user SET ?', model, function(error, result) {
                    io.sockets.emit('data/reading/started', model.user_id, model.book_id);
                });

            });

        });

        // When a user takes a book to read.
        socket.on('data/reading/finish', function(model, token) {

            connection.query('SELECT * FROM users WHERE token = ?', token, function(error, data) {

                // Set the user ID!
                model.user_id   = data[0].id;
                model.active    = 1;

                // Insert the book into the database.
                connection.query('UPDATE book_user SET active = 0 WHERE book_id = ? AND user_id = ? AND active = 1',
                                 [model.book_id, model.user_id], function(error, result) {

                    io.sockets.emit('data/reading/finished', model.user_id, model.book_id);
                });

            });

        });

    });

});