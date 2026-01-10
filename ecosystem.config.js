module.exports = {
  apps: [
    {
      name: 'lumina4k',
      script: 'server.js',
      cwd: '/var/www/lumina4k',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0'
      },
      error_file: '/var/log/pm2/lumina4k-error.log',
      out_file: '/var/log/pm2/lumina4k-out.log',
      log_file: '/var/log/pm2/lumina4k.log',
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024'
    }
  ]
}
