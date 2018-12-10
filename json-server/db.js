module.exports = function() {
  return {
    seasonsList: requireMany('./seasonslist'),
    seasons: requireMany('./seasons'),
    constructorStandings: requireMany('./seasons/constructorStandings'),
    driverStandings: requireMany('./seasons/driverStandings'),
    results: requireMany('./results'),
    pits: requireMany('./seasons/pits'),
    laps: requireMany('./seasons/laps'),
    drivers: requireMany('./seasons/drivers'),
  }
}

function requireMany (folder) {
    var fs = require('fs');
    var files = fs.readdirSync(folder).filter(function(file) {
        if(file.indexOf(".json")>-1) return file;
    })

    return files.map(function (value) {
        console.log(folder + '/' + value);
        try {    
	    return require(folder + '/' + value)
        }
        catch (event) {
            return console.log(event)
        }
    })
}
