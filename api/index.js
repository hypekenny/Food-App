//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Diet } = require('./src/db.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

        var glutenFree = Diet.create({
          name: "gluten free"
        });

        var ketogenic = Diet.create({
          name: "ketogenic"
        });

        var vegetarian = Diet.create({
          name: "vegetarian"
        });

        var lactoVegetarian = Diet.create({
          name: "lacto-vegetarian"
        });

        var ovoVegetarian = Diet.create({
          name: "ovo-vegetarian"
        });

        var vegan = Diet.create({
          name: "vegan"
        });

        var pescetarian = Diet.create({
          name: "pescetarian"
        });

        var paleo = Diet.create({
          name: "paleo"
        });

        var primal = Diet.create({
          name: "primal"
        });

        var whole = Diet.create({
          name: "whole30"
        });
  });
});
