export default async function fetchFilters(config) {
  let {url, options} = config;

  try {
    // let res = await fetch(url, options);
    let res = await fetch('http://www.carolinacarcamo.com.ar/api/v1/propiedades', {headers : {'Content-Type' : 'application/json'}, mode: 'no-cors'});

    console.log(res)
    let data = await res.json();
    // let data;
    // res.ok ? data = await res.json() : Promise.reject(res)
    console.log("los datos: ", data);
  } catch (error) {
    console.log("error al cargar: ", error);
  }
}

// async function postData(url = '', data = {}) {
//     // Opciones por defecto estan marcadas con un *
//     const response = await fetch(url, {
//       method: 'POST', 
//       mode: 'cors', 
//       cache: 'no-cache', 
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       redirect: 'follow', 
//       referrerPolicy: 'no-referrer', 
//       body: JSON.stringify(data) 
//     });
//     return response.json(); 
//   }

