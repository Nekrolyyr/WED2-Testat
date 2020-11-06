import * as express from "express";
import {taskController} from "../controller/taskController";

const router = express.Router();

router.get("/", taskController.getIndex.bind(taskController));
router.get("/task", taskController.getTask.bind(taskController));
router.post("/task", taskController.postTask.bind(taskController))

export default router;
