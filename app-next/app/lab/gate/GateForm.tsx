"use client";

import { useActionState } from "react";
import { validateCredentials, type GateState } from "../actions";

const initialState: GateState = {};

export default function GateForm({ from }: { from: string }) {
  const [state, formAction, isPending] = useActionState(
    validateCredentials,
    initialState,
  );

  return (
    <form action={formAction} className="w-full max-w-xs flex flex-col gap-4">
      <input type="hidden" name="from" value={from} />

      <input
        type="text"
        name="username"
        placeholder="username"
        autoFocus
        required
        autoComplete="username"
        className="liquid-glass rounded-full px-6 py-3 text-white text-sm text-center placeholder:text-white/40 outline-none w-full"
      />

      <input
        type="password"
        name="password"
        placeholder="password"
        required
        autoComplete="current-password"
        className="liquid-glass rounded-full px-6 py-3 text-white text-sm text-center placeholder:text-white/40 outline-none w-full"
      />

      <button
        type="submit"
        disabled={isPending}
        className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
      >
        {isPending ? "Entering..." : "Enter"}
      </button>

      {state.error ? (
        <p className="text-white/60 text-xs">{state.error}</p>
      ) : null}
    </form>
  );
}
