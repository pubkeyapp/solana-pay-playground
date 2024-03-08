import express from 'express'
import { ServerConfig } from './server-config'
import { serverRouter } from './server-router'

export async function server(config: ServerConfig) {
  // Set up Express server
  const app = express()
  app.use(express.json())
  // Set base path to /api
  app.use('/api', serverRouter())

  // Start server
  app.listen(Number(config.port), '0.0.0.0').on('listening', async () => {
    console.log(`🚀 Listening on port ${config.port}`)
  })
}
