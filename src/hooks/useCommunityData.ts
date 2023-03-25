import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  CommunityState,
} from "../atoms/communitesAtom";
import { auth, firestore } from "../firebase/clientApp";

const useCommunityData = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in?
    if (!user) {
      // open the modal
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      // communitySnippets doc
      const snippetDocsRef = collection(
        firestore,
        `users/${user?.uid}/communitySnippets`
      );
      const snippetDocs = await getDocs(snippetDocsRef);
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  // Call when there's a logged in user
  // Run again if user changes
  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({ ...prev, mySnippets: [] }));
      return;
    }
    getMySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const joinCommunity = async (communityData: Community) => {
    if (error) setError("");
    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      // create a new community snippet
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      // insert the newSnippet into the communitySnippets collection of the user
      const snippetsRef = doc(
        firestore,
        `users/${user?.uid}/communitySnippets`,
        communityData.id
      );
      batch.set(snippetsRef, newSnippet);

      // update the numberOfMembers inside a communtiy (+1)
      const communityRef = doc(firestore, "communites", communityData.id);
      batch.update(communityRef, {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      // update recoil state --> communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    if (error) setError("");
    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      // delete the community snippet
      const snippetsRef = doc(
        firestore,
        `users/${user?.uid}/communitySnippets`,
        communityId
      );
      batch.delete(snippetsRef);

      // update the numberOfMembers inside a communtiy (-1)
      const communityRef = doc(firestore, "communites", communityId);
      batch.update(communityRef, {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      // update recoil state --> communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (snippet) => snippet.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
