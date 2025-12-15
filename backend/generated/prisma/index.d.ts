
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Farm
 * 
 */
export type Farm = $Result.DefaultSelection<Prisma.$FarmPayload>
/**
 * Model CropCycle
 * 
 */
export type CropCycle = $Result.DefaultSelection<Prisma.$CropCyclePayload>
/**
 * Model Crops
 * 
 */
export type Crops = $Result.DefaultSelection<Prisma.$CropsPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Advice
 * 
 */
export type Advice = $Result.DefaultSelection<Prisma.$AdvicePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.farm`: Exposes CRUD operations for the **Farm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farms
    * const farms = await prisma.farm.findMany()
    * ```
    */
  get farm(): Prisma.FarmDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cropCycle`: Exposes CRUD operations for the **CropCycle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CropCycles
    * const cropCycles = await prisma.cropCycle.findMany()
    * ```
    */
  get cropCycle(): Prisma.CropCycleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.crops`: Exposes CRUD operations for the **Crops** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Crops
    * const crops = await prisma.crops.findMany()
    * ```
    */
  get crops(): Prisma.CropsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.advice`: Exposes CRUD operations for the **Advice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Advice
    * const advice = await prisma.advice.findMany()
    * ```
    */
  get advice(): Prisma.AdviceDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.1
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Farm: 'Farm',
    CropCycle: 'CropCycle',
    Crops: 'Crops',
    Task: 'Task',
    Advice: 'Advice'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "farm" | "cropCycle" | "crops" | "task" | "advice"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Farm: {
        payload: Prisma.$FarmPayload<ExtArgs>
        fields: Prisma.FarmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findFirst: {
            args: Prisma.FarmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findMany: {
            args: Prisma.FarmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          create: {
            args: Prisma.FarmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          createMany: {
            args: Prisma.FarmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          delete: {
            args: Prisma.FarmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          update: {
            args: Prisma.FarmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          deleteMany: {
            args: Prisma.FarmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FarmUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          upsert: {
            args: Prisma.FarmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          aggregate: {
            args: Prisma.FarmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarm>
          }
          groupBy: {
            args: Prisma.FarmGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmCountArgs<ExtArgs>
            result: $Utils.Optional<FarmCountAggregateOutputType> | number
          }
        }
      }
      CropCycle: {
        payload: Prisma.$CropCyclePayload<ExtArgs>
        fields: Prisma.CropCycleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CropCycleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CropCycleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload>
          }
          findFirst: {
            args: Prisma.CropCycleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CropCycleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload>
          }
          findMany: {
            args: Prisma.CropCycleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload>[]
          }
          create: {
            args: Prisma.CropCycleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload>
          }
          createMany: {
            args: Prisma.CropCycleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CropCycleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload>[]
          }
          delete: {
            args: Prisma.CropCycleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload>
          }
          update: {
            args: Prisma.CropCycleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload>
          }
          deleteMany: {
            args: Prisma.CropCycleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CropCycleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CropCycleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload>[]
          }
          upsert: {
            args: Prisma.CropCycleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropCyclePayload>
          }
          aggregate: {
            args: Prisma.CropCycleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCropCycle>
          }
          groupBy: {
            args: Prisma.CropCycleGroupByArgs<ExtArgs>
            result: $Utils.Optional<CropCycleGroupByOutputType>[]
          }
          count: {
            args: Prisma.CropCycleCountArgs<ExtArgs>
            result: $Utils.Optional<CropCycleCountAggregateOutputType> | number
          }
        }
      }
      Crops: {
        payload: Prisma.$CropsPayload<ExtArgs>
        fields: Prisma.CropsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CropsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CropsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload>
          }
          findFirst: {
            args: Prisma.CropsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CropsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload>
          }
          findMany: {
            args: Prisma.CropsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload>[]
          }
          create: {
            args: Prisma.CropsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload>
          }
          createMany: {
            args: Prisma.CropsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CropsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload>[]
          }
          delete: {
            args: Prisma.CropsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload>
          }
          update: {
            args: Prisma.CropsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload>
          }
          deleteMany: {
            args: Prisma.CropsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CropsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CropsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload>[]
          }
          upsert: {
            args: Prisma.CropsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropsPayload>
          }
          aggregate: {
            args: Prisma.CropsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCrops>
          }
          groupBy: {
            args: Prisma.CropsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CropsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CropsCountArgs<ExtArgs>
            result: $Utils.Optional<CropsCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Advice: {
        payload: Prisma.$AdvicePayload<ExtArgs>
        fields: Prisma.AdviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload>
          }
          findFirst: {
            args: Prisma.AdviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload>
          }
          findMany: {
            args: Prisma.AdviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload>[]
          }
          create: {
            args: Prisma.AdviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload>
          }
          createMany: {
            args: Prisma.AdviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload>[]
          }
          delete: {
            args: Prisma.AdviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload>
          }
          update: {
            args: Prisma.AdviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload>
          }
          deleteMany: {
            args: Prisma.AdviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload>[]
          }
          upsert: {
            args: Prisma.AdviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvicePayload>
          }
          aggregate: {
            args: Prisma.AdviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdvice>
          }
          groupBy: {
            args: Prisma.AdviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdviceCountArgs<ExtArgs>
            result: $Utils.Optional<AdviceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    farm?: FarmOmit
    cropCycle?: CropCycleOmit
    crops?: CropsOmit
    task?: TaskOmit
    advice?: AdviceOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    advice: number
    farms: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advice?: boolean | UserCountOutputTypeCountAdviceArgs
    farms?: boolean | UserCountOutputTypeCountFarmsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAdviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdviceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFarmsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
  }


  /**
   * Count Type FarmCountOutputType
   */

  export type FarmCountOutputType = {
    cropCycles: number
  }

  export type FarmCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cropCycles?: boolean | FarmCountOutputTypeCountCropCyclesArgs
  }

  // Custom InputTypes
  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmCountOutputType
     */
    select?: FarmCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountCropCyclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CropCycleWhereInput
  }


  /**
   * Count Type CropCycleCountOutputType
   */

  export type CropCycleCountOutputType = {
    tasks: number
  }

  export type CropCycleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | CropCycleCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * CropCycleCountOutputType without action
   */
  export type CropCycleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycleCountOutputType
     */
    select?: CropCycleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CropCycleCountOutputType without action
   */
  export type CropCycleCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    location: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    location: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    location: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    location?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    location?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    location?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: string
    location: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    location?: boolean
    advice?: boolean | User$adviceArgs<ExtArgs>
    farms?: boolean | User$farmsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    location?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    location?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    location?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "location", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advice?: boolean | User$adviceArgs<ExtArgs>
    farms?: boolean | User$farmsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      advice: Prisma.$AdvicePayload<ExtArgs>[]
      farms: Prisma.$FarmPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: string
      location: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    advice<T extends User$adviceArgs<ExtArgs> = {}>(args?: Subset<T, User$adviceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    farms<T extends User$farmsArgs<ExtArgs> = {}>(args?: Subset<T, User$farmsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly location: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.advice
   */
  export type User$adviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    where?: AdviceWhereInput
    orderBy?: AdviceOrderByWithRelationInput | AdviceOrderByWithRelationInput[]
    cursor?: AdviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdviceScalarFieldEnum | AdviceScalarFieldEnum[]
  }

  /**
   * User.farms
   */
  export type User$farmsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    cursor?: FarmWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Farm
   */

  export type AggregateFarm = {
    _count: FarmCountAggregateOutputType | null
    _avg: FarmAvgAggregateOutputType | null
    _sum: FarmSumAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  export type FarmAvgAggregateOutputType = {
    size: number | null
  }

  export type FarmSumAggregateOutputType = {
    size: number | null
  }

  export type FarmMinAggregateOutputType = {
    id: string | null
    name: string | null
    size: number | null
    unit: string | null
    type: string | null
    location: string | null
    notes: string | null
    ownerId: string | null
    cropType: string | null
    createdAt: Date | null
  }

  export type FarmMaxAggregateOutputType = {
    id: string | null
    name: string | null
    size: number | null
    unit: string | null
    type: string | null
    location: string | null
    notes: string | null
    ownerId: string | null
    cropType: string | null
    createdAt: Date | null
  }

  export type FarmCountAggregateOutputType = {
    id: number
    name: number
    size: number
    unit: number
    type: number
    location: number
    crops: number
    notes: number
    ownerId: number
    cropType: number
    createdAt: number
    _all: number
  }


  export type FarmAvgAggregateInputType = {
    size?: true
  }

  export type FarmSumAggregateInputType = {
    size?: true
  }

  export type FarmMinAggregateInputType = {
    id?: true
    name?: true
    size?: true
    unit?: true
    type?: true
    location?: true
    notes?: true
    ownerId?: true
    cropType?: true
    createdAt?: true
  }

  export type FarmMaxAggregateInputType = {
    id?: true
    name?: true
    size?: true
    unit?: true
    type?: true
    location?: true
    notes?: true
    ownerId?: true
    cropType?: true
    createdAt?: true
  }

  export type FarmCountAggregateInputType = {
    id?: true
    name?: true
    size?: true
    unit?: true
    type?: true
    location?: true
    crops?: true
    notes?: true
    ownerId?: true
    cropType?: true
    createdAt?: true
    _all?: true
  }

  export type FarmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farm to aggregate.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farms
    **/
    _count?: true | FarmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FarmAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FarmSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmMaxAggregateInputType
  }

  export type GetFarmAggregateType<T extends FarmAggregateArgs> = {
        [P in keyof T & keyof AggregateFarm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarm[P]>
      : GetScalarType<T[P], AggregateFarm[P]>
  }




  export type FarmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithAggregationInput | FarmOrderByWithAggregationInput[]
    by: FarmScalarFieldEnum[] | FarmScalarFieldEnum
    having?: FarmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmCountAggregateInputType | true
    _avg?: FarmAvgAggregateInputType
    _sum?: FarmSumAggregateInputType
    _min?: FarmMinAggregateInputType
    _max?: FarmMaxAggregateInputType
  }

  export type FarmGroupByOutputType = {
    id: string
    name: string
    size: number | null
    unit: string | null
    type: string | null
    location: string
    crops: JsonValue | null
    notes: string | null
    ownerId: string
    cropType: string | null
    createdAt: Date
    _count: FarmCountAggregateOutputType | null
    _avg: FarmAvgAggregateOutputType | null
    _sum: FarmSumAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  type GetFarmGroupByPayload<T extends FarmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmGroupByOutputType[P]>
            : GetScalarType<T[P], FarmGroupByOutputType[P]>
        }
      >
    >


  export type FarmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    unit?: boolean
    type?: boolean
    location?: boolean
    crops?: boolean
    notes?: boolean
    ownerId?: boolean
    cropType?: boolean
    createdAt?: boolean
    cropCycles?: boolean | Farm$cropCyclesArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    unit?: boolean
    type?: boolean
    location?: boolean
    crops?: boolean
    notes?: boolean
    ownerId?: boolean
    cropType?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    unit?: boolean
    type?: boolean
    location?: boolean
    crops?: boolean
    notes?: boolean
    ownerId?: boolean
    cropType?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectScalar = {
    id?: boolean
    name?: boolean
    size?: boolean
    unit?: boolean
    type?: boolean
    location?: boolean
    crops?: boolean
    notes?: boolean
    ownerId?: boolean
    cropType?: boolean
    createdAt?: boolean
  }

  export type FarmOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "size" | "unit" | "type" | "location" | "crops" | "notes" | "ownerId" | "cropType" | "createdAt", ExtArgs["result"]["farm"]>
  export type FarmInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cropCycles?: boolean | Farm$cropCyclesArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FarmIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FarmIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FarmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Farm"
    objects: {
      cropCycles: Prisma.$CropCyclePayload<ExtArgs>[]
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      size: number | null
      unit: string | null
      type: string | null
      location: string
      crops: Prisma.JsonValue | null
      notes: string | null
      ownerId: string
      cropType: string | null
      createdAt: Date
    }, ExtArgs["result"]["farm"]>
    composites: {}
  }

  type FarmGetPayload<S extends boolean | null | undefined | FarmDefaultArgs> = $Result.GetResult<Prisma.$FarmPayload, S>

  type FarmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FarmFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FarmCountAggregateInputType | true
    }

  export interface FarmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Farm'], meta: { name: 'Farm' } }
    /**
     * Find zero or one Farm that matches the filter.
     * @param {FarmFindUniqueArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmFindUniqueArgs>(args: SelectSubset<T, FarmFindUniqueArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Farm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FarmFindUniqueOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmFindFirstArgs>(args?: SelectSubset<T, FarmFindFirstArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Farms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farms
     * const farms = await prisma.farm.findMany()
     * 
     * // Get first 10 Farms
     * const farms = await prisma.farm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmWithIdOnly = await prisma.farm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmFindManyArgs>(args?: SelectSubset<T, FarmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Farm.
     * @param {FarmCreateArgs} args - Arguments to create a Farm.
     * @example
     * // Create one Farm
     * const Farm = await prisma.farm.create({
     *   data: {
     *     // ... data to create a Farm
     *   }
     * })
     * 
     */
    create<T extends FarmCreateArgs>(args: SelectSubset<T, FarmCreateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Farms.
     * @param {FarmCreateManyArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmCreateManyArgs>(args?: SelectSubset<T, FarmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Farms and returns the data saved in the database.
     * @param {FarmCreateManyAndReturnArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Farms and only return the `id`
     * const farmWithIdOnly = await prisma.farm.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Farm.
     * @param {FarmDeleteArgs} args - Arguments to delete one Farm.
     * @example
     * // Delete one Farm
     * const Farm = await prisma.farm.delete({
     *   where: {
     *     // ... filter to delete one Farm
     *   }
     * })
     * 
     */
    delete<T extends FarmDeleteArgs>(args: SelectSubset<T, FarmDeleteArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Farm.
     * @param {FarmUpdateArgs} args - Arguments to update one Farm.
     * @example
     * // Update one Farm
     * const farm = await prisma.farm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmUpdateArgs>(args: SelectSubset<T, FarmUpdateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Farms.
     * @param {FarmDeleteManyArgs} args - Arguments to filter Farms to delete.
     * @example
     * // Delete a few Farms
     * const { count } = await prisma.farm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmDeleteManyArgs>(args?: SelectSubset<T, FarmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmUpdateManyArgs>(args: SelectSubset<T, FarmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms and returns the data updated in the database.
     * @param {FarmUpdateManyAndReturnArgs} args - Arguments to update many Farms.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Farms and only return the `id`
     * const farmWithIdOnly = await prisma.farm.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FarmUpdateManyAndReturnArgs>(args: SelectSubset<T, FarmUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Farm.
     * @param {FarmUpsertArgs} args - Arguments to update or create a Farm.
     * @example
     * // Update or create a Farm
     * const farm = await prisma.farm.upsert({
     *   create: {
     *     // ... data to create a Farm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farm we want to update
     *   }
     * })
     */
    upsert<T extends FarmUpsertArgs>(args: SelectSubset<T, FarmUpsertArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmCountArgs} args - Arguments to filter Farms to count.
     * @example
     * // Count the number of Farms
     * const count = await prisma.farm.count({
     *   where: {
     *     // ... the filter for the Farms we want to count
     *   }
     * })
    **/
    count<T extends FarmCountArgs>(
      args?: Subset<T, FarmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FarmAggregateArgs>(args: Subset<T, FarmAggregateArgs>): Prisma.PrismaPromise<GetFarmAggregateType<T>>

    /**
     * Group by Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FarmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmGroupByArgs['orderBy'] }
        : { orderBy?: FarmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FarmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Farm model
   */
  readonly fields: FarmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Farm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cropCycles<T extends Farm$cropCyclesArgs<ExtArgs> = {}>(args?: Subset<T, Farm$cropCyclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Farm model
   */
  interface FarmFieldRefs {
    readonly id: FieldRef<"Farm", 'String'>
    readonly name: FieldRef<"Farm", 'String'>
    readonly size: FieldRef<"Farm", 'Float'>
    readonly unit: FieldRef<"Farm", 'String'>
    readonly type: FieldRef<"Farm", 'String'>
    readonly location: FieldRef<"Farm", 'String'>
    readonly crops: FieldRef<"Farm", 'Json'>
    readonly notes: FieldRef<"Farm", 'String'>
    readonly ownerId: FieldRef<"Farm", 'String'>
    readonly cropType: FieldRef<"Farm", 'String'>
    readonly createdAt: FieldRef<"Farm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Farm findUnique
   */
  export type FarmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findUniqueOrThrow
   */
  export type FarmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findFirst
   */
  export type FarmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findFirstOrThrow
   */
  export type FarmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findMany
   */
  export type FarmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farms to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm create
   */
  export type FarmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to create a Farm.
     */
    data: XOR<FarmCreateInput, FarmUncheckedCreateInput>
  }

  /**
   * Farm createMany
   */
  export type FarmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farm createManyAndReturn
   */
  export type FarmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Farm update
   */
  export type FarmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to update a Farm.
     */
    data: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
    /**
     * Choose, which Farm to update.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm updateMany
   */
  export type FarmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to update.
     */
    limit?: number
  }

  /**
   * Farm updateManyAndReturn
   */
  export type FarmUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Farm upsert
   */
  export type FarmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The filter to search for the Farm to update in case it exists.
     */
    where: FarmWhereUniqueInput
    /**
     * In case the Farm found by the `where` argument doesn't exist, create a new Farm with this data.
     */
    create: XOR<FarmCreateInput, FarmUncheckedCreateInput>
    /**
     * In case the Farm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
  }

  /**
   * Farm delete
   */
  export type FarmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter which Farm to delete.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm deleteMany
   */
  export type FarmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farms to delete
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to delete.
     */
    limit?: number
  }

  /**
   * Farm.cropCycles
   */
  export type Farm$cropCyclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    where?: CropCycleWhereInput
    orderBy?: CropCycleOrderByWithRelationInput | CropCycleOrderByWithRelationInput[]
    cursor?: CropCycleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CropCycleScalarFieldEnum | CropCycleScalarFieldEnum[]
  }

  /**
   * Farm without action
   */
  export type FarmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
  }


  /**
   * Model CropCycle
   */

  export type AggregateCropCycle = {
    _count: CropCycleCountAggregateOutputType | null
    _min: CropCycleMinAggregateOutputType | null
    _max: CropCycleMaxAggregateOutputType | null
  }

  export type CropCycleMinAggregateOutputType = {
    id: string | null
    cropName: string | null
    plantingDate: Date | null
    harvestDate: Date | null
    status: string | null
    farmId: string | null
  }

  export type CropCycleMaxAggregateOutputType = {
    id: string | null
    cropName: string | null
    plantingDate: Date | null
    harvestDate: Date | null
    status: string | null
    farmId: string | null
  }

  export type CropCycleCountAggregateOutputType = {
    id: number
    cropName: number
    plantingDate: number
    harvestDate: number
    status: number
    farmId: number
    _all: number
  }


  export type CropCycleMinAggregateInputType = {
    id?: true
    cropName?: true
    plantingDate?: true
    harvestDate?: true
    status?: true
    farmId?: true
  }

  export type CropCycleMaxAggregateInputType = {
    id?: true
    cropName?: true
    plantingDate?: true
    harvestDate?: true
    status?: true
    farmId?: true
  }

  export type CropCycleCountAggregateInputType = {
    id?: true
    cropName?: true
    plantingDate?: true
    harvestDate?: true
    status?: true
    farmId?: true
    _all?: true
  }

  export type CropCycleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CropCycle to aggregate.
     */
    where?: CropCycleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CropCycles to fetch.
     */
    orderBy?: CropCycleOrderByWithRelationInput | CropCycleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CropCycleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CropCycles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CropCycles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CropCycles
    **/
    _count?: true | CropCycleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CropCycleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CropCycleMaxAggregateInputType
  }

  export type GetCropCycleAggregateType<T extends CropCycleAggregateArgs> = {
        [P in keyof T & keyof AggregateCropCycle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCropCycle[P]>
      : GetScalarType<T[P], AggregateCropCycle[P]>
  }




  export type CropCycleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CropCycleWhereInput
    orderBy?: CropCycleOrderByWithAggregationInput | CropCycleOrderByWithAggregationInput[]
    by: CropCycleScalarFieldEnum[] | CropCycleScalarFieldEnum
    having?: CropCycleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CropCycleCountAggregateInputType | true
    _min?: CropCycleMinAggregateInputType
    _max?: CropCycleMaxAggregateInputType
  }

  export type CropCycleGroupByOutputType = {
    id: string
    cropName: string
    plantingDate: Date
    harvestDate: Date | null
    status: string
    farmId: string
    _count: CropCycleCountAggregateOutputType | null
    _min: CropCycleMinAggregateOutputType | null
    _max: CropCycleMaxAggregateOutputType | null
  }

  type GetCropCycleGroupByPayload<T extends CropCycleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CropCycleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CropCycleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CropCycleGroupByOutputType[P]>
            : GetScalarType<T[P], CropCycleGroupByOutputType[P]>
        }
      >
    >


  export type CropCycleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cropName?: boolean
    plantingDate?: boolean
    harvestDate?: boolean
    status?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    tasks?: boolean | CropCycle$tasksArgs<ExtArgs>
    _count?: boolean | CropCycleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cropCycle"]>

  export type CropCycleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cropName?: boolean
    plantingDate?: boolean
    harvestDate?: boolean
    status?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cropCycle"]>

  export type CropCycleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cropName?: boolean
    plantingDate?: boolean
    harvestDate?: boolean
    status?: boolean
    farmId?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cropCycle"]>

  export type CropCycleSelectScalar = {
    id?: boolean
    cropName?: boolean
    plantingDate?: boolean
    harvestDate?: boolean
    status?: boolean
    farmId?: boolean
  }

  export type CropCycleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cropName" | "plantingDate" | "harvestDate" | "status" | "farmId", ExtArgs["result"]["cropCycle"]>
  export type CropCycleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    tasks?: boolean | CropCycle$tasksArgs<ExtArgs>
    _count?: boolean | CropCycleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CropCycleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }
  export type CropCycleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $CropCyclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CropCycle"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cropName: string
      plantingDate: Date
      harvestDate: Date | null
      status: string
      farmId: string
    }, ExtArgs["result"]["cropCycle"]>
    composites: {}
  }

  type CropCycleGetPayload<S extends boolean | null | undefined | CropCycleDefaultArgs> = $Result.GetResult<Prisma.$CropCyclePayload, S>

  type CropCycleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CropCycleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CropCycleCountAggregateInputType | true
    }

  export interface CropCycleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CropCycle'], meta: { name: 'CropCycle' } }
    /**
     * Find zero or one CropCycle that matches the filter.
     * @param {CropCycleFindUniqueArgs} args - Arguments to find a CropCycle
     * @example
     * // Get one CropCycle
     * const cropCycle = await prisma.cropCycle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CropCycleFindUniqueArgs>(args: SelectSubset<T, CropCycleFindUniqueArgs<ExtArgs>>): Prisma__CropCycleClient<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CropCycle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CropCycleFindUniqueOrThrowArgs} args - Arguments to find a CropCycle
     * @example
     * // Get one CropCycle
     * const cropCycle = await prisma.cropCycle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CropCycleFindUniqueOrThrowArgs>(args: SelectSubset<T, CropCycleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CropCycleClient<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CropCycle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropCycleFindFirstArgs} args - Arguments to find a CropCycle
     * @example
     * // Get one CropCycle
     * const cropCycle = await prisma.cropCycle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CropCycleFindFirstArgs>(args?: SelectSubset<T, CropCycleFindFirstArgs<ExtArgs>>): Prisma__CropCycleClient<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CropCycle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropCycleFindFirstOrThrowArgs} args - Arguments to find a CropCycle
     * @example
     * // Get one CropCycle
     * const cropCycle = await prisma.cropCycle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CropCycleFindFirstOrThrowArgs>(args?: SelectSubset<T, CropCycleFindFirstOrThrowArgs<ExtArgs>>): Prisma__CropCycleClient<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CropCycles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropCycleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CropCycles
     * const cropCycles = await prisma.cropCycle.findMany()
     * 
     * // Get first 10 CropCycles
     * const cropCycles = await prisma.cropCycle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cropCycleWithIdOnly = await prisma.cropCycle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CropCycleFindManyArgs>(args?: SelectSubset<T, CropCycleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CropCycle.
     * @param {CropCycleCreateArgs} args - Arguments to create a CropCycle.
     * @example
     * // Create one CropCycle
     * const CropCycle = await prisma.cropCycle.create({
     *   data: {
     *     // ... data to create a CropCycle
     *   }
     * })
     * 
     */
    create<T extends CropCycleCreateArgs>(args: SelectSubset<T, CropCycleCreateArgs<ExtArgs>>): Prisma__CropCycleClient<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CropCycles.
     * @param {CropCycleCreateManyArgs} args - Arguments to create many CropCycles.
     * @example
     * // Create many CropCycles
     * const cropCycle = await prisma.cropCycle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CropCycleCreateManyArgs>(args?: SelectSubset<T, CropCycleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CropCycles and returns the data saved in the database.
     * @param {CropCycleCreateManyAndReturnArgs} args - Arguments to create many CropCycles.
     * @example
     * // Create many CropCycles
     * const cropCycle = await prisma.cropCycle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CropCycles and only return the `id`
     * const cropCycleWithIdOnly = await prisma.cropCycle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CropCycleCreateManyAndReturnArgs>(args?: SelectSubset<T, CropCycleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CropCycle.
     * @param {CropCycleDeleteArgs} args - Arguments to delete one CropCycle.
     * @example
     * // Delete one CropCycle
     * const CropCycle = await prisma.cropCycle.delete({
     *   where: {
     *     // ... filter to delete one CropCycle
     *   }
     * })
     * 
     */
    delete<T extends CropCycleDeleteArgs>(args: SelectSubset<T, CropCycleDeleteArgs<ExtArgs>>): Prisma__CropCycleClient<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CropCycle.
     * @param {CropCycleUpdateArgs} args - Arguments to update one CropCycle.
     * @example
     * // Update one CropCycle
     * const cropCycle = await prisma.cropCycle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CropCycleUpdateArgs>(args: SelectSubset<T, CropCycleUpdateArgs<ExtArgs>>): Prisma__CropCycleClient<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CropCycles.
     * @param {CropCycleDeleteManyArgs} args - Arguments to filter CropCycles to delete.
     * @example
     * // Delete a few CropCycles
     * const { count } = await prisma.cropCycle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CropCycleDeleteManyArgs>(args?: SelectSubset<T, CropCycleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CropCycles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropCycleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CropCycles
     * const cropCycle = await prisma.cropCycle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CropCycleUpdateManyArgs>(args: SelectSubset<T, CropCycleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CropCycles and returns the data updated in the database.
     * @param {CropCycleUpdateManyAndReturnArgs} args - Arguments to update many CropCycles.
     * @example
     * // Update many CropCycles
     * const cropCycle = await prisma.cropCycle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CropCycles and only return the `id`
     * const cropCycleWithIdOnly = await prisma.cropCycle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CropCycleUpdateManyAndReturnArgs>(args: SelectSubset<T, CropCycleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CropCycle.
     * @param {CropCycleUpsertArgs} args - Arguments to update or create a CropCycle.
     * @example
     * // Update or create a CropCycle
     * const cropCycle = await prisma.cropCycle.upsert({
     *   create: {
     *     // ... data to create a CropCycle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CropCycle we want to update
     *   }
     * })
     */
    upsert<T extends CropCycleUpsertArgs>(args: SelectSubset<T, CropCycleUpsertArgs<ExtArgs>>): Prisma__CropCycleClient<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CropCycles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropCycleCountArgs} args - Arguments to filter CropCycles to count.
     * @example
     * // Count the number of CropCycles
     * const count = await prisma.cropCycle.count({
     *   where: {
     *     // ... the filter for the CropCycles we want to count
     *   }
     * })
    **/
    count<T extends CropCycleCountArgs>(
      args?: Subset<T, CropCycleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CropCycleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CropCycle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropCycleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CropCycleAggregateArgs>(args: Subset<T, CropCycleAggregateArgs>): Prisma.PrismaPromise<GetCropCycleAggregateType<T>>

    /**
     * Group by CropCycle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropCycleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CropCycleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CropCycleGroupByArgs['orderBy'] }
        : { orderBy?: CropCycleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CropCycleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCropCycleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CropCycle model
   */
  readonly fields: CropCycleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CropCycle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CropCycleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends CropCycle$tasksArgs<ExtArgs> = {}>(args?: Subset<T, CropCycle$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CropCycle model
   */
  interface CropCycleFieldRefs {
    readonly id: FieldRef<"CropCycle", 'String'>
    readonly cropName: FieldRef<"CropCycle", 'String'>
    readonly plantingDate: FieldRef<"CropCycle", 'DateTime'>
    readonly harvestDate: FieldRef<"CropCycle", 'DateTime'>
    readonly status: FieldRef<"CropCycle", 'String'>
    readonly farmId: FieldRef<"CropCycle", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CropCycle findUnique
   */
  export type CropCycleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    /**
     * Filter, which CropCycle to fetch.
     */
    where: CropCycleWhereUniqueInput
  }

  /**
   * CropCycle findUniqueOrThrow
   */
  export type CropCycleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    /**
     * Filter, which CropCycle to fetch.
     */
    where: CropCycleWhereUniqueInput
  }

  /**
   * CropCycle findFirst
   */
  export type CropCycleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    /**
     * Filter, which CropCycle to fetch.
     */
    where?: CropCycleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CropCycles to fetch.
     */
    orderBy?: CropCycleOrderByWithRelationInput | CropCycleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CropCycles.
     */
    cursor?: CropCycleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CropCycles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CropCycles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CropCycles.
     */
    distinct?: CropCycleScalarFieldEnum | CropCycleScalarFieldEnum[]
  }

  /**
   * CropCycle findFirstOrThrow
   */
  export type CropCycleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    /**
     * Filter, which CropCycle to fetch.
     */
    where?: CropCycleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CropCycles to fetch.
     */
    orderBy?: CropCycleOrderByWithRelationInput | CropCycleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CropCycles.
     */
    cursor?: CropCycleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CropCycles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CropCycles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CropCycles.
     */
    distinct?: CropCycleScalarFieldEnum | CropCycleScalarFieldEnum[]
  }

  /**
   * CropCycle findMany
   */
  export type CropCycleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    /**
     * Filter, which CropCycles to fetch.
     */
    where?: CropCycleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CropCycles to fetch.
     */
    orderBy?: CropCycleOrderByWithRelationInput | CropCycleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CropCycles.
     */
    cursor?: CropCycleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CropCycles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CropCycles.
     */
    skip?: number
    distinct?: CropCycleScalarFieldEnum | CropCycleScalarFieldEnum[]
  }

  /**
   * CropCycle create
   */
  export type CropCycleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    /**
     * The data needed to create a CropCycle.
     */
    data: XOR<CropCycleCreateInput, CropCycleUncheckedCreateInput>
  }

  /**
   * CropCycle createMany
   */
  export type CropCycleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CropCycles.
     */
    data: CropCycleCreateManyInput | CropCycleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CropCycle createManyAndReturn
   */
  export type CropCycleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * The data used to create many CropCycles.
     */
    data: CropCycleCreateManyInput | CropCycleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CropCycle update
   */
  export type CropCycleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    /**
     * The data needed to update a CropCycle.
     */
    data: XOR<CropCycleUpdateInput, CropCycleUncheckedUpdateInput>
    /**
     * Choose, which CropCycle to update.
     */
    where: CropCycleWhereUniqueInput
  }

  /**
   * CropCycle updateMany
   */
  export type CropCycleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CropCycles.
     */
    data: XOR<CropCycleUpdateManyMutationInput, CropCycleUncheckedUpdateManyInput>
    /**
     * Filter which CropCycles to update
     */
    where?: CropCycleWhereInput
    /**
     * Limit how many CropCycles to update.
     */
    limit?: number
  }

  /**
   * CropCycle updateManyAndReturn
   */
  export type CropCycleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * The data used to update CropCycles.
     */
    data: XOR<CropCycleUpdateManyMutationInput, CropCycleUncheckedUpdateManyInput>
    /**
     * Filter which CropCycles to update
     */
    where?: CropCycleWhereInput
    /**
     * Limit how many CropCycles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CropCycle upsert
   */
  export type CropCycleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    /**
     * The filter to search for the CropCycle to update in case it exists.
     */
    where: CropCycleWhereUniqueInput
    /**
     * In case the CropCycle found by the `where` argument doesn't exist, create a new CropCycle with this data.
     */
    create: XOR<CropCycleCreateInput, CropCycleUncheckedCreateInput>
    /**
     * In case the CropCycle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CropCycleUpdateInput, CropCycleUncheckedUpdateInput>
  }

  /**
   * CropCycle delete
   */
  export type CropCycleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
    /**
     * Filter which CropCycle to delete.
     */
    where: CropCycleWhereUniqueInput
  }

  /**
   * CropCycle deleteMany
   */
  export type CropCycleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CropCycles to delete
     */
    where?: CropCycleWhereInput
    /**
     * Limit how many CropCycles to delete.
     */
    limit?: number
  }

  /**
   * CropCycle.tasks
   */
  export type CropCycle$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * CropCycle without action
   */
  export type CropCycleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropCycle
     */
    select?: CropCycleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropCycle
     */
    omit?: CropCycleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropCycleInclude<ExtArgs> | null
  }


  /**
   * Model Crops
   */

  export type AggregateCrops = {
    _count: CropsCountAggregateOutputType | null
    _avg: CropsAvgAggregateOutputType | null
    _sum: CropsSumAggregateOutputType | null
    _min: CropsMinAggregateOutputType | null
    _max: CropsMaxAggregateOutputType | null
  }

  export type CropsAvgAggregateOutputType = {
    id: number | null
  }

  export type CropsSumAggregateOutputType = {
    id: number | null
  }

  export type CropsMinAggregateOutputType = {
    id: number | null
    cropName: string | null
    cropType: string | null
    region: string | null
    createdAt: Date | null
  }

  export type CropsMaxAggregateOutputType = {
    id: number | null
    cropName: string | null
    cropType: string | null
    region: string | null
    createdAt: Date | null
  }

  export type CropsCountAggregateOutputType = {
    id: number
    cropName: number
    cropType: number
    region: number
    growthData: number
    createdAt: number
    _all: number
  }


  export type CropsAvgAggregateInputType = {
    id?: true
  }

  export type CropsSumAggregateInputType = {
    id?: true
  }

  export type CropsMinAggregateInputType = {
    id?: true
    cropName?: true
    cropType?: true
    region?: true
    createdAt?: true
  }

  export type CropsMaxAggregateInputType = {
    id?: true
    cropName?: true
    cropType?: true
    region?: true
    createdAt?: true
  }

  export type CropsCountAggregateInputType = {
    id?: true
    cropName?: true
    cropType?: true
    region?: true
    growthData?: true
    createdAt?: true
    _all?: true
  }

  export type CropsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Crops to aggregate.
     */
    where?: CropsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crops to fetch.
     */
    orderBy?: CropsOrderByWithRelationInput | CropsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CropsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Crops
    **/
    _count?: true | CropsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CropsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CropsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CropsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CropsMaxAggregateInputType
  }

  export type GetCropsAggregateType<T extends CropsAggregateArgs> = {
        [P in keyof T & keyof AggregateCrops]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrops[P]>
      : GetScalarType<T[P], AggregateCrops[P]>
  }




  export type CropsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CropsWhereInput
    orderBy?: CropsOrderByWithAggregationInput | CropsOrderByWithAggregationInput[]
    by: CropsScalarFieldEnum[] | CropsScalarFieldEnum
    having?: CropsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CropsCountAggregateInputType | true
    _avg?: CropsAvgAggregateInputType
    _sum?: CropsSumAggregateInputType
    _min?: CropsMinAggregateInputType
    _max?: CropsMaxAggregateInputType
  }

  export type CropsGroupByOutputType = {
    id: number
    cropName: string
    cropType: string
    region: string
    growthData: JsonValue
    createdAt: Date
    _count: CropsCountAggregateOutputType | null
    _avg: CropsAvgAggregateOutputType | null
    _sum: CropsSumAggregateOutputType | null
    _min: CropsMinAggregateOutputType | null
    _max: CropsMaxAggregateOutputType | null
  }

  type GetCropsGroupByPayload<T extends CropsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CropsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CropsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CropsGroupByOutputType[P]>
            : GetScalarType<T[P], CropsGroupByOutputType[P]>
        }
      >
    >


  export type CropsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cropName?: boolean
    cropType?: boolean
    region?: boolean
    growthData?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["crops"]>

  export type CropsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cropName?: boolean
    cropType?: boolean
    region?: boolean
    growthData?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["crops"]>

  export type CropsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cropName?: boolean
    cropType?: boolean
    region?: boolean
    growthData?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["crops"]>

  export type CropsSelectScalar = {
    id?: boolean
    cropName?: boolean
    cropType?: boolean
    region?: boolean
    growthData?: boolean
    createdAt?: boolean
  }

  export type CropsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cropName" | "cropType" | "region" | "growthData" | "createdAt", ExtArgs["result"]["crops"]>

  export type $CropsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Crops"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cropName: string
      cropType: string
      region: string
      growthData: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["crops"]>
    composites: {}
  }

  type CropsGetPayload<S extends boolean | null | undefined | CropsDefaultArgs> = $Result.GetResult<Prisma.$CropsPayload, S>

  type CropsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CropsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CropsCountAggregateInputType | true
    }

  export interface CropsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Crops'], meta: { name: 'Crops' } }
    /**
     * Find zero or one Crops that matches the filter.
     * @param {CropsFindUniqueArgs} args - Arguments to find a Crops
     * @example
     * // Get one Crops
     * const crops = await prisma.crops.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CropsFindUniqueArgs>(args: SelectSubset<T, CropsFindUniqueArgs<ExtArgs>>): Prisma__CropsClient<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Crops that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CropsFindUniqueOrThrowArgs} args - Arguments to find a Crops
     * @example
     * // Get one Crops
     * const crops = await prisma.crops.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CropsFindUniqueOrThrowArgs>(args: SelectSubset<T, CropsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CropsClient<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Crops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropsFindFirstArgs} args - Arguments to find a Crops
     * @example
     * // Get one Crops
     * const crops = await prisma.crops.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CropsFindFirstArgs>(args?: SelectSubset<T, CropsFindFirstArgs<ExtArgs>>): Prisma__CropsClient<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Crops that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropsFindFirstOrThrowArgs} args - Arguments to find a Crops
     * @example
     * // Get one Crops
     * const crops = await prisma.crops.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CropsFindFirstOrThrowArgs>(args?: SelectSubset<T, CropsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CropsClient<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Crops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Crops
     * const crops = await prisma.crops.findMany()
     * 
     * // Get first 10 Crops
     * const crops = await prisma.crops.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cropsWithIdOnly = await prisma.crops.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CropsFindManyArgs>(args?: SelectSubset<T, CropsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Crops.
     * @param {CropsCreateArgs} args - Arguments to create a Crops.
     * @example
     * // Create one Crops
     * const Crops = await prisma.crops.create({
     *   data: {
     *     // ... data to create a Crops
     *   }
     * })
     * 
     */
    create<T extends CropsCreateArgs>(args: SelectSubset<T, CropsCreateArgs<ExtArgs>>): Prisma__CropsClient<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Crops.
     * @param {CropsCreateManyArgs} args - Arguments to create many Crops.
     * @example
     * // Create many Crops
     * const crops = await prisma.crops.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CropsCreateManyArgs>(args?: SelectSubset<T, CropsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Crops and returns the data saved in the database.
     * @param {CropsCreateManyAndReturnArgs} args - Arguments to create many Crops.
     * @example
     * // Create many Crops
     * const crops = await prisma.crops.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Crops and only return the `id`
     * const cropsWithIdOnly = await prisma.crops.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CropsCreateManyAndReturnArgs>(args?: SelectSubset<T, CropsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Crops.
     * @param {CropsDeleteArgs} args - Arguments to delete one Crops.
     * @example
     * // Delete one Crops
     * const Crops = await prisma.crops.delete({
     *   where: {
     *     // ... filter to delete one Crops
     *   }
     * })
     * 
     */
    delete<T extends CropsDeleteArgs>(args: SelectSubset<T, CropsDeleteArgs<ExtArgs>>): Prisma__CropsClient<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Crops.
     * @param {CropsUpdateArgs} args - Arguments to update one Crops.
     * @example
     * // Update one Crops
     * const crops = await prisma.crops.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CropsUpdateArgs>(args: SelectSubset<T, CropsUpdateArgs<ExtArgs>>): Prisma__CropsClient<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Crops.
     * @param {CropsDeleteManyArgs} args - Arguments to filter Crops to delete.
     * @example
     * // Delete a few Crops
     * const { count } = await prisma.crops.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CropsDeleteManyArgs>(args?: SelectSubset<T, CropsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Crops
     * const crops = await prisma.crops.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CropsUpdateManyArgs>(args: SelectSubset<T, CropsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crops and returns the data updated in the database.
     * @param {CropsUpdateManyAndReturnArgs} args - Arguments to update many Crops.
     * @example
     * // Update many Crops
     * const crops = await prisma.crops.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Crops and only return the `id`
     * const cropsWithIdOnly = await prisma.crops.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CropsUpdateManyAndReturnArgs>(args: SelectSubset<T, CropsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Crops.
     * @param {CropsUpsertArgs} args - Arguments to update or create a Crops.
     * @example
     * // Update or create a Crops
     * const crops = await prisma.crops.upsert({
     *   create: {
     *     // ... data to create a Crops
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Crops we want to update
     *   }
     * })
     */
    upsert<T extends CropsUpsertArgs>(args: SelectSubset<T, CropsUpsertArgs<ExtArgs>>): Prisma__CropsClient<$Result.GetResult<Prisma.$CropsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Crops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropsCountArgs} args - Arguments to filter Crops to count.
     * @example
     * // Count the number of Crops
     * const count = await prisma.crops.count({
     *   where: {
     *     // ... the filter for the Crops we want to count
     *   }
     * })
    **/
    count<T extends CropsCountArgs>(
      args?: Subset<T, CropsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CropsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Crops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CropsAggregateArgs>(args: Subset<T, CropsAggregateArgs>): Prisma.PrismaPromise<GetCropsAggregateType<T>>

    /**
     * Group by Crops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CropsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CropsGroupByArgs['orderBy'] }
        : { orderBy?: CropsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CropsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCropsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Crops model
   */
  readonly fields: CropsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Crops.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CropsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Crops model
   */
  interface CropsFieldRefs {
    readonly id: FieldRef<"Crops", 'Int'>
    readonly cropName: FieldRef<"Crops", 'String'>
    readonly cropType: FieldRef<"Crops", 'String'>
    readonly region: FieldRef<"Crops", 'String'>
    readonly growthData: FieldRef<"Crops", 'Json'>
    readonly createdAt: FieldRef<"Crops", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Crops findUnique
   */
  export type CropsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * Filter, which Crops to fetch.
     */
    where: CropsWhereUniqueInput
  }

  /**
   * Crops findUniqueOrThrow
   */
  export type CropsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * Filter, which Crops to fetch.
     */
    where: CropsWhereUniqueInput
  }

  /**
   * Crops findFirst
   */
  export type CropsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * Filter, which Crops to fetch.
     */
    where?: CropsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crops to fetch.
     */
    orderBy?: CropsOrderByWithRelationInput | CropsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Crops.
     */
    cursor?: CropsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Crops.
     */
    distinct?: CropsScalarFieldEnum | CropsScalarFieldEnum[]
  }

  /**
   * Crops findFirstOrThrow
   */
  export type CropsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * Filter, which Crops to fetch.
     */
    where?: CropsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crops to fetch.
     */
    orderBy?: CropsOrderByWithRelationInput | CropsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Crops.
     */
    cursor?: CropsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Crops.
     */
    distinct?: CropsScalarFieldEnum | CropsScalarFieldEnum[]
  }

  /**
   * Crops findMany
   */
  export type CropsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * Filter, which Crops to fetch.
     */
    where?: CropsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crops to fetch.
     */
    orderBy?: CropsOrderByWithRelationInput | CropsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Crops.
     */
    cursor?: CropsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crops.
     */
    skip?: number
    distinct?: CropsScalarFieldEnum | CropsScalarFieldEnum[]
  }

  /**
   * Crops create
   */
  export type CropsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * The data needed to create a Crops.
     */
    data: XOR<CropsCreateInput, CropsUncheckedCreateInput>
  }

  /**
   * Crops createMany
   */
  export type CropsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Crops.
     */
    data: CropsCreateManyInput | CropsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Crops createManyAndReturn
   */
  export type CropsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * The data used to create many Crops.
     */
    data: CropsCreateManyInput | CropsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Crops update
   */
  export type CropsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * The data needed to update a Crops.
     */
    data: XOR<CropsUpdateInput, CropsUncheckedUpdateInput>
    /**
     * Choose, which Crops to update.
     */
    where: CropsWhereUniqueInput
  }

  /**
   * Crops updateMany
   */
  export type CropsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Crops.
     */
    data: XOR<CropsUpdateManyMutationInput, CropsUncheckedUpdateManyInput>
    /**
     * Filter which Crops to update
     */
    where?: CropsWhereInput
    /**
     * Limit how many Crops to update.
     */
    limit?: number
  }

  /**
   * Crops updateManyAndReturn
   */
  export type CropsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * The data used to update Crops.
     */
    data: XOR<CropsUpdateManyMutationInput, CropsUncheckedUpdateManyInput>
    /**
     * Filter which Crops to update
     */
    where?: CropsWhereInput
    /**
     * Limit how many Crops to update.
     */
    limit?: number
  }

  /**
   * Crops upsert
   */
  export type CropsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * The filter to search for the Crops to update in case it exists.
     */
    where: CropsWhereUniqueInput
    /**
     * In case the Crops found by the `where` argument doesn't exist, create a new Crops with this data.
     */
    create: XOR<CropsCreateInput, CropsUncheckedCreateInput>
    /**
     * In case the Crops was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CropsUpdateInput, CropsUncheckedUpdateInput>
  }

  /**
   * Crops delete
   */
  export type CropsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
    /**
     * Filter which Crops to delete.
     */
    where: CropsWhereUniqueInput
  }

  /**
   * Crops deleteMany
   */
  export type CropsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Crops to delete
     */
    where?: CropsWhereInput
    /**
     * Limit how many Crops to delete.
     */
    limit?: number
  }

  /**
   * Crops without action
   */
  export type CropsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crops
     */
    select?: CropsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crops
     */
    omit?: CropsOmit<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    dueDate: Date | null
    status: string | null
    cropId: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    dueDate: Date | null
    status: string | null
    cropId: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    dueDate: number
    status: number
    cropId: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    dueDate?: true
    status?: true
    cropId?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    dueDate?: true
    status?: true
    cropId?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    dueDate?: true
    status?: true
    cropId?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    title: string
    dueDate: Date
    status: string
    cropId: string
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    dueDate?: boolean
    status?: boolean
    cropId?: boolean
    crop?: boolean | CropCycleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    dueDate?: boolean
    status?: boolean
    cropId?: boolean
    crop?: boolean | CropCycleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    dueDate?: boolean
    status?: boolean
    cropId?: boolean
    crop?: boolean | CropCycleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    dueDate?: boolean
    status?: boolean
    cropId?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "dueDate" | "status" | "cropId", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crop?: boolean | CropCycleDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crop?: boolean | CropCycleDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crop?: boolean | CropCycleDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      crop: Prisma.$CropCyclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      dueDate: Date
      status: string
      cropId: string
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    crop<T extends CropCycleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CropCycleDefaultArgs<ExtArgs>>): Prisma__CropCycleClient<$Result.GetResult<Prisma.$CropCyclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly status: FieldRef<"Task", 'String'>
    readonly cropId: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Advice
   */

  export type AggregateAdvice = {
    _count: AdviceCountAggregateOutputType | null
    _min: AdviceMinAggregateOutputType | null
    _max: AdviceMaxAggregateOutputType | null
  }

  export type AdviceMinAggregateOutputType = {
    id: string | null
    message: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type AdviceMaxAggregateOutputType = {
    id: string | null
    message: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type AdviceCountAggregateOutputType = {
    id: number
    message: number
    createdAt: number
    userId: number
    _all: number
  }


  export type AdviceMinAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
    userId?: true
  }

  export type AdviceMaxAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
    userId?: true
  }

  export type AdviceCountAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type AdviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Advice to aggregate.
     */
    where?: AdviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advice to fetch.
     */
    orderBy?: AdviceOrderByWithRelationInput | AdviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advice from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advice.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Advice
    **/
    _count?: true | AdviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdviceMaxAggregateInputType
  }

  export type GetAdviceAggregateType<T extends AdviceAggregateArgs> = {
        [P in keyof T & keyof AggregateAdvice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdvice[P]>
      : GetScalarType<T[P], AggregateAdvice[P]>
  }




  export type AdviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdviceWhereInput
    orderBy?: AdviceOrderByWithAggregationInput | AdviceOrderByWithAggregationInput[]
    by: AdviceScalarFieldEnum[] | AdviceScalarFieldEnum
    having?: AdviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdviceCountAggregateInputType | true
    _min?: AdviceMinAggregateInputType
    _max?: AdviceMaxAggregateInputType
  }

  export type AdviceGroupByOutputType = {
    id: string
    message: string
    createdAt: Date
    userId: string
    _count: AdviceCountAggregateOutputType | null
    _min: AdviceMinAggregateOutputType | null
    _max: AdviceMaxAggregateOutputType | null
  }

  type GetAdviceGroupByPayload<T extends AdviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdviceGroupByOutputType[P]>
            : GetScalarType<T[P], AdviceGroupByOutputType[P]>
        }
      >
    >


  export type AdviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["advice"]>

  export type AdviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["advice"]>

  export type AdviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["advice"]>

  export type AdviceSelectScalar = {
    id?: boolean
    message?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type AdviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "createdAt" | "userId", ExtArgs["result"]["advice"]>
  export type AdviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdvicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Advice"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      message: string
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["advice"]>
    composites: {}
  }

  type AdviceGetPayload<S extends boolean | null | undefined | AdviceDefaultArgs> = $Result.GetResult<Prisma.$AdvicePayload, S>

  type AdviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdviceCountAggregateInputType | true
    }

  export interface AdviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Advice'], meta: { name: 'Advice' } }
    /**
     * Find zero or one Advice that matches the filter.
     * @param {AdviceFindUniqueArgs} args - Arguments to find a Advice
     * @example
     * // Get one Advice
     * const advice = await prisma.advice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdviceFindUniqueArgs>(args: SelectSubset<T, AdviceFindUniqueArgs<ExtArgs>>): Prisma__AdviceClient<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Advice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdviceFindUniqueOrThrowArgs} args - Arguments to find a Advice
     * @example
     * // Get one Advice
     * const advice = await prisma.advice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdviceFindUniqueOrThrowArgs>(args: SelectSubset<T, AdviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdviceClient<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Advice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdviceFindFirstArgs} args - Arguments to find a Advice
     * @example
     * // Get one Advice
     * const advice = await prisma.advice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdviceFindFirstArgs>(args?: SelectSubset<T, AdviceFindFirstArgs<ExtArgs>>): Prisma__AdviceClient<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Advice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdviceFindFirstOrThrowArgs} args - Arguments to find a Advice
     * @example
     * // Get one Advice
     * const advice = await prisma.advice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdviceFindFirstOrThrowArgs>(args?: SelectSubset<T, AdviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdviceClient<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Advice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Advice
     * const advice = await prisma.advice.findMany()
     * 
     * // Get first 10 Advice
     * const advice = await prisma.advice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adviceWithIdOnly = await prisma.advice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdviceFindManyArgs>(args?: SelectSubset<T, AdviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Advice.
     * @param {AdviceCreateArgs} args - Arguments to create a Advice.
     * @example
     * // Create one Advice
     * const Advice = await prisma.advice.create({
     *   data: {
     *     // ... data to create a Advice
     *   }
     * })
     * 
     */
    create<T extends AdviceCreateArgs>(args: SelectSubset<T, AdviceCreateArgs<ExtArgs>>): Prisma__AdviceClient<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Advice.
     * @param {AdviceCreateManyArgs} args - Arguments to create many Advice.
     * @example
     * // Create many Advice
     * const advice = await prisma.advice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdviceCreateManyArgs>(args?: SelectSubset<T, AdviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Advice and returns the data saved in the database.
     * @param {AdviceCreateManyAndReturnArgs} args - Arguments to create many Advice.
     * @example
     * // Create many Advice
     * const advice = await prisma.advice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Advice and only return the `id`
     * const adviceWithIdOnly = await prisma.advice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdviceCreateManyAndReturnArgs>(args?: SelectSubset<T, AdviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Advice.
     * @param {AdviceDeleteArgs} args - Arguments to delete one Advice.
     * @example
     * // Delete one Advice
     * const Advice = await prisma.advice.delete({
     *   where: {
     *     // ... filter to delete one Advice
     *   }
     * })
     * 
     */
    delete<T extends AdviceDeleteArgs>(args: SelectSubset<T, AdviceDeleteArgs<ExtArgs>>): Prisma__AdviceClient<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Advice.
     * @param {AdviceUpdateArgs} args - Arguments to update one Advice.
     * @example
     * // Update one Advice
     * const advice = await prisma.advice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdviceUpdateArgs>(args: SelectSubset<T, AdviceUpdateArgs<ExtArgs>>): Prisma__AdviceClient<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Advice.
     * @param {AdviceDeleteManyArgs} args - Arguments to filter Advice to delete.
     * @example
     * // Delete a few Advice
     * const { count } = await prisma.advice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdviceDeleteManyArgs>(args?: SelectSubset<T, AdviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Advice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Advice
     * const advice = await prisma.advice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdviceUpdateManyArgs>(args: SelectSubset<T, AdviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Advice and returns the data updated in the database.
     * @param {AdviceUpdateManyAndReturnArgs} args - Arguments to update many Advice.
     * @example
     * // Update many Advice
     * const advice = await prisma.advice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Advice and only return the `id`
     * const adviceWithIdOnly = await prisma.advice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdviceUpdateManyAndReturnArgs>(args: SelectSubset<T, AdviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Advice.
     * @param {AdviceUpsertArgs} args - Arguments to update or create a Advice.
     * @example
     * // Update or create a Advice
     * const advice = await prisma.advice.upsert({
     *   create: {
     *     // ... data to create a Advice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Advice we want to update
     *   }
     * })
     */
    upsert<T extends AdviceUpsertArgs>(args: SelectSubset<T, AdviceUpsertArgs<ExtArgs>>): Prisma__AdviceClient<$Result.GetResult<Prisma.$AdvicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Advice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdviceCountArgs} args - Arguments to filter Advice to count.
     * @example
     * // Count the number of Advice
     * const count = await prisma.advice.count({
     *   where: {
     *     // ... the filter for the Advice we want to count
     *   }
     * })
    **/
    count<T extends AdviceCountArgs>(
      args?: Subset<T, AdviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Advice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdviceAggregateArgs>(args: Subset<T, AdviceAggregateArgs>): Prisma.PrismaPromise<GetAdviceAggregateType<T>>

    /**
     * Group by Advice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdviceGroupByArgs['orderBy'] }
        : { orderBy?: AdviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Advice model
   */
  readonly fields: AdviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Advice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Advice model
   */
  interface AdviceFieldRefs {
    readonly id: FieldRef<"Advice", 'String'>
    readonly message: FieldRef<"Advice", 'String'>
    readonly createdAt: FieldRef<"Advice", 'DateTime'>
    readonly userId: FieldRef<"Advice", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Advice findUnique
   */
  export type AdviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    /**
     * Filter, which Advice to fetch.
     */
    where: AdviceWhereUniqueInput
  }

  /**
   * Advice findUniqueOrThrow
   */
  export type AdviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    /**
     * Filter, which Advice to fetch.
     */
    where: AdviceWhereUniqueInput
  }

  /**
   * Advice findFirst
   */
  export type AdviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    /**
     * Filter, which Advice to fetch.
     */
    where?: AdviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advice to fetch.
     */
    orderBy?: AdviceOrderByWithRelationInput | AdviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Advice.
     */
    cursor?: AdviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advice from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advice.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Advice.
     */
    distinct?: AdviceScalarFieldEnum | AdviceScalarFieldEnum[]
  }

  /**
   * Advice findFirstOrThrow
   */
  export type AdviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    /**
     * Filter, which Advice to fetch.
     */
    where?: AdviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advice to fetch.
     */
    orderBy?: AdviceOrderByWithRelationInput | AdviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Advice.
     */
    cursor?: AdviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advice from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advice.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Advice.
     */
    distinct?: AdviceScalarFieldEnum | AdviceScalarFieldEnum[]
  }

  /**
   * Advice findMany
   */
  export type AdviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    /**
     * Filter, which Advice to fetch.
     */
    where?: AdviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advice to fetch.
     */
    orderBy?: AdviceOrderByWithRelationInput | AdviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Advice.
     */
    cursor?: AdviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advice from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advice.
     */
    skip?: number
    distinct?: AdviceScalarFieldEnum | AdviceScalarFieldEnum[]
  }

  /**
   * Advice create
   */
  export type AdviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    /**
     * The data needed to create a Advice.
     */
    data: XOR<AdviceCreateInput, AdviceUncheckedCreateInput>
  }

  /**
   * Advice createMany
   */
  export type AdviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Advice.
     */
    data: AdviceCreateManyInput | AdviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Advice createManyAndReturn
   */
  export type AdviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * The data used to create many Advice.
     */
    data: AdviceCreateManyInput | AdviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Advice update
   */
  export type AdviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    /**
     * The data needed to update a Advice.
     */
    data: XOR<AdviceUpdateInput, AdviceUncheckedUpdateInput>
    /**
     * Choose, which Advice to update.
     */
    where: AdviceWhereUniqueInput
  }

  /**
   * Advice updateMany
   */
  export type AdviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Advice.
     */
    data: XOR<AdviceUpdateManyMutationInput, AdviceUncheckedUpdateManyInput>
    /**
     * Filter which Advice to update
     */
    where?: AdviceWhereInput
    /**
     * Limit how many Advice to update.
     */
    limit?: number
  }

  /**
   * Advice updateManyAndReturn
   */
  export type AdviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * The data used to update Advice.
     */
    data: XOR<AdviceUpdateManyMutationInput, AdviceUncheckedUpdateManyInput>
    /**
     * Filter which Advice to update
     */
    where?: AdviceWhereInput
    /**
     * Limit how many Advice to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Advice upsert
   */
  export type AdviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    /**
     * The filter to search for the Advice to update in case it exists.
     */
    where: AdviceWhereUniqueInput
    /**
     * In case the Advice found by the `where` argument doesn't exist, create a new Advice with this data.
     */
    create: XOR<AdviceCreateInput, AdviceUncheckedCreateInput>
    /**
     * In case the Advice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdviceUpdateInput, AdviceUncheckedUpdateInput>
  }

  /**
   * Advice delete
   */
  export type AdviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
    /**
     * Filter which Advice to delete.
     */
    where: AdviceWhereUniqueInput
  }

  /**
   * Advice deleteMany
   */
  export type AdviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Advice to delete
     */
    where?: AdviceWhereInput
    /**
     * Limit how many Advice to delete.
     */
    limit?: number
  }

  /**
   * Advice without action
   */
  export type AdviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advice
     */
    select?: AdviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advice
     */
    omit?: AdviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdviceInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    location: 'location'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FarmScalarFieldEnum: {
    id: 'id',
    name: 'name',
    size: 'size',
    unit: 'unit',
    type: 'type',
    location: 'location',
    crops: 'crops',
    notes: 'notes',
    ownerId: 'ownerId',
    cropType: 'cropType',
    createdAt: 'createdAt'
  };

  export type FarmScalarFieldEnum = (typeof FarmScalarFieldEnum)[keyof typeof FarmScalarFieldEnum]


  export const CropCycleScalarFieldEnum: {
    id: 'id',
    cropName: 'cropName',
    plantingDate: 'plantingDate',
    harvestDate: 'harvestDate',
    status: 'status',
    farmId: 'farmId'
  };

  export type CropCycleScalarFieldEnum = (typeof CropCycleScalarFieldEnum)[keyof typeof CropCycleScalarFieldEnum]


  export const CropsScalarFieldEnum: {
    id: 'id',
    cropName: 'cropName',
    cropType: 'cropType',
    region: 'region',
    growthData: 'growthData',
    createdAt: 'createdAt'
  };

  export type CropsScalarFieldEnum = (typeof CropsScalarFieldEnum)[keyof typeof CropsScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    dueDate: 'dueDate',
    status: 'status',
    cropId: 'cropId'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const AdviceScalarFieldEnum: {
    id: 'id',
    message: 'message',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type AdviceScalarFieldEnum = (typeof AdviceScalarFieldEnum)[keyof typeof AdviceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    location?: StringNullableFilter<"User"> | string | null
    advice?: AdviceListRelationFilter
    farms?: FarmListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    location?: SortOrderInput | SortOrder
    advice?: AdviceOrderByRelationAggregateInput
    farms?: FarmOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    location?: StringNullableFilter<"User"> | string | null
    advice?: AdviceListRelationFilter
    farms?: FarmListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    location?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    location?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type FarmWhereInput = {
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    id?: StringFilter<"Farm"> | string
    name?: StringFilter<"Farm"> | string
    size?: FloatNullableFilter<"Farm"> | number | null
    unit?: StringNullableFilter<"Farm"> | string | null
    type?: StringNullableFilter<"Farm"> | string | null
    location?: StringFilter<"Farm"> | string
    crops?: JsonNullableFilter<"Farm">
    notes?: StringNullableFilter<"Farm"> | string | null
    ownerId?: StringFilter<"Farm"> | string
    cropType?: StringNullableFilter<"Farm"> | string | null
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    cropCycles?: CropCycleListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FarmOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    location?: SortOrder
    crops?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    cropType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    cropCycles?: CropCycleOrderByRelationAggregateInput
    owner?: UserOrderByWithRelationInput
  }

  export type FarmWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    name?: StringFilter<"Farm"> | string
    size?: FloatNullableFilter<"Farm"> | number | null
    unit?: StringNullableFilter<"Farm"> | string | null
    type?: StringNullableFilter<"Farm"> | string | null
    location?: StringFilter<"Farm"> | string
    crops?: JsonNullableFilter<"Farm">
    notes?: StringNullableFilter<"Farm"> | string | null
    ownerId?: StringFilter<"Farm"> | string
    cropType?: StringNullableFilter<"Farm"> | string | null
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    cropCycles?: CropCycleListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FarmOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    location?: SortOrder
    crops?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    cropType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FarmCountOrderByAggregateInput
    _avg?: FarmAvgOrderByAggregateInput
    _max?: FarmMaxOrderByAggregateInput
    _min?: FarmMinOrderByAggregateInput
    _sum?: FarmSumOrderByAggregateInput
  }

  export type FarmScalarWhereWithAggregatesInput = {
    AND?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    OR?: FarmScalarWhereWithAggregatesInput[]
    NOT?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Farm"> | string
    name?: StringWithAggregatesFilter<"Farm"> | string
    size?: FloatNullableWithAggregatesFilter<"Farm"> | number | null
    unit?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    type?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    location?: StringWithAggregatesFilter<"Farm"> | string
    crops?: JsonNullableWithAggregatesFilter<"Farm">
    notes?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    ownerId?: StringWithAggregatesFilter<"Farm"> | string
    cropType?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
  }

  export type CropCycleWhereInput = {
    AND?: CropCycleWhereInput | CropCycleWhereInput[]
    OR?: CropCycleWhereInput[]
    NOT?: CropCycleWhereInput | CropCycleWhereInput[]
    id?: StringFilter<"CropCycle"> | string
    cropName?: StringFilter<"CropCycle"> | string
    plantingDate?: DateTimeFilter<"CropCycle"> | Date | string
    harvestDate?: DateTimeNullableFilter<"CropCycle"> | Date | string | null
    status?: StringFilter<"CropCycle"> | string
    farmId?: StringFilter<"CropCycle"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    tasks?: TaskListRelationFilter
  }

  export type CropCycleOrderByWithRelationInput = {
    id?: SortOrder
    cropName?: SortOrder
    plantingDate?: SortOrder
    harvestDate?: SortOrderInput | SortOrder
    status?: SortOrder
    farmId?: SortOrder
    farm?: FarmOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type CropCycleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CropCycleWhereInput | CropCycleWhereInput[]
    OR?: CropCycleWhereInput[]
    NOT?: CropCycleWhereInput | CropCycleWhereInput[]
    cropName?: StringFilter<"CropCycle"> | string
    plantingDate?: DateTimeFilter<"CropCycle"> | Date | string
    harvestDate?: DateTimeNullableFilter<"CropCycle"> | Date | string | null
    status?: StringFilter<"CropCycle"> | string
    farmId?: StringFilter<"CropCycle"> | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
    tasks?: TaskListRelationFilter
  }, "id">

  export type CropCycleOrderByWithAggregationInput = {
    id?: SortOrder
    cropName?: SortOrder
    plantingDate?: SortOrder
    harvestDate?: SortOrderInput | SortOrder
    status?: SortOrder
    farmId?: SortOrder
    _count?: CropCycleCountOrderByAggregateInput
    _max?: CropCycleMaxOrderByAggregateInput
    _min?: CropCycleMinOrderByAggregateInput
  }

  export type CropCycleScalarWhereWithAggregatesInput = {
    AND?: CropCycleScalarWhereWithAggregatesInput | CropCycleScalarWhereWithAggregatesInput[]
    OR?: CropCycleScalarWhereWithAggregatesInput[]
    NOT?: CropCycleScalarWhereWithAggregatesInput | CropCycleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CropCycle"> | string
    cropName?: StringWithAggregatesFilter<"CropCycle"> | string
    plantingDate?: DateTimeWithAggregatesFilter<"CropCycle"> | Date | string
    harvestDate?: DateTimeNullableWithAggregatesFilter<"CropCycle"> | Date | string | null
    status?: StringWithAggregatesFilter<"CropCycle"> | string
    farmId?: StringWithAggregatesFilter<"CropCycle"> | string
  }

  export type CropsWhereInput = {
    AND?: CropsWhereInput | CropsWhereInput[]
    OR?: CropsWhereInput[]
    NOT?: CropsWhereInput | CropsWhereInput[]
    id?: IntFilter<"Crops"> | number
    cropName?: StringFilter<"Crops"> | string
    cropType?: StringFilter<"Crops"> | string
    region?: StringFilter<"Crops"> | string
    growthData?: JsonFilter<"Crops">
    createdAt?: DateTimeFilter<"Crops"> | Date | string
  }

  export type CropsOrderByWithRelationInput = {
    id?: SortOrder
    cropName?: SortOrder
    cropType?: SortOrder
    region?: SortOrder
    growthData?: SortOrder
    createdAt?: SortOrder
  }

  export type CropsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cropName?: string
    AND?: CropsWhereInput | CropsWhereInput[]
    OR?: CropsWhereInput[]
    NOT?: CropsWhereInput | CropsWhereInput[]
    cropType?: StringFilter<"Crops"> | string
    region?: StringFilter<"Crops"> | string
    growthData?: JsonFilter<"Crops">
    createdAt?: DateTimeFilter<"Crops"> | Date | string
  }, "id" | "cropName">

  export type CropsOrderByWithAggregationInput = {
    id?: SortOrder
    cropName?: SortOrder
    cropType?: SortOrder
    region?: SortOrder
    growthData?: SortOrder
    createdAt?: SortOrder
    _count?: CropsCountOrderByAggregateInput
    _avg?: CropsAvgOrderByAggregateInput
    _max?: CropsMaxOrderByAggregateInput
    _min?: CropsMinOrderByAggregateInput
    _sum?: CropsSumOrderByAggregateInput
  }

  export type CropsScalarWhereWithAggregatesInput = {
    AND?: CropsScalarWhereWithAggregatesInput | CropsScalarWhereWithAggregatesInput[]
    OR?: CropsScalarWhereWithAggregatesInput[]
    NOT?: CropsScalarWhereWithAggregatesInput | CropsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Crops"> | number
    cropName?: StringWithAggregatesFilter<"Crops"> | string
    cropType?: StringWithAggregatesFilter<"Crops"> | string
    region?: StringWithAggregatesFilter<"Crops"> | string
    growthData?: JsonWithAggregatesFilter<"Crops">
    createdAt?: DateTimeWithAggregatesFilter<"Crops"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    dueDate?: DateTimeFilter<"Task"> | Date | string
    status?: StringFilter<"Task"> | string
    cropId?: StringFilter<"Task"> | string
    crop?: XOR<CropCycleScalarRelationFilter, CropCycleWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    cropId?: SortOrder
    crop?: CropCycleOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    dueDate?: DateTimeFilter<"Task"> | Date | string
    status?: StringFilter<"Task"> | string
    cropId?: StringFilter<"Task"> | string
    crop?: XOR<CropCycleScalarRelationFilter, CropCycleWhereInput>
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    cropId?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    dueDate?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    status?: StringWithAggregatesFilter<"Task"> | string
    cropId?: StringWithAggregatesFilter<"Task"> | string
  }

  export type AdviceWhereInput = {
    AND?: AdviceWhereInput | AdviceWhereInput[]
    OR?: AdviceWhereInput[]
    NOT?: AdviceWhereInput | AdviceWhereInput[]
    id?: StringFilter<"Advice"> | string
    message?: StringFilter<"Advice"> | string
    createdAt?: DateTimeFilter<"Advice"> | Date | string
    userId?: StringFilter<"Advice"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AdviceOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdviceWhereInput | AdviceWhereInput[]
    OR?: AdviceWhereInput[]
    NOT?: AdviceWhereInput | AdviceWhereInput[]
    message?: StringFilter<"Advice"> | string
    createdAt?: DateTimeFilter<"Advice"> | Date | string
    userId?: StringFilter<"Advice"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AdviceOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: AdviceCountOrderByAggregateInput
    _max?: AdviceMaxOrderByAggregateInput
    _min?: AdviceMinOrderByAggregateInput
  }

  export type AdviceScalarWhereWithAggregatesInput = {
    AND?: AdviceScalarWhereWithAggregatesInput | AdviceScalarWhereWithAggregatesInput[]
    OR?: AdviceScalarWhereWithAggregatesInput[]
    NOT?: AdviceScalarWhereWithAggregatesInput | AdviceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Advice"> | string
    message?: StringWithAggregatesFilter<"Advice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Advice"> | Date | string
    userId?: StringWithAggregatesFilter<"Advice"> | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    location?: string | null
    advice?: AdviceCreateNestedManyWithoutUserInput
    farms?: FarmCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    location?: string | null
    advice?: AdviceUncheckedCreateNestedManyWithoutUserInput
    farms?: FarmUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    advice?: AdviceUpdateManyWithoutUserNestedInput
    farms?: FarmUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    advice?: AdviceUncheckedUpdateManyWithoutUserNestedInput
    farms?: FarmUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    location?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FarmCreateInput = {
    id?: string
    name: string
    size?: number | null
    unit?: string | null
    type?: string | null
    location: string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: string | null
    cropType?: string | null
    createdAt?: Date | string
    cropCycles?: CropCycleCreateNestedManyWithoutFarmInput
    owner: UserCreateNestedOneWithoutFarmsInput
  }

  export type FarmUncheckedCreateInput = {
    id?: string
    name: string
    size?: number | null
    unit?: string | null
    type?: string | null
    location: string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: string | null
    ownerId: string
    cropType?: string | null
    createdAt?: Date | string
    cropCycles?: CropCycleUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cropCycles?: CropCycleUpdateManyWithoutFarmNestedInput
    owner?: UserUpdateOneRequiredWithoutFarmsNestedInput
  }

  export type FarmUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    cropType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cropCycles?: CropCycleUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type FarmCreateManyInput = {
    id?: string
    name: string
    size?: number | null
    unit?: string | null
    type?: string | null
    location: string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: string | null
    ownerId: string
    cropType?: string | null
    createdAt?: Date | string
  }

  export type FarmUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    cropType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CropCycleCreateInput = {
    id?: string
    cropName: string
    plantingDate: Date | string
    harvestDate?: Date | string | null
    status: string
    farm: FarmCreateNestedOneWithoutCropCyclesInput
    tasks?: TaskCreateNestedManyWithoutCropInput
  }

  export type CropCycleUncheckedCreateInput = {
    id?: string
    cropName: string
    plantingDate: Date | string
    harvestDate?: Date | string | null
    status: string
    farmId: string
    tasks?: TaskUncheckedCreateNestedManyWithoutCropInput
  }

  export type CropCycleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropName?: StringFieldUpdateOperationsInput | string
    plantingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    farm?: FarmUpdateOneRequiredWithoutCropCyclesNestedInput
    tasks?: TaskUpdateManyWithoutCropNestedInput
  }

  export type CropCycleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropName?: StringFieldUpdateOperationsInput | string
    plantingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutCropNestedInput
  }

  export type CropCycleCreateManyInput = {
    id?: string
    cropName: string
    plantingDate: Date | string
    harvestDate?: Date | string | null
    status: string
    farmId: string
  }

  export type CropCycleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropName?: StringFieldUpdateOperationsInput | string
    plantingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type CropCycleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropName?: StringFieldUpdateOperationsInput | string
    plantingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type CropsCreateInput = {
    cropName: string
    cropType: string
    region: string
    growthData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CropsUncheckedCreateInput = {
    id?: number
    cropName: string
    cropType: string
    region: string
    growthData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CropsUpdateInput = {
    cropName?: StringFieldUpdateOperationsInput | string
    cropType?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    growthData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CropsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cropName?: StringFieldUpdateOperationsInput | string
    cropType?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    growthData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CropsCreateManyInput = {
    id?: number
    cropName: string
    cropType: string
    region: string
    growthData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CropsUpdateManyMutationInput = {
    cropName?: StringFieldUpdateOperationsInput | string
    cropType?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    growthData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CropsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cropName?: StringFieldUpdateOperationsInput | string
    cropType?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    growthData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    dueDate: Date | string
    status: string
    crop: CropCycleCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    title: string
    dueDate: Date | string
    status: string
    cropId: string
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    crop?: CropCycleUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    cropId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateManyInput = {
    id?: string
    title: string
    dueDate: Date | string
    status: string
    cropId: string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    cropId?: StringFieldUpdateOperationsInput | string
  }

  export type AdviceCreateInput = {
    id?: string
    message: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAdviceInput
  }

  export type AdviceUncheckedCreateInput = {
    id?: string
    message: string
    createdAt?: Date | string
    userId: string
  }

  export type AdviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAdviceNestedInput
  }

  export type AdviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AdviceCreateManyInput = {
    id?: string
    message: string
    createdAt?: Date | string
    userId: string
  }

  export type AdviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AdviceListRelationFilter = {
    every?: AdviceWhereInput
    some?: AdviceWhereInput
    none?: AdviceWhereInput
  }

  export type FarmListRelationFilter = {
    every?: FarmWhereInput
    some?: FarmWhereInput
    none?: FarmWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    location?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    location?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    location?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CropCycleListRelationFilter = {
    every?: CropCycleWhereInput
    some?: CropCycleWhereInput
    none?: CropCycleWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CropCycleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    unit?: SortOrder
    type?: SortOrder
    location?: SortOrder
    crops?: SortOrder
    notes?: SortOrder
    ownerId?: SortOrder
    cropType?: SortOrder
    createdAt?: SortOrder
  }

  export type FarmAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type FarmMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    unit?: SortOrder
    type?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    ownerId?: SortOrder
    cropType?: SortOrder
    createdAt?: SortOrder
  }

  export type FarmMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    unit?: SortOrder
    type?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    ownerId?: SortOrder
    cropType?: SortOrder
    createdAt?: SortOrder
  }

  export type FarmSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FarmScalarRelationFilter = {
    is?: FarmWhereInput
    isNot?: FarmWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CropCycleCountOrderByAggregateInput = {
    id?: SortOrder
    cropName?: SortOrder
    plantingDate?: SortOrder
    harvestDate?: SortOrder
    status?: SortOrder
    farmId?: SortOrder
  }

  export type CropCycleMaxOrderByAggregateInput = {
    id?: SortOrder
    cropName?: SortOrder
    plantingDate?: SortOrder
    harvestDate?: SortOrder
    status?: SortOrder
    farmId?: SortOrder
  }

  export type CropCycleMinOrderByAggregateInput = {
    id?: SortOrder
    cropName?: SortOrder
    plantingDate?: SortOrder
    harvestDate?: SortOrder
    status?: SortOrder
    farmId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CropsCountOrderByAggregateInput = {
    id?: SortOrder
    cropName?: SortOrder
    cropType?: SortOrder
    region?: SortOrder
    growthData?: SortOrder
    createdAt?: SortOrder
  }

  export type CropsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CropsMaxOrderByAggregateInput = {
    id?: SortOrder
    cropName?: SortOrder
    cropType?: SortOrder
    region?: SortOrder
    createdAt?: SortOrder
  }

  export type CropsMinOrderByAggregateInput = {
    id?: SortOrder
    cropName?: SortOrder
    cropType?: SortOrder
    region?: SortOrder
    createdAt?: SortOrder
  }

  export type CropsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type CropCycleScalarRelationFilter = {
    is?: CropCycleWhereInput
    isNot?: CropCycleWhereInput
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    cropId?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    cropId?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    cropId?: SortOrder
  }

  export type AdviceCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type AdviceMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type AdviceMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type AdviceCreateNestedManyWithoutUserInput = {
    create?: XOR<AdviceCreateWithoutUserInput, AdviceUncheckedCreateWithoutUserInput> | AdviceCreateWithoutUserInput[] | AdviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdviceCreateOrConnectWithoutUserInput | AdviceCreateOrConnectWithoutUserInput[]
    createMany?: AdviceCreateManyUserInputEnvelope
    connect?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
  }

  export type FarmCreateNestedManyWithoutOwnerInput = {
    create?: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput> | FarmCreateWithoutOwnerInput[] | FarmUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutOwnerInput | FarmCreateOrConnectWithoutOwnerInput[]
    createMany?: FarmCreateManyOwnerInputEnvelope
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
  }

  export type AdviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AdviceCreateWithoutUserInput, AdviceUncheckedCreateWithoutUserInput> | AdviceCreateWithoutUserInput[] | AdviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdviceCreateOrConnectWithoutUserInput | AdviceCreateOrConnectWithoutUserInput[]
    createMany?: AdviceCreateManyUserInputEnvelope
    connect?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
  }

  export type FarmUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput> | FarmCreateWithoutOwnerInput[] | FarmUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutOwnerInput | FarmCreateOrConnectWithoutOwnerInput[]
    createMany?: FarmCreateManyOwnerInputEnvelope
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AdviceUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdviceCreateWithoutUserInput, AdviceUncheckedCreateWithoutUserInput> | AdviceCreateWithoutUserInput[] | AdviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdviceCreateOrConnectWithoutUserInput | AdviceCreateOrConnectWithoutUserInput[]
    upsert?: AdviceUpsertWithWhereUniqueWithoutUserInput | AdviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdviceCreateManyUserInputEnvelope
    set?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
    disconnect?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
    delete?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
    connect?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
    update?: AdviceUpdateWithWhereUniqueWithoutUserInput | AdviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdviceUpdateManyWithWhereWithoutUserInput | AdviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdviceScalarWhereInput | AdviceScalarWhereInput[]
  }

  export type FarmUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput> | FarmCreateWithoutOwnerInput[] | FarmUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutOwnerInput | FarmCreateOrConnectWithoutOwnerInput[]
    upsert?: FarmUpsertWithWhereUniqueWithoutOwnerInput | FarmUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: FarmCreateManyOwnerInputEnvelope
    set?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    disconnect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    delete?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    update?: FarmUpdateWithWhereUniqueWithoutOwnerInput | FarmUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: FarmUpdateManyWithWhereWithoutOwnerInput | FarmUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: FarmScalarWhereInput | FarmScalarWhereInput[]
  }

  export type AdviceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdviceCreateWithoutUserInput, AdviceUncheckedCreateWithoutUserInput> | AdviceCreateWithoutUserInput[] | AdviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdviceCreateOrConnectWithoutUserInput | AdviceCreateOrConnectWithoutUserInput[]
    upsert?: AdviceUpsertWithWhereUniqueWithoutUserInput | AdviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdviceCreateManyUserInputEnvelope
    set?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
    disconnect?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
    delete?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
    connect?: AdviceWhereUniqueInput | AdviceWhereUniqueInput[]
    update?: AdviceUpdateWithWhereUniqueWithoutUserInput | AdviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdviceUpdateManyWithWhereWithoutUserInput | AdviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdviceScalarWhereInput | AdviceScalarWhereInput[]
  }

  export type FarmUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput> | FarmCreateWithoutOwnerInput[] | FarmUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutOwnerInput | FarmCreateOrConnectWithoutOwnerInput[]
    upsert?: FarmUpsertWithWhereUniqueWithoutOwnerInput | FarmUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: FarmCreateManyOwnerInputEnvelope
    set?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    disconnect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    delete?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    update?: FarmUpdateWithWhereUniqueWithoutOwnerInput | FarmUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: FarmUpdateManyWithWhereWithoutOwnerInput | FarmUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: FarmScalarWhereInput | FarmScalarWhereInput[]
  }

  export type CropCycleCreateNestedManyWithoutFarmInput = {
    create?: XOR<CropCycleCreateWithoutFarmInput, CropCycleUncheckedCreateWithoutFarmInput> | CropCycleCreateWithoutFarmInput[] | CropCycleUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: CropCycleCreateOrConnectWithoutFarmInput | CropCycleCreateOrConnectWithoutFarmInput[]
    createMany?: CropCycleCreateManyFarmInputEnvelope
    connect?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutFarmsInput = {
    create?: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFarmsInput
    connect?: UserWhereUniqueInput
  }

  export type CropCycleUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<CropCycleCreateWithoutFarmInput, CropCycleUncheckedCreateWithoutFarmInput> | CropCycleCreateWithoutFarmInput[] | CropCycleUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: CropCycleCreateOrConnectWithoutFarmInput | CropCycleCreateOrConnectWithoutFarmInput[]
    createMany?: CropCycleCreateManyFarmInputEnvelope
    connect?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CropCycleUpdateManyWithoutFarmNestedInput = {
    create?: XOR<CropCycleCreateWithoutFarmInput, CropCycleUncheckedCreateWithoutFarmInput> | CropCycleCreateWithoutFarmInput[] | CropCycleUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: CropCycleCreateOrConnectWithoutFarmInput | CropCycleCreateOrConnectWithoutFarmInput[]
    upsert?: CropCycleUpsertWithWhereUniqueWithoutFarmInput | CropCycleUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: CropCycleCreateManyFarmInputEnvelope
    set?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
    disconnect?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
    delete?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
    connect?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
    update?: CropCycleUpdateWithWhereUniqueWithoutFarmInput | CropCycleUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: CropCycleUpdateManyWithWhereWithoutFarmInput | CropCycleUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: CropCycleScalarWhereInput | CropCycleScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutFarmsNestedInput = {
    create?: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFarmsInput
    upsert?: UserUpsertWithoutFarmsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFarmsInput, UserUpdateWithoutFarmsInput>, UserUncheckedUpdateWithoutFarmsInput>
  }

  export type CropCycleUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<CropCycleCreateWithoutFarmInput, CropCycleUncheckedCreateWithoutFarmInput> | CropCycleCreateWithoutFarmInput[] | CropCycleUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: CropCycleCreateOrConnectWithoutFarmInput | CropCycleCreateOrConnectWithoutFarmInput[]
    upsert?: CropCycleUpsertWithWhereUniqueWithoutFarmInput | CropCycleUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: CropCycleCreateManyFarmInputEnvelope
    set?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
    disconnect?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
    delete?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
    connect?: CropCycleWhereUniqueInput | CropCycleWhereUniqueInput[]
    update?: CropCycleUpdateWithWhereUniqueWithoutFarmInput | CropCycleUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: CropCycleUpdateManyWithWhereWithoutFarmInput | CropCycleUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: CropCycleScalarWhereInput | CropCycleScalarWhereInput[]
  }

  export type FarmCreateNestedOneWithoutCropCyclesInput = {
    create?: XOR<FarmCreateWithoutCropCyclesInput, FarmUncheckedCreateWithoutCropCyclesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutCropCyclesInput
    connect?: FarmWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutCropInput = {
    create?: XOR<TaskCreateWithoutCropInput, TaskUncheckedCreateWithoutCropInput> | TaskCreateWithoutCropInput[] | TaskUncheckedCreateWithoutCropInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCropInput | TaskCreateOrConnectWithoutCropInput[]
    createMany?: TaskCreateManyCropInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutCropInput = {
    create?: XOR<TaskCreateWithoutCropInput, TaskUncheckedCreateWithoutCropInput> | TaskCreateWithoutCropInput[] | TaskUncheckedCreateWithoutCropInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCropInput | TaskCreateOrConnectWithoutCropInput[]
    createMany?: TaskCreateManyCropInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FarmUpdateOneRequiredWithoutCropCyclesNestedInput = {
    create?: XOR<FarmCreateWithoutCropCyclesInput, FarmUncheckedCreateWithoutCropCyclesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutCropCyclesInput
    upsert?: FarmUpsertWithoutCropCyclesInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutCropCyclesInput, FarmUpdateWithoutCropCyclesInput>, FarmUncheckedUpdateWithoutCropCyclesInput>
  }

  export type TaskUpdateManyWithoutCropNestedInput = {
    create?: XOR<TaskCreateWithoutCropInput, TaskUncheckedCreateWithoutCropInput> | TaskCreateWithoutCropInput[] | TaskUncheckedCreateWithoutCropInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCropInput | TaskCreateOrConnectWithoutCropInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCropInput | TaskUpsertWithWhereUniqueWithoutCropInput[]
    createMany?: TaskCreateManyCropInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCropInput | TaskUpdateWithWhereUniqueWithoutCropInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCropInput | TaskUpdateManyWithWhereWithoutCropInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutCropNestedInput = {
    create?: XOR<TaskCreateWithoutCropInput, TaskUncheckedCreateWithoutCropInput> | TaskCreateWithoutCropInput[] | TaskUncheckedCreateWithoutCropInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCropInput | TaskCreateOrConnectWithoutCropInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCropInput | TaskUpsertWithWhereUniqueWithoutCropInput[]
    createMany?: TaskCreateManyCropInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCropInput | TaskUpdateWithWhereUniqueWithoutCropInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCropInput | TaskUpdateManyWithWhereWithoutCropInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CropCycleCreateNestedOneWithoutTasksInput = {
    create?: XOR<CropCycleCreateWithoutTasksInput, CropCycleUncheckedCreateWithoutTasksInput>
    connectOrCreate?: CropCycleCreateOrConnectWithoutTasksInput
    connect?: CropCycleWhereUniqueInput
  }

  export type CropCycleUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<CropCycleCreateWithoutTasksInput, CropCycleUncheckedCreateWithoutTasksInput>
    connectOrCreate?: CropCycleCreateOrConnectWithoutTasksInput
    upsert?: CropCycleUpsertWithoutTasksInput
    connect?: CropCycleWhereUniqueInput
    update?: XOR<XOR<CropCycleUpdateToOneWithWhereWithoutTasksInput, CropCycleUpdateWithoutTasksInput>, CropCycleUncheckedUpdateWithoutTasksInput>
  }

  export type UserCreateNestedOneWithoutAdviceInput = {
    create?: XOR<UserCreateWithoutAdviceInput, UserUncheckedCreateWithoutAdviceInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdviceInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAdviceNestedInput = {
    create?: XOR<UserCreateWithoutAdviceInput, UserUncheckedCreateWithoutAdviceInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdviceInput
    upsert?: UserUpsertWithoutAdviceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdviceInput, UserUpdateWithoutAdviceInput>, UserUncheckedUpdateWithoutAdviceInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AdviceCreateWithoutUserInput = {
    id?: string
    message: string
    createdAt?: Date | string
  }

  export type AdviceUncheckedCreateWithoutUserInput = {
    id?: string
    message: string
    createdAt?: Date | string
  }

  export type AdviceCreateOrConnectWithoutUserInput = {
    where: AdviceWhereUniqueInput
    create: XOR<AdviceCreateWithoutUserInput, AdviceUncheckedCreateWithoutUserInput>
  }

  export type AdviceCreateManyUserInputEnvelope = {
    data: AdviceCreateManyUserInput | AdviceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FarmCreateWithoutOwnerInput = {
    id?: string
    name: string
    size?: number | null
    unit?: string | null
    type?: string | null
    location: string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: string | null
    cropType?: string | null
    createdAt?: Date | string
    cropCycles?: CropCycleCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    size?: number | null
    unit?: string | null
    type?: string | null
    location: string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: string | null
    cropType?: string | null
    createdAt?: Date | string
    cropCycles?: CropCycleUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutOwnerInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput>
  }

  export type FarmCreateManyOwnerInputEnvelope = {
    data: FarmCreateManyOwnerInput | FarmCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type AdviceUpsertWithWhereUniqueWithoutUserInput = {
    where: AdviceWhereUniqueInput
    update: XOR<AdviceUpdateWithoutUserInput, AdviceUncheckedUpdateWithoutUserInput>
    create: XOR<AdviceCreateWithoutUserInput, AdviceUncheckedCreateWithoutUserInput>
  }

  export type AdviceUpdateWithWhereUniqueWithoutUserInput = {
    where: AdviceWhereUniqueInput
    data: XOR<AdviceUpdateWithoutUserInput, AdviceUncheckedUpdateWithoutUserInput>
  }

  export type AdviceUpdateManyWithWhereWithoutUserInput = {
    where: AdviceScalarWhereInput
    data: XOR<AdviceUpdateManyMutationInput, AdviceUncheckedUpdateManyWithoutUserInput>
  }

  export type AdviceScalarWhereInput = {
    AND?: AdviceScalarWhereInput | AdviceScalarWhereInput[]
    OR?: AdviceScalarWhereInput[]
    NOT?: AdviceScalarWhereInput | AdviceScalarWhereInput[]
    id?: StringFilter<"Advice"> | string
    message?: StringFilter<"Advice"> | string
    createdAt?: DateTimeFilter<"Advice"> | Date | string
    userId?: StringFilter<"Advice"> | string
  }

  export type FarmUpsertWithWhereUniqueWithoutOwnerInput = {
    where: FarmWhereUniqueInput
    update: XOR<FarmUpdateWithoutOwnerInput, FarmUncheckedUpdateWithoutOwnerInput>
    create: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput>
  }

  export type FarmUpdateWithWhereUniqueWithoutOwnerInput = {
    where: FarmWhereUniqueInput
    data: XOR<FarmUpdateWithoutOwnerInput, FarmUncheckedUpdateWithoutOwnerInput>
  }

  export type FarmUpdateManyWithWhereWithoutOwnerInput = {
    where: FarmScalarWhereInput
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyWithoutOwnerInput>
  }

  export type FarmScalarWhereInput = {
    AND?: FarmScalarWhereInput | FarmScalarWhereInput[]
    OR?: FarmScalarWhereInput[]
    NOT?: FarmScalarWhereInput | FarmScalarWhereInput[]
    id?: StringFilter<"Farm"> | string
    name?: StringFilter<"Farm"> | string
    size?: FloatNullableFilter<"Farm"> | number | null
    unit?: StringNullableFilter<"Farm"> | string | null
    type?: StringNullableFilter<"Farm"> | string | null
    location?: StringFilter<"Farm"> | string
    crops?: JsonNullableFilter<"Farm">
    notes?: StringNullableFilter<"Farm"> | string | null
    ownerId?: StringFilter<"Farm"> | string
    cropType?: StringNullableFilter<"Farm"> | string | null
    createdAt?: DateTimeFilter<"Farm"> | Date | string
  }

  export type CropCycleCreateWithoutFarmInput = {
    id?: string
    cropName: string
    plantingDate: Date | string
    harvestDate?: Date | string | null
    status: string
    tasks?: TaskCreateNestedManyWithoutCropInput
  }

  export type CropCycleUncheckedCreateWithoutFarmInput = {
    id?: string
    cropName: string
    plantingDate: Date | string
    harvestDate?: Date | string | null
    status: string
    tasks?: TaskUncheckedCreateNestedManyWithoutCropInput
  }

  export type CropCycleCreateOrConnectWithoutFarmInput = {
    where: CropCycleWhereUniqueInput
    create: XOR<CropCycleCreateWithoutFarmInput, CropCycleUncheckedCreateWithoutFarmInput>
  }

  export type CropCycleCreateManyFarmInputEnvelope = {
    data: CropCycleCreateManyFarmInput | CropCycleCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutFarmsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    location?: string | null
    advice?: AdviceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFarmsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    location?: string | null
    advice?: AdviceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFarmsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
  }

  export type CropCycleUpsertWithWhereUniqueWithoutFarmInput = {
    where: CropCycleWhereUniqueInput
    update: XOR<CropCycleUpdateWithoutFarmInput, CropCycleUncheckedUpdateWithoutFarmInput>
    create: XOR<CropCycleCreateWithoutFarmInput, CropCycleUncheckedCreateWithoutFarmInput>
  }

  export type CropCycleUpdateWithWhereUniqueWithoutFarmInput = {
    where: CropCycleWhereUniqueInput
    data: XOR<CropCycleUpdateWithoutFarmInput, CropCycleUncheckedUpdateWithoutFarmInput>
  }

  export type CropCycleUpdateManyWithWhereWithoutFarmInput = {
    where: CropCycleScalarWhereInput
    data: XOR<CropCycleUpdateManyMutationInput, CropCycleUncheckedUpdateManyWithoutFarmInput>
  }

  export type CropCycleScalarWhereInput = {
    AND?: CropCycleScalarWhereInput | CropCycleScalarWhereInput[]
    OR?: CropCycleScalarWhereInput[]
    NOT?: CropCycleScalarWhereInput | CropCycleScalarWhereInput[]
    id?: StringFilter<"CropCycle"> | string
    cropName?: StringFilter<"CropCycle"> | string
    plantingDate?: DateTimeFilter<"CropCycle"> | Date | string
    harvestDate?: DateTimeNullableFilter<"CropCycle"> | Date | string | null
    status?: StringFilter<"CropCycle"> | string
    farmId?: StringFilter<"CropCycle"> | string
  }

  export type UserUpsertWithoutFarmsInput = {
    update: XOR<UserUpdateWithoutFarmsInput, UserUncheckedUpdateWithoutFarmsInput>
    create: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFarmsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFarmsInput, UserUncheckedUpdateWithoutFarmsInput>
  }

  export type UserUpdateWithoutFarmsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    advice?: AdviceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFarmsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    advice?: AdviceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FarmCreateWithoutCropCyclesInput = {
    id?: string
    name: string
    size?: number | null
    unit?: string | null
    type?: string | null
    location: string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: string | null
    cropType?: string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutFarmsInput
  }

  export type FarmUncheckedCreateWithoutCropCyclesInput = {
    id?: string
    name: string
    size?: number | null
    unit?: string | null
    type?: string | null
    location: string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: string | null
    ownerId: string
    cropType?: string | null
    createdAt?: Date | string
  }

  export type FarmCreateOrConnectWithoutCropCyclesInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutCropCyclesInput, FarmUncheckedCreateWithoutCropCyclesInput>
  }

  export type TaskCreateWithoutCropInput = {
    id?: string
    title: string
    dueDate: Date | string
    status: string
  }

  export type TaskUncheckedCreateWithoutCropInput = {
    id?: string
    title: string
    dueDate: Date | string
    status: string
  }

  export type TaskCreateOrConnectWithoutCropInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCropInput, TaskUncheckedCreateWithoutCropInput>
  }

  export type TaskCreateManyCropInputEnvelope = {
    data: TaskCreateManyCropInput | TaskCreateManyCropInput[]
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithoutCropCyclesInput = {
    update: XOR<FarmUpdateWithoutCropCyclesInput, FarmUncheckedUpdateWithoutCropCyclesInput>
    create: XOR<FarmCreateWithoutCropCyclesInput, FarmUncheckedCreateWithoutCropCyclesInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutCropCyclesInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutCropCyclesInput, FarmUncheckedUpdateWithoutCropCyclesInput>
  }

  export type FarmUpdateWithoutCropCyclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutFarmsNestedInput
  }

  export type FarmUncheckedUpdateWithoutCropCyclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    cropType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutCropInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutCropInput, TaskUncheckedUpdateWithoutCropInput>
    create: XOR<TaskCreateWithoutCropInput, TaskUncheckedCreateWithoutCropInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutCropInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutCropInput, TaskUncheckedUpdateWithoutCropInput>
  }

  export type TaskUpdateManyWithWhereWithoutCropInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutCropInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    dueDate?: DateTimeFilter<"Task"> | Date | string
    status?: StringFilter<"Task"> | string
    cropId?: StringFilter<"Task"> | string
  }

  export type CropCycleCreateWithoutTasksInput = {
    id?: string
    cropName: string
    plantingDate: Date | string
    harvestDate?: Date | string | null
    status: string
    farm: FarmCreateNestedOneWithoutCropCyclesInput
  }

  export type CropCycleUncheckedCreateWithoutTasksInput = {
    id?: string
    cropName: string
    plantingDate: Date | string
    harvestDate?: Date | string | null
    status: string
    farmId: string
  }

  export type CropCycleCreateOrConnectWithoutTasksInput = {
    where: CropCycleWhereUniqueInput
    create: XOR<CropCycleCreateWithoutTasksInput, CropCycleUncheckedCreateWithoutTasksInput>
  }

  export type CropCycleUpsertWithoutTasksInput = {
    update: XOR<CropCycleUpdateWithoutTasksInput, CropCycleUncheckedUpdateWithoutTasksInput>
    create: XOR<CropCycleCreateWithoutTasksInput, CropCycleUncheckedCreateWithoutTasksInput>
    where?: CropCycleWhereInput
  }

  export type CropCycleUpdateToOneWithWhereWithoutTasksInput = {
    where?: CropCycleWhereInput
    data: XOR<CropCycleUpdateWithoutTasksInput, CropCycleUncheckedUpdateWithoutTasksInput>
  }

  export type CropCycleUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropName?: StringFieldUpdateOperationsInput | string
    plantingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    farm?: FarmUpdateOneRequiredWithoutCropCyclesNestedInput
  }

  export type CropCycleUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropName?: StringFieldUpdateOperationsInput | string
    plantingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutAdviceInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    location?: string | null
    farms?: FarmCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutAdviceInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    location?: string | null
    farms?: FarmUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutAdviceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdviceInput, UserUncheckedCreateWithoutAdviceInput>
  }

  export type UserUpsertWithoutAdviceInput = {
    update: XOR<UserUpdateWithoutAdviceInput, UserUncheckedUpdateWithoutAdviceInput>
    create: XOR<UserCreateWithoutAdviceInput, UserUncheckedCreateWithoutAdviceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdviceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdviceInput, UserUncheckedUpdateWithoutAdviceInput>
  }

  export type UserUpdateWithoutAdviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    farms?: FarmUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutAdviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    farms?: FarmUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type AdviceCreateManyUserInput = {
    id?: string
    message: string
    createdAt?: Date | string
  }

  export type FarmCreateManyOwnerInput = {
    id?: string
    name: string
    size?: number | null
    unit?: string | null
    type?: string | null
    location: string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: string | null
    cropType?: string | null
    createdAt?: Date | string
  }

  export type AdviceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdviceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdviceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cropCycles?: CropCycleUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cropCycles?: CropCycleUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    crops?: NullableJsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CropCycleCreateManyFarmInput = {
    id?: string
    cropName: string
    plantingDate: Date | string
    harvestDate?: Date | string | null
    status: string
  }

  export type CropCycleUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropName?: StringFieldUpdateOperationsInput | string
    plantingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutCropNestedInput
  }

  export type CropCycleUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropName?: StringFieldUpdateOperationsInput | string
    plantingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutCropNestedInput
  }

  export type CropCycleUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropName?: StringFieldUpdateOperationsInput | string
    plantingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateManyCropInput = {
    id?: string
    title: string
    dueDate: Date | string
    status: string
  }

  export type TaskUpdateWithoutCropInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUncheckedUpdateWithoutCropInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUncheckedUpdateManyWithoutCropInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}