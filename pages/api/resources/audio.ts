import { NextApiRequest, NextApiResponse } from 'next'
import fauna from 'faunadb'
import { pick } from 'lodash-es'

const q = fauna.query

let faunaClient: fauna.Client | null = null
let faunaCollection: string | null = null

if (process.env.FAUNA_SECRET && process.env.FAUNA_COLLECTION) {
  faunaClient = new fauna.Client({
    secret: process.env.FAUNA_SECRET
  })
  faunaCollection = process.env.FAUNA_COLLECTION
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!faunaClient || !faunaCollection) throw new Error('no_database_config')

    if (req.method === 'POST') {
      await faunaClient.query(q.Create(
        q.Collection(faunaCollection),
        {
          data: {
            ...(pick(req.body, ['videoUrl', 'startTime', 'duration', 'title', 'author', 'lang']))
          }
        }
      ))
      return res.status(204).send(null)
    } else if (req.method === 'GET') {
      const query = await faunaClient.query<any>(
        q.Map(
          q.Paginate(q.Documents(q.Collection('test'))),
          q.Lambda("X", q.Get(q.Var('X')))
        )
      )

      return res.json({ rows: query.data.map((i: any) => ({ ...i.data, id: i.ref.value.id })) })
    } else {
      return res.status(405).send(null)
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, code: 'internal_server_error' })
  }
}