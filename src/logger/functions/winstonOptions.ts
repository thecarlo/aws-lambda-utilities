import winston, { transports } from 'winston';

import { DefaultVars } from '../../defaultVars';
import { awsFormat } from './awsFormat';
import { fileFormat } from './fileFormat';
import { localFormat } from './localFormat';

const { isAWS, isTest } = new DefaultVars();

export const winstonOptions = (logLevel: string): winston.LoggerOptions => {
  return {
    level: logLevel,
    silent: isTest(),
    transports: [
      new transports.Console({
        format: !isAWS() ? localFormat() : awsFormat(),
      }),
      new winston.transports.File({
        level: 'debug',
        format: fileFormat(),
        filename: './logs/logs.log',
      }),
    ],
  };
};
