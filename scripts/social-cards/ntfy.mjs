// Pushes the generated social-card output to ntfy (https://ntfy.sh or a
// self-hosted server) as a set of notifications: one summary (with a
// button to open the article), one plain-text message carrying the full
// caption (so it's readable and copy-pasteable straight from the
// notification/app), and one attachment message per card image (so each
// can be downloaded from the notification itself).
//
// ntfy's HTTP publish API: https://docs.ntfy.sh/publish/
// - Plain message: POST <server>/<topic>, body = message text, with
//   Title/Priority/Tags/Click/Actions headers as needed.
// - File attachment: POST/PUT <server>/<topic>, body = file bytes,
//   Filename header names it, Message header sets the notification text
//   (since the body is the file, not the text, for this kind of request).
//
// NOT verified end-to-end in this environment — this sandbox's egress
// policy blocks ntfy.sh outright (confirmed via a plain curl test), so
// this was implemented strictly against ntfy's documented API and needs
// a real first run (locally or in the GitHub Actions workflow, where
// network access isn't restricted) to confirm formatting looks right in
// an actual client. If something's off, the ntfy docs above are the
// source of truth.
import { readFileSync } from "node:fs";
import path from "node:path";

async function publishText(server, topic, { title, body, tags, click, actions, priority }) {
  const headers = { Title: title };
  if (tags) headers.Tags = tags;
  if (click) headers.Click = click;
  if (actions) headers.Actions = actions;
  if (priority) headers.Priority = priority;
  const res = await fetch(`${server}/${topic}`, { method: "POST", headers, body });
  if (!res.ok) {
    throw new Error(`ntfy text publish failed (${res.status}): ${await res.text()}`);
  }
}

async function publishAttachment(server, topic, { title, message, filename, filePath, tags }) {
  const bytes = readFileSync(filePath);
  const headers = {
    Title: title,
    Message: message,
    Filename: filename,
  };
  if (tags) headers.Tags = tags;
  const res = await fetch(`${server}/${topic}`, { method: "POST", headers, body: bytes });
  if (!res.ok) {
    throw new Error(`ntfy attachment publish failed (${res.status}): ${await res.text()}`);
  }
}

const CARD_META = [
  { file: "01-cover.png", label: "Cover" },
  { file: "02-stats.png", label: "At a glance" },
  { file: "03-highlight.png", label: "Highlight" },
  { file: "04-cta.png", label: "CTA / link" },
];

export async function notifyNtfy({ server, topic, place, kindLabel, url, outDir, caption }) {
  if (!server || !topic) {
    throw new Error("ntfy server/topic not configured (NTFY_SERVER / NTFY_TOPIC).");
  }

  await publishText(server, topic, {
    title: `Today: ${place.name} (${kindLabel})`,
    body: `4 cards + caption ready below. Article: ${url}`,
    tags: "jp,camera_flash",
    click: url,
    actions: `view, Open article, ${url}`,
    priority: "default",
  });

  await publishText(server, topic, {
    title: `Caption — ${place.name} (copy me)`,
    body: caption,
    tags: "memo",
  });

  for (const { file, label } of CARD_META) {
    await publishAttachment(server, topic, {
      title: `${place.name} — ${label}`,
      message: `Card: ${label} (${file})`,
      filename: file,
      filePath: path.join(outDir, file),
      tags: "frame_with_picture",
    });
  }
}
