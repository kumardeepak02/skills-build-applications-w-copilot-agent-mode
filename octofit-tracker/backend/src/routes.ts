import { Router } from 'express'
import type { Model } from 'mongoose'
import Activity from './models/activity.js'
import Leaderboard from './models/leaderboard.js'
import Team from './models/team.js'
import User from './models/user.js'
import Workout from './models/workout.js'

const router = Router()

const resourceModels: Record<string, Model<any>> = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: Leaderboard,
  workouts: Workout,
} as const

for (const [resourceName, resourceModel] of Object.entries(resourceModels)) {
  router.get(`/${resourceName}`, async (_request, response, next) => {
    try {
      const resources = await resourceModel.find().sort({ createdAt: -1 }).lean()
      response.json(resources.map(({ _id, ...resource }) => ({ id: _id, ...resource })))
    } catch (error) {
      next(error)
    }
  })

  router.post(`/${resourceName}`, async (request, response, next) => {
    try {
      const resource = await resourceModel.create(request.body)
      const { _id, ...resourceData } = resource.toObject()
      response.status(201).json({ id: _id, ...resourceData })
    } catch (error) {
      next(error)
    }
  })
}

export default router