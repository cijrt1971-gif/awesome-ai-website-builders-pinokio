module.exports = {
  run: [{
    // The upstream project is a markdown list: only its content is needed.
    when: "{{!exists('app/source')}}",
    method: "shell.run",
    params: {
      message: [
        "git clone https://github.com/ianberdin/awesome-ai-website-builders.git app/source"
      ]
    }
  }]
}
