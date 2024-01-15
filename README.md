# Sistema de alertas
Este sistema contempla los requisitos propuestos en el enunciado, se plantea tener usuarios que pueden recibir alertas segun los temas a los que estan suscriptos, estas mismas tienen fecha de expiracion y tienen dos estados claves, leida y no leida, ademas de poder estar caducada/expirada. Y hay de tipo Urgente e Informativa, que tendran distinto ordenamiento segun su tipo.
Para resolver este ejercicio realice un modelo de clases basico que se puede denotar en las clases de entidad, y utilice una clase de fabricacion pura, de control (gestor), esto lo realice de esta manera ya que se necesitaba obtener todas las alertas no expiradas por un tema por ejemplo, si no tenemos persistencia ni una clase que se encargue del manejo de esta informacion como es el caso del gestor no podremos realizar esto, no realice ninguna clase boundary/de interfaz porque no se piden vistas ni codigo front-end. El codigo es probado mediante tests unitarios que realice con la libreria Jest.


## Ejecucion
Al momento de clonar el repositorio con tener Node.js haremos npm install e instalara las dependencias necesarias, entre ellas tenemos Jest que será utilizada para realizar los test unitarios, con ella probaremos el correcto funcionamiento de la solucion planteada mediante la prueba de los metodos de las clases propuestas. Para ejecutar estos test tenemos 2 opciones:
- Ejecucion de todos los test realizados: Esto lo realizaremos utilizando un npm test, ya que en el package.json se definio un script para utilizar jest mediante este comando, de igual manera lo podrias realizar con un npm jest.
- Ejecucion de cada test por separado: Esto lo realizaremos utilizando tambien npm test, pero agregandole al final el nombre del test a probar, por ejemplo npm test Usuario, que es el nombre del test que defini para el test de la clase Usuario.

## Patrones y polimorfismo

Utilicé polimorfismo para resolver el problema, mediante el uso de patrones de diseño, los utilizados fueron los siguientes:
- Strategy: Este patron lo utilice para separar la logica de los metodos de ordenamiento, de esta manera delegaremos la responsabilidad de manejar esa logica a estas clases que son estrategias (MetodoFIFO y MetodoLIFO). 
- Observer: Este patron lo utilice para manejar esa especie de publicacion-suscripcion que se realiza entre el usuario y el suscribirse para recibir alertas de los temas que le interesan, de esta manera es notificado el usuario sobre los cambios o noticias sobre el tema suscripto.

## Otros posibles patrones a aplicar

Otros posibles patrones que se me ocurrieron fueron el State y Factory Method, pero no los utilice porque me parecio que faltaba informacion sobre esto o que no se proponia un cambio de comportamiento muy grande segun el estado, ni tenia una complejidad planteada al momento de crear las alertas por ejemplo, por lo tanto aplicar estos patrones solo iba a complejizar la logica de la solucion planteada. 

## Aclaraciones
### Idioma
El test esta realizado en español, tanto los nombres de las variablaes como los nombres de las funciones, tests y demas. Lo realice así por el hecho de ser una prueba tecnica en la que se planteo el enunciado en español y los tipos en español, podría haberlo traducido pero lo senti mas comodo así, ademas de plantearlo desde un lado mas teorico al momento de realizar un boceto de diagrama de clases y demas lo trabaje como en la universidad, donde trabajamos en español y lo arrastre aqui. En mi ambito de trabajo, uso el ingles para nombrar las funciones, variables, etc. Se pide que los nombres sean representativos, en caso de hacerlo en ingles trabajaria con los mismos nombres pero en ingles, por ejemplo en vez de alerta.marcarComoLeido(), lo escribiría como alert.markAsRead(), y asi con todo.
Creo que manejo un ingles en el cual puedo comprender a la otra persona ya sea escrito o oral, pero no tengo afinado el hecho de dar una respuesta oral en ingles, intento practicarlo a diario en mi vida al ingles y estoy interesado en tomar cursos para perfeccionarlo.
### Tests
Realice test unitarios para probar las distintas funcionalidades de las clases, intente hacer test que sigan el rumbo ideal de lo que deberia pasar y otros que no, al no realizar un manejo de errores o devolver una respuesta esperada, no realice muchos test que prueben el manejo de flujos alternativos que no sea el esperado. Desde mi punto de vista lo ideal seria realizar mas pruebas o test que validen los distintos flujos posibles del problemas.
### Tiempo
La prueba tecnica la realice en momentos libres que tuve en este fin de semana, por lo tanto es dificil decir cuanto me llevo, habia comentado con Nicolas de RRHH que tenia unos dias complicados, por lo que intente manejar mis horarios para realizarlo en breves momentos libres que fui teniendo, se nombra que no se cree que deberia tomar mas de 1 dia, pero no tuve un dia libre como para sentarme y realizarlo todo en un mismo dia.
