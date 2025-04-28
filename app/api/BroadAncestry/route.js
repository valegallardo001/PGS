import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const broadAncestries = await prisma.BroadAncestryCategory.findMany();
    return Response.json(broadAncestries);
  } catch (error) {
    return Response.json({ error: "Error al obtener los datos" }, { status: 500 });
  }
}
