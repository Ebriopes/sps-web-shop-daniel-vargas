# Eagle Wear

Aplicación web de comercio electrónico construida con Angular para la tienda de ropa Eagle Wear. Diseñada para ofrecer una experiencia de compra en línea intuitiva y personalizada.

## Proceso de Desarrollo

### Creación del repositorio en GitHub
Para comenzar, creamos un nuevo repositorio en GitHub. Este repositorio servirá como nuestro espacio de trabajo en la nube y nos permitirá versionar nuestro código y colaborar con otros desarrolladores.

![](src/assets/Doc/config-github-repo.png)
![](src/assets/Doc/github-repo.png)

### Clonación del Repositorio Localmente
Una vez creado el repositorio en GitHub, se procedió a clonarlo en el entorno de desarrollo local.    
Esto se realizó utilizando la línea de comandos y el comando `git clone`.  

```bash
git clone git@github.com:Ebriopes/sps-web-shop-daniel-vargas.git
```

![](src/assets/Doc/clone-repo.png)

### Inicialización del Proyecto con Angular CLI
Con el objetivo de acelerar el desarrollo y contar con una estructura de proyecto preconfigurada, se utilizó Angular CLI para inicializar el proyecto.

```bash
ng new eagle-wear --directory eagle-wear
```

![](src/assets/Doc/init-angular-project.png)

### Limpieza del Contenido Inicial
Para personalizar el proyecto y eliminar los componentes y archivos que no son necesarios para el desarrollo de la aplicación, se procedió a eliminar el contenido generado por defecto por Angular CLI.    

Esto permitió comenzar con un proyecto limpio y adaptado a las necesidades específicas.

Se elimina el contenido de `src/app/app.component.html`

| Antes | Después |
| ----- | ------- |
| ![](src/assets/Doc/initial-angular-content.png)| ![](src/assets/Doc/initial-angular-content-cleaned.png) |

### Verificación inicial del proyecto
Para verificar que el proyecto se haya configurado correctamente y que los cambios se reflejen en el navegador, se agregó un mensaje de texto simple.  

Este mensaje servirá como un marcador visual para confirmar que la configuración inicial fue correcta.

![](src/assets/Doc/code/initial-test-code.png)

#### Levantamiento del Proyecto
A continuación, se inició el servidor de desarrollo de Angular utilizando el comando `ng serve`.  

Permitiendo visualizar los cambios realizados en tiempo real en el navegador.

![](src/assets/Doc/run-server-first-time.png)

Al acceder a la dirección indicada en la consola (http://localhost:4200), se pudo confirmar que el mensaje agregado se muestra correctamente en el navegador.

![](src/assets/Doc/first-view.png)

!Con esto hemos inicializado el proyecto!  

### Creación de un nuevo componente: Vista de Login

Para dar inicio al desarrollo de la funcionalidad de autenticación, se creó un nuevo componente llamado "Login".  

Este componente será el encargado de mostrar el formulario de inicio de sesión y gestionar la interacción del usuario con el mismo.  

```bash
ng generate component --standalone views/login
```

![](src/assets/Doc/generate-login-view.png)

Angular CLI generó automáticamente los archivos necesarios para el componente, incluyendo el componente en sí, el archivo de estilos y la plantilla HTML.












---

## Recursos
* https://gitmoji.dev/

## Tecnologías
* Angular (v16)