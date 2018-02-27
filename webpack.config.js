var path = require("path"); //a build in module in nodeJS
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//argument env's value is set by --env value.
module.exports = {
    //input source file
    entry: path.join(__dirname, "src", "components", "GalleryGrid.js"), //app.js
    //output bundle file
    output: {
        path: path.join(__dirname, "build"),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    //adding babel configuration
    module: {
        rules: [{
            loader: 'babel-loader',    //specify a loader
            test: /\.js$/,             //point out the file that loader has to compile
            exclude: /node_modules/    //if the file is under this path, then ignore it
        },{
            test: /\.s?css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader",
                    "sass-loader",
                ]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ],
};
