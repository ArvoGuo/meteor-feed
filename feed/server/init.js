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
        roles: ['admin'],
        'emails.0.verified': true
      }
    });
  }

  Accounts.emailTemplates.from = '15982253984@163.com';

  Accounts.emailTemplates.siteName = 'Meteor 订餐系统';

  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return '确认你的邮箱地址';
  };
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return '点击下面链接激活你的账号：' + url;
  };
/*
  Accounts.validateLoginAttempt(function(attempt){
    if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
      console.log('email not verified');

      return false; // the login is aborted
    }
    return true;
  });
  */
});
