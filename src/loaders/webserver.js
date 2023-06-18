const express = require("express")
const helmet = require("helmet")
const { join } = require("path")

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const app = express()
const port = process.env.PORT || 3000
const frontEnd = require("./frontEnd.js")

if(!port) console.log(`Port is set to ${port}`)

app.use(function(req, res, next) {
	res.setHeader("Content-Security-Policy", "frame-ancestors 'self';")
	next()
})

app.use("/", frontEnd)
app.set("view engine", "ejs")
app.set("views", join(__dirname, "../frontEnd/views"))
app.use(express.static(join(__dirname, "../frontEnd/public")))

app.use(function(req, res) {
	res.status(404).send("🍌, 404")
})

app.use(helmet({
	contentSecurityPolicy: false,
	nosniff: true,
	xssFilter: true,
	hsts: { maxAge: 31536000, includesSubDomiains: true }
}))

app.listen((port), async () => {
	console.log(`Hanging onto dear life at ${process.pid}\nCurrently listening at http://localhost:${port}!`)
})
