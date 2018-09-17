

require("dotenv").config();
var fs = require('fs')
var request = require('request')

var Spotify = require('node-spotify-api')
var keys = require('./keys.js')
var spotify = new Spotify(keys.spotify)

function search(input, input2){
if (input === 'spotify-this-song') {
    var track = input2

    spotify.search({ type: 'track', query: track, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }



        if (data.tracks.items === undefined) {
            spotify.search({ type: 'track', query: 'The Sign Ace of Base', limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var artistName = data.tracks.items[0].album.artists[0].name
                var albumName = data.tracks.items[0].album.name
                var trackName = data.tracks.items[0].name
                var preview = data.tracks.items[0].preview_url

                console.log('Artist/Band: ' + artistName)
                console.log('Album Name: ' + albumName)
                console.log('Song Name: ' + trackName)
                console.log('Preview Url: ' + preview)
            })
        }
        else {
            var artistName = data.tracks.items[0].album.artists[0].name
            var albumName = data.tracks.items[0].album.name
            var trackName = data.tracks.items[0].name
            var preview = data.tracks.items[0].preview_url

            console.log('Artist/Band: ' + artistName)
            console.log('Album Name: ' + albumName)
            console.log('Song Name: ' + trackName)
            console.log('Preview Url: ' + preview)
        }
    });
}

else if (input === 'movie-this') {
    var movie = input2
    console.log('movie')
    request("http://www.omdbapi.com/?type=movie&t=" + movie + "&apikey=trilogy", function (err, res, body) {

        if (!err) {
            var body = JSON.parse(body)
            var title = body.Title
            var year = body.Year
            var rating = body.imdbRating
            var country = body.Country
            var plot = body.Plot
            var language = body.Language
            var actors = body.Actors
            var rottenRating = body.Ratings[1].Value

            console.log('Title: ' + title)
            console.log('Year released: ' + year)
            console.log('IMDB rating: ' + rating)
            console.log('Rotten Tomatoes rating: ' + rottenRating)
            console.log('Countries produced: ' + country)
            console.log('Language: ' + language )
            console.log('Plot: ' + plot)
            console.log('Actors: ' + actors)

        }
        else {
            request("http://www.omdbapi.com/?type=movie&t=Mr.Nobody&apikey=trilogy", function (err, res, body) {
                var body = JSON.parse(body)
                var title = body.Title
                var year = body.Year
                var rating = body.imdbRating
                var country = body.country
                var plot = body.plot
                var actors = body.Actors
    
                console.log(actors)
            

            })

        }

    })


}
else if (input === 'concert-this') {
    var artist = input2
    request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp',function (err, res, body) {
        var body = JSON.parse(body)
    
        body.forEach(element => {
            var date = new Date(element.datetime)
           console.log('')
           console.log(element.venue.name)
           console.log(element.venue.city)
           console.log(date.getMonth()+ '/' + date.getDay()+ '/' + date.getFullYear())
        });
    })
}

else if (input === 'do-what-it-says') {
fs.readFile('./random.txt','utf8',function(err,data){
    if (!err){
        search(data.split(',')[0], data.split(',').slice(1).join(' '))
    }

})
}
}

search(process.argv[2],process.argv.slice(3).join(' '))