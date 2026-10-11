import { pickExcuse, type PersonalityId, type SituationId } from "./excuses";

/**
 * Excuse provider. Currently uses the local sample collection.
 * To integrate a real AI API later, replace the body of this function
 * (e.g. call a server function) and keep the same signature.
 */
export async function generateExcuse(
  situation: SituationId,
  personality: PersonalityId,
  avoid?: string,
): Promise<string> {
  await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
  return pickExcuse(situation, personality, avoid);
}
