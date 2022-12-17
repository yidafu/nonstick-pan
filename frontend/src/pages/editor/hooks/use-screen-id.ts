import { useParams } from 'react-router-dom';

export function useScreenId() {
  const { screenId } = useParams();

  return Number(screenId);
}
