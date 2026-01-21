import os from 'node:os'

import { defineBuilderConfig, githubRepoSyncPlugin } from '@afilmory/builder'

import { env } from './env.js'

export default defineBuilderConfig(() => ({
  storage: {
    provider: 'github',
    owner: 'E4s0N',
    repo: 'afilmory-gallery',
    branch: 'main',
    path: 'photos',
    useRawUrl: true, // Use raw.githubusercontent.com CDN
  },
  system: {
    processing: {
      defaultConcurrency: 10,
      enableLivePhotoDetection: true,
      digestSuffixLength: 0,
    },
    observability: {
      showProgress: true,
      showDetailedStats: true,
      logging: {
        verbose: false,
        level: 'info',
        outputToFile: false,
      },
      performance: {
        worker: {
          workerCount: os.cpus().length * 2,
          timeout: 30_000,
          useClusterMode: true,
          workerConcurrency: 1,
        },
      },
    },
  },
  // plugins: [thumbnailStoragePlugin()],
  plugins: [
    githubRepoSyncPlugin({
      repo: {
        enable: true,
        url: process.env.BUILDER_REPO_URL ?? '',
        token: env.GIT_TOKEN,
        branch: process.env.BUILDER_REPO_BRANCH ?? 'main',
      },
    }),
  ],
}))
