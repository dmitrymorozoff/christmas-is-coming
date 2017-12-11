const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    entry: ["./source/index.ts"],
    output: {
        path: path.resolve(__dirname, "dist/js"),
        publicPath: "",
        filename: "js/bundle.js",
    },
    resolve: {
        extensions: [".ts", ".js", ".css"],
        modules: [path.resolve("./source"), "node_modules"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint-loader",
                exclude: /node_modules/,
                options: {
                    emitErrors: true,
                },
            },
            {
                test: /\.ts?$/,
                loader: ["babel-loader", "awesome-typescript-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./source/index-template.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeOptionalTags: true,
            },
            hash: true,
        }),
    ],
    devServer: {
        port: 8080,
        host: "localhost",
        hot: true,
        inline: true,
        open: true,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "dist"),
    },
    watch: true,
    devtool: "cheap-eval-source-map",
};
