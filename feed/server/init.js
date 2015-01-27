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
  if(Users.find({'username': 'ksadmin'}).count() === 0){
    Accounts.createUser({
      username: "ksadmin",
      email:'ksadmin@gmail.com',
      password:'123456',
      profile:{
        name:"ksadmin",
        department: '研发部',
        email:"ksadmin@gmail.com"
      }
    });

    Users.update({
     'username': 'ksadmin'
    },{
      '$set':{
        roles: ['admin']
      }
    });
  }
});
