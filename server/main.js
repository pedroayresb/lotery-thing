import { Meteor } from 'meteor/meteor'
import LoteryCollection from '../imports/api/LotteryCollection'
import lotery from '../imports/api/utils/lottery'
import '../imports/api/LotteryCollection'
import '../imports/api/LotteryMethods'
import '../imports/api/LotteryPublications'

async function insertLottery({ date, numbers }) {
  LoteryCollection.insert({ date, numbers })
}

Meteor.startup(async () => {
  if (LoteryCollection.find().count() === 0) {
    lotery.forEach((lottery) => {
      insertLottery(lottery)
    })
  }
})
