const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const addBaseConfig = require("./webpack-base.config");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const configs = addBaseConfig({
  mode: "development",
  output: {
    filename: "js/[name].js",
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|otf|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      // REACT_APP_ENCRYPTION_KEY: JSON.stringify(
      //   "U2FsdGVkX19p7zIuVPh8mW1fp9PdMxR0aGHzQ0IbJuw="
      // ),
      // LOGIN_API_URL: JSON.stringify("http://localhost:7777"),
      API_URL: JSON.stringify("http://ec2-16-171-111-161.eu-north-1.compute.amazonaws.com:8000"),
    }),
    new HtmlWebpackPlugin({
      title: "React Cards",
      filename: "index.html",
      template: "./index.html",
      // favicon: "src/assets/invoid-logo.svg",
    }),
    // new ModuleFederationPlugin({
    //   name: "PLMS",
    //   filename: "remoteEntry.js",
    //   exposes: {
    //     "./app": "./src/App",
    //   },
    //   shared: { react: { singleton: true, eager: true }, "react-dom": { singleton: true, eager: true } },
    // }),
  ],
  devServer: {
    host: "0.0.0.0",
    // disableHostCheck: true,
    allowedHosts: "all",
    port: 4444,
    historyApiFallback: true,
    hot: true,
    static: {
      watch: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },
  },
});

module.exports = configs;









