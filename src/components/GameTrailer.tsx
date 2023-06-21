import { Heading, Text } from "@chakra-ui/react";
import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data: trailers, error, isLoading } = useTrailers(gameId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !trailers) throw error;

  const firstTrailer = trailers.results[0];

  if (!firstTrailer) return null;
  else
    return (
      <video
        key={firstTrailer.id}
        src={firstTrailer.data.max}
        poster={firstTrailer.preview}
        controls
      />
    );
};

export default GameTrailer;
