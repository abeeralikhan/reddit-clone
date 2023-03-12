import { Community } from "@/src/atoms/communitesAtom";
import { firestore } from "@/src/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";
import React from "react";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log("Here is the data", communityData);
  return <div>WELCOME TO {communityData.id}</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data and pass it the client
  try {
    const communityDocRef = doc(
      firestore,
      "communites",
      context.query.communityId as string // type casted to string
    );

    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: JSON.parse(
          // getServerSideProps is not able to serialize timestamp data
          // therefore, using safeJsonStringify library
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    };
  } catch (error) {
    // Could add error page here
    console.log("getServerSideProp error", error);
  }
}

export default CommunityPage;
