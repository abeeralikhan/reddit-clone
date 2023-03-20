import { Community, CommunityState } from "@/src/atoms/communitesAtom";
import { firestore } from "@/src/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "@/src/components/Community/CommunityNotFound";
import React, { useEffect } from "react";
import Header from "@/src/components/Community/Header";
import PageContent from "@/src/components/Layout/PageContent";
import CreatePostLink from "@/src/components/Community/CreatePostLink";
import Posts from "@/src/components/Posts/Posts";
import { useSetRecoilState } from "recoil";
import About from "@/src/components/Community/About";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  const setCommunityStateValue = useSetRecoilState(CommunityState);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
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

    if (!communityDoc.exists()) {
      return {
        props: {
          communityData: "",
        },
      };
    }

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
