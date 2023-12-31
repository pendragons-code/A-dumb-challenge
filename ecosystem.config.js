module.exports = {
	apps: [{
		name: "site (moosik)",
		script: "./src/loaders/webserver.js",
		env_production: {
			NODE_ENV: "production"
		},
		env_development: {
			NODE_ENV: "development"
		},
		watch_delay: 1000,
		ignore_watch: ["node_modules"],
		max_memory_restart: "512M",
		out_file: "./logfile",
		error_file: "./errorfile"
	}]
}
