export default ({command}) => ({
    base: command === 'serve' ? '' : '/demo/dist/',
    build: {
        emptyOutDir: true,
        manifest: true,
        outDir: './demo/dist/',
        rollupOptions: {
            input: {
                demo: './demo/assets/ts/app.ts',
            },
            output: {
                entryFileNames: "[name].js",
                assetFileNames: "[name][extname]",
            }
        },
    },
    server: {
        port: 3000,
        // https: true, // Uncomment this line if you require localhost to use https
        hmr: {
            host: 'localhost',
        }
    },
});
