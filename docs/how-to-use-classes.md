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


## Adding Class Properties
