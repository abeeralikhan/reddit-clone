import { useRecoilState } from "recoil";
import { postState } from "../atoms/postsAtom";

function usePosts() {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};

  const onSelectPost = () => {};

  const onDeletePost = async () => {};

  return {
    postStateValue,
    setPostStateValue,
  };
}

export default usePosts;