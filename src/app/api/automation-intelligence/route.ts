import { collectAutomationIntelligence } from '../../automation-intelligence/collectIntelligence';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  try {
    const result = await collectAutomationIntelligence(request);
    return Response.json(result);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
