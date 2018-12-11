module.exports = function() {
  return {
    seasonsList: requireMany('./seasonslist'),
    seasons: requireMany('./seasons'),
    constructorStandings: requireMany('./seasons/constructorStandings'),
    driverStandings: requireMany('./seasons/driverStandings'),
    pits: requireMany('./seasons/rounds/pits'),
    laps: requireMany('./seasons/rounds/laps'),
    results: requireMany('./seasons/rounds/results'),
    qualifying: requireMany('./seasons/rounds/qualifying'),
    drivers: requireMany('./seasons/drivers'),
    constructors: requireMany('./seasons/constructors'),
  };
};

function requireMany(folder) {
  var fs = require('fs');
  var files = fs.readdirSync(folder).filter(function(file) {
    if (file.indexOf('.json') > -1) return file;
  });

  return files.map(function(value) {
    console.log(folder + '/' + value);
    try {
      return require(folder + '/' + value);
    } catch (event) {
      return console.log(event);
    }
  });
}
