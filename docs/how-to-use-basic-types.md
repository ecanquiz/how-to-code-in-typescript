# Cómo Usar Tipos Básicos en TypeScript

## Introducción

[TypeScript](https://www.typescriptlang.org/) es una extensión del lenguaje [JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) que utiliza el tiempo de ejecución de JavaScript con un verificador de tipos en tiempo de compilación. Esta combinación permite a los desarrolladores usar el ecosistema completo de JavaScript y las características del lenguaje, al mismo tiempo que agrega verificación de tipos estáticos opcionales, tipos de datos de enumeración, clases e interfaces. Estas funciones brindan al desarrollador la flexibilidad de la naturaleza dinámica de JavaScript, pero también permiten una base de código más confiable, donde la información de tipo se puede usar en tiempo de compilación para detectar posibles problemas que podrían causar errores u otros comportamientos inesperados en tiempo de ejecución.

La información de tipo adicional también proporciona una mejor documentación de las bases de código e [IntelliSense](https://en.wikipedia.org/wiki/Intelligent_code_completion) mejorado (finalización de código, información de parámetros y funciones de asistencia de contenido similares) en los editores de texto. Los compañeros de equipo pueden identificar exactamente qué tipos se esperan para cualquier variable o parámetro de función, sin tener que pasar por la implementación en sí.

Este tutorial analizará la declaración de tipos y todos los tipos básicos utilizados en TypeScript. Lo guiará a través de ejemplos con diferentes ejemplos de código, que puede seguir junto con su propio entorno TypeScript o [TypeScript Playground](https://www.typescriptlang.org/play?ts=4.2.2#), un entorno en línea que le permite escribir TypeScript directamente en el navegador.

## Declarar Tipos de Variables en TypeScript

Al escribir código en JavaScript, que es un lenguaje puramente dinámico, no puede especificar los tipos de datos de las variables. Usted crea las variables y les asigna un valor, pero no especifica un tipo, como se muestra a continuación:

```js
const language = {
  name: "JavaScript"
};

```

En este bloque de código, `language` es un [objeto](https://www.digitalocean.com/community/tutorials/understanding-objects-in-javascript) que contiene un valor de cadena para la propiedad `name`. El tipo de valor para `language` y sus propiedades no se establece explícitamente, y esto podría causar confusión más adelante si los futuros desarrolladores no saben a qué tipo de valor se refiere `language`.

TypeScript tiene como beneficio principal un sistema de tipo estricto. Un lenguaje tipificado _estáticamente_ es aquel en el que el tipo de las variables se conoce en el momento de la compilación. En esta sección, probará la sintaxis utilizada para especificar tipos de variables con TypeScript.

Los tipos son información extra que escribes directamente en tu código. El compilador de TypeScript utiliza esta información adicional para imponer el uso correcto de los diferentes valores según su tipo.

Imagina trabajar con un lenguaje dinámico, como JavaScript, y usar una variable `string` como si fuera un `number`. Cuando no tiene pruebas unitarias `strict`, el posible error solo aparecerá durante el tiempo de ejecución. Si usa el sistema de tipos disponible con TypeScript, el compilador no compilaría el código, dando un error como este:

```sh
Output
The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type. (2363)
```

Para declarar una variable con un cierto tipo en TypeScript, use la siguiente sintaxis:

```ts
declarationKeyword variableName: Type
```

`declareKeyword` sería algo así como `let`, `var` o `const`. Esto sería seguido por el nombre de la variable, dos puntos (`:`) y el tipo de esa variable.

Cualquier código que escriba en TypeScript, de alguna manera, ya está usando el sistema de tipos, incluso si no está especificando ningún tipo. Toma este código como ejemplo:

```ts
let language = 'TypeScript';
```

En TypeScript, esto tiene el mismo significado que el siguiente:

```ts
let language: string = 'TypeScript';
```

En el primer ejemplo, no estableció el tipo de la variable `language` en `string`, pero TypeScript infirió el tipo porque asignó un valor de cadena cuando se declaró. En el segundo ejemplo, está configurando explícitamente el tipo de la variable `language` en `string`.

Si usaste `const` en lugar de `let`, sería lo siguiente:

```ts
const language = 'TypeScript';
```

En este caso, TypeScript usaría el literal de cadena `TypeScript` como el tipo de su variable, como si lo hubiera escrito de esta manera:

```ts
const language: 'TypeScript' = 'TypeScript';
```

TypeScript hace esto porque, cuando usa [`const`](https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript#constants), no va a asignar un nuevo valor a la variable después de la declaración, [ya que esto generaría un error](https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript#difference-between-var,-let,-and-const).

:::info Nota
Si está utilizando un editor compatible con TypeScript, al pasar el cursor sobre las variables se mostrará la información de tipo de cada variable.
:::

Si establece explícitamente el tipo de una variable y luego usa un tipo diferente como su valor, el Compilador de TypeScript (`tsc`) o su editor mostrará el error `2322`. Intente ejecutar lo siguiente:

```ts
const myNumber: number = 'look! this is not a number :)';
```

Esto producirá el siguiente error:

```sh
Output
Type 'string' is not assignable to type 'number'. (2322)
```

Ahora que ha probado a configurar el tipo de una variable en TypeScript, la siguiente sección mostrará todos los tipos básicos admitidos por TypeScript.

## Tipos Básicos Utilizados en TypeScript

TypeScript tiene varios tipos básicos que se utilizan como bloques de construcción al crear tipos más complejos. En las siguientes secciones, examinará la mayoría de estos tipos. Tenga en cuenta que la mayoría de las variables que está creando a lo largo de esta sección podrían omitir su tipo porque TypeScript podría inferirlas, pero está siendo explícito acerca de los tipos con fines de aprendizaje.


## `string`

El tipo `string` se usa para tipos de datos textuales, como cadenas literales o [cadenas de plantillas](https://www.digitalocean.com/community/tutorials/understanding-template-literals-in-javascript).

Pruebe el siguiente código:

```ts
const language: string = 'TypeScript';
const message: string = `I'm programming in ${language}!`;
```

En este bloque de código, tanto `language` como `message` tienen asignado el tipo de `string`. El literal de la plantilla sigue siendo una cadena, aunque se determine dinámicamente.

Dado que las cadenas son comunes en la programación de JavaScript, este es probablemente uno de los tipos que más utilizará.

## `boolean`

El tipo booleano se usa para representar `true` o `false`.

Pruebe el código en el siguiente bloque:

```ts
const hasErrors: boolean = true;
const isValid: boolean = false;
```
Since hasErrors and isValid were declared as booleans, they can only be assigned the values true and false. Note that truthy and falsy values are not converted into their boolean equivalents and will throw an error if used with these variables.

Dado que `hasErrors` e `isValid` se declararon como booleanos, solo se les pueden asignar los valores `true` y `false`. Tenga en cuenta que los valores [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) y [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) no se convierten en sus equivalentes booleanos y arrojarán un error si se usan con estas variables.

## `number`

El tipo `number` se utiliza para representar números [enteros y flotantes](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript#numbers), como se muestra a continuación:

