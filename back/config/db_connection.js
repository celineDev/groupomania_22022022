const { Sequelize } = require('sequelize');

// database connection
const sequelize = new Sequelize('groupomania', 'root', 'secret', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');

}).catch ((error) => {
  console.error('Unable to connect to the database:', error);
})

// sequelize.sync({force: true});


// sequelize db:drop
// sequelize db:create
// sequelize db:migrate