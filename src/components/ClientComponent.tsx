"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Controls";
import Controls from "./Messages";

export default function ClientComponent({
  accessToken,
  configKey,
}: {
  accessToken: string;
  configKey?: string;
}) {
  return (
    <VoiceProvider
      configId={configKey}
      auth={{ type: "accessToken", value: accessToken }}
    >
      <Messages />
      <Controls />
    </VoiceProvider>
  );
}
