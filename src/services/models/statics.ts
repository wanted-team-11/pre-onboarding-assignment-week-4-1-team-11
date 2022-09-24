import brokers from "../static/brokers.json";
import accountStatus from "../static/accountStatus.json";
import brokerFormat from "../static/brokerFormat.json";
import statusColor from "../static/statusColor.json";

export type BrokerKeyType = keyof typeof brokers;
export type BrokerFormatType = keyof typeof brokerFormat;
export type AccountStatusKeyType = keyof typeof accountStatus;
export type StatusColorKeyType = keyof typeof statusColor;
