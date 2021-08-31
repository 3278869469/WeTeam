// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('user').doc(event.id)
    .update({
      data: {
        nickname: event.nickname,
        sex: event.sex,
        age: event.age,
        address: event.address,
        shool: event.shool,
        mail: event.mail,
        headportrait: event.headportrait
      }
    })
}