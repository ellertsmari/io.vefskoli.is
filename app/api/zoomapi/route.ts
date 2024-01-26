

  let token = ""

const getVideos= async(token:string)=>{

try { 
  const url = "https://apaaaaai.zoom.us/v2/users/vefskolinn@tskoli.is/recordings?page_size=30&from=2021-10-11"


export const getVideos= async(token:string)=>{
  const url = "https://api.zoom.us/v2/users/vefskolinn@tskoli.is/recordings?page_size=30&from=2021-10-11"

  
  const response = await fetch (url,{
      headers: {
          authorization: "Bearer "+ token 
      }
  });

  if (response == null) throw new Error("Response is null.");
  if (response.status == 404) throw new Error("Page not found.")
  return response.json()
} catch (error) {
  return error;

}
};

type data = {
  code: number;
}

export const GET= async ()=>{

  try { 
  let data = await getVideos(token)
  if (data.code===124){
  const tokenResponse = await fetch ("https://zoom.us/oauth/token?grant_type=account_credentials&account_id=xTmwVbNdQRGv5XBIuyvI2A",{
      method: "POST",
      headers:{
        authorization: process.env.BASIC_AUTH 
        
      }
  })  

  
  const tokenData = await tokenResponse.json() 
  token = tokenData.access_token
  data = await getVideos(token)
  console.log (data)

  if (data.message){
    throw new Error("This surely is an error")
  }
  

  console.log(data.recordings[0]);


  }
   
  if (token == null) throw new Error("Missing tokendata.")
  return Response.json(data);
  } catch (error) {
    return Response.json(error);

    
  }


  };









  





  // curl --request GET {download_url} "authorization: Bearer {JWT}" --header "content-type: application/json".
  // curl -H "Authorization: Bearer eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjgwOWMxYTAxLWFjY2EtNDJkYS1iNzk4LTQ5YTJkNTg4MzkwZSJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiI5T3VlNWJJSFNNQ3lUUlB5M3AxSGtBIiwidmVyIjo5LCJhdWlkIjoiYTdjNzdlY2EyNGM1NTEyNDVhOTA3ZDc2NjI4ZTMyOTAiLCJuYmYiOjE3MDYxMDQ5MDYsImNvZGUiOiJkb2RmODRKSlJDaVdiVnduZU1YWnlBS09BYWQ0ZklDTWUiLCJpc3MiOiJ6bTpjaWQ6eUZEUU9KaXdTNjZtaklfaWY1SUltdyIsImdubyI6MCwiZXhwIjoxNzA2MTA4NTA2LCJ0eXBlIjozLCJpYXQiOjE3MDYxMDQ5MDYsImFpZCI6InhUbXdWYk5kUVJHdjVYQkl1eXZJMkEifQ.a9BQyqgR4xBDxJpnLqahBr08DwtltKjDZ7rGwtVkqZmyiwO5cqu8KKquCch4f0HjYRPTTRCqLlUvislwR5JMQw" https://api.zoom.us/v2/rec/archive/download/xyz