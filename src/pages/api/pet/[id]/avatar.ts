import { prisma } from "@/lib/prisma";
import nextConnect from "next-connect";
import multer from "multer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { generateFileName } from "@/lib/filename";

export const config = {
  api: {
    bodyParser: false
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/avatars",
    filename: generateFileName,
  }),
});
const api = nextConnect();

api.post(upload.single("image"), async (req, res) => {
  const session = await getServerSession(req as any, res as any, authOptions);
  if (session === null) {
    res.writeHead(401);
    return;
  }

  const file = req.file;
  if (!file) {
    res.writeHead(400);
    return;
  }

  const id = req.query.id as string | undefined;
  if (!id) {
    res.writeHead(400);
    return;
  }

  const asset = await prisma.pet.updateMany({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      avatar: file.filename,
    }
  });

  if (asset.count === 0) {
    res.writeHead(404);
    return;
  }

  res.json(asset);
});

export default api;
