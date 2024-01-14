# Sistema de alertas
Este sistema contempla los requisitos propuestos en el enunciado, se plantea tener usuarios que pueden recibir alertas segun los temas a los que estan suscriptos, estas mismas tienen fecha de expiracion y tienen tres estados, leida, y caducada/expirada. Y hay de tipo Urgente e Informativa, que tendran distinto ordenamiento segun su tipo.
Para resolver este ejercicio realice un modelo de clases basico que se puede denotar en las clases de entidad, no utilice clases de fabricacion pura como puedn ser de control o boundary/interfaz debido a que no se planteo ningun caso de uso o ejemplo, el codigo es probado mediante test unitarios que realice con la libreria Jest.


## Ejecucion
Al momento de clonar el repositorio con tener Node.js haremos npm install e instalara las dependencias necesarias, entre ellas tenemos Jest que será utilizada para realizar los test unitarios, con ella probaremos el correcto funcionamiento de la solucion planteada mediante la prueba de los metodos de las clases propuestas. Para ejecutar estos test tenemos 2 opciones:
- Ejecucion de todos los test realizados: Esto lo realizaremos utilizando un npm test, ya que en el package.json se definio un script para utilizar jest mediante este comando, de igual manera lo podrias realizar con un npm jest.
- Ejecucion de cada test por separado: Esto lo realizaremos utilizando tambien npm test, pero agregandole al final el nombre del test a probar, por ejemplo npm test Usuario, que es el nombre del test que defini para el test de la clase Usuario.

## Patrones y polimorfismo

Utilicé polimorfismo para resolver el problema, mediante el uso de patrones de diseño, los utilizados fueron los siguientes:
- Strategy: Este patron lo utilice para separar la logica de los metodos de ordenamiento, de esta manera delegaremos la responsabilidad de manejar esa logica a estas clases que son estrategias (MetodoFIFO y MetodoLIFO). 
- Observer: Este patron lo utilice para manejar esa especie de publicacion-suscripcion que se realiza entre el usuario y el suscribirse para recibir alertas de los temas que le interesan, de esta manera es notificado el usuario sobre los cambios o noticias sobre el tema suscripto.

## Otros posibles patrones a aplicar

Otros posibles patrones que se me ocurrieron fueron el State y Factory Method, pero no los utilice porque me parecio que faltaba informacion sobre esto o que no se proponia un cambio de comportamiento muy grande segun el estado, ni tenia una complejidad planteada al momento de crear las alartas por ejemplo, por lo tanto aplicar estos patrones solo iba a complejizar la logica de la solucion planteada. 
