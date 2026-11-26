import { anthropicAdapter } from "./anthropic";
import { openaiAdapter } from "./openai";
import {
  AiNotConfiguredError,
  type AiAdapter,
  type CompletionRequest,
  type CompletionResult,
} from "./types";
import type { AiProvider } from "../domain/enums";

const ADAPTERS: Record<Exclude<AiProvider, "none">, AiAdapter> = {
  anthropic: anthropicAdapter,
  openai: openaiAdapter,
};

export function getAdapter(provider: AiProvider): AiAdapter | null {
  if (provider === "none") return null;
  return ADAPTERS[provider] ?? null;
}

export interface ProviderStatus {
  provider: AiProvider;
  label: string;
  configured: boolean;
  defaultModel: string;
}

export function providerStatuses(): ProviderStatus[] {
  return [
    {
      provider: "anthropic" as const,
      label: "Anthropic",
      configured: anthropicAdapter.isConfigured(),
      defaultModel: anthropicAdapter.defaultModel,
    },
    {
      provider: "openai" as const,
      label: "OpenAI",
      configured: openaiAdapter.isConfigured(),
      defaultModel: openaiAdapter.defaultModel,
    },
    { provider: "none" as const, label: "Disabled", configured: true, defaultModel: "" },
  ];
}

export async function complete(
  provider: AiProvider,
  request: CompletionRequest,
  model?: string | null,
): Promise<CompletionResult> {
  const adapter = getAdapter(provider);
  if (!adapter) throw new AiNotConfiguredError(provider);
  if (!adapter.isConfigured()) throw new AiNotConfiguredError(provider);
  return adapter.complete(request, model ?? undefined);
}

export * from "./types";
export * from "./prompts";
export * from "./generation";
