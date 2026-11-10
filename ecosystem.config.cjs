module.exports = {
  apps: [
    {
      name: "madadtheory",
      script: "server/index.ts",
      interpreter: "node",
      interpreter_args: "--import tsx",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "400M",
      exp_backoff_restart_delay: 200,
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
  ],
};

