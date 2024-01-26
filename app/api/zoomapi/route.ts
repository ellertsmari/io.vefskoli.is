

  let token = ""

export const getVideos= async(token:string)=>{
  const url = "https://api.zoom.us/v2/users/vefskolinn@tskoli.is/recordings?page_size=30&from=2021-10-11"
  
  const response = await fetch (url,{
      headers: {
          authorization: "Bearer "+ token 
      }
  })
  return response.json()
}


export const GET= async ()=>{
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
  console.log (token)
  data = await getVideos(token)
  console.log (data)
  console.log(data.recordings[0]);

  }
   
  return Response.json(data)
  }






  





  // curl --request GET {download_url} "authorization: Bearer {JWT}" --header "content-type: application/json".
  // curl -H "Authorization: Bearer eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjgwOWMxYTAxLWFjY2EtNDJkYS1iNzk4LTQ5YTJkNTg4MzkwZSJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiI5T3VlNWJJSFNNQ3lUUlB5M3AxSGtBIiwidmVyIjo5LCJhdWlkIjoiYTdjNzdlY2EyNGM1NTEyNDVhOTA3ZDc2NjI4ZTMyOTAiLCJuYmYiOjE3MDYxMDQ5MDYsImNvZGUiOiJkb2RmODRKSlJDaVdiVnduZU1YWnlBS09BYWQ0ZklDTWUiLCJpc3MiOiJ6bTpjaWQ6eUZEUU9KaXdTNjZtaklfaWY1SUltdyIsImdubyI6MCwiZXhwIjoxNzA2MTA4NTA2LCJ0eXBlIjozLCJpYXQiOjE3MDYxMDQ5MDYsImFpZCI6InhUbXdWYk5kUVJHdjVYQkl1eXZJMkEifQ.a9BQyqgR4xBDxJpnLqahBr08DwtltKjDZ7rGwtVkqZmyiwO5cqu8KKquCch4f0HjYRPTTRCqLlUvislwR5JMQw" https://api.zoom.us/v2/rec/archive/download/xyz