const path = require('path')

//PLUGING Y MINIFICADORES DE CSSS Y SCSS/SASS
//PARA REDUCIR EL TAMAÑO DE LAS HOJAS DE ESTILO DE NUESTRO PROYECTO 
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Para el template del HTML que va usar Webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//Para reducir los CSS
const { SourceMapDevToolPlugin } = require('webpack'); // para conocer el Source Map de nuestro proyecto

//Configuraciones de puerto
const port = process.env.PORT || 3000;

//Esportar configuracion de Webpack

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },
    context: path.resolve(__dirname),
    devServer: {
        port,
        inline: true,
        historyApiFallback: true
    },
    devtool: 'eval-souce-map',
    module: {
        rules: [
            //Reglas para archivos JS y JSX
            //Tienen que pasar el LINTING para poder pasar
            {
                enforce: 'pre',
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use:[
                    'eslint-loader',
                    'sorce-map-loader'
                ]
            },
            //Reglas para archivo JS y JSX
            //Reglas de Babel ES y JSX
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets:[
                        '@babel/env',
                        '@babel/react'
                    ]
                } 
            },
            //Reglas para archivos CSS y SASS y SCSS para minificarlos y cargarlos en el bundle
            {
                test: /(\.css|\.scss|\.sass)$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            //Reglas para los archivos de imagenes 
            {
                test: /\.(png|\jpe?g|\gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        //Template HTML
        new HtmlWebpackPlugin(
            {
                template: './index.html'
            }
        ),
        new MiniCssExtractPlugin(
            {
                filename: './css/styles.css'
            }

        ),
        new SourceMapDevToolPlugin(
            {
                filename: '[file].map'
            }
        )
    ], 
    resolve: {
        extension: ['.js', '.jsx', '.css', '.scss', '.sass'],
        modules: [
            'node_modules'
        ]
    }
}