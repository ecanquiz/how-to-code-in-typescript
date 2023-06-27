# Cómo Usar Clases en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-classes-in-typescript)
:::

## Introducción

Las clases son una abstracción común utilizada en los lenguajes de [programación orientada a objetos (POO)](https://en.wikipedia.org/wiki/Object-oriented_programming) para describir estructuras de datos conocidas como objetos. Estos objetos pueden contener un estado inicial e implementar comportamientos vinculados a esa instancia de objeto en particular. En 2015, [ECMAScript 6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_%E2%80%93_ECMAScript_2015) introdujo una nueva sintaxis en [JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) para crear clases que utilizan internamente las funciones de prototipo del lenguaje. TypeScript tiene soporte completo para esa sintaxis y también agrega características, como visibilidad de miembros, clases abstractas, clases genéricas, métodos de función de flecha y algunos otros.

Este tutorial repasará la sintaxis utilizada para crear clases, las diferentes funciones disponibles y cómo se tratan las clases en TypeScript durante la verificación de tipos en tiempo de compilación. Lo guiará a través de ejemplos con diferentes ejemplos de código, que puede seguir junto con su propio entorno de TypeScript.

## Creación de Clases en TypeScript

En esta sección, verá ejemplos de la sintaxis utilizada para crear clases en TypeScript. Si bien cubrirá algunos de los aspectos fundamentales de la creación de clases con TypeScript, la sintaxis es prácticamente la misma que se usa para [crear clases con JavaScript](https://www.digitalocean.com/community/tutorials/understanding-classes-in-javascript). Debido a esto, este tutorial se centrará en algunas de las funciones distintivas disponibles en TypeScript.

Puede crear una declaración de clase usando la palabra clave `class`, seguida del nombre de la clase y luego un bloque de par `{}`, como se muestra en el siguiente código:


```ts
class Person {

}
```

Este fragmento crea una nueva clase llamada `Person`. Luego puede crear una nueva instancia de la clase `Person` usando la palabra clave `new` seguida del nombre de su clase y luego una lista de parámetros vacía (que puede omitirse), como se muestra en el siguiente código resaltado:


```ts{5}
class Person {

}

const personInstance = new Person();
```

Puede pensar en la clase en sí misma como un modelo para crear objetos con la forma dada, mientras que las instancias son los objetos en sí mismos, creados a partir de este modelo.

Cuando trabaje con clases, la mayoría de las veces necesitará crear una función `constructor`. Un `constructor` es un método que se ejecuta cada vez que se crea una nueva instancia de la clase. Esto se puede usar para inicializar valores en la clase.

Introduce un constructor a tu clase `Person`:


```ts{2,3,4}
class Person {
  constructor() {
    console.log("Constructor called");
  }
}

const personInstance = new Person();
```

Este constructor registrará el `"Constructor called"` a la consola cuando se crea `personInstance`.


Los constructores son similares a las funciones normales en la forma en que aceptan parámetros. Esos parámetros se pasan al constructor cuando crea una nueva instancia de su clase. Actualmente, no está pasando ningún parámetro al constructor, como se muestra en la lista de parámetros vacía `()` al crear la instancia de su clase.

A continuación, introduzca un nuevo parámetro llamado `name` de tipo `string`:


```ts{2,3,7}
class Person {
  constructor(name: string) {
    console.log(`Constructor called with name=${name}`);
  }
}

const personInstance = new Person("Jane");
```


En el código resaltado, agregó un parámetro llamado `name` de tipo `string` a su constructor de clase. Luego, al crear una nueva instancia de la clase `Person`, también está configurando el valor de ese parámetro, en este caso a la cadena `"Jane"`. Finalmente, cambió el `console.log` para imprimir el argumento en la pantalla.

Si tuviera que ejecutar este código, recibiría el siguiente resultado en la terminal:


```sh
Output
Constructor called with name=Jane
```

El parámetro en el constructor no es opcional aquí. Esto significa que cuando crea una instancia de la clase, debe pasar el parámetro `name` al constructor. Si no pasa el parámetro `name` al constructor, como en el siguiente ejemplo:


```ts
const unknownPerson = new Person;
```

El compilador de TypeScript dará el error `2554`:


```sh
Output
Expected 1 arguments, but got 0. (2554)
filename.ts(4, 15): An argument for 'name' was not provided.
```

Ahora que ha declarado una clase en TypeScript, pasará a manipular esas clases agregando propiedades.


## Agregar Propiedades de Clase

Uno de los aspectos más útiles de las clases es su capacidad para contener datos internos de cada instancia creada a partir de la clase. Esto se hace usando _propiedades_.

TypeScript tiene algunas comprobaciones de seguridad que diferencian este proceso de las clases de JavaScript, incluido el requisito de inicializar las propiedades para evitar que sean `undefined`. En esta sección, agregará nuevas propiedades a su clase para ilustrar estas comprobaciones de seguridad.

Con TypeScript, generalmente debe declarar la propiedad primero en el cuerpo de la clase y darle un tipo. Por ejemplo, agregue una propiedad `name` a su clase `Person`:


```ts{2,5}
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

En este ejemplo, declara la propiedad `name` con tipo `string` además de establecer la propiedad en el `constructor`.


:::tip Nota
En TypeScript, también puede declarar la _visibilidad_ de las propiedades en una clase para determinar dónde se puede acceder a los datos. En la declaración `name: string`, no se declara la visibilidad, lo que significa que la propiedad utiliza el estatus `public` predeterminado al que se puede acceder desde cualquier lugar. Si quisiera controlar la visibilidad explícitamente, pondría declare esto con la propiedad. Esto se tratará con más profundidad más adelante en el tutorial.
:::


También puede dar un valor predeterminado a una propiedad. Como ejemplo, agregue una nueva propiedad llamada `instantiatedAt` que se establecerá en el momento en que se instancia la instancia de la clase:


```ts{3}
class Person {
  name: string;
  instantiatedAt = new Date();

  constructor(name: string) {
    this.name = name;
  }
}
```

Esto usa el [objeto `Date`](https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript) para establecer una fecha inicial para la creación de la instancia. Este código funciona porque el código para el valor predeterminado se ejecuta cuando se llama al constructor de la clase, lo que sería equivalente a establecer el valor en el constructor, como se muestra a continuación:

```ts
class Person {
  name: string;
  instantiatedAt: Date;

  constructor(name: string) {
    this.name = name;
    this.instantiatedAt = new Date();
  }
}
```

Al declarar el valor predeterminado en el cuerpo de la clase, no necesita establecer el valor en el constructor.

Tenga en cuenta que si establece un tipo para una propiedad en una clase, también debe inicializar esa propiedad en un valor de ese tipo. Para ilustrar esto, declare una propiedad de clase pero no proporcione un inicializador, como en el siguiente código:


```ts
class Person {
  name: string;
  instantiatedAt: Date;

  constructor(name: string) {
    this.name = name;
  }
}
```


`instanciatedAt` tiene asignado un tipo de `Date`, por lo que siempre debe ser un objeto `Date`. Pero como no hay inicialización, la propiedad se vuelve `undefined` cuando se instancia la clase. Debido a esto, el Compilador de TypeScript mostrará el error `2564`:


```sh
Output
Property 'instantiatedAt' has no initializer and is not definitely assigned in the constructor. (2564)
```

Esta es una verificación de seguridad adicional de TypeScript para garantizar que las propiedades correctas estén presentes en la creación de instancias de clase.


TypeScript también tiene un atajo para escribir propiedades que tienen el mismo nombre que los parámetros pasados al constructor. Este atajo se llama _propiedades de parámetro_.


En el ejemplo anterior, establece la propiedad `name` en el valor del parámetro `name` pasado al constructor de la clase. Esto puede volverse tedioso de escribir si agrega más campos a su clase. Por ejemplo, agregue un nuevo campo llamado `age` de tipo `number` a su clase `Person` y también agréguelo al constructor:


```ts{3,8}
class Person {
  name: string;
  age: number;
  instantiatedAt = new Date();

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

Si bien esto funciona, TypeScript puede reducir dicho código repetitivo con propiedades de parámetros o propiedades establecidas en los parámetros para el constructor:


```ts{5,6}
class Person {
  instantiatedAt = new Date();

  constructor(
    public name: string,
    public age: number
  ) {}
}
```

En este fragmento, eliminó las declaraciones de propiedad `name` y `age` del cuerpo de la clase y las movió para que estuvieran dentro de la lista de parámetros del constructor. Cuando hace eso, le está diciendo a TypeScript que esos parámetros del constructor también son propiedades de esa clase. De esta manera, no necesita establecer la propiedad de la clase en el valor del parámetro recibido en el constructor, como lo hizo antes.


:::tip Nota
Observe que el modificador de visibilidad `public` se ha establecido explícitamente en el código. Este modificador debe incluirse al establecer las propiedades de los parámetros y no pasará automáticamente a la visibilidad `public` de forma predeterminada.
:::


Si echa un vistazo al JavaScript compilado emitido por el Compilador de TypeScript, este código se compila en el siguiente código JavaScript:


```js
"use strict";
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.instantiatedAt = new Date();
  }
}
```

Este es el mismo código JavaScript en el que se compila el ejemplo original.

Ahora que ha probado la configuración de propiedades en las clases de TypeScript, puede pasar a ampliar las clases a nuevas clases con herencia de clases.


## Herencia de Clases en TypeScript

TypeScript ofrece la capacidad completa de la herencia de clases de JavaScript, con dos adiciones principales: _interfaces_ y _clases abstractas_. Una interfaz es una estructura que describe y aplica la forma de una clase o un objeto, como proporcionar verificación de tipos para piezas de datos más complejas. Puede implementar una interfaz en una clase para asegurarse de que tenga una forma pública específica. Las clases abstractas son clases que sirven como base para otras clases, pero no se pueden instanciar ellas mismas. Ambos se implementan a través de la herencia de clases.

En esta sección, verá algunos ejemplos de cómo se pueden usar las interfaces y las clases abstractas para construir y crear verificaciones de tipos para las clases.

## Implementando Interfaces

Las interfaces son útiles para especificar un conjunto de comportamientos que deben poseer todas las implementaciones de esa interfaz. Las interfaces se crean utilizando la palabra clave `interface` seguida del nombre de la interfaz y, a continuación, el cuerpo de la interfaz. Como ejemplo, cree una interfaz `Logger` que podría usarse para registrar datos importantes sobre cómo se ejecuta su programa:


```ts
interface Logger {}
```

A continuación, agregue cuatro métodos a su interfaz:


```ts
interface Logger {
  debug(message: string, metadata?: Record<string, unknown>): void;
  info(message: string, metadata?: Record<string, unknown>): void;
  warning(message: string, metadata?: Record<string, unknown>): void;
  error(message: string, metadata?: Record<string, unknown>): void;
}
```

Como se muestra en este bloque de código, al crear los métodos en su interfaz, no les agrega ninguna implementación, solo su información de tipo. En este caso, tiene cuatro métodos: `debug`, `info`, `warning` y `error`. Todos ellos comparten la misma firma de tipo: Reciben dos parámetros, un `message` de tipo `string` y un parámetro `metadata` opcional de tipo `Record<string, unknown>`. Todos devuelven el tipo `void`.

Todas las clases que implementen esta interfaz deben tener los parámetros correspondientes y los tipos de retorno para cada uno de estos métodos. Implemente la interfaz en una clase llamada `ConsoleLogger`, que registra todos los mensajes usando métodos de `console`:


```ts{1}
class ConsoleLogger implements Logger {
  debug(message: string, metadata?: Record<string, unknown>) {
    console.info(`[DEBUG] ${message}`, metadata);
  }
  info(message: string, metadata?: Record<string, unknown>) {
    console.info(message, metadata);
  }
  warning(message: string, metadata?: Record<string, unknown>) {
    console.warn(message, metadata);
  }
  error(message: string, metadata?: Record<string, unknown>) {
    console.error(message, metadata);
  }
}
```


Tenga en cuenta que al crear su interfaz, está utilizando una nueva palabra clave llamada `implements` para especificar la lista de interfaces que implementa su clase. Puede implementar varias interfaces agregándolas como una lista separada por comas de identificadores de interfaz después de la palabra clave `implements`. Por ejemplo, si tuviera otra interfaz llamada `Clearable`:


```ts
interface Clearable {
  clear(): void;
}
```

Podría implementarlo en la clase `ConsoleLogger` agregando el siguiente código resaltado:


```ts{1,2,3,4}
class ConsoleLogger implements Logger, Clearable {
  clear() {
    console.clear();
  }
  debug(message: string, metadata?: Record<string, unknown>) {
    console.info(`[DEBUG] ${message}`, metadata);
  }
  info(message: string, metadata?: Record<string, unknown>) {
    console.info(message, metadata);
  }
  warning(message: string, metadata?: Record<string, unknown>) {
    console.warn(message, metadata);
  }
  error(message: string, metadata?: Record<string, unknown>) {
    console.error(message, metadata);
  }
}
```


Tenga en cuenta que también debe agregar el método `clear` para asegurarse de que la clase se adhiera a la nueva interfaz.


Si no proporcionó la implementación para uno de los miembros requeridos por cualquiera de las interfaces, como el método `debug` de la interfaz `Logger`, el compilador de TypeScript le daría el error `2420`:


```sh
Output
Class 'ConsoleLogger' incorrectly implements interface 'Logger'.
  Property 'debug' is missing in type 'ConsoleLogger' but required in type 'Logger'. (2420)
```


El compilador de TypeScript también mostraría un error si su implementación no coincidiera con la esperada por la interfaz que está implementando. Por ejemplo, si cambió el tipo del parámetro `message` en el método `debug` de `string` a `number`, recibiría el error `2416`:


```sh
Output
Property 'debug' in type 'ConsoleLogger' is not assignable to the same property in base type 'Logger'.
  Type '(message: number, metadata?: Record<string, unknown> | undefined) => void' is not assignable to type '(message: string, metadata: Record<string, unknown>) => void'.
    Types of parameters 'message' and 'message' are incompatible.
      Type 'string' is not assignable to type 'number'. (2416)
```

## Construyendo sobre Clases Abstractas

Las clases abstractas son similares a las clases normales, con dos diferencias principales: no se pueden instanciar directamente y pueden contener _miembros abstractos_. Los miembros abstractos son miembros que deben implementarse en las clases heredadas. No tienen una implementación en la propia clase abstracta. Esto es útil porque puede tener alguna funcionalidad común en la clase abstracta base e implementaciones más específicas en las clases heredadas. Cuando marca una clase como abstracta, está diciendo que a esta clase le falta una funcionalidad que debería implementarse en las clases heredadas.

Para crear una clase abstracta, agrega la palabra clave `abstract` antes de la palabra clave `class`, como en el código resaltado:


```ts{1}
abstract class AbstractClassName {

}
```

A continuación, puede crear miembros en su clase abstracta, algunos que pueden tener una implementación y otros que no. Los que no tienen implementación se marcan como `abstract` y luego deben implementarse en las clases que se extienden desde su clase abstracta.

Por ejemplo, imagine que está trabajando en un entorno [Node.js](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-node-js) y está creando su propia [implementación `Stream`](https://nodejs.dev/learn/nodejs-streams). Para eso, vas a tener una clase abstracta llamada `Stream` con dos métodos abstractos, `read` y `write`:


```ts
declare class Buffer {
  from(array: any[]): Buffer;
  copy(target: Buffer, offset?: number): void;
}

abstract class Stream {

  abstract read(count: number): Buffer;
  
  abstract write(data: Buffer): void;
}
```

El [objeto `Buffer`](https://www.digitalocean.com/community/tutorials/using-buffers-in-node-js) aquí es una clase disponible en Node.js que se usa para almacenar datos binarios. La instrucción `declare class Buffer` en la parte superior permite que el código se compile en un entorno de TypeScript sin las declaraciones de tipo de Node.js, como TypeScript Playground.


En este ejemplo, el método `read` cuenta los bytes de la estructura de datos interna y devuelve un objeto `Buffer`, y `write` escribe todo el contenido de la instancia `Buffer` en la secuencia. Ambos métodos son abstractos y solo se pueden implementar en clases extendidas de `Stream`.

A continuación, puede crear métodos adicionales que tengan una implementación. De esta manera, cualquier clase que se extienda desde su clase abstracta `Stream` recibiría esos métodos automáticamente. Un ejemplo sería un método `copy`:


```ts{12,13,14,15}
declare class Buffer {
  from(array: any[]): Buffer;
  copy(target: Buffer, offset?: number): void;
}

abstract class Stream {

  abstract read(count: number): Buffer;
  
  abstract write(data: Buffer): void;

  copy(count: number, targetBuffer: Buffer, targetBufferOffset: number) {
    const data = this.read(count);
    data.copy(targetBuffer, targetBufferOffset);
  }
}
```

Este método `copy` copia el resultado de leer los bytes de la secuencia en `targetBuffer`, comenzando en `targetBufferOffset`.

Si luego crea una implementación para su clase abstracta `Stream`, como una clase `FileStream`, el método `copy` estará fácilmente disponible, sin tener que duplicarlo en su clase `FileStream`:


```ts{18,19,20,21,22,23,24,25,26,27,29}
declare class Buffer {
  from(array: any[]): Buffer;
  copy(target: Buffer, offset?: number): void;
}

abstract class Stream {

  abstract read(count: number): Buffer;
  
  abstract write(data: Buffer): void;

  copy(count: number, targetBuffer: Buffer, targetBufferOffset: number) {
    const data = this.read(count);
    data.copy(targetBuffer, targetBufferOffset);
  }
}

class FileStream extends Stream {
  read(count: number): Buffer {
    // implementation here
    return new Buffer();
  }
  
  write(data: Buffer) {
    // implementation here
  }
}

const fileStream = new FileStream();
```

En este ejemplo, la instancia `fileStream` automáticamente tiene disponible el método `copy`. La clase `FileStream` también tuvo que implementar un método `read` y un `write` explícitamente para adherirse a la clase abstracta `Stream`.


Si olvidó implementar uno de los miembros abstractos de la clase abstracta de la que se está extendiendo, como no agregar la implementación `write` en su clase `FileStream`, el compilador de TypeScript arrojaría el error `2515`:


```sh
Output
Non-abstract class 'FileStream' does not implement inherited abstract member 'write' from class 'Stream'. (2515)
```

El compilador de TypeScript también mostraría un error si implementara alguno de los miembros incorrectamente, como cambiar el tipo del primer parámetro del método `write` para que sea de tipo `string` en lugar de `Buffer`:


```sh
Output
Property 'write' in type 'FileStream' is not assignable to the same property in base type 'Stream'.
  Type '(data: string) => void' is not assignable to type '(data: Buffer) => void'.
    Types of parameters 'data' and 'data' are incompatible.
      Type 'Buffer' is not assignable to type 'string'. (2416)
```

Con las clases e interfaces abstractas, puede realizar comprobaciones de tipos más complejas para sus clases a fin de asegurarse de que las clases extendidas a partir de las clases base hereden la funcionalidad correcta. A continuación, verá ejemplos de cómo funciona la visibilidad de métodos y propiedades en TypeScript.


## Visibilidad de Miembros de Clase


TypeScript aumenta la sintaxis de clases de JavaScript disponible al permitirle especificar la visibilidad de los miembros de una clase. En este caso, la _visibilidad_ se refiere a cómo el código fuera de una clase instanciada puede interactuar con un miembro dentro de la clase.


Los miembros de la clase en TypeScript pueden tener tres posibles modificadores de visibilidad: `public`, `protected` y `private`. Se puede acceder a los miembros `public` fuera de la instancia de la clase, mientras que a los `private` no se puede. `protected` ocupa un término medio entre los dos, donde las instancias de la clase o subclases basadas en esa clase pueden acceder a los miembros.

En esta sección, examinará los modificadores de visibilidad disponibles y aprenderá lo que significan.


## `public`


Esta es la visibilidad predeterminada de los miembros de la clase en TypeScript. Cuando no agrega el modificador de visibilidad a un miembro de la clase, es lo mismo que configurarlo como `public`. Se puede acceder a los miembros de la clase pública desde cualquier lugar, sin restricciones.

Para ilustrar esto, regrese a su clase `Person` de antes:


```ts
class Person {
  public instantiatedAt = new Date();

  constructor(
    name: string,
    age: number
  ) {}
}
```


Este tutorial mencionó que las dos propiedades `name` y `age` tenían visibilidad `public` de forma predeterminada. Para declarar explícitamente la visibilidad del tipo, agregue la palabra clave `public` antes de las propiedades y un nuevo método `public` a su clase llamado `getBirthYear`, que recupera el año de nacimiento de la instancia `Person`:


```ts{3,4,7,8,9}
class Person {
  constructor(
    public name: string,
    public age: number
  ) {}

  public getBirthYear() {
    return new Date().getFullYear() - this.age;
  }
}
```


Luego puede usar las propiedades y los métodos en el espacio global, fuera de la instancia de la clase:


```ts
class Person {
  constructor(
    public name: string,
    public age: number
  ) {}

  public getBirthYear() {
    return new Date().getFullYear() - this.age;
  }
}

const jon = new Person("Jon", 35);

console.log(jon.name);
console.log(jon.age);
console.log(jon.getBirthYear());
```


Este código imprimiría lo siguiente en la consola:



```sh
Output
Jon
35
1986
```


Tenga en cuenta que puede acceder a todos los miembros de su clase.


## `protected`
