export function makeRichTextSection(text: string) {
  return {
    type: "rich_text_section",
    text: { type: "text", text },
  };
}

export function makeTextSection(text: string) {
  return {
    type: "section",
    text: { type: "mrkdwn", text },
  };
}

export function makeTextAndImageSection(text: string, image_url: string) {
  return {
    type: "section",
    text: { type: "mrkdwn", text },
    accessory: { type: "image", alt_text: "_image", image_url },
  };
}

export function makeImageSection(text: string, image_url: string) {
  return {
    type: "image",
    title: { type: "plain_text", text },
    image_url,
    alt_text: "_image",
  };
}

export function makeDividerSection() {
  return {
    type: "divider",
  };
}

export function makeActionsSection(elements: Record<string, any>[]) {
  return {
    type: "actions",
    elements: elements,
  };
}

export function makeListSection(listItems: string[]) {
  return {
    type: "rich_text",
    elements: [
      {
        type: "rich_text_list",
        elements: listItems.map((i) => {
          return {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: i,
              },
            ],
          };
        }),
        style: "bullet",
        indent: 0,
        border: 1,
      },
    ],
  };
}

export function makeUrlButton(text: string, url: string) {
  return {
    type: "button",
    text: { type: "plain_text", text, emoji: true },
    url,
  };
}
