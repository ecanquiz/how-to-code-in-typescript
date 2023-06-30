# Cómo Usar Decoradores en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-decorators-in-typescript)
:::

## Introducción

[TypeScript](https://www.typescriptlang.org/) es una extensión del lenguaje [JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) que utiliza el tiempo de ejecución de JavaScript con un verificador de tipos en tiempo de compilación. Esta combinación permite a los desarrolladores usar el ecosistema completo de JavaScript y las características del lenguaje, al mismo tiempo que agregan verificación de tipo estático, enumeraciones, clases e interfaces opcionales. Una de esas características adicionales es el soporte para decoradores.

Los decoradores son una forma de decorar miembros de una clase, o una clase en sí misma, con funcionalidad adicional. Cuando aplica un decorador a una clase o a un miembro de clase, en realidad está llamando a una función que recibirá detalles de lo que se está decorando, y la implementación del decorador podrá transformar el código dinámicamente, agregando funcionalidad adicional y reduciendo el código repetitivo. Son una forma de tener metaprogramación en TypeScript, que es una técnica de programación que permite al programador crear código que utiliza otro código de la propia aplicación como datos.

:::tip Nota
Actualmente, hay una [propuesta de etapa 2 que agrega decoradores](https://tc39.es/proposal-decorators/) al estándar ECMAScript. Como aún no es una característica de JavaScript, TypeScript ofrece su propia implementación de decoradores, bajo una bandera experimental.
:::


Este tutorial le mostrará cómo crear sus propios decoradores en TypeScript para clases y miembros de clases, y también cómo usarlos. Lo guiará a través de diferentes ejemplos de código, que puede seguir en su propio entorno de TypeScript o en [TypeScript Playground](https://www.typescriptlang.org/play?ts=4.2.2#), un entorno en línea que le permite escribir TypeScript directamente en el navegador.

## Habilitación del Soporte de Decoradores en TypeScript

Actualmente, los decoradores siguen siendo una función experimental en TypeScript y, como tal, primero se debe habilitar. En esta sección, verá cómo habilitar los decoradores en TypeScript, según la forma en que trabaje con TypeScript.

## CLI del Compilador de TypeScript

Para habilitar la compatibilidad con decoradores cuando se utiliza la CLI del Compilador de TypeScript (`tsc`), el único paso adicional que se necesita es pasar una bandera adicional `--experimentalDecorators`:

```sh
tsc --experimentalDecorators
```

## tsconfig.json

Al trabajar en un proyecto que tiene un archivo `tsconfig.json`, para habilitar los decoradores experimentales debe agregar la propiedad `experimentalDecorators` al objeto `compilerOptions`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

En TypeScript Playground, los decoradores están habilitados de forma predeterminada.

## Usando la Sintaxis del Decorador

En esta sección, aplicará decoradores en clases de TypeScript.

En TypeScript, puede crear decoradores utilizando la sintaxis especial `@expression`, donde `expression` es una función que se llamará automáticamente durante el tiempo de ejecución con detalles sobre el objetivo del decorador.

El objetivo de un decorador depende de dónde lo agregue. Actualmente, los decoradores se pueden agregar a los siguientes componentes de una clase:

- Declaración de clase en sí
- Propiedades
- Accesorios
- Métodos
- Parámetros

Por ejemplo, supongamos que tiene un decorador llamado `sealed` que llama a [`Object.seal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) en una clase. Para usar tu decorador podrías escribir lo siguiente:

```ts{1}
@sealed
class Person {}
```

Observe en el código resaltado que agregó el decorador justo antes del objetivo de su decorador `sealed`, en este caso, la declaración de la clase `Person`.

Lo mismo es válido para todos los demás tipos de decoradores:


```ts
@classDecorator
class Person {
  @propertyDecorator
  public name: string;

  @accessorDecorator
  get fullName() {
    // ...
  }

  @methodDecorator
  printName(@parameterDecorator prefix: string) {
    // ...
  }
}
```

Para agregar varios decoradores, agréguelos juntos, uno tras otro:


```ts
@decoratorA
@decoratorB
class Person {}
```

## Creación de Decoradores de Clase en TypeScript

En esta sección, seguirá los pasos para crear decoradores de clase en TypeScript.

Para un decorador llamado `@decoratorA`, le dice a TypeScript que debe llamar a la función `decoratorA`. Se llamará a la función `decoratorA` con detalles sobre cómo usó el decorador en su código. Por ejemplo, si aplicó el decorador a una declaración de clase, la función recibirá detalles sobre la clase. Esta función debe estar disponible para que su decorador funcione.

Para crear su propio decorador, debe crear una función con el mismo nombre que su decorador. Es decir, para crear el decorador de clase `sealed` que viste en la sección anterior, debes crear una función `sealed` que reciba un conjunto específico de parámetros. Hagamos exactamente eso:


```ts
@sealed
class Person {}

function sealed(target: Function) {
  Object.seal(target);
  Object.seal(target.prototype);
}
```

Los parámetros pasados al decorador dependerán de dónde se utilizará el decorador. El primer parámetro se denomina comúnmente `target`.

El decorador `sealed` se usará solo en declaraciones de clase, por lo que su función recibirá un solo parámetro, el `target`, que será de tipo `Function`. Este será el constructor de la clase a la que se aplicó el decorador.

En la función `sealed`, llama a `Object.seal` sobre el `target`, que es el constructor de la clase, y también sobre su prototipo. Cuando lo haga, no se pueden agregar nuevas propiedades al constructor de clase o su propiedad, y las existentes se marcarán como no configurables.

Es importante recordar que actualmente no es posible extender el tipo TypeScript del `target` cuando se usan decoradores. Esto significa, por ejemplo, que no puede agregar un nuevo campo a una clase usando un decorador y hacerlo con seguridad de tipos.

Si devolvió un valor en el decorador de clase `sealed`, este valor se convertirá en la nueva función constructora de la clase. Esto es útil si desea sobrescribir completamente el constructor de clases.

Ha creado su primer decorador y lo ha utilizado con una clase. En la siguiente sección aprenderá a crear fábricas de decoradores.

## Creating Decorator Factories

