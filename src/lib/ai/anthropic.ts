import {
  AiNotConfiguredError,
  AiRequestError,
  type AiAdapter,
  type CompletionRequest,
  type CompletionResult,
} from "./types";

const API_URL = "https://api.anthropic.com/v1/messages";
const API_VERSION = "2023-06-01";

/**
 * Anthropic adapter. Uses the HTTP API directly rather than the SDK, which
 * keeps the dependency surface small and makes the request shape obvious.
 */
export const anthropicAdapter: AiAdapter = {
  provider: "anthropic",
  defaultModel: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",

  isConfigured() {
    return Boolean(process.env.ANTHROPIC_API_KEY);
  },

  async complete(request: CompletionRequest, model?: string): Promise<CompletionResult> {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new AiNotConfiguredError("anthropic");

    const chosen = model || this.defaultModel;

    // Anthropic takes the system prompt as a top-level field, not a message.
    const system = request.messages
      .filter((m) => m.role === "system")
      .map((m) => m.content)
      .join("\n\n");
    const messages = request.messages
      .filter((m) => m.role !== "system")
      .map((m) => ({ role: m.role, content: m.content }));

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": API_VERSION,
      },
      body: JSON.stringify({
        model: chosen,
        max_tokens: request.maxTokens ?? 1400,
        temperature: request.temperature ?? 0.3,
        ...(system ? { system } : {}),
        messages,
      }),
      signal: request.signal,
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new AiRequestError(
        `Anthropic returned ${response.status}. ${detail.slice(0, 300)}`,
        response.status,
      );
    }

    const payload: unknown = await response.json();
    const text = extractText(payload);

    return {
      text,
      model: chosen,
      provider: "anthropic",
      tokensIn: readUsage(payload, "input_tokens"),
      tokensOut: readUsage(payload, "output_tokens"),
    };
  },
};

function extractText(payload: unknown): string {
  if (payload === null || typeof payload !== "object") return "";
  const content = (payload as { content?: unknown }).content;
  if (!Array.isArray(content)) return "";
  return content
    .map((block) =>
      block !== null && typeof block === "object" && "text" in block
        ? String((block as { text?: unknown }).text ?? "")
        : "",
    )
    .join("")
    .trim();
}

function readUsage(payload: unknown, key: string): number | undefined {
  if (payload === null || typeof payload !== "object") return undefined;
  const usage = (payload as { usage?: unknown }).usage;
  if (usage === null || typeof usage !== "object") return undefined;
  const value = (usage as Record<string, unknown>)[key];
  return typeof value === "number" ? value : undefined;
}
