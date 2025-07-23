"# Docker_Node_Mongo"

# Docker
Docker es una plataforma de código abierto que permite automatizar la implementación, el escalado y la gestión de aplicaciones en contenedores.

Los contenedores, a diferencia de las máquinas virtuales, son ligeros y portátiles, lo que permite que las aplicaciones se ejecuten de forma consistente en diferentes entornos.

Docker facilita el empaquetado de aplicaciones con todas sus dependencias en un contenedor, lo que asegura que la aplicación se ejecute de la misma manera independientemente de dónde se despliegue.

## Docker es una herramienta que:
- Empaqueta aplicaciones en contenedores:
  o	Los contenedores son unidades estandarizadas que incluyen todo lo necesario para ejecutar una aplicación, como código, bibliotecas y dependencias.

- Facilita la implementación:
  o	Permite desplegar aplicaciones de forma rápida y consistente en diferentes entornos (desarrollo, pruebas, producción).

- Promueve la portabilidad:
  o	Los contenedores se pueden ejecutar en cualquier sistema que tenga Docker instalado, lo que elimina problemas de compatibilidad entre diferentes sistemas.

- Mejora la eficiencia:
  o	Los contenedores son más ligeros que las máquinas virtuales, lo que permite ejecutar más aplicaciones en la misma infraestructura.

- Apoya la arquitectura de micro servicios:
  o	Docker es ideal para la arquitectura de micro servicios, donde las aplicaciones se construyen como colecciones de servicios pequeños e independientes.


## Comandos.

- ## Imágenes.
  - `docker pull “image”`: permite descargar la imagen indicada alojada en el servidor de repositorios docker.hub.
  - `docker images`: permite visualizar todas las imágenes descargadas.
  - `docker images rm ”image”`: Elimina la imagen indicada.

<br>
 
- ### Contenedores.
  - `docker create ”image”`: Crea un contenedor sobre la imagen indicada (es decir podemos crear un contenedor en base a la imagen de mongo (Usada en este repositorio) con el comando ` docker create mongo`) .
  - `docker create —name “container_name” ”image”` : Crea un contenedor sobre la imagen indicada, pero con el nombre especificado en el parámetro “container_name".
  - `docker create -p “local-port:container-port”`: Crea un contenedor indicando que el mismo puede recibir solicitudes desde el puerto de nuestra máquina. En caso de no especificar el puerto al cual queremos dar acceso por ejemplo “-p27017”, esto le indicará a docker que debe crear un contenedor el cual corre en el puerto 27017, eligiendo de manera aleatoria un puerto de nuestro PC desde el cual se podrá acceder al contenedor.
  - `docker create -p 27017:27017 —name nameConten -e MONGO_INITDB_ROOT_USERNAME=Robguter -e MONGO_INITDB_ROOT_PASSWORD=123456 mongo`: Este comando indica crear un contenedor que permita el mapeo de puertos permitiendo acceder al puerto de mongodb (XXXX) desde la direccion IP (0.0.0.0:XXXX o localhost:XXXX), el contenedor se llamará “name-conten”, le indicará a la imagen de mongo (En este ejemplo) mediante las variables de entorno de UserName y Root_Password el nombre usuario y las contraseña para acceder a la base de datos de mongo. Todo esto en la imagen de Mongo.
  - `docker start ”container"`: Inicia el contenedor indicado (se puede especificar el id del contenedor o el nombre).
  - `docker stop ”container”`: Detiene la ejecución del contenedor especificado (se puede especificar el id del contenedor o el nombre).
  - `docker ps`: Muestra una lista de todos los Contenedores que están en ejecución.
  - `docker ps -a`: Muestra una lista de todos los Contenedores sin importar que estén o no en ejecución.
  - `docker rm “container”`: Eliminar el contenedor especificado (se puede especificar el id del contenedor o el nombre).
  - `docker logs “container”`: Muestra el log o historial de información resultante durante la ejecución del contenedor especificado (se puede especificar el id del contenedor o el nombre).
  - `docker logs —f | —follow “container”`: Muestra el log o historial de información resultante durante la ejecución del contenedor especificado, escuchando los cambios que ocurran dentro del mismo (se puede especificar el id del contenedor o el nombre).

<br>

- ### Imágenes/Contenedores.
  - `docker run “image”` : Este comando descarga una imagen de no existir, luego de ser descargada crea su contenedor y por último lo pone en ejecución
  - `docker run -d“image”` : Hace lo mismo que el comando anterior pero sin mostrar constantemente los logs resultantes del comando `docker run`.

<br>

## Introducir aplicaciones dentro de contenedores.
Por temas de portabilidad y sobre todo para un rápido despliegue de soluciones web (como una de las pocas que se pueden mencionar) podemos guardar nuestras aplicaciones en forma de plantillas para que así su instalación, peso y rendimiento sea mucho más eficiente. A este proceso en el desarrollo web se le conoce como Dockerizar una aplicación.

Los pasos siguientes es una forma de realizar la dockerización:

- Crea un archivo llamado Dockerfile sin extensión.
- En dicho archivo debemos indicarle a Docker las acciones que debe hacer al momento de crear la imagen por ejemplo.

- FROM “image”: Este comando le indica a Docker que se debe crear un contenedor en base a la imagen indicada.
- Luego de haber indicado la imagen con la cual se va a crear el contenedor, debemos copiar el código fuente de nuestra aplicación a la raíz de nuestro contenedor o en la carpeta del mismo que consideremos conveniente. Para eso escribimos las siguientes lineas de comando.
- `RUN mkdir -p /home/app`: Ejecuta el comando mkdir con el argumento -p, crea la carpeta home y dentro de la misma crea a la vez la carpeta app.
- `COPY . /home/app`: Este comando permite copiar desde la raíz de nuestra ruta actual hacia la estructura de carpetas previamente creadas.

  > **Se usa COPY en vez de RUN ya que la instrucción de RUN nos va a permitir ejecutar instrucciones del SO Linux, pero COPY nos permitirá acceder al sistema de archivos de nuestro computador anfitrión para tomar esos archivos y después colocarlos dentro de nuestro contenedor.
  ** 

- `EXPOSE 3000`: Como la aplicación que queremos copiar en nuestro contenedor es un servidor realizado en express, debemos indicarle a Docker que dicho servidor se mantendrá escuchando peticiones.

- `CMD [”node” , ”/home/app/index.js”]`: Luego de haber creado la imagen, creada la estructura de archivos y copiado los archivos de la aplicación, debemos ejecutar el comando que correrá el contenedor resultante, en este caso es `CMD [”node” , ”/home/app/index.js”]`. En otras palabras este comando le indica a Docker que debe ejecutar el archivo index.js con el comando node. El archivo resultante sería el siguiente:

`FROM node:18

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 3000

CMD ["node", "/home/app/index.js"]
`

<br>

> **Como tanto la app de express como el manejador de base de datos MongoDB están en contenedores distintos, no necesariamente se podrán comunicar entre si, en otras palabras los mismos estén ísolados (aislados uno del otro). Pueden tener comunicación hacia afuera de la red de su mismo contenedor gracias al mapeo de sus puertos, pero eso no quiere decir que entre los mismos contenedores se puedan comunicar. Para resolver esta problemática necesitaremos agrupar los contenedores que queremos tengan comunicación entre si.**

## Agrupar contenedores o asociarlos a la misma red.

- docker network ls: Lista las redes de contenedores existentes en docker.
- docker create “red_nam”: Crea una red de contenedores con el nombre indicado.

<br>

> **Como tanto la app de express y el manejador de BD MongoDB están en la misma red de contenedores, la forma en la que se debe hacer referencia en el URI para acceder a la BD debe ser, el nombre del contenedor que hace referencia a mongodb en vez de localhost, en este caso sería de esta forma:**

```jsx
{
  Antes: "mongodb://username:password@localhost:27017/based?authSource=admin";
  Despues: "mongodb://username:password@name-conten:27017/ based?authSource=admin";
}
// Ya que el servidor de express no está corriendo en el host de la PC afitrion, sino en el host de la red de contenedores creada.
```

Continuando con los pasos para preparar la creación del contenedor con el archivo Dockerfile solo resta realizar lo siguiente:

- `docker build -t miapp:1 . `: el cual creará una imagen con la etiqueta “miapp:1” usando los comandos indicados en el archivo Dockerfile que está en la raíz “.” de la carpeta en la que nos encontramos, la cual es la carpeta raíz de la aplicación de express.

<br>

**Cuando varios contenedores de docker dentro de una misma red interna de docker necesitan comunicarse entre sí, el nombre del dominio correspondiente a cada contenedor es el nombre con el cual este creado dichos contenedores.**

<br>

## Docker compose

Permite crear contenedores con todas las configuraciones necesarias mediante un archivo llamado docker-compose.yml

### Estructura de archivo docker-compose.yml.

```
version: "X.X" <-- Version del grupo de contenedores.
  services:<-- Servicios.
    chanchito: <-- Nombre de contenedor.
      build: . <-- Ejecuta el conjunto de instrucciones indicadas en el archivo Dockerfile.
      ports: <-- Puertos mediante los cuales se podra acceder al contenedor.
        - "XXXX:XXXX" <-- El puerto de la izquierda es el de la PC afitrion (donde está corriendo Docker).
      links: <-- Listado de contenedores que estaran conectados a este.
        - name-conten
    name-conten:
      image: mongo <-- Imagen a utilizar en name-conten.
      environment
        - MONGO_INITDB_ROOT_USERNAME=username
        - MONGO_INITDB_ROOT_PASSWORD=password
      ports:
        - "XXXX:XXXX"
```

- ### Comandos de docker compose
  - `docker-compose o docker compose up`: Crea o inicia (en caso de ya existir) los contenedores y servicios definidos en el archivo docker-compose.yml.
  - `docker-compose o docker compose down`: Finaliza y desmonta los servicios, así como los contenedores especificados en el arhivo docker-compose.yml.
  - `docker-compose -f "archivo" o docker compose -f "archivo" up`: Hace lo mismo que el comando docker-compose up o docker compose up, con la excepción que usará la configuración de un archivo docker-compose personalizado (por ejemplo docker-compose-dev.yml).

<br>

### Volúmenes.

Los volúmenes son el mecanismo preferido para persistir la data generada por uno o varios contenedores de docker. Mientras que las monturas enlazadas (bind mounts) son dependientes a la estructura de carpetas al SO de la PC anfitrión, los volúmenes son completamente manejados por docker.

#### Tipos de volúmenes

1. **Anónimos:** En este tipo de volúmenes su ubicación es manejada por Docker, Lo malo con este tipo de volumen es que después no vamos a poder hacer referencia a los mismos para que lo utilice otro contenedor.
2. **Host:** En este caso tú decides qué carpeta montar y en donde montarla. Este tipo de volumen su data es almacenada en la PC anfitriona y no en el contenedor de Docker.
3. **Nombrado:** Es igual que el anónimo solo que en este si se puede hacer referencia para ser utilizado por otro contenedor. De esta manera puedes reutilizarlo no solo con la misma imagen sino con otras imágenes que vayas creando en el futuro.

**Ejemplo**

```
name-conten:
    image: mongo
    environment:
      - MONGO_INITDB_ROOT_USERNAME=username
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes: <-- listado de volúmenes a utilizar en este contenedor.
      - mongo-data:/data/db
Carpeta en PC afitrión:Ruta de la carpeta en el contenedor
    ports:
      - "27017:27017"
volumes:
  mongo-data:
```

Espero le sirva esta información. Saludos


