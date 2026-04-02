import { auth } from "@clerk/nextjs/server";
import { SidebarUserButtonClient } from "./_SidebarUserButtonClient";

async function SidebarUserButton() {
  const { userId } = await auth();
  return (
    <SidebarUserButtonClient
      user={{ email: "ali@helwan.com", name: "Ali Ahmed", imageUrl: "" }}
    />
  );
}

export default SidebarUserButton;
