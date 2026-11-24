"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { askTutorAction, deleteThreadAction } from "./actions";
import { TUTOR_INTENT_LABEL, type TutorIntent } from "@/lib/domain/enums";
import type { QuestionView } from "@/lib/question-view";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Notice,
  Textarea,
} from "@/components/ui";
import { cn } from "@/lib/cn";

interface Message {
  id: string;
  role: string;
  content: string;
}

const QUESTION_INTENTS: TutorIntent[] = [
  "explain",
  "why_wrong",
  "shortcut",
  "similar",
  "harder",
];

export function TutorConsole({
  enabled,
  question,
  threads,
  activeThread,
  providerLabel,
}: {
  enabled: boolean;
  question: QuestionView | null;
  threads: Array<{ id: string; title: string; intent: string; updatedAt: string }>;
  activeThread: { id: string; title: string; messages: Message[] } | null;
  providerLabel: string;
}) {
  const [messages, setMessages] = useState<Message[]>(activeThread?.messages ?? []);
  const [threadId, setThreadId] = useState<string | null>(activeThread?.id ?? null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // A counter, not a timestamp: these ids only need to be unique within the
  // list, and reading the clock during a render pass is impure.
  const nextId = useRef(0);

  async function ask(intent: TutorIntent, message: string) {
    if (busy) return;
    setBusy(true);
    setError(null);

    nextId.current += 1;
    const optimistic: Message = {
      id: `local-${nextId.current}`,
      role: "user",
      content: message.trim() || TUTOR_INTENT_LABEL[intent],
    };
    setMessages((current) => [...current, optimistic]);
    setInput("");

    const response = await askTutorAction({
      threadId,
      questionId: question?.id ?? null,
      intent,
      message,
    });

    setBusy(false);

    if (!response.ok) {
      setError(response.error ?? "That request failed.");
      setMessages((current) => current.filter((m) => m.id !== optimistic.id));
      return;
    }

    if (response.threadId) setThreadId(response.threadId);
    nextId.current += 1;
    setMessages((current) => [
      ...current,
      { id: `reply-${nextId.current}`, role: "assistant", content: response.reply ?? "" },
    ]);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {question ? (
          <Card>
            <CardHeader>
              <div className="min-w-0">
                <CardTitle>Question in context</CardTitle>
                <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-text-muted">
                  {question.stem}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge tone="neutral">{question.skillName}</Badge>
                  {question.pattern.patternName ? (
                    <Badge tone="neutral">{question.pattern.patternName}</Badge>
                  ) : null}
                  <Badge tone="neutral">Difficulty {question.difficulty}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-3">
              <div className="flex flex-wrap gap-1.5">
                {QUESTION_INTENTS.map((intent) => (
                  <Button
                    key={intent}
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={!enabled || busy}
                    onClick={() => void ask(intent, "")}
                  >
                    {TUTOR_INTENT_LABEL[intent]}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Start anywhere</CardTitle>
                <p className="mt-1 text-xs text-text-muted">
                  Ask a question directly, or open the tutor from a question in the bank, your
                  error log, or a session review to give it context.
                </p>
              </div>
            </CardHeader>
            <CardBody className="pt-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={!enabled || busy}
                onClick={() => void ask("mistake_review", "")}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Analyse my recurring mistakes
              </Button>
            </CardBody>
          </Card>
        )}

        <Card>
          <CardBody className="space-y-4">
            {messages.length === 0 ? (
              <p className="py-8 text-center text-xs text-text-subtle">
                Nothing asked yet in this thread.
              </p>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "rounded-[var(--radius-control)] border px-3.5 py-3",
                      message.role === "assistant"
                        ? "bg-bg-sunken"
                        : "border-accent/30 bg-accent-soft/40",
                    )}
                  >
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-subtle">
                      {message.role === "assistant" ? `Tutor (${providerLabel})` : "You"}
                    </p>
                    <p className="whitespace-pre-wrap text-xs leading-relaxed text-text-base">
                      {message.content}
                    </p>
                  </div>
                ))}
                {busy ? (
                  <p className="text-xs text-text-subtle">Thinking...</p>
                ) : null}
              </div>
            )}

            {error ? (
              <Notice tone="warning" role="alert">
                {error}
              </Notice>
            ) : null}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void ask("free", input);
              }}
              className="space-y-2"
            >
              <Textarea
                rows={3}
                value={input}
                disabled={!enabled || busy}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                    event.preventDefault();
                    void ask("free", input);
                  }
                }}
                placeholder={
                  enabled
                    ? "Ask anything. Cmd or Ctrl and Enter to send."
                    : "Configure an AI provider in Settings to use the tutor."
                }
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-text-subtle">
                  {enabled ? `Using ${providerLabel}` : "Tutor unavailable"}
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!enabled || busy || input.trim().length === 0}
                >
                  <Send className="h-3.5 w-3.5" />
                  Send
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Recent threads</CardTitle>
        </CardHeader>
        <CardBody className="pt-3">
          {threads.length === 0 ? (
            <p className="py-4 text-center text-xs text-text-subtle">No threads yet.</p>
          ) : (
            <ul className="space-y-1">
              {threads.map((thread) => (
                <li key={thread.id} className="flex items-center gap-1">
                  <Link
                    href={`/tutor?thread=${thread.id}`}
                    className={cn(
                      "min-w-0 flex-1 rounded-[var(--radius-control)] px-2.5 py-2 text-xs transition-colors",
                      threadId === thread.id
                        ? "bg-accent-soft text-accent"
                        : "text-text-muted hover:bg-surface-hover hover:text-text-base",
                    )}
                  >
                    <span className="block truncate">{thread.title}</span>
                    <span className="block text-[10px] text-text-subtle">
                      {new Date(thread.updatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </Link>
                  <form action={deleteThreadAction.bind(null, thread.id)}>
                    <button
                      type="submit"
                      aria-label={`Delete thread ${thread.title}`}
                      className="rounded p-1.5 text-text-subtle hover:bg-surface-hover hover:text-wrong"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
