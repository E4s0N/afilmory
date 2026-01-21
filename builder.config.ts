import { defineBuilderConfig, githubRepoSyncPlugin } from '@afilmory/builder'

export default defineBuilderConfig(() => ({
  storage: {
    provider: 'github',
    owner: 'E4s0N',
    repo: 'afilmory',
    branch: 'main',
    path: 'photos',
    token: process.env.GIT_TOKEN,
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
      repo: {
        enable: true,
        url: process.env.BUILDER_REPO_URL ?? '',
        token: process.env.GIT_TOKEN,
        branch: process.env.BUILDER_REPO_BRANCH ?? 'main',
      },
    }),
  ],
}))
