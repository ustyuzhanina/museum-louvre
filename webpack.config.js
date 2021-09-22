const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
// const WebpackDevServer = require('webpack-dev-server');
// const MinifyPlugin = require('babel-minify-webpack-plugin');

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const isOptimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    (config.minimize = true),
      (config.minimizer = [
        new OptimizeCssAssetsPlugin(),
        new TerserWebpackPlugin(),
      ]);
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    // style-loader adds stylesheet to HEAD in HTML, and mini-css extracts data to a sep file
    {
      loader: isProd ? MiniCssExtractPlugin.loader : "style-loader",
      options: isProd
        ? {
            // we can change objects without reloading a page
            hmr: isDev,
            reloadAll: true,
          }
        : {},
    },
    {
      // reads css
      loader: "css-loader",
      options: {
        importLoaders: 2,
      },
    },
  ];

  if (extra) {
    loaders.push(extra);
  }

  loaders.push("postcss-loader");

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),

  entry: {
    index: "./index.js",
  },

  output: {
    filename: "script/[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: '/dist' ,
  },

  devServer: {
    overlay: true,
    hot: isDev,
    port: 4200,
  },

  devtool: isDev ? "source-map" : "",

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: "Home",
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new MiniCssExtractPlugin({
      filename: isProd ? "css/[name].[contenthash].css" : "css/[name].css",
    }),

    new CopyPlugin({
      patterns: [
        {
          from: "assets/images/static/",
          to: "../dist/images/static",
        },
      ],
    }),

    new ESLintPlugin({
      context: path.resolve(__dirname, "src"),
      extensions: ["js", "mjs", "jsx", "ts", "tsx"],
      exclude: ["assets", "index.js"],
      fix: true,
      failOnError: false,
      emitWarning: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders("sass-loader"),
      },

      {
        test: /\.css$/i,
        use: cssLoaders(),
      },

      //images
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name].[ext]",
              outputPath: "images",
              publicPath: "../images/",
              emitFile: true,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              esModule: false,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 85,
              },
              svgo: {
                enabled: true,
              },
            },
          },
        ],
      },

      //fonts
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "vendor/fonts/[name].[ext]",
            },
          },
        ],
      },
    ],
  },

  optimization: isOptimization(),
};
