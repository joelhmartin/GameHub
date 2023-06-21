import {
  Button,
  Collapse,
  Grid,
  GridItem,
  Heading, Spinner, Text
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DefinitionGrid from "../components/DefinitionGrid";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  if (isLoading) return <Spinner />;

  if (error || !game) throw error;

  return (
    <Grid
      templateAreas={{
        base: `"left" "right"`,
        lg: `"left right"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "1fr 1fr",
      }}
    >
      <GridItem area="left" paddingX={5}>
        <Heading>{game.name}</Heading>
        <Collapse startingHeight={20} in={show}>
          {game.description_raw}
        </Collapse>
        {!show && <Text>...</Text>}
        <Button size="sm" onClick={handleToggle} mt="1rem">
          Show {show ? "Less" : "More"}
        </Button>
        <DefinitionGrid game={game} />
      </GridItem>
      <GridItem area="right" paddingX={5}>
        <GameTrailer gameId={game.id} />
        <GameScreenshots gameId={game.id} />
      </GridItem>
    </Grid>
  );
};

export default GameDetailPage;
