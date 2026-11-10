import {
  ActionRow,
  Button,
  Container,
  MediaGallery,
  MediaGalleryItem,
  Separator,
  TextDisplay,
  parseDiscordEmbed,
} from "./parser";

export const homepageEmbed = parseDiscordEmbed(
  <Container accentColor={0x203e51}>
    <TextDisplay
      content={"-# 📍 Cleveland, OH · Ohio State · Class of 2029"}
    />
    <TextDisplay
      content={
        "# Hi, I'm Dylan\nI turn ideas into *reality.*\n\nComputer Science Engineering student at The Ohio State University, pursuing a minor in Mathematics. Building for the web, mobile, and everything I'm curious about."
      }
    />
    <MediaGallery>
      <MediaGalleryItem
        url="https://dylanlevy.com/og.png"
        description="Dylan Levy — personal website preview"
      />
    </MediaGallery>
    <Separator divider spacing={2} />
    <ActionRow>
      <Button label="About Me" url="https://dylanlevy.com/#about" />
      <Button label="Projects" url="https://dylanlevy.com/#projects" />
      <Button label="Education" url="https://dylanlevy.com/#education" />
      <Button label="Contact" url="https://dylanlevy.com/#contact" />
      <Button label="Resume" url="https://dylanlevy.com/Resume.pdf" />
    </ActionRow>
  </Container>,
);
