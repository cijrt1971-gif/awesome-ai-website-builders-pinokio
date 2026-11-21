module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        // Serve the app folder: app/index.html renders app/source/README.md
        path: "app",
        message: [
          "python -m http.server {{port}} --bind 127.0.0.1"
        ],
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      // Surface the server URL in the Pinokio sidebar.
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
