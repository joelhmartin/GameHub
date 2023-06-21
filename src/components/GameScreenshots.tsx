import { GridItem, Image, Img, SimpleGrid } from "@chakra-ui/react";
import useScreenshots from "../hooks/useScreenshots";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data: screenshots, isLoading, error } = useScreenshots(gameId);

  if (isLoading) return null;

  if (error) throw error;

  return (
    <SimpleGrid 
      columns={{ base: 1, md: 2 }}
      spacing={6}
    >
      {screenshots?.results.map((screenshot) => (
        <GridItem key={screenshot.id}>
          <Image src={screenshot.image} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default GameScreenshots;
