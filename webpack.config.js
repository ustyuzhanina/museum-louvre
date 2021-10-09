const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
//const WebpackMd5Hash = require('webpack-md5-hash');
const ESLintPlugin = require("eslint-webpack-plugin");
// const WebpackDevServer = require('webpack-dev-server');
// const MinifyPlugin = require('babel-minify-webpack-plugin');

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const isOptimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
      //minSize: 0,
      //maxAsyncRequests: 9,
      //maxInitialRequests: 9,
      name: false,
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
      loader: MiniCssExtractPlugin.loader,
      //29.09.2021: loader: isProd ? MiniCssExtractPlugin.loader : "style-loader",
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
    welcome: "./tours/welcome/index.js",
    colonnade: "./tours/colonnade/index.js",
    denonWing: "./tours/denonWing/index.js",
    greekHall: "./tours/greekHall/index.js",
    monaLisa: "./tours/monaLisa/index.js",
    nightPalace: "./tours/nightPalace/index.js",
    royalPalace: "./tours/royalPalace/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/[name][hash].js',
    publicPath: '' ,
  },

  devServer: {
    overlay: true,
    hot: isDev,
    port: 3000,
  },

  devtool: isDev ? "source-map" : "",

  plugins: [
    new CleanWebpackPlugin(),

    //new WebpackMd5Hash(),

    new HtmlWebpackPlugin({
      title: "museum",
      template: "./index.html",
      filename: 'index.html',
      inject: true,
      hash: true,
      chunks: ['index'],
      minify: {
        collapseWhitespace: isProd,
        removeComments: true,
      },
    }),

    new HtmlWebpackPlugin({
      title: "museum",
      template: "./tours/welcome/index.html",
      filename: 'tours/welcome/index.html',
      inject: true,
      hash: true,
      chunks: ['welcome'],
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new HtmlWebpackPlugin({
      title: "museum",
      template: "./tours/colonnade/index.html",
      filename: 'tours/colonnade/index.html',
      hash: true,
      chunks: ['colonnade'],
      inject: true,
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new HtmlWebpackPlugin({
      title: "museum",
      template: "./tours/denonWing/index.html",
      filename: 'tours/denonWing/index.html',
      hash: true,
      chunks: ['denonWing'],
      inject: true,
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new HtmlWebpackPlugin({
      title: "museum",
      template: "./tours/greekHall/index.html",
      filename: 'tours/greekHall/index.html',
      hash: true,
      chunks: ['greekHall'],
      inject: true,
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new HtmlWebpackPlugin({
      title: "museum",
      template: "./tours/monaLisa/index.html",
      filename: 'tours/monaLisa/index.html',
      hash: true,
      chunks: ['monaLisa'],
      inject: true,
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new HtmlWebpackPlugin({
      title: "museum",
      template: "./tours/nightPalace/index.html",
      filename: 'tours/nightPalace/index.html',
      hash: true,
      chunks: ['nightPalace'],
      inject: true,
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new HtmlWebpackPlugin({
      title: "museum",
      template: "./tours/royalPalace/index.html",
      filename: 'tours/royalPalace/index.html',
      hash: true,
      chunks: ['royalPalace'],
      inject: true,
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
          from: "assets/svg",
          to: "assets/svg/",
        },
        {
          from: "assets/img",
          to: "assets/img/",
        },
      ],
    }),

    new ESLintPlugin({
      context: path.resolve(__dirname, "src"),
      extensions: ["js", "mjs", "jsx", "ts", "tsx"],
      exclude: ["assets"],
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
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'assets/img',
              publicPath: '../assets/img/',
              emitFile: true,
            },
          },
          {
            loader: 'image-webpack-loader',
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
              name: "assets/fonts/[name].[ext]",
            },
          },
        ],
      },
    ],
  },

  optimization: isOptimization(),
};
