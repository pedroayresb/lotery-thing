import { Meteor } from 'meteor/meteor';
import LoteryCollection from './LotteryCollection';

Meteor.publish('lottery', () => LoteryCollection.find({}));
Meteor.publish('lastLottery', () => LoteryCollection.find({}, { limit: 1 }));