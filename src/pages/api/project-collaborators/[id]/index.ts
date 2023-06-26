import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { projectCollaboratorValidationSchema } from 'validationSchema/project-collaborators';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.project_collaborator
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getProjectCollaboratorById();
    case 'PUT':
      return updateProjectCollaboratorById();
    case 'DELETE':
      return deleteProjectCollaboratorById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProjectCollaboratorById() {
    const data = await prisma.project_collaborator.findFirst(
      convertQueryToPrismaUtil(req.query, 'project_collaborator'),
    );
    return res.status(200).json(data);
  }

  async function updateProjectCollaboratorById() {
    await projectCollaboratorValidationSchema.validate(req.body);
    const data = await prisma.project_collaborator.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteProjectCollaboratorById() {
    const data = await prisma.project_collaborator.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
