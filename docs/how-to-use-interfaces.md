# Cómo Usar Interfaces en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-interfaces-in-typescript)
:::


## Introducción

[TypeScript](https://www.typescriptlang.org/) es una extensión del lenguaje [JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) que utiliza el tiempo de ejecución de JavaScript con un verificador de tipos en tiempo de compilación.

TypeScript ofrece múltiples formas de representar objetos en su código, una de las cuales es usar interfaces. Las interfaces en TypeScript tienen dos escenarios de uso: puede crear un contrato que deben seguir las clases, como los miembros que esas clases deben implementar, y también puede representar tipos en su aplicación, al igual que la declaración normal `type`. (Para obtener más información sobre `types`, consulte [Cómo Usar Tipos Básicos en TypeScript](./how-to-use-basic-types.html) y [Cómo Crear Tipos Personalizados en TypeScript](./how-to-create-custom-types.html)).

Puede notar que las interfaces y los tipos comparten un conjunto similar de características; de hecho, uno casi siempre puede reemplazar al otro. La principal diferencia es que las interfaces pueden tener más de una declaración para la misma interfaz, que TypeScript fusionará, mientras que los tipos solo se pueden declarar una vez. También puede usar tipos para crear alias de tipos primitivos (como `string` y `boolean`), lo que las interfaces no pueden hacer.

Las interfaces en TypeScript son una forma poderosa de representar estructuras de tipos. Le permiten hacer que el uso de esas estructuras sea seguro para los tipos y documentarlos simultáneamente, mejorando directamente la experiencia del desarrollador.

En este tutorial, creará interfaces en TypeScript, aprenderá a usarlas y comprenderá las diferencias entre los tipos normales y las interfaces. Probarás diferentes ejemplos de código, que puedes seguir en tu propio entorno de TypeScript o en [TypeScript Playground](https://www.typescriptlang.org/play?ts=4.2.2#), un entorno en línea que te permite escribir TypeScript directamente en el navegador.


## Crear y Usar Interfaces en TypeScript

En esta sección, creará interfaces utilizando diferentes funciones disponibles en TypeScript. También aprenderá a utilizar las interfaces que ha creado.

Las interfaces en TypeScript se crean usando la palabra clave `interface` seguida del nombre de la interfaz y luego un bloque `{}` con el cuerpo de la interfaz. Por ejemplo, aquí hay una interfaz `Logger`:


```ts
interface Logger {
  log: (message: string) => void;
}
```

De forma similar a la creación de un tipo normal mediante la declaración `type`, especifica los campos del tipo y su tipo en `{}`:

La interfaz `Logger` representa un objeto que tiene una sola propiedad llamada `log`. Esta propiedad es una función que acepta un único parámetro de tipo `string` y devuelve `void`.

Puede utilizar la interfaz `Logger` como cualquier otro tipo. Aquí hay un ejemplo que crea un objeto literal que coincide con la interfaz `Logger`:


```ts
interface Logger {
  log: (message: string) => void;
}

const logger: Logger = {
  log: (message) => console.log(message),
};
```

Los valores que utilizan la interfaz `Logger` como su tipo deben tener los mismos miembros que los especificados en la declaración de la interfaz `Logger`. Si algunos miembros son opcionales, se pueden omitir.

Dado que los valores deben seguir lo que se declara en la interfaz, agregar campos extraños provocará un error de compilación. Por ejemplo, en el objeto literal, intente agregar una nueva propiedad que falta en la interfaz:


```ts{7}
interface Logger {
  log: (message: string) => void;
}

const logger: Logger = {
  log: (message) => console.log(message),
  otherProp: true,
};
```

En este caso, el Compilador de TypeScript emitiría el error `2322`, ya que esta propiedad no existe en la declaración de la interfaz `Logger`:


```sh
Output
Type '{ log: (message: string) => void; otherProp: boolean; }' is not assignable to type 'Logger'.
  Object literal may only specify known properties, and 'otherProp' does not exist in type 'Logger'. (2322)
```

Similar al uso de declaraciones `type` normales, las propiedades se pueden convertir en una propiedad opcional agregando `?` a su nombre.

## Extender Otros Tipos

Al crear interfaces, puede extender desde diferentes tipos de objetos, lo que permite que sus interfaces incluyan toda la información de tipo de los tipos extendidos. Esto le permite escribir interfaces pequeñas con un conjunto común de campos y utilizarlos como bloques de construcción para crear nuevas interfaces.

Imagina que tienes una interfaz `Clearable`, como esta:


```ts
interface Clearable {
  clear: () => void;
}
```


A continuación, podría crear una nueva interfaz que se extienda a partir de ella, heredando todos sus campos. En el siguiente ejemplo, la interfaz `Logger` se extiende desde la interfaz `Clearable`. Observe las líneas resaltadas:


```ts{5}
interface Clearable {
  clear: () => void;
}

interface Logger extends Clearable {
  log: (message: string) => void;
}
```

La interfaz `Logger` ahora también tiene un miembro `clear`, que es una función que no acepta parámetros y devuelve `void`. Este nuevo miembro se hereda de la interfaz `Clearable`. Es lo mismo que si hiciéramos esto:


```ts
interface Logger {
  log: (message: string) => void;
  clear: () => void;
}
```

Al escribir muchas interfaces con un conjunto común de campos, puede extraerlas a una interfaz diferente y cambiar sus interfaces para que se extiendan desde la nueva interfaz que creó.

Volviendo al ejemplo `Clearable` utilizado anteriormente, imagina que tu aplicación necesita una interfaz diferente, como la siguiente interfaz `StringList`, para representar una estructura de datos que contiene varias cadenas:


```ts
interface StringList {
  push: (value: string) => void;
  get: () => string[];
}
```

Al hacer que esta nueva interfaz `StringList` extienda la interfaz `Clearable` existente, está especificando que esta interfaz también tiene los miembros establecidos en la interfaz `Clearable`, agregando la propiedad `clear` a la definición de tipo de la interfaz `StringList`:


```ts
interface StringList extends Clearable {
  push: (value: string) => void;
  get: () => string[];
}
```

Las interfaces pueden extenderse desde cualquier tipo de objeto, como interfaces, tipos normales e incluso [clases](./how-to-use-classes.html).


## Interfaces con Firma Invocable

Si la interfaz también es invocable (es decir, también es una función), puede transmitir esa información en la declaración de la interfaz creando una firma invocable.

Una firma invocable se crea agregando una declaración de función dentro de la interfaz que no está vinculada a ningún miembro y usando `:` en lugar de `=>` al establecer el tipo de devolución de la función.

Como ejemplo, agregue una firma invocable a su interfaz `Logger`, como en el código resaltado a continuación:


```ts{2}
interface Logger {
  (message: string): void;
  log: (message: string) => void;
}
```


Tenga en cuenta que la firma invocable se asemeja a la declaración de tipo de una función anónima, pero en el tipo de devolución está utilizando `:` en lugar de `=>`. Esto significa que cualquier valor vinculado al tipo de interfaz `Logger` se puede llamar directamente como una función.


Para crear un valor que coincida con su interfaz `Logger`, debe considerar los requisitos de la interfaz:

1. Debe ser invocable.
2. Debe tener una propiedad llamada `log` que es una función que acepta un solo parámetro `string`.


Vamos a crear una variable llamada `logger` que se pueda asignar al tipo de su interfaz `Logger`:


```ts
interface Logger {
  (message: string): void;
  log: (message: string) => void;
}

const logger: Logger = (message: string) => {
  console.log(message);
}
logger.log = (message: string) => {
  console.log(message);
}
```

Para que coincida con la interfaz `Logger`, el valor debe poder ser invocable, es por eso que asigna la variable `logger` a una función:


```ts{6,7,8}
interface Logger {
  (message: string): void;
  log: (message: string) => void;
}

const logger: Logger = (message: string) => {
  console.log(message);
}
logger.log = (message: string) => {
  console.log(message);
}
```


Luego está agregando la propiedad `log` a la función `logger`:


```ts{9,10,11}
interface Logger {
  (message: string): void;
  log: (message: string) => void;
}

const logger: Logger = (message: string) => {
  console.log(message);
}
logger.log = (message: string) => {
  console.log(message);
}
```

Esto es requerido por la interfaz `Logger`. Los valores vinculados a la interfaz `Logger` también deben tener una propiedad `log` que sea una función que acepte un único parámetro `string` y que devuelva `void`.

Si no incluyó la propiedad `log`, el Compilador de TypeScript le daría el error `2741`:


```sh
Output
Property 'log' is missing in type '(message: string) => void' but required in type 'Logger'. (2741)
```

El Compilador de TypeScript emitiría un error similar si la propiedad `log` en la variable `logger` tuviera una firma de tipo incompatible, como establecerla en `true`:


```ts{9}
interface Logger {
  (message: string): void;
  log: (message: string) => void;
}

const logger: Logger = (message: string) => {
  console.log(message);
}
logger.log = true;
```

En este caso, el Compilador de TypeScript mostraría el error `2322`:


```sh
Output
Type 'boolean' is not assignable to type '(message: string) => void'. (2322)
```

Una buena característica de configurar las variables para que tengan un tipo específico, en este caso configurar la variable `logger` para que tenga el tipo de la interfaz `Logger`, es que TypeScript ahora puede inferir el tipo de los parámetros tanto de la función `logger` como de la función en la propiedad `log`.

Puede verificar eso eliminando la información de tipo del argumento de ambas funciones. Tenga en cuenta que en el código resaltado a continuación, los parámetros `message` no tienen un tipo:


```ts
interface Logger {
  (message: string): void;
  log: (message: string) => void;
}

const logger: Logger = (message) => {
  console.log(message);
}
logger.log = (message) => {
  console.log(message);
}
```

Y en ambos casos, su editor aún debería poder mostrar que el tipo del parámetro es un `string`, ya que este es el tipo esperado por la interfaz `Logger`.


## Interfaces con Firmas de Índice

Puede agregar una firma de índice a su interfaz, al igual que con los tipos normales, lo que permite que la interfaz tenga un número ilimitado de propiedades.

Por ejemplo, si desea crear una interfaz `DataRecord` que tenga un número ilimitado de campos `string`, puede usar la siguiente firma de índice resaltada:


```ts{2}
interface DataRecord {
  [key: string]: string;
}
```

A continuación, puede utilizar la interfaz `DataRecord` para establecer el tipo de cualquier objeto que tenga varios parámetros de tipo `string`:


```ts
interface DataRecord {
  [key: string]: string;
}

const data: DataRecord = {
  fieldA: "valueA",
  fieldB: "valueB",
  fieldC: "valueC",
  // ...
};
```

En esta sección, creó interfaces usando diferentes funciones disponibles en TypeScript y aprendió a usar las interfaces que creó. En la siguiente sección, aprenderá más sobre las diferencias entre las declaraciones `type` e `interface`, y ganará práctica con la fusión de declaración y aumento de módulo.

## Diferencias entre Tipos e Interfaces

Hasta ahora, ha visto que la declaración `interface` y la declaración `type` son similares y tienen casi el mismo conjunto de características.

Por ejemplo, creó una interfaz `Logger` que se extendió desde una interfaz `Clearable`:


```ts
interface Clearable {
  clear: () => void;
}

interface Logger extends Clearable {
  log: (message: string) => void;
}
```

La misma representación de tipo se puede replicar utilizando dos declaraciones `type`:


```ts
type Clearable = {
  clear: () => void;
}

type Logger = Clearable & {
  log: (message: string) => void;
}
```

Como se mostró en las secciones anteriores, la declaración `interface` se puede usar para representar una variedad de objetos, desde funciones hasta objetos complejos con un número ilimitado de propiedades. Esto también es posible con declaraciones `type`, incluso extendiéndose desde otros tipos, ya que puede intersectar varios tipos usando el operador de intersección `&`.

Dado que las declaraciones `type` y las declaraciones `interface` son tan similares, deberá considerar las características específicas únicas de cada una y ser consistente en su base de código. Elija uno para crear representaciones de tipo en su base de código, y solo use el otro cuando necesite una función específica que solo esté disponible para él.

Por ejemplo, la declaración `type` tiene algunas características de las que carece la declaración `interface`, como:

- Tipos de unión.
- Tipos mapeados.
- Alias a tipos primitivos.

Una de las funciones disponibles solo para la declaración `interface` es la fusión de declaraciones, sobre la que aprenderá en la siguiente sección. Es importante tener en cuenta que la combinación de declaraciones puede ser útil si está escribiendo una biblioteca y desea dar a los usuarios de la biblioteca el poder de ampliar los tipos proporcionados por la biblioteca, ya que esto no es posible con las declaraciones `type`.


## Fusionar Declaraciones

TypeScript puede fusionar varias declaraciones en una sola, lo que le permite escribir varias declaraciones para la misma estructura de datos y que el compilador de TypeScript las agrupe durante la compilación como si fueran un solo tipo. En esta sección, verá cómo funciona esto y por qué es útil al usar interfaces.

Las interfaces en TypeScript se pueden volver a abrir; es decir, se pueden combinar varias declaraciones de la misma interfaz. Esto es útil cuando desea agregar nuevos campos a una interfaz existente.

Por ejemplo, imagina que tienes una interfaz llamada `DatabaseOptions` como la siguiente:


```ts
interface DatabaseOptions {
  host: string;
  port: number;
  user: string;
  password: string;
}
```

Esta interfaz se utilizará para pasar opciones al conectarse a una base de datos.

Más adelante en el código, declara una interfaz con el mismo nombre pero con un solo campo `string` llamado `dsnUrl`, como este:


```ts
interface DatabaseOptions {
  dsnUrl: string;
}
```

Cuando el Compilador de TypeScript comience a leer su código, fusionará todas las declaraciones de la interfaz de `DatabaseOptions` en una sola. Desde el punto de vista del Compilador de TypeScript, `DatabaseOptions` ahora es:


```ts
interface DatabaseOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  dsnUrl: string;
}
```

La interfaz incluye todos los campos que declaró inicialmente, más el nuevo campo `dsnUrl` que declaró por separado. Ambas declaraciones se han fusionado.


## Aumentar Módulos

La fusión de declaraciones es útil cuando necesita aumentar los módulos existentes con nuevas propiedades. Un caso de uso para eso es cuando agrega más campos a una estructura de datos proporcionada por una biblioteca. Esto es relativamente común con la [biblioteca Node.js llamada `express`](https://expressjs.com/), que le permite crear servidores HTTP.

Cuando se trabaja con `express`, se pasan un objeto `Request` y `Response` a sus manejadores de solicitudes (funciones responsables de proporcionar una respuesta a una solicitud HTTP). El objeto `Request` se usa comúnmente para almacenar datos específicos de una solicitud en particular. Por ejemplo, podría usarlo para almacenar el usuario registrado que realizó la solicitud HTTP inicial:


```ts{2}
const myRoute = (req: Request, res: Response) => {
  res.json({ user: req.user });
}
```

Aquí, el controlador de solicitudes devuelve al cliente un `json` con el campo `user` establecido en el usuario registrado. El usuario registrado se agrega al objeto de solicitud en otro lugar del código, utilizando un _middleware_ de _express_ responsable de la autenticación del usuario.

Las definiciones de tipo para la interfaz `Request` en sí no tienen un campo `user`, por lo que el código anterior daría el error de tipo `2339`:


```sh
Property 'user' does not exist on type 'Request'. (2339)
```

Para arreglar eso, debe crear un aumento de módulo para el paquete `express`, aprovechando la combinación de declaraciones para agregar una nueva propiedad a la interfaz `Request`.


Si verifica el tipo del objeto `Request` en la declaración de tipo `express`, notará que es una interfaz agregada dentro de un espacio de nombres global llamado `Express`, como se muestra en la documentación del [repositorio DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/70c3f0558f295a5bf5ba98d649509da21e5b12ae/types/express-serve-static-core/index.d.ts#L17-L25):


```ts
declare global {
    namespace Express {
        // These open interfaces may be extended in an application-specific manner via declaration merging.
        // See for example method-override.d.ts (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/method-override/index.d.ts)
        interface Request {}
        interface Response {}
        interface Application {}
    }
}
```

:::tip Nota
Los archivos de declaración de tipo son archivos que solo contienen información de tipo. El repositorio DefinitelyTyped es el repositorio oficial para enviar declaraciones de tipo para paquetes que no tienen uno. Los paquetes `@types/<package>` disponibles en npm se publican desde este repositorio.
:::


Para usar el aumento de módulo para agregar una nueva propiedad a la interfaz `Request`, debe replicar la misma estructura en un archivo de declaración de tipo local. Por ejemplo, imagine que creó un archivo llamado `express.d.ts` como el siguiente y luego lo agregó a la opción `types` de su `tsconfig.json`:


```ts
import 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        name: string;
      }
    }
  }
}
```

Desde el punto de vista del Compilador de TypeScript, la interfaz `Request` tiene una propiedad `user`, con su tipo establecido en un objeto que tiene una sola propiedad llamada `name` de tipo `string`. Esto sucede porque se fusionan todas las declaraciones para la misma interfaz.

Supongamos que está creando una biblioteca y desea brindar a los usuarios de su biblioteca la opción de aumentar los tipos proporcionados por su propia biblioteca, como lo hizo anteriormente con `express`. En ese caso, debe exportar las interfaces de su biblioteca, ya que las declaraciones `type` normales no admiten el aumento de módulos.

## Conclusión

En este tutorial, escribió varias interfaces de TypeScript para representar varias estructuras de datos, descubrió cómo puede usar diferentes interfaces juntas como bloques de construcción para crear tipos potentes y aprendió las diferencias entre las declaraciones de tipos normales y las interfaces. Ahora puede comenzar a escribir interfaces para estructuras de datos en su base de código, lo que le permite tener código con seguridad de tipos y documentación.
