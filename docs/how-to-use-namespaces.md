# Cómo Usar Espacios de Nombres en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-namespaces-in-typescript)
:::

## Introducción

[TypeScript](https://www.typescriptlang.org/) es una extensión del lenguaje [JavaScript](https://www.digitalocean.com/community/tutorial-series/how-to-code-in-javascript) que utiliza el tiempo de ejecución de JavaScript con un verificador de tipos en tiempo de compilación. En TypeScript, puede usar espacios de nombres para organizar su código. Anteriormente conocidos como módulos internos, los espacios de nombres en TypeScript se basan en un borrador inicial de los módulos ECMAScript. En el borrador de especificación de ECMAScript, los módulos internos se eliminaron alrededor de [septiembre de 2013](https://speakerdeck.com/dherman/september-2013-modules-status-update?slide=7), pero TypeScript mantuvo la idea con un nombre diferente.

Los espacios de nombres permiten al desarrollador crear unidades de organización separadas que se pueden usar para contener múltiples valores, como propiedades, [clases](./how-to-use-classes.html), [tipos](./how-to-create-custom-types.html) e [interfaces](./how-to-use-interfaces.html). En este tutorial, creará y usará espacios de nombres para ilustrar la sintaxis y para qué se pueden usar. Le guiará a través de ejemplos de código de declaración y fusión de espacios de nombres, cómo funcionan los espacios de nombres como código JavaScript en el fondo y cómo se pueden usar para declarar tipos para bibliotecas externas sin tipado.

## Crear Espacios de Nombres en TypeScript

En esta sección, creará espacios de nombres en TypeScript para ilustrar la sintaxis general.

Para crear espacios de nombres, utilizará la palabra clave `namespace` seguida del nombre del espacio de nombres y luego un bloque `{}`. Como ejemplo, creará un espacio de nombres `DatabaseEntity` para contener entidades de base de datos, como si estuviera usando una biblioteca de [Mapeo relacional de objetos](https://en.wikipedia.org/wiki/Object%e2%80%93relational_mapping) (ORM). Agregue el siguiente código a un nuevo archivo de TypeScript:


```ts
namespace DatabaseEntity {
}
```

Esto declara el espacio de nombres `DatabaseEntity`, pero aún no agrega código a ese espacio de nombres. A continuación, agregue una clase `User` dentro del espacio de nombres para representar una entidad `User` en la base de datos:


```ts{2,3,4}
namespace DatabaseEntity {
  class User {
    constructor(public name: string) {}
  }
}
```


Puede usar su clase `User` normalmente dentro de su espacio de nombres. Para ilustrar esto, cree una nueva instancia `User` y guárdela en la variable `newUser`:


```ts{6}
namespace DatabaseEntity {
  class User {
    constructor(public name: string) {}
  }

  const newUser = new User("Jon");
}
```

Este es un código válido. Sin embargo, si intentara usar `User` fuera del espacio de nombres, el Compilador de TypeScript le daría el error `2339`:


```sh
Output
Property 'User' does not exist on type 'typeof DatabaseEntity'. (2339)
```

Si quisiera usar su clase fuera de su espacio de nombres, primero tendría que exportar la clase `User` para que esté disponible externamente, como se muestra en el código resaltado a continuación:


```ts{2}
namespace DatabaseEntity {
  export class User {
    constructor(public name: string) {}
  }

  const newUser = new User("Jon");
}
```

Ahora puede acceder a la clase `User` fuera del espacio de nombres de `DatabaseEntity` utilizando su nombre completo. En este caso, el nombre completo es `DatabaseEntity.User`:


```ts{9}
namespace DatabaseEntity {
  export class User {
    constructor(public name: string) {}
  }

  const newUser = new User("Jon");
}

const newUserOutsideNamespace = new DatabaseEntity.User("Jane");
```


Puede exportar cualquier cosa desde dentro de un espacio de nombres, incluidas las variables, que luego se convierten en propiedades en el espacio de nombres. En el siguiente código, está exportando la variable `newUser`:


```ts{6,9}
namespace DatabaseEntity {
  export class User {
    constructor(public name: string) {}
  }

  export const newUser = new User("Jon");
}

console.log(DatabaseEntity.newUser.name);
```

Dado que se exportó la variable `newUser`, puede acceder a ella como una propiedad del espacio de nombres. Ejecutar este código imprimiría lo siguiente en la consola:


```sh
Output
Jon
```

Al igual que con las [interfaces](./how-to-use-interfaces.html), los espacios de nombres en TypeScript también permiten la fusión de declaraciones. Esto significa que varias declaraciones del mismo espacio de nombres se fusionarán en una sola declaración. Esto puede agregar flexibilidad a un espacio de nombres si necesita ampliarlo más adelante en su código.

Usando el ejemplo anterior, esto significa que si declaraste tu espacio de nombres `DatabaseEntity` nuevamente, podrías extender el espacio de nombres con más propiedades. Agregue una nueva clase `UserRole` a su espacio de nombres `DatabaseEntity` usando otra declaración de espacio de nombres:


```ts{9,10,11,12,13,14,15}
namespace DatabaseEntity {
  export class User {
    constructor(public name: string) {}
  }

  export const newUser = new User("Jon");
}

namespace DatabaseEntity {
  export class UserRole {
    constructor(public user: User, public role: string) {}
  }

  export const newUserRole = new UserRole(newUser, "admin");
}
```

Dentro de su nueva declaración de espacio de nombres `DatabaseEntity`, puede usar cualquier miembro exportado previamente en el espacio de nombres `DatabaseEntity`, incluso de declaraciones anteriores, sin tener que usar su nombre completo. Está usando el nombre tal como se declaró en el primer espacio de nombres para establecer el tipo del parámetro `user` en el constructor `UserRole` para que sea del tipo `User`, y al crear una nueva instancia `UserRole` usando el valor `newUser`. Esto solo es posible porque los exportó en la declaración de espacio de nombres anterior.

Ahora que ha echado un vistazo a la sintaxis básica de los espacios de nombres, puede pasar a examinar cómo el Compilador de TypeScript traduce los espacios de nombres a JavaScript.


## Examinar el Código JavaScript Generado al Usar Espacios de Nombres

Los espacios de nombres en TypeScript no son solo una función de tiempo de compilación; también cambian el código JavaScript resultante. Para obtener más información sobre cómo funcionan los espacios de nombres, puede analizar el JavaScript que impulsa esta característica de TypeScript. En este paso, tomará los fragmentos de código de la última sección y examinará su implementación de JavaScript subyacente.

Toma el código que usaste en el primer ejemplo:


```ts
namespace DatabaseEntity {
  export class User {
    constructor(public name: string) {}
  }

  export const newUser = new User("Jon");
}

console.log(DatabaseEntity.newUser.name);
```

El compilador de TypeScript generaría el siguiente código JavaScript para este fragmento de código de TypeScript:


```js
"use strict";
var DatabaseEntity;
(function (DatabaseEntity) {
    class User {
        constructor(name) {
            this.name = name;
        }
    }
    DatabaseEntity.User = User;
    DatabaseEntity.newUser = new User("Jon");
})(DatabaseEntity || (DatabaseEntity = {}));
console.log(DatabaseEntity.newUser.name);
```

Para declarar el espacio de nombres `DatabaseEntity`, el compilador de TypeScript crea una variable no inicializada denominada `DatabaseEntity` y, a continuación, crea una [Expresión de Función Invocada Inmediatamente](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (IIFE). Este IIFE recibe un solo parámetro `DatabaseEntity || (DatabaseEntity = {})`, que es el valor actual de la variable `DatabaseEntity`. Si no se establece en un valor real, establece el valor de la variable en un objeto vacío.

Establecer el valor de su `DatabaseEntity` en un valor vacío al pasarlo al IIFE funciona porque el valor de retorno de una operación de asignación es el valor que se asigna. En este caso, este es el objeto vacío.

Dentro del IIFE, la clase `User` se crea y luego se asigna a la propiedad `User` del objeto `DatabaseEntity`. Lo mismo ocurre con la propiedad `newUser`, donde asigna la propiedad al valor de una nueva instancia `User`.

Ahora eche un vistazo al segundo ejemplo de código, donde tenía varias declaraciones de espacios de nombres:


```ts
namespace DatabaseEntity {
  export class User {
    constructor(public name: string) {}
  }

  export const newUser = new User("Jon");
}

namespace DatabaseEntity {
  export class UserRole {
    constructor(public user: User, public role: string) {}
  }

  export const newUserRole = new UserRole(newUser, "admin");
}
```

El código JavaScript generado se vería así:


```js
"use strict";
var DatabaseEntity;
(function (DatabaseEntity) {
    class User {
        constructor(name) {
            this.name = name;
        }
    }
    DatabaseEntity.User = User;
    DatabaseEntity.newUser = new User("Jon");
})(DatabaseEntity || (DatabaseEntity = {}));
(function (DatabaseEntity) {
    class UserRole {
        constructor(user, role) {
            this.user = user;
            this.role = role;
        }
    }
    DatabaseEntity.UserRole = UserRole;
    DatabaseEntity.newUserRole = new UserRole(DatabaseEntity.newUser, "admin");
})(DatabaseEntity || (DatabaseEntity = {}));
```

El comienzo del código se ve igual que antes, con la variable `DatabaseEntity` sin inicializar y luego un IIFE con el código real configurando las propiedades del objeto `DatabaseEntity`. Esta vez, aunque también tienes otro IIFE. Este nuevo IIFE coincide con la segunda declaración de su espacio de nombres `DatabaseEntity`.

Ahora, cuando se ejecuta el segundo IIFE, `DatabaseEntity` ya está vinculado a un objeto, por lo que solo está ampliando el objeto ya disponible agregando propiedades adicionales.

Ahora ha echado un vistazo a la sintaxis de los espacios de nombres de TypeScript y cómo funcionan en el JavaScript subyacente. Con este contexto, ahora puede ejecutar un caso de uso común para espacios de nombres: definir tipos para bibliotecas externas sin tipado.

## Usar Espacios de Nombres para Proporcionar Tipado a Bibliotecas Externas

En esta sección, recorrerá uno de los escenarios en los que los espacios de nombres son útiles: la creación de declaraciones de módulos para bibliotecas externas. Para hacer esto, escribirá un nuevo archivo en su proyecto de TypeScript para declarar el tipado, luego cambie su archivo `tsconfig.json` para que el compilador de TypeScript reconozca el tipo.

:::tip Nota
Para seguir los siguientes pasos, es necesario un entorno TypeScript con acceso al sistema de archivos. Si está utilizando TypeScript Playground, puede exportar el código existente a un proyecto de CodeSandbox haciendo clic en **Export** en el menú superior y luego en **Open in CodeSandbox**. Esto le permitirá crear nuevos archivos y editar el archivo `tsconfig.json`.
:::

No todos los paquetes disponibles en el registro [npm](https://www.npmjs.com/) incluyen su propia declaración de módulo TypeScript. Esto significa que al instalar un paquete en su proyecto, puede encontrar un error de compilación relacionado con la declaración de tipo faltante del paquete o tener que trabajar con una biblioteca que tiene todos sus tipos establecidos en `any`. Dependiendo de qué tan estrictamente esté usando TypeScript, esto puede ser un resultado no deseado.

Con suerte, este paquete tendrá un paquete `@types` creado por la comunidad [DefinetelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), lo que le permitirá instalar el paquete y obtener tipos de trabajo para esa biblioteca. Sin embargo, este no es siempre el caso y, a veces, tendrá que lidiar con una biblioteca que no incluye su propia declaración de módulo de tipo. En este caso, si desea mantener su código completamente seguro, debe crear la declaración del módulo usted mismo.

Como ejemplo, imagina que estás usando una biblioteca de vectores llamada `example-vector3` que exporta una sola clase, `Vector3`, con un solo método, `add`. Este método se utiliza para sumar dos vectores `Vector3` juntos.

El código en la biblioteca podría ser algo como lo siguiente:


```js
export class Vector3 {
  super(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vec) {
    let x = this.x + vector.x;
    let y = this.y + vector.y;
    let z = this.z + vector.z;

    let newVector = new Vector3(x, y, z);

    return newVector
  }
}
```

Esto exporta una clase que crea vectores con propiedades `x`, `y` y `z`, destinados a representar los componentes de coordenadas del vector.

A continuación, eche un vistazo a un fragmento de código de ejemplo que utiliza la biblioteca hipotética:

📃`index.ts`
```ts
import { Vector3 } from "example-vector3";

const v1 = new Vector3(1, 2, 3);
const v2 = new Vector3(1, 2, 3);

const v3 = v1.add(v2);
```

La biblioteca `example-vector3` no incluye su propia declaración de tipo, por lo que el compilador de TypeScript generará el error `2307`:


```sh
Output
Cannot find module 'example-vector3' or its corresponding type declarations. ts(2307)
```

Para solucionar este problema, ahora creará un archivo de declaración de tipos para este paquete. Primero, cree un nuevo archivo llamado `types/example-vector3/index.d.ts` y ábralo en su editor favorito. Dentro de este archivo escribe el siguiente código:


📃`types/example-vector3/index.d.ts`
```ts
declare module "example-vector3" {
  export = vector3;

  namespace vector3 {
  }
}
```

En este código, está creando la declaración de tipo para el módulo `example-vector3`. La primera parte del código es el propio bloque `declare module`. El compilador de TypeScript analizará este bloque e interpretará todo lo que contiene como si fuera la representación de tipo del módulo en sí. Esto significa que todo lo que declare aquí, TypeScript lo utilizará para inferir el tipo del módulo. En este momento, está diciendo que este módulo exporta un solo espacio de nombres llamado `vector3`, que actualmente está vacío.

Guardar y salir de este archivo.

El compilador de TypeScript actualmente no conoce su archivo de declaración, por lo que debe incluirlo en su `tsconfig.json`. Para hacer esto, edite el archivo `tsconfig.json` agregando la propiedad `types` a la opción `compilerOptions`:


📃`tsconfig.json`
```json
{
  "compilerOptions": {
    ...
    "types": ["./types/example-vector3/index.d.ts"]
  }
}
```


Ahora, si regresa a su código original, verá que el error ha cambiado. El compilador de TypeScript ahora está dando el error `2305`:

```sh
Output
Module '"example-vector3"' has no exported member 'Vector3'. ts(2305)
```

Mientras creaba la declaración del módulo para `example-vector3`, la exportación está configurada actualmente en un espacio de nombres vacío. No se exporta ninguna clase `Vector3` desde ese espacio de nombres.

Vuelva a abrir `types/example-vector3/index.d.ts` y escriba el siguiente código:


📃`types/example-vector3/index.d.ts`
```ts{5,6,7,8}
declare module "example-vector3" {
  export = vector3;

  namespace vector3 {
    export class Vector3 {
      constructor(x: number, y: number, z: number);
      add(vec: Vector3): Vector3;
    }
  }
}
```

En este código, observe cómo ahora está exportando una clase dentro del espacio de nombres `vector3`. El objetivo principal de las declaraciones de módulos es proporcionar la información de tipo de valores que expone una biblioteca. De esta manera, puede usarlo de una manera segura.

En este caso, sabe que la biblioteca `example-vector3` proporciona una clase llamada `Vector3` que acepta tres números en el constructor, y que tiene un método `add` que se usa para agregar dos instancias `Vector3`, devolviendo una nueva instancia como resultado. No necesita proporcionar la implementación aquí, solo la información del tipo en sí. Las declaraciones que no proporcionan una implementación se conocen como declaraciones _ambientales_ en TypeScript, y es común crearlas dentro del archivo `.d.ts`.

Este código ahora se compilará correctamente y tendrá los tipos correctos para la clase `Vector3`.

Con los espacios de nombres, puede aislar lo que exporta la biblioteca en una sola unidad de tipo, que en este caso es el espacio de nombres `vector3`. Esto hace que sea más fácil personalizar la declaración del módulo en el futuro o incluso hacer que la declaración de tipo esté disponible para todos los desarrolladores al enviarla al [repositorio `DefinetelyTyped`](https://github.com/DefinitelyTyped/DefinitelyTyped).


## Conclusión

En este tutorial, repasó la sintaxis básica de los espacios de nombres en TypeScript y examinó el JavaScript en el que lo convierte el compilador de TypeScript. También probó un caso de uso común de espacios de nombres: proporcionar escritura ambiental para bibliotecas externas que aún no están escritas.

Si bien los espacios de nombres no están en desuso, no siempre se recomienda usar espacios de nombres como mecanismo de organización de código en su base de código. El código moderno debe usar la [sintaxis del Módulo ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), ya que tiene todas las funciones proporcionadas por los espacios de nombres y, a partir de ECMAScript 2015, se convirtió en parte de la especificación. Sin embargo, al crear declaraciones de módulos, aún se recomienda el uso de espacios de nombres, ya que permite declaraciones de tipo más concisas.
