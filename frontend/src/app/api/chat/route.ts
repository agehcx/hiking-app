export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch("http://34.1.196.119:9000/v1/basicChat", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      return Response.json(
        { error: `Backend error: ${response.status}` }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Chat proxy error:", error);
    return Response.json(
      { error: "Failed to connect to backend" }, 
      { status: 500 }
    );
  }
}