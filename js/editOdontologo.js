function editOdontologo(id, nombre, apellido, numeroMatricula) {
  

    Swal.fire({
      title: 'Modificar Odontólogo',
        html: `
          Nombre: <input id="nombreUpdate" class="swal2-input" value="${nombre}"> </input>
          Apellido: <input id="apellidoUpdate" class="swal2-input" value="${apellido}"> </input>
          Matricula: <input id="numeroMatriculaUpdate" class="swal2-input" value="${numeroMatricula}"></input>
        `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No Guardar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          
          const nombreUpdate = document.getElementById('nombreUpdate').value;
          const apellidoUpdate = document.getElementById('apellidoUpdate').value;
          const numeroMatriculaUpdate = document.getElementById('numeroMatriculaUpdate').value;
          
          
          console.log(`Atributos metodo ${id}, ${nombreUpdate}, ${apellidoUpdate}, ${numeroMatriculaUpdate} `);

          fetch(`${apiURL}/odontologos`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id,numeroMatricula: numeroMatriculaUpdate,nombre: nombreUpdate ,apellido: apellidoUpdate})
          })
          .then(response => response.json())
          .then(data => {
            console.table(data);
            Swal.fire("Registro Actualizado!", "", "Exitoso");
            
           

          })
          .catch(error => {
            Swal.fire({
              title: '¡Error!',
              text: 'Por el momento el API esta fuera de linea, favor de intentar mas tarde',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }); 


                 // Refresca la página
                //  location.reload();
       
  
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    
    });

     // Establece una pausa de 2000 milisegundos antes de llamar a miFuncion
    //  setTimeout(() => {
    //   // Refresca la página
    //   location.reload();
    //   }, 5000);

    document.getElementById("nombreUpdate").focus();
  }


  function deleteOdontologo(id) {
    
    console.log(` Identificador a eliminar ${id}`)

          
      Swal.fire({
        title: "Advertencia",
        text: "Estas seguro de elimianr el registro?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!",
      }).then((result) => {
        
        console.log(` Resultado ===> ${result.isConfirmed}`)
        if (result.isConfirmed) {
          
        
          fetch(`${apiURL}/odontologos/${id}`, {
            method: 'DELETE',
          })
          .then(response => response.json())
          .then(data => {
            console.table(data);
            Swal.fire({
              title: "Registro borrado!",
              text: "El registro fue eliminado.",
              icon: "success",
            });
            
           

          })
          .catch(error => {
            Swal.fire({
              title: '¡Error!',
              text: 'Por el momento el API esta fuera de linea, favor de intentar mas tarde',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }); 


        }
      });


    
  }



  document.addEventListener("click", function (event) {

    console.table(`Entro aqui ${event.target.textContent}`);
    let mensaje = event.target.textContent;
    if(mensaje ==='OK'){
      location.reload();
    }

  });


