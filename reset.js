module.exports = {
  run: [{
    when: "{{exists('app/source')}}",
    method: "fs.rm",
    params: {
      path: "app/source"
    }
  }]
}
