// Obtener el parámetro `token` de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
	    
	    // Realiza una solicitud al servicio externo para validar el token
	    fetch(`https://www.refactorii.com/validate-token?token=${token}`)
	    .then(response => response.json())
	    .then(data => {
	        if (data.valid) {
	            console.log(data.valid);
	             // Decodifica el token para obtener el payload
		     var base64Url = token.split('.')[1];
	             var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	             var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
	                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	             }).join(''));
                     const decodedToken = JSON.parse(jsonPayload);
         	     const recipeId = decodedToken._id; // Asegúrate de usar el nombre correcto del campo en el payload
		     const email = decodedToken.email;
                     console.log('Recipe ID:', recipeId);
		     // Almacenar recipeId en local storage
                     localStorage.setItem('recipeId', recipeId);
		     localStorage.setItem('email', email);
		     loadMarkdownFiles();
	    	} else {
	  	    console.log(data.valid);
	  	    document.body.innerHTML = 'Access denied. Invalid token.';
	  	}
	    }).catch(error => {
	  	document.body.innerHTML = 'Error validating token.';
	  	console.error('Error:', error);
	    });
	    
  } else {
     document.body.innerHTML = 'Access denied. No token provided.';
  }
