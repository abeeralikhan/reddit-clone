import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";

export default function useCreateCommunity() {
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const createCommunity = async (
    communityName: string,
    communityType: string
  ) => {
    if (error) setError("");
    const format = /[ `~!@#$%^&*()-=+\[\]|{;:'"\/?.>,<}]/;

    // Validate the community --> must not be taken
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3-21 characters, and can only contain letters, numbers or underscores."
      );
      return;
    }

    setLoading(true);
    try {
      const communityDocRef = doc(firestore, "communites", communityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);

        // Check if name is taken or not
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityName} is taken. Try another!`);
        }

        // Create the community document in the firestore
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // Update communitySnippets on user
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      setError(error.message);
      console.log("useCreateCommunity error", error);
    }
    setLoading(false);
  };

  const data: [
    (communityName: string, communityType: string) => Promise<void>,
    boolean,
    string
  ] = [createCommunity, loading, error];

  return data;
}
