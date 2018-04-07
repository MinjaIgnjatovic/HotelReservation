
const path=require('path');
//console.log(path.resolve(__dirname,'dist'));

module.exports={

    entry:{
       app:[ "./src/index.js"]
    } ,
    output:{
        path:"./dist/",
        filename: "bundle.js",
        path: path.resolve(__dirname,'dist')
    },
    devtool:"source-map",
    module:{
        rules:[
            {
            //koji loader ce sta da handluje npr js fajlove bundle
            test: /\.js$/, // izmedu / i / je regularni izraz, \ je eskejp karakter za tacku, dolar znaci da ako se nesto zavrsava na js onda pokupi
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets:['es2016']
                }
            }
        }

        ]
    }
    }


