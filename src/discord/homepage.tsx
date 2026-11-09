import { Container, TextDisplay, parseDiscordEmbed } from "./parser";

export const homepageEmbed = parseDiscordEmbed(
  <Container>
    <TextDisplay
      content={"# Dylan Levy\nSoftware developer and Ohio State CSE student."}
    />
  </Container>,
);
