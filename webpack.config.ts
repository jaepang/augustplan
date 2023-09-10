import { DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import dotenv from 'dotenv'

const outputDirectory = 'build'

module.exports = () => {
  // enable dotenv
  dotenv.config()

  return {
    // 애플리케이션 진입점
    entry: './src/index.tsx',

    // 환경별 최적화 설정이 가능; options: development, production, none
    mode: 'development',

    // 번들된 파일이 저장될 경로와 이름
    output: {
      publicPath: '/',
      path: path.join(__dirname, outputDirectory),
      filename: 'bundle.js',
    },

    // 모듈 해석에 대한 설정
    resolve: {
      // import시 확장자를 생략하면 배열에 명시된 확장자 순으로 파일을 탐색한다
      extensions: ['.ts', '.tsx', '.js', '.json'],
      // import시 절대경로로 지정된 모듈을 탐색할 경로를 지정한다
      modules: ['node_modules'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
      },
    },

    // loader에 대한 설정
    // webpack은 기본적으로 .js와 .json만을 이해하는데 loader를 통해 특정 모듈을 해석하도록 설정할 수 있다
    module: {
      rules: [
        {
          // 변환할 파일의 정규식
          test: /\.(ts)x?$/,
          exclude: /node_modules/,
          // 사용할 loader 지정; 배열로 주어지면 우측에서 좌측으로 순서대로 적용된다
          use: {
            loader: 'swc-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[folder]-[local]_[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.json$/,
          type: 'json',
        },
      ],
    },

    // 로컬 호스트에 개발용 서버를 열어 hot reload를 지원한다
    devServer: {
      port: 3000,
      // 개발용 서버를 열 때 기본적으로 브라우저를 열어준다
      // open: true,

      // react router로 이동한 채로 새로고침할 때 Not found가 안나도록 함
      historyApiFallback: true,
      // local 개발 DNS 설정
      allowedHosts: ['*'],
    },

    // loader보다 강력하게 웹팩 실행 전반에 관여한다
    plugins: [
      // 번들된 결과물을 index.html에 주입한다
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      // enable process.env in react
      new DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  }
}
