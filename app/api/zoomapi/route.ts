let token = ""

const getVideos= async(token:string)=>{
  let data:{}[] = []
  const months:number[] = [7,8,9,10,11,0,1,2,3,4];
  for (let i = 0; i < months.length; i++) {
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getMonth() > 4? fromDate.getFullYear():fromDate.getFullYear()-1);  //if month is larger than may it gets the previous year
    fromDate.setMonth(months[i]);
    fromDate.setDate(1); // set to the first day of the month
    fromDate.setHours(0, 0, 0, 0); // set to the start of the day

    const toDate = new Date(fromDate);
    toDate.setMonth(months[i] + 1);
    console.log({from: fromDate, to: toDate})
    
const url = `https://api.zoom.us/v2/users/vefskolinn@tskoli.is/recordings?page_size=30&from=${fromDate.toISOString().split('T')[0]}&to=${toDate.toISOString().split('T')[0]}`

  try {     
        const response = await fetch (url,{
            headers: {
                authorization: "Bearer "+ token 
            }
        });

      if (response == null) throw new Error("Response is null.");
      if (response.status == 404) throw new Error("Page not found.")
      if (response.status == 401) { 
        const error=new Error("My invalid access token.")
        error.code = 124;
        throw error 
      }
      
      console.log (response.status)
      const json = await response.json()
      console.log (json) 
      data = [...data, ...json.meetings]
      
    } catch (error) {
      console.log("error",error) 
      const errorObject:{} = await error as object; 
        return {...errorObject,meetings:data,}; 
      }
  };
return {error:{},meetings:data, code:200}
};


export const GET= async ()=> {

  try { 
    let data = await getVideos(token)
    console.log ("This is data",data)
    if (data.code===124){
      const tokenResponse = await fetch ("https://zoom.us/oauth/token?grant_type=account_credentials&account_id=xTmwVbNdQRGv5XBIuyvI2A",{
          method: "POST",
          cache:"no-cache",
          headers:{
            authorization: process.env.BASIC_AUTH 
          }
      })  

      const tokenData = await tokenResponse.json() 
      token = tokenData.access_token
      console.log(token);
      data = await getVideos(token)
      console.log (data)

      if (data.message){
        throw new Error("This surely is an error")
      }
     
    }
    
    if (token == null) throw new Error("Missing tokendata.")
    return Response.json(data);
    } catch (error) {
      return Response.json(error);

    }

  };


//curl -H "Authorization: Bearer eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImJmNTM4NGMxLTMyODAtNDAwOC05YmQyLTZjZWUwZDU4ZTA5MiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiI5T3VlNWJJSFNNQ3lUUlB5M3AxSGtBIiwidmVyIjo5LCJhdWlkIjoiYTdjNzdlY2EyNGM1NTEyNDVhOTA3ZDc2NjI4ZTMyOTAiLCJuYmYiOjE3MDY1MjQyMzQsImNvZGUiOiJySVdIQ0xjVVFIV0d2ckQwRVJhc3JRWE9RTUhxaWtkalkiLCJpc3MiOiJ6bTpjaWQ6eUZEUU9KaXdTNjZtaklfaWY1SUltdyIsImdubyI6MCwiZXhwIjoxNzA2NTI3ODM0LCJ0eXBlIjozLCJpYXQiOjE3MDY1MjQyMzQsImFpZCI6InhUbXdWYk5kUVJHdjVYQkl1eXZJMkEifQ.zuVLg3qOzkxfVNcpDdxJVFB-FvNOVclf-mFXAqRmNiHR19xB0iGJnTYGkII-_ToiRnh6itdDcDBCB9yE4pNe0w" https://api.zoom.us/v2/users/vefskolinn@tskoli.is/recordings?page_size=30&from=2021-10-11&to=2024-01-22








  





  // curl --request GET {download_url} "authorization: Bearer {JWT}" --header "content-type: application/json".
  // curl -H "Authorization: Bearer eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjgwOWMxYTAxLWFjY2EtNDJkYS1iNzk4LTQ5YTJkNTg4MzkwZSJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiI5T3VlNWJJSFNNQ3lUUlB5M3AxSGtBIiwidmVyIjo5LCJhdWlkIjoiYTdjNzdlY2EyNGM1NTEyNDVhOTA3ZDc2NjI4ZTMyOTAiLCJuYmYiOjE3MDYxMDQ5MDYsImNvZGUiOiJkb2RmODRKSlJDaVdiVnduZU1YWnlBS09BYWQ0ZklDTWUiLCJpc3MiOiJ6bTpjaWQ6eUZEUU9KaXdTNjZtaklfaWY1SUltdyIsImdubyI6MCwiZXhwIjoxNzA2MTA4NTA2LCJ0eXBlIjozLCJpYXQiOjE3MDYxMDQ5MDYsImFpZCI6InhUbXdWYk5kUVJHdjVYQkl1eXZJMkEifQ.a9BQyqgR4xBDxJpnLqahBr08DwtltKjDZ7rGwtVkqZmyiwO5cqu8KKquCch4f0HjYRPTTRCqLlUvislwR5JMQw" https://api.zoom.us/v2/rec/archive/download/xyz