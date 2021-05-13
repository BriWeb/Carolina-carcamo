export default async function fetchDATA (options) {
  let {url, success, failure, headers} = options;
  try {
    let res = await fetch(url, {headers});
    let data;
    res.ok ? 
      data = await res.json() : 
      Promise.reject(res)
    
    success(data.body);
  } catch (error) {
    failure(error);
  }
}