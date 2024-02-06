import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";
import Recordings from "@/components/resources/resources";

//This page fetches resources from an API and renders the Recordings component with the fetched data.

const resources = async () => {
const user: OmitPassword | string = await useServerUser();
// If there is no user, it returns a message asking the user to log in.
if (!user) return <>Please login</>

// This fetches data from the Zoom API.
const response = await fetch("http://localhost:3000/api/zoomapi");  //this should eventually change to io.vefskoli.is // tip from coder: use env URL for this or the production URL

// This parses the response data as JSON.
const data = await response.json();
if (!data || !data.meetings) return <>No resources found</>;

  return (
    <div style={{position:"relative"}}>
      <Recordings data={data} />
    </div>
  );
};

export default resources;







