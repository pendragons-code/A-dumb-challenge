const { readdirSync } = require("fs")
const express = require("express")
const routeFrontEnd = express.Router()
const { rateLimit } = require("express-rate-limit")
const { frontEndRateLimit } = require("../../configuration/rateLimit.json")

const { musicDetails } = require("./musicDetails.js")

const limiter = rateLimit({
	windowMs: frontEndRateLimit.windowMinutes * 60000,
	max: frontEndRateLimit.maxWindowRequest,
	standardHeaders: frontEndRateLimit.standardHeaders,
	legacyHeaders: frontEndRateLimit.legacyHeaders,
	message: frontEndRateLimit.message
})

routeFrontEnd.use(limiter)

routeFrontEnd.get("/data", async (req, res) => {
	let musicDetailsForFrontEnd = await musicDetails()
	console.log(musicDetailsForFrontEnd)
	return res.send({ 
		data: {
			albums: musicDetailsForFrontEnd.albums,
			trackNames: musicDetailsForFrontEnd.trackNames,
			trackUrl: musicDetailsForFrontEnd.trackUrl
		}
	})
})

const loadFrontEndFile = readdirSync("./src/frontEnd/PageLoader").filter(files => files.endsWith(".js"))
for(file of loadFrontEndFile) {
	const { execute, name } = require(`../frontEnd/PageLoader/${file}`)
	routeFrontEnd.get(`/${name}`, async (req, res) => {
		execute(req, res)
	})
}

module.exports = routeFrontEnd
