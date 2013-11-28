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
                'ON books.id = book_user.book_id', function(error, result) {
                socket.emit('data/books/loaded', result);
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

                // Notify everybody that we've completed the handshake.
                socket.emit('facebook/handshake/complete', token);

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

            console.log(token);

            connection.query('SELECT * FROM users WHERE token = ?', token, function(error, data) {

                // Set the user ID!
                model.user_id = data[0].id;

                // Insert the book into the database.
                connection.query('INSERT INTO books SET ?', model, function(error, result) {
                    console.log(error);
                    getBooks();
                });

            });


        });

    });

});