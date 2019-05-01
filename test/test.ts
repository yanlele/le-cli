import log from '../main/lib/log';
import * as path from 'path';
import * as userHome from 'user-home';

log.info(userHome);

log.info(path.resolve(userHome, 'temp'))

log.info('helllo');
