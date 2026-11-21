/**
 * Public contact API intentionally fail-closed until CRC legal, privacy, mail,
 * CRM provider and independently reviewed launch evidence is accepted.
 * Do not parse, retain or log any request payload containing personal data.
 */
const headers = {'Cache-Control':'no-store, private', 'X-Robots-Tag':'noindex, nofollow'};

export async function POST() {
  return Response.json({
    status:'unavailable',
    code:'CRC_INTAKE_NOT_AUTHORIZED',
    message:'The corporate inquiry service is not yet active. No information has been submitted.'
  },{status:503,headers});
}

export async function GET() {
  return Response.json({status:'unavailable',code:'CRC_INTAKE_NOT_AUTHORIZED'},{status:503,headers});
}
