module.exports = {
	name: "/",
	async execute(req, res) {
		return res.render("landingPage.ejs")
	}
}
