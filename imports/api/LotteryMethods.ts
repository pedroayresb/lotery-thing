import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import LotteryCollection from './LotteryCollection';
import LotteryInterface from './interfaces/LotteryInterfaces';


Meteor.methods({
  'lottery.insert'(lottery: LotteryInterface) {
    check(lottery, Object);
    LotteryCollection.insert(lottery);
  },
  'lottery.getAll'() {
    return LotteryCollection.find({}).fetch();
  },
  'lottery.getMostRecent'() {
    const lotteries = LotteryCollection.find({}).fetch();
    return lotteries[0];
  },
  'lottery.getLotteryByDate'(date: Date) {
    return LotteryCollection.findOne({ date });
  },
  'lottery.getAllLotteriesByNumber'(number: number) {
    return LotteryCollection.find({ numbers: number }).fetch();
  },
  'lottery.getLotteriesByDateRange'(startDate: Date, endDate: Date) {
    return LotteryCollection.find({ date: { $gte: startDate, $lte: endDate } }).fetch();
  },
});
