import os from 'os';
import cluster from 'cluster';

import loadServer from './providers/Express';
import { loadDatabase } from './providers/Database';
import { ENABLE_CHILD_PROCESS } from './providers/Configs';
import { clusterEventsHandler, processEventsHandler } from './utils/Exception';

if (ENABLE_CHILD_PROCESS && cluster.isMaster) {
  // Catches the process events
  processEventsHandler();

  // Find the number of available CPUS
  const CPUS = os.cpus();

  // Fork the process, the number of times we have CPUs available
  CPUS.forEach(() => cluster.fork());

  // Catches the cluster events
  clusterEventsHandler(cluster);
} else {
  // Run the Server on Clusters
  loadServer();
  // Run the Database pool
  loadDatabase();
}
