import { Router } from "express";

const router = Router();

router.get("/:nationId", (_, res) => {
  res.end("Will send all the nations to you!");
});

router.post("/:nationId", (req, res) => {
  res.send(
    `Will add the nation: ${req.body.name} with details: ${req.body.description}`
  );
});

router.put("/:nationId", (_, res) => {
  res.statusCode = 403;
  res.send("PUT operation not supported.");
});

router.delete("/:nationdId", (_, res) => {
  res.send("Deleting all nations");
});

export default router;
