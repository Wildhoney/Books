<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Alex & Alexa: Books</title>

    <link href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic" rel="stylesheet" type="text/css">

    <script type="text/javascript" src="http://connect.facebook.net/en_US/all.js"></script>
    <script type="text/javascript" src="../../bower_components/angular/angular.js"></script>
    <script type="text/javascript" src="../../bower_components/angular-route/angular-route.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/controllers/ApplicationController.js"></script>
    <script type="text/javascript" src="js/controllers/FacebookController.js"></script>
    <script type="text/javascript" src="js/services/Facebook.js"></script>
    <script type="text/javascript" src="js/services/Auth.js"></script>

    <link rel="stylesheet" type="text/css" href="css/default.css" />
    <link rel="stylesheet" type="text/css" href="css/views/facebook.css" />
    <link rel="stylesheet" type="text/css" href="css/modules/navigation.css" />
    <link rel="stylesheet" type="text/css" href="css/modules/filters.css" />
    <link rel="stylesheet" type="text/css" href="css/modules/collection.css" />

    <link rel="stylesheet" type="text/css" href="../../bower_components/skeleton/stylesheets/base.css" />
    <link rel="stylesheet" type="text/css" href="../../bower_components/skeleton/stylesheets/skeleton.css" />
    <link rel="stylesheet" type="text/css" href="../../bower_components/skeleton/stylesheets/layout.css" />

</head>
<body ng-app="bookApp">

    <div class="sixteen columns header" ng-class="{loaded: (connected === true)}">
        Welcome to Alex &amp; Alexa: Books!
    </div>

    <div class="container" ng-view>

    
    </div>

</body>
</html>
