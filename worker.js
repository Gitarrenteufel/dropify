export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    const [releases, lastUpdated] = await Promise.all([
      env.DROPIFY_KV.get("all_releases"),
      env.DROPIFY_KV.get("last_updated")
    ]);

    return new Response(JSON.stringify({
      releases: releases ? JSON.parse(releases) : [],
      updated: lastUpdated || null
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
