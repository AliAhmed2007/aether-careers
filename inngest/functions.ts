import { inngest } from "./client";

export const processTask = inngest.createFunction(
  {
    id: "process-task",
    triggers: [{ event: "app/task.created" }],
  },
  async ({ event, step }) => {
    await step.run("do-something", async () => {
      return { success: true };
    });

    return { message: "Task complete" };
  }
);