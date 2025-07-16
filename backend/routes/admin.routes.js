import { Router } from "express"
import { addProduct} from "../controllers/admin.controller.js";
import {verifyjwt} from "../middleware/auth.middleware.js"
import {upload } from "../middleware/upload.middleware.js"
import { isAdmin } from "../middleware/isadmin.middleware.js";
const router = Router();


router.route("/admin").post(
    verifyjwt,
    isAdmin,
    upload.fields([
        {
            name: "productimage",
            maxCount: 1
        }
    ]),
    addProduct
)

export default router;