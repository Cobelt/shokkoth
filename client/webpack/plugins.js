import HtmlWebPackPlugin from 'html-webpack-plugin'
import CopyWebPackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export const htmlPlugin = new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: './index.html',
})

export const copyPlugin = (file) => new CopyWebPackPlugin([{ from: file }])
export const cleanPlugin = () => new CleanWebpackPlugin()

export const HMRPlugin = ({ webpack }) => new webpack.HotModuleReplacementPlugin()

export const CSSLoaderPlugin = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: process.env.NODE_ENV === 'development',
    reloadAll: true,
  },
}

export const CSSPlugin = (file) => new MiniCssExtractPlugin({ filename: file })
