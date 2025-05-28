import Image from 'react-bootstrap/Image';
import useWikiImage from "../hooks/useWikiImage";

const PlayerPicture = ({ 
    playerName,
}) => {
    const { url, error } = useWikiImage(playerName);

    const src = url || "Can't find picture";

    return (
        <Image width={350} height={400} src={src} rounded />
    )
}

export default PlayerPicture