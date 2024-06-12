import { createRouteHandler } from "uploadthing/next";
import { UTApi } from "uploadthing/server"; 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Apply an (optional) custom config:
  // config: { ... },
});

export async function DELETE(request: Request) {
  try {
    const { fileKey } = await request.json();
    console.log("Received fileKey for deletion:", fileKey);
    
    const utApi = new UTApi();
    await utApi.deleteFiles(fileKey);

    return new Response(JSON.stringify({ message: "Image Deleted" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Response(JSON.stringify({ error: "Failed to delete image" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
