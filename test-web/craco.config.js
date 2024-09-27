const path = require('path');

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    alias: {
      '@defaultTramite': path.resolve(__dirname, 'src/app/main/apps/tramitesAmbientales/default'),
    },
  },
};
