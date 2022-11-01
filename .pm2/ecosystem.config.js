module.exports = {
  apps : [{
    name: "wotv-calc-front-test",
    script    : "/data/www/design-wotv/dist/wotv-calc/server/main.js",
    instances : "max",
    exec_mode : "cluster",
    log_date_format: "DD-MM HH:mm:ss.SSS"
  }]
}