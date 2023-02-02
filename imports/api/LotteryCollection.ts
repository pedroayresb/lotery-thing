import { Mongo } from 'meteor/mongo';
import LoteryInterface from './interfaces/LotteryInterfaces';

const LoteryCollection = new Mongo.Collection<LoteryInterface>('lottery');

export default LoteryCollection;
