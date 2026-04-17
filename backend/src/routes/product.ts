import { Router } from "express";
import {
  create,
  getAll,
  byId,
  update,
  remove,
} from "../controller/productController";
import upload from "../middleware/multer";

const router = Router();

router.get("/allProducts", getAll);
router.get("/allProducts/:id", byId);
router.post("/create", upload.single("image"), create);
router.put("/update/:id", upload.single("image"), update);
router.delete("/delete/:id", remove);

export default router;
