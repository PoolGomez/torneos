// import { auth } from "@clerk/nextjs/server";
// import { auth } from "@/utils/dbconfig";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

// const handleAuth =()=>{
//     // const { userId } = auth();
//     // if(!userId) throw new Error("Unauthorized");
//     // return {userId };

//     const user = auth.currentUser;
//     if(!user) throw new Error("Unauthorized");
//     return {user };
// }

export const ourFileRouter = {
    profileImage: f({image: {maxFileSize: "8MB" , maxFileCount: 1}})
        // .middleware(()=> handleAuth())
        .onUploadComplete(()=>{})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
