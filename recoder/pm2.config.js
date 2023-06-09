module.exports = {
    apps: [
      {
        name: 'recoder',
        script: 'index.js',
        instances: 2,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
      }
    ]
  };
  
  
  
  