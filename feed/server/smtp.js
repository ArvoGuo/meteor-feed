// smtp服务
Meteor.startup(function(){
  smtp = {
    username: '15982253984@163.com',   // eg: server@gentlenode.com
    password: '123456abc',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.163.com',  // eg: mail.gandi.net
    port: 25
  };
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
