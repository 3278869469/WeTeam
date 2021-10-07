// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('myTeam').add({
    data: {
      userId: event.userId,
      teamId: event.teamId,
      state: event.state,
      createTime: event.createTime,
      teamTile: event.teamTile,
      teamLogo: event.teamLogo,
    }
  })

}