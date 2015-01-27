//初始化管理员和部门
Meteor.startup(function(){
  if (Department.find().count() === 0){
    Department.insert({
      name:'研发部'
    });
    Department.insert({
      name:'运营部'
    });
    Department.insert({
      name:'人事行政部'
    });
  }

  if(Meteor.users.find({'roles':["admin"]}).count() === 0){
    Accounts.createUser({
      email:'admin@qq.com',
      password:'123456',
      profile:{
        name:"admin",
        department: '研发部',
        email:"admin@qq.com"
      }
    });
    Users.update({
      roles: ['user']
    },{
      '$set':{
        roles: ['admin'],
      }
    });
  }
});
