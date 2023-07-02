## Cómo Usar Interfaces en TypeScript

:::info
La fuente original (en ingles) de este tutorial se encuentra [aquí](https://www.digitalocean.com/community/tutorials/how-to-use-interfaces-in-typescript)
:::


## Introducción

[TypeScript](https://www.typescriptlang.org/) es una extensión del lenguaje [JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) que utiliza el tiempo de ejecución de JavaScript con un verificador de tipos en tiempo de compilación.

TypeScript ofrece múltiples formas de representar objetos en su código, una de las cuales es usar interfaces. Las interfaces en TypeScript tienen dos escenarios de uso: puede crear un contrato que deben seguir las clases, como los miembros que esas clases deben implementar, y también puede representar tipos en su aplicación, al igual que la declaración normal `type`. (Para obtener más información sobre `types`, consulte [Cómo Usar Tipos Básicos en TypeScript](./how-to-use-basic-types.html) y [Cómo Crear Tipos Personalizados en TypeScript](./how-to-create-custom-types.html)).

Puede notar que las interfaces y los tipos comparten un conjunto similar de características; de hecho, uno casi siempre puede reemplazar al otro. La principal diferencia es que las interfaces pueden tener más de una declaración para la misma interfaz, que TypeScript fusionará, mientras que los tipos solo se pueden declarar una vez. También puede usar tipos para crear alias de tipos primitivos (como `string` y `boolean`), lo que las interfaces no pueden hacer.

Las interfaces en TypeScript son una forma poderosa de representar estructuras de tipos. Le permiten hacer que el uso de esas estructuras sea seguro para los tipos y documentarlos simultáneamente, mejorando directamente la experiencia del desarrollador.

En este tutorial, creará interfaces en TypeScript, aprenderá a usarlas y comprenderá las diferencias entre los tipos normales y las interfaces. Probarás diferentes ejemplos de código, que puedes seguir en tu propio entorno de TypeScript o en [TypeScript Playground](https://www.typescriptlang.org/play?ts=4.2.2#), un entorno en línea que te permite escribir TypeScript directamente en el navegador.


## Creación y Uso de Interfaces en TypeScript

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

## Extending Other Types
