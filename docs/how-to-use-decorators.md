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





