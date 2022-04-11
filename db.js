const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const config = {
  logging: false
};

if(process.env.LOGGING){
  delete config.logging;
}
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db', config);

const User = conn.define('user', {
  username: STRING,
  password: STRING
});

const Note = conn.define('note', {
  txt: Sequelize.DataTypes.TEXT
})

Note.belongsTo(User)
User.hasMany(Note)
User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    const hashed = await bcrypt.hash(user.password, 3);
    user.password = hashed;
  }
});

User.byToken = async(token)=> {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(payload.id, {
      attributes: {
        exclude: ['password']
      }
    });
    if(user){
      return user;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  catch(ex){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.authenticate = async({ username, password })=> {
  const user = await User.findOne({
    where: {
      username
    }
  });
  if(user && await bcrypt.compare(password, user.password) ){
    return jwt.sign({ id: user.id}, process.env.JWT); 
  }
  const error = Error('bad credentials!!!!!!');
  error.status = 401;
  throw error;
};

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const credentials = [
    { username: 'lucy', password: 'lucy_pw'},
    { username: 'moe', password: 'moe_pw'},
    { username: 'larry', password: 'larry_pw'}
  ];
  const [lucy, moe, larry] = await Promise.all(
    credentials.map( credential => User.create(credential))
  );
  const txt = [
    {txt: "today I need to do the laundry at 8 A.M."},
    {txt: "today I need to get my neighbors mail because hes on vaca"},
    {txt: "today I need to to make dinner reservations for my sisters birthday"},
  ]

  const [noteOne,noteTwo,noteThree] = await Promise.all(
    txt.map(txt => Note.create(txt))
  )

  noteOne.userId = moe.id;
  noteTwo.userId = lucy.id;
  noteThree.userId = larry.id
  await Promise.all([
    noteOne.save(),
    noteTwo.save(),
    noteThree.save()
  ])
  console.log(moe)
  return {
    users: {
      lucy,
      moe,
      larry
    },
    notes: {
      noteOne,
      noteTwo,
      noteThree
    }
  };
};

module.exports = {
  syncAndSeed,
  models: {
    User,
    Note
  }
};
