const path = require('path');

const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  name: '@pan/store',
  presets: ['react'],
  outDir: 'lib',
  viteConfig: {
    server: { port: 8201 },
    build: {
      target: 'es2015',
      lib: {
        entry: path.resolve(__dirname, './src/index.ts'),
        name: 'PanStore',
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) => `index.${format}.js`,
      },
      outDir: './lib/',
      watch: IS_PROD ? false : {
        include: 'src/**',
        clearScreen: false,
      },
      sourcemap: true,
      rollupOptions: {
        external: [
          'react',
          // 'lodash',
          'echarts',
        // 'd3',
        // 'dayjs',
        // 'three',
        // echarts-wordcloud 引用了 echarts/lib/echarts，需要手动设置 external
        // 'echarts/lib/echarts',
        ],
        output: { globals: {
          react: 'React',
          // lodash: 'lodash',
          echarts: 'echarts',
          // d3: 'd3',
          // dayjs: 'dayjs',
        // three: 'THREE',
        } },
      },
      minify: 'esbuild',
    },

  },
  plugins: { lint: { stylelint: { entry: ['src/**/*.css'] } } },
};
