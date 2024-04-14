// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// INICIO JUEGO //
// Capturamos el boton "Jugar" y le asignamos una funcion que será la que inicie nuestra aplicación.
var botonJugar = document.getElementsByTagName("button")[0];
botonJugar.onclick = comenzarPartida;
// Capturamos el boton "YA".
var botonYa = document.getElementsByTagName("button")[1];
var botonReset = document.getElementsByTagName("button")[2];

// Se cambian las imagenes de "Piedra, papel, tijera" para mostrar al usuario y se le asigna una clase a cada una.
cambiarImagenesJugador();

// Comenzar partida ¡JUGAR! Esta función abarcará todas las funciones necesarias para la aplicación.
function comenzarPartida(){
    
    //Si se completan los datos de partida correctamente se nos permitirá acceder a la seleccion de la jugada.
    if(verificarNombre()==true && verificarPartidas()==true){
        console.log("Estas dentro del IF de comenzarPartida"); //Test
            var partidasTotales = document.getElementById("total").innerHTML; // Capturamos el nuemro de partidas totales.
            console.log("Partidas totales: " + partidasTotales); //Test

            var partidas = document.getElementById("actual").innerHTML; // Capturamos el nuemro de partidas actuales.
            console.log("Partidas actuales: " + partidas); //Test 

                // Selecciona jugada el usuario.                
                seleccionJugadaUsuario();
                              
                //Generamos un evento de "click" en el botón YA. y en el agregamos las funcionalidades que necesitamos.                      
                botonYa.addEventListener("click", function (){
                    if (partidas < partidasTotales){                              
                        var numeroAleatorio = generarAleatorio(); //Generamos un numero aleatorio entre 0-2
                        console.log("El numero generado es : " + numeroAleatorio); // Test
                        //Le pasamos a la funcion el número aleatorio que definirá la jugada que hará la máquina.
                        seleccionMaquina(numeroAleatorio); //pasamos este número aleatorio a la función que selecciona la jugada de la máquina. 
                        resultado(); // Esta función nos dirá el resultado obtenido entre el jugador y la máquina.
                        partidas++; //Incrementamos en +1 el valor de la partida actual.
                        document.getElementById("actual").innerHTML = partidas; // Actualizamos el contador de partidas realizadas.
                        console.log(partidas + " numero de partida..."); //Test.
                        botonYa.disabled = false; // Habilitamos el botón
                        
                    }else{
                        botonYa.disabled = true; //Una vez jugamos todas las partidas, el botón se bloqueará.        
                    }                         
                }); // fin deL EVENTO

                // Deshabilitamos el botón Jugar para evitar comenzar una partida antes de finalizarla.
                botonJugar.disabled = true;

                // Habilitamos el botón
                botonYa.disabled = false;                
         
                // Generamos un evento de click en el boton RESET.
                botonReset.addEventListener("click", function(){
                    if (partidas == partidasTotales){
                        // Mensaje para el usuario.
                        alert("Nueva Partida");
                        // Seleccionamos los elementos para modificar.
                        let campoNombre = document.getElementsByTagName("input")[0];
                        let campoPartida = document.getElementsByTagName("input")[1];
                        let imagenOriginal = document.getElementsByTagName("img")[3];
                                
                        // Habilitamos los campos input que estaban deshabilitados.
                        campoNombre.disabled = false;
                        campoPartida.disabled = false;
                        campoPartida.value = 0;
                        // Ponemos los marcadores a 0;
                        document.getElementById("actual").innerHTML = 0;
                        document.getElementById("total").innerHTML = 0;
                        // Restauramos la imagen por defecto de la máquina.                    
                        imagenOriginal.src = "/img/defecto.png";
                        // Habilitamos el botón previamente deshabilitado para poder comenzar una nueva partida.
                        botonJugar.disabled = false; 
                        
                    }else{
                        alert("¡Debes terminar todas las jugadas antes de reiniciar la partida!")
                    }
                                 
                });
        
        cambiarImagenesJugador();

        let nuevoHistorial =  document.getElementById("historial"); //Capturamos el elemento <ul></ul> con id = historial.
        let lista = document.createElement("li"); //Creamos un elemento <li></li>
        lista.innerText = ("-------- Nueva Partida -------- ");
        nuevoHistorial.append(lista);
           

    } else{
        console.log("Ocurrio un error");
    }
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//FUNCIONES DE LA APLICACIÓN
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Función para verificar Nombre introducido por el usuario.
function verificarNombre(){
    // Obtenemos el texto introducido por el usuario en el primer input
    let inputNombre = document.getElementsByTagName("input")[0].value;
    let campoNombre = document.getElementsByTagName("input")[0];
    //Verificamos si el campo está vacío.
    if(inputNombre.length == 0 || inputNombre == null){
        alert("Campo vacío");
        // En caso de cumplir esta condición se pondrá de color rojo el campo.
        campoNombre.classList.add("fondoRojo");
        console.log(inputNombre + " campo vacío"); //test  
        return false;
    }
    //Verificamos si el campo tiene menos de 3 letras
    else if(inputNombre.length < 4){
        alert("El nombre es muy corto");
        // En caso de cumplir esta condición se pondrá de color rojo el campo.
        campoNombre.classList.add("fondoRojo");
        console.log(inputNombre + " campo demasiado corto"); //test
        return false;
    }
    //Verificamos si son números con una expresión regular.
    else if(!/[a-z, ]/i.test(inputNombre)){        
        alert("campo contiene caracteres no válidos");
        // En caso de cumplir esta condición se pondrá de color rojo el campo.
        campoNombre.classList.add("fondoRojo");
        console.log(inputNombre + " campo con caracteres incorrectos"); //test
        return false;
    }
    console.log(inputNombre + " nombre Ok!"); //test
    campoNombre.classList.remove("fondoRojo"); // Eliminamos el fondo rojo ya que los datos ahora son correctos.
    campoNombre.disabled = true; // Bloqueamos el campo una vez están introducidos los datos de forma correcta.
    return true;    
       
}

// Función para verificar numero de partidas.
function verificarPartidas(){
    //Obtenemos el numero de partidas introducidas por el usuario.
    let inputPartidas = document.getElementsByTagName("input")[1].value; // las declaramos var para acceder a ellas fuera del bloque.
    let campoPartida = document.getElementsByTagName("input")[1];
    //console.log("inputPartidas " + inputPartidas); //test
    
    if(inputPartidas <= 0 || inputPartidas == null){
        alert("numero de partidas no válido")
        // En caso de cumplir esta condición se pondrá de color rojo el campo.
        campoPartida.classList.add("fondoRojo");
        console.log(inputPartidas + " error en numero de partidas"); //test
        document.getElementById("total").innerHTML = 0; // Ponemos el contador de partidas a 0;
        return false;
    }
    console.log(inputPartidas + " numero de partidas Ok!"); //test
    campoPartida.classList.remove("fondoRojo"); // Eliminamos el fondo rojo ya que los datos ahora son correctos.
    campoPartida.disabled = true;
    document.getElementById("total").innerHTML = inputPartidas; // Actualizamos numero total de partidas en el contador.
    return true;
}

 
// Funcion para cambiar las imagenes del lado Jugador.
function cambiarImagenesJugador(){
    posibilidades[0] = document.getElementsByTagName("img")[0];
    posibilidades[0].src = "/img/piedraJugador.png";
    posibilidades[0].classList.replace("seleccionado","noSeleccionado");//cambiamos la clase para partir sin ninguna selección.
    posibilidades[0].classList.add("piedra");
    posibilidades[1] = document.getElementsByTagName("img")[1];
    posibilidades[1].src = "/img/papelJugador.png";
    posibilidades[1].classList.add("papel");
    posibilidades[2] = document.getElementsByTagName("img")[2];
    posibilidades[2].src = "/img/tijeraJugador.png";
    posibilidades[2].classList.add("tijera");
}

// Función en la cual seleccionamos las posibles jugadas del usuario.(llama a la funcion piedra, papel y tijera).
function seleccionJugadaUsuario(){    
    //se le cambia la clase a la imagen seleccionada.
    posibilidades[0].onclick = piedra;
    posibilidades[1].onclick = papel;
    posibilidades[2].onclick = tijera;

    if(posibilidades[0].onclick = piedra){
        return 0;
    } else if (posibilidades[1].onclick = papel){
        return 1;
    } else if (posibilidades[2].onclick = tijera){
        return 2;
    } else{
        console.log("debes seleccionar una jugada");       
    }  
    
}

// Si el usuario escoge Piedra...
function piedra(){
    console.log("Usuario - piedra");
    //cambiamos la clase a seleccionado;
    posibilidades[0].classList.replace("noSeleccionado" , "seleccionado");
    if(posibilidades[1].classList.contains("seleccionado")){
        // si se da la condición cambiamos la clase a noSeleccionado;
        posibilidades[1].classList.replace("seleccionado", "noSeleccionado");

    } else if(posibilidades[2].classList.contains("seleccionado")){
        // si se da la condición cambiamos la clase a noSeleccionado;
        posibilidades[2].classList.replace("seleccionado", "noSeleccionado");
    }
    // Retornamos el valor true por si necesitamos usarlo posteriormente.
    return 0;
}

// Si el usuario escoge Papel...
function papel(){
    console.log("Usuario - papel");
    //cambiamos la clase a seleccionado;
    posibilidades[1].classList.replace("noSeleccionado" , "seleccionado");
    if(posibilidades[0].classList.contains("seleccionado")){
        // si se da la condición cambiamos la clase a noSeleccionado;
        posibilidades[0].classList.replace("seleccionado", "noSeleccionado");
        
    } else if(posibilidades[2].classList.contains("seleccionado")){
        // si se da la condición cambiamos la clase a noSeleccionado;
        posibilidades[2].classList.replace("seleccionado", "noSeleccionado");
    }
     // Retornamos el valor true por si necesitamos usarlo posteriormente.
    
}

// Si el usuario escoge Tijera...
function tijera(){
    console.log("Usuario - tijera");
    //cambiamos la clase a seleccionado;
    posibilidades[2].classList.replace("noSeleccionado" , "seleccionado");
    if(posibilidades[0].classList.contains("seleccionado")){
        // si se da la condición cambiamos la clase a noSeleccionado;
        posibilidades[0].classList.replace("seleccionado", "noSeleccionado"); 

    } else if(posibilidades[1].classList.contains("seleccionado")){
        // si se da la condición cambiamos la clase a noSeleccionado;
        posibilidades[1].classList.replace("seleccionado", "noSeleccionado");
    }
    // Retornamos el valor true por si necesitamos usarlo posteriormente.
    
}

// Función que genera un número aleatorio entre 0 y 2.
function generarAleatorio(){
    let min = 0;
    let max = 2;
    var aleatorio = Math.round(Math.random() * (max - min) + min);
    //console.log("El numero aleatorio generado es "+ aleatorio);//test
    return aleatorio;   
}


// Función que recibe un número y dado ese número cambia la imagen indicando la jugada seleccionada.
function seleccionMaquina(numero){
    // Seleccionamos la etiqueta img corresondiente y se la asignamos a la variable eleccionMaquina.
    let eleccionMaquina = document.getElementsByTagName("img")[3];
    var selector = numero;
    let exit = false;
        while(!exit){
        if(selector == 0){
            eleccionMaquina.src = "/img/piedraOrdenador.png";
            eleccionMaquina.classList.add("piedra");
            console.log("Maquina - piedra"); //test
            exit = true;
            return 0;

        }else if (selector == 1){
            eleccionMaquina.src = "/img/papelOrdenador.png"; 
            eleccionMaquina.classList.add("papel");
            console.log("Maquina - papel"); //test
            exit = true;                              
            return 1;
            
        } else if (selector == 2){
            eleccionMaquina.src = "/img/tijeraOrdenador.png";
            eleccionMaquina.classList.add("tijera");
            console.log("Maquina - tijera"); //test 
            exit = true;           
            return 2;

        } else {
            console.log("Ocurrio un error");
            exit = true;
        }  
    } 
}

// En esta función se realiza una comparación de la jugada del usuario vs la jugada de la máquina y se proporciona un resultado.
// este resultado se almacena en nuestro archivo html en forma de lista.
function resultado(){

    let salida = false; 
    let eleccionMaquina = document.getElementsByTagName("img")[3];
    let campoNombre = document.getElementsByTagName("input")[0].value;
    var li = document.createElement("li"); //Con esta variable, creamos un elemento <li></li>
    var historial =  document.getElementById("historial"); //Capturamos el elemento <ul></ul> con id = historial.  

    while(!salida){  
        // comparamos la selección del usuario con la selección de la maquina y obtenemos un resultado que se añadirá
        // a el archivo html.
       if (posibilidades[0].classList.contains("seleccionado") && eleccionMaquina.classList.contains("piedra")){
            //document.getElementById("historial").innerHTML = "<li>"+ "Empate" + "</li>";
            li.innerText = "Empate";
            historial.append(li); //Agregamos el valor del <li></li>
            console.log("resultado = Piedra - Piedra"); //test
            salida = true;
            //break;
        } else if (posibilidades[0].classList.contains("seleccionado") && eleccionMaquina.classList.contains("papel")){
            //document.getElementById("historial").innerHTML = "<li>"+ "Gana la máquina" + "</li>";
            li.innerText = "Gana la máquina";
            historial.append(li);
            console.log("resultado = Piedra - Papel"); //test
            salida = true;
            //break;

        } else if (posibilidades[0].classList.contains("seleccionado") && eleccionMaquina.classList.contains("tijera")) {
            //document.getElementById("historial").innerHTML = "<li>"+ "Gana " + campoNombre + "</li>";
            li.innerText = "Gana " + campoNombre; 
            historial.append(li);     
            console.log("resultado = Piedra - Tijera"); //test
            salida = true;
            //break;

        } else if (posibilidades[1].classList.contains("seleccionado") && eleccionMaquina.classList.contains("piedra")) {
            //document.getElementById("historial").innerHTML = "<li>"+ "Gana " + campoNombre + "</li>";
            li.innerText = "Gana " + campoNombre; 
            historial.append(li);  
            console.log("resultado = Papel - Piedra"); //test
            salida = true;
            //break;

        } else if (posibilidades[1].classList.contains("seleccionado") && eleccionMaquina.classList.contains("papel")) {
            //document.getElementById("historial").innerHTML = "<li>"+ "Empate" + "</li>";
            li.innerText = "Empate"; 
            historial.append(li);  
            console.log("resultado = Papel - Papel"); //test
            salida = true;
            //break;

        } else if (posibilidades[1].classList.contains("seleccionado") && eleccionMaquina.classList.contains("tijera")) {
            //document.getElementById("historial").innerHTML = "<li>"+ "Gana la máquina" + "</li>";
            li.innerText = "Gana la máquina"; 
            historial.append(li);  
            console.log("resultado = Papel - Tijera"); //test
            salida = true;
            //break;

        } else if (posibilidades[2].classList.contains("seleccionado") && eleccionMaquina.classList.contains("piedra")) {
            //document.getElementById("historial").innerHTML = "<li>"+ "Gana la máquina" + "</li>";
            li.innerText = "Gana la máquina"; 
            historial.append(li);  
            console.log("resultado = Tijera - Piedra"); //test
            salida = true;
            //break;

        } else if (posibilidades[2].classList.contains("seleccionado") && eleccionMaquina.classList.contains("papel")) {
            //document.getElementById("historial").innerHTML = "<li>"+ "Gana " + campoNombre + "</li>";
            li.innerText = "Gana " + campoNombre; 
            historial.append(li);  
            console.log("resultado = Tijera - Papel"); //test
            salida = true;
            //break;

        } else if (posibilidades[2].classList.contains("seleccionado") && eleccionMaquina.classList.contains("tijera")){
            //document.getElementById("historial").innerHTML = "<li>"+ "Empate" + "</li>";
            li.innerText = "Empate"; 
            historial.append(li);  
            console.log("resultado = Tijera - Tijera"); //test
            salida = true;
            //break;
            
        } else {
            document.getElementById("historial").innerHTML = "<li>"+ "resultado no contemplado" + "</li>";
            salida = true;
            //break;
        }       
    }
    console.log ("fuera del bucle");
}



 
