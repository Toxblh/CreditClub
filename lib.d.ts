type CreditClubOutput = {
  report_date: string
  updated_date: string
  score: number
}

declare function getCreditClubScore(creds: {
  login: string
  pass: string
}): Promise<CreditClubOutput>
