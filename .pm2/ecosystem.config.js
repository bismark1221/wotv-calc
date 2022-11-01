module.exports = {
  apps : [{
    name: "wotv-calc-front",
    script    : "/data/www/wotv-calc/dist/wotv-calc/server/main.js",
    instances : "max",
    exec_mode : "cluster",
    log_date_format: "DD-MM HH:mm:ss.SSS"
  }]
}