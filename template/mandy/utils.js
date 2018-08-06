module.exports = {
  mergeConfig: function (cfg1, cfg2) {
    const config = { ...cfg1, ...cfg2 }
    const result = {}

    for (const key in config) {
      if (Object.prototype.toString.call(config[key]) === '[object Object]' && cfg1[key] && cfg2[key]) {
        result[key] = this.mergeConfig(cfg1[key], cfg2[key])
      } else {
        result[key] = config[key]
      }
    }

    return result
  }
}