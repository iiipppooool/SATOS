import {
  AiNotConfiguredError,
  AiRequestError,
  type AiAdapter,
  type CompletionRequest,
  type CompletionResult,
} from "./types";

const API_URL = "https://api.openai.com/v1/chat/completions";

export const openaiAdapter: AiAdapter = {
  provider: "openai",
  defaultModel: process.env.OPENAI_MODEL || "gpt-4.1",

  isConfigured() {
    return Boolean(process.env.OPENAI_API_KEY);
  },

  async complete(request: CompletionRequest, model?: string): Promise<CompletionResult> {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new AiNotConfiguredError("openai");

    const chosen = model || this.defaultModel;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: chosen,
        max_tokens: request.maxTokens ?? 1400,
        temperature: request.temperature ?? 0.3,
        messages: request.messages,
      }),
      signal: request.signal,
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new AiRequestError(
        `OpenAI returned ${response.status}. ${detail.slice(0, 300)}`,
        response.status,
      );
    }

    const payload: unknown = await response.json();

    return {
      text: extractText(payload),
      model: chosen,
      provider: "openai",
      tokensIn: readUsage(payload, "prompt_tokens"),
      tokensOut: readUsage(payload, "completion_tokens"),
    };
  },
};

function extractText(payload: unknown): string {
  if (payload === null || typeof payload !== "object") return "";
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) return "";
  const first = choices[0];
  if (first === null || typeof first !== "object") return "";
  const message = (first as { message?: unknown }).message;
  if (message === null || typeof message !== "object") return "";
  const content = (message as { content?: unknown }).content;
  return typeof content === "string" ? content.trim() : "";
}

function readUsage(payload: unknown, key: string): number | undefined {
  if (payload === null || typeof payload !== "object") return undefined;
  const usage = (payload as { usage?: unknown }).usage;
  if (usage === null || typeof usage !== "object") return undefined;
  const value = (usage as Record<string, unknown>)[key];
  return typeof value === "number" ? value : undefined;
}
