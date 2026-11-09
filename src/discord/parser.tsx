import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

type DiscordComponent<Props, Payload> = {
    (props: Props): never;
    displayName: string;
    serialize: (props: Props) => Payload;
};

type MediaProps = { url: string; description?: string; spoiler?: boolean };
type ButtonProps = {
    id?: number;
    url: string;
    disabled?: boolean;
} & (
        | { label: string; emoji?: DiscordEmoji }
        | { label?: string; emoji: DiscordEmoji }
    );
type DiscordEmoji = { id?: string; name?: string; animated?: boolean };

function defineComponent<Props, Payload>(
    displayName: string,
    serialize: (props: Props) => Payload,
): DiscordComponent<Props, Payload> {
    function DiscordElement(_props: Props): never {
        throw new Error(`${displayName} must be used with parseDiscordEmbed.`);
    }

    return Object.assign(DiscordElement, { displayName, serialize });
}

/** Convert a Discord JSX tree into a website component embed payload. */
export function parseDiscordEmbed(element: ReactElement) {
    return { component: parseElement(element, [Container]) };
}

function parseElement<Component extends DiscordComponent<never, unknown>>(
    element: ReactNode,
    allowedTypes: readonly Component[],
): ReturnType<Component["serialize"]> {
    if (isValidElement<never>(element)) {
        const elementType: unknown = element.type;
        const component = allowedTypes.find((type) => type === elementType);
        if (component) {
            return component.serialize(element.props) as ReturnType<
                Component["serialize"]
            >;
        }
    }

    const names = allowedTypes.map((type) => type.displayName).join(", ");
    throw new TypeError(`Expected a Discord JSX element of type ${names}.`);
}

function parseChildren<Component extends DiscordComponent<never, unknown>>(
    children: ReactNode,
    allowedTypes: readonly Component[],
): ReturnType<Component["serialize"]>[] {
    return Children.toArray(children).flatMap((child) =>
        isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
            ? parseChildren(child.props.children, allowedTypes)
            : [parseElement(child, allowedTypes)],
    );
}

export const Container = defineComponent(
    "Container",
    ({
        children,
        accentColor,
        spoiler,
    }: {
        children?: ReactNode;
        accentColor?: number;
        spoiler?: boolean;
    }) => ({
        type: 17 as const,
        accent_color: accentColor,
        spoiler,
        components: parseChildren(children, [
            ActionRow,
            Section,
            TextDisplay,
            MediaGallery,
            Separator,
        ]),
    }),
);

export const ActionRow = defineComponent(
    "ActionRow",
    ({ children }: { children?: ReactNode }) => ({
        type: 1 as const,
        components: parseChildren(children, [Button]),
    }),
);

export const Button = defineComponent(
    "Button",
    ({ id, url, label, emoji, disabled }: ButtonProps) => ({
        type: 2 as const,
        style: 5 as const,
        id,
        url,
        label,
        emoji,
        disabled,
    }),
);

export const Section = defineComponent(
    "Section",
    ({
        children,
        accessory,
    }: {
        children?: ReactNode;
        accessory: ReactElement;
    }) => ({
        type: 9 as const,
        components: parseChildren(children, [TextDisplay]),
        accessory: parseElement(accessory, [Button, Thumbnail]),
    }),
);

type TextDisplayProps =
    | { content: string; children?: string }
    | { content?: string; children: string };

export const TextDisplay = defineComponent(
    "TextDisplay",
    ({ children, content }: TextDisplayProps) => {
        const text = content ?? children;
        if (typeof text !== "string") {
            throw new TypeError("TextDisplay expects a Markdown string.");
        }

        return { type: 10 as const, content: text };
    },
);

export const Thumbnail = defineComponent(
    "Thumbnail",
    ({ url, description, spoiler }: MediaProps) => ({
        type: 11 as const,
        media: { url },
        description,
        spoiler,
    }),
);

export const MediaGallery = defineComponent(
    "MediaGallery",
    ({ children }: { children?: ReactNode }) => ({
        type: 12 as const,
        items: parseChildren(children, [MediaGalleryItem]),
    }),
);

export const MediaGalleryItem = defineComponent(
    "MediaGalleryItem",
    ({ url, description, spoiler }: MediaProps) => ({
        media: { url },
        description,
        spoiler,
    }),
);

export const Separator = defineComponent(
    "Separator",
    ({ divider, spacing }: { divider?: boolean; spacing?: 1 | 2 }) => ({
        type: 14 as const,
        divider,
        spacing,
    }),
);
