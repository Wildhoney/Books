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

        // Listen for the initiation of the Facebook handshake.
        socket.on('facebook/handshake/initiate', function(data) {

            // Insert the user into the database, if s/he doesn't exist already.
            connection.query('INSERT INTO users SET ?', data, function(error, result) {

                // Notify everybody that we've completed the handshake.
                socket.emit('facebook/handshake/complete');

            });

        });

        // Requesting all of the data to be loaded!
        socket.on('data/all/request', function() {

            // Load all of the books into the application.
            connection.query('SELECT books.*, book_user.user_id AS reader_id ' +
                             'FROM books LEFT JOIN book_user ' +
                             'ON books.id = book_user.book_id', function(error, result) {
                socket.emit('data/books/loaded', result);
            });

            // Load all of the users into the application.
            connection.query('SELECT * FROM users', function(error, result) {
                socket.emit('data/users/loaded', result);
            });

        });

    });

});