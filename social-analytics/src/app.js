let express = require('express');
let twit = require('twit'); 


let app = express();

// use port 3000 if process.env.PORT is not available
let port = process.env.PORT || 3000;


app.get('/', function(req, res){
 
    let Twitter = twit({
        consumer_key:         'BeFoAu6uSrfrdbqZYLdj6WbNi',
        consumer_secret:      'H4VbGk6N6mbVs3XjKVanaASF09YWjmM7SE3C33I4em40xlIor2',
        access_token:         '1015107663695261696-5iLyh0RTOd1ekk0UKn2UdeKgxL6Poh',
        access_token_secret:  'nDVnX00tpNkfnLe5I4F9BGekoHIDcEc1shd9w6mfdlyow',
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
    })

    Twitter.get('search/tweets', { q: req.query.user_id, count: req.query.count }, function(err, data, response) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        var tweetObj = {
            text: []
        }

        for ( var dataNum = 0; dataNum < data.statuses.length; dataNum++ ) {
            tweetObj.text.push(data.statuses[dataNum].text);
        }

        var tweetJson = JSON.stringify(tweetObj);
        res.send(tweetJson);
    })

});

app.listen(port, function(){
    console.log("Running on PORT: " + port);
})