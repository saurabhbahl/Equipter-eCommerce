export async function sFQuery(req, res) {
  try {
    let query = req.body.query || req.query.q;

    if (!query) {
      return res
        .status(400)
        .json({ success: false, data: [], message: "No query provided" });
    }

    if (!query.toLowerCase().includes("select")) {
      return res
        .status(400)
        .json({ success: false, data: [], message: "Invalid query format" });
    }

    const sfQueryUrl = `${
      process.env.SF_INSTANCE_URL
    }/services/data/v52.0/query/?q=${encodeURIComponent(query)}`;
    const sfRes = await fetch(sfQueryUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!sfRes.ok) {
      const error = await sfRes.json();
      return res
        .status(sfRes.status)
        .json({ success: false, message: "Salesforce query failed", error });
    }

    const sfData = await sfRes.json();
    return res.json({ success: true, data: sfData });
  } catch (error) {
    console.error("Error executing Salesforce query:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
