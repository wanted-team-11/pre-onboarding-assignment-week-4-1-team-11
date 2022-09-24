import brokers from '../static/brokers.json';
import accountStatus from '../static/accountStatus.json';

export type BrokerKeyType = keyof typeof brokers;

export type AccountStatusKeyType = keyof typeof accountStatus;
