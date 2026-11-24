import type { AiProvider } from "../domain/enums";

/**
 * Provider-agnostic AI interface.
 *
 * The application never imports a vendor SDK directly. It asks the registry
 * for whatever provider the user configured, and gets back this shape. Adding
 * a provider means writing one adapter; nothing else changes.
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface CompletionRequest {
  messages: ChatMessage[];
  /** Soft ceiling on the reply length. */
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
}

export interface CompletionResult {
  text: string;
  model: string;
  provider: AiProvider;
  tokensIn?: number;
  tokensOut?: number;
}

export class AiNotConfiguredError extends Error {
  constructor(readonly provider: AiProvider) {
    super(
      provider === "none"
        ? "The AI tutor is switched off for this account. Turn it on in Settings."
        : `No API key is configured for ${provider}. Add one to your environment and restart, or switch provider in Settings.`,
    );
    this.name = "AiNotConfiguredError";
  }
}

export class AiRequestError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "AiRequestError";
  }
}

export interface AiAdapter {
  readonly provider: AiProvider;
  readonly defaultModel: string;
  /** False when no key is present; the UI degrades rather than erroring. */
  isConfigured(): boolean;
  complete(request: CompletionRequest, model?: string): Promise<CompletionResult>;
}
