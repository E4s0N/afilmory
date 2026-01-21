import { defineBuilderConfig, githubRepoSyncPlugin } from '@afilmory/builder'

export default defineBuilderConfig(() => ({
  storage: {
    provider: 'github',
    owner: 'E4s0N',
    repo: 'afilmory',
    branch: 'main',
    path: 'photos',
    // useRawUrl: true, // Use raw.githubusercontent.com CDN
    customDomain: 'niceimg.com/afilmory',
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
          useClusterMode: false,
        },
      },
    },
  },
  // plugins: [thumbnailStoragePlugin()],
  plugins: [
    githubRepoSyncPlugin({
      enable: true,
      autoPush: true,
      repo: {
        url: 'https://github.com/E4s0N/afilmory-cache',
        token: process.env.GIT_TOKEN,
        branch: 'main',
      },
    }),
  ],
}))
