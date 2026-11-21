module.exports = {
  run: [{
    when: "{{exists('app/source')}}",
    method: "shell.run",
    params: {
      path: "app/source",
      message: "git pull"
    }
  }]
}
