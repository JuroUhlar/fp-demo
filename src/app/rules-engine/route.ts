export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event_id } = body;
    const rulesetId = 'rs_OyQUaHCx9tgkFp';
    const apiKey = process.env.FP_SECRET_API_KEY;

    if (!apiKey) {
      console.error('Missing FP_SECRET_API_KEY environment variable');
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }

    const url = `https://eu.api.fpjs.io/v4/events/${event_id}?ruleset_id=${rulesetId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const eventData = await response.json();
    const { rule_action } = eventData;

    // If a rule_action exists and is blocking
    if (rule_action?.type === 'block') {
      const headers = Object.fromEntries(rule_action.headers.map((h: { name: string; value: string }) => [h.name, h.value]));
      return new Response(rule_action.body, { status: rule_action.status_code, headers });
    }

    // Action allowed, create the account (for example) and return success
    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
