const { readdirSync } = require("fs")
async function musicDetails() {
	let trackName = readdirSync("./src/frontEnd/public/music").filter(files => files.endsWith(".mp3"))
	let albums = []
	let trackUrl = []
	let trackNames = []
	for(file of trackName){
		await trackNames.push(file)
		await albums.push("Unknown") // might use something like quick.db to store the info.
		await trackUrl.push(`../music/${file}`)
	}
	return { albums, trackUrl, trackNames }
}
// this is just a prototype and a convoluted mess, i will be neatening the entire code structure in the future!
module.exports = { musicDetails }
