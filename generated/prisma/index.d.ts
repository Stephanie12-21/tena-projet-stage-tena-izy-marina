
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
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>
/**
 * Model DriverProfile
 * 
 */
export type DriverProfile = $Result.DefaultSelection<Prisma.$DriverProfilePayload>
/**
 * Model DriverLicense
 * 
 */
export type DriverLicense = $Result.DefaultSelection<Prisma.$DriverLicensePayload>
/**
 * Model Children
 * 
 */
export type Children = $Result.DefaultSelection<Prisma.$ChildrenPayload>
/**
 * Model School
 * 
 */
export type School = $Result.DefaultSelection<Prisma.$SchoolPayload>
/**
 * Model Image
 * 
 */
export type Image = $Result.DefaultSelection<Prisma.$ImagePayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Bus
 * 
 */
export type Bus = $Result.DefaultSelection<Prisma.$BusPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  PARENT: 'PARENT',
  ADMIN: 'ADMIN',
  DRIVER: 'DRIVER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const LicenseType: {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E'
};

export type LicenseType = (typeof LicenseType)[keyof typeof LicenseType]


export const Plan: {
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY'
};

export type Plan = (typeof Plan)[keyof typeof Plan]


export const BusStatus: {
  ACTIF: 'ACTIF',
  MAINTENANCE: 'MAINTENANCE'
};

export type BusStatus = (typeof BusStatus)[keyof typeof BusStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type LicenseType = $Enums.LicenseType

export const LicenseType: typeof $Enums.LicenseType

export type Plan = $Enums.Plan

export const Plan: typeof $Enums.Plan

export type BusStatus = $Enums.BusStatus

export const BusStatus: typeof $Enums.BusStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
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
   * const users = await prisma.users.findMany()
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
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.driverProfile`: Exposes CRUD operations for the **DriverProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DriverProfiles
    * const driverProfiles = await prisma.driverProfile.findMany()
    * ```
    */
  get driverProfile(): Prisma.DriverProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.driverLicense`: Exposes CRUD operations for the **DriverLicense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DriverLicenses
    * const driverLicenses = await prisma.driverLicense.findMany()
    * ```
    */
  get driverLicense(): Prisma.DriverLicenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.children`: Exposes CRUD operations for the **Children** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Children
    * const children = await prisma.children.findMany()
    * ```
    */
  get children(): Prisma.ChildrenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.school`: Exposes CRUD operations for the **School** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schools
    * const schools = await prisma.school.findMany()
    * ```
    */
  get school(): Prisma.SchoolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.image`: Exposes CRUD operations for the **Image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.ImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bus`: Exposes CRUD operations for the **Bus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Buses
    * const buses = await prisma.bus.findMany()
    * ```
    */
  get bus(): Prisma.BusDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Users: 'Users',
    DriverProfile: 'DriverProfile',
    DriverLicense: 'DriverLicense',
    Children: 'Children',
    School: 'School',
    Image: 'Image',
    Subscription: 'Subscription',
    Bus: 'Bus'
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
      modelProps: "users" | "driverProfile" | "driverLicense" | "children" | "school" | "image" | "subscription" | "bus"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      DriverProfile: {
        payload: Prisma.$DriverProfilePayload<ExtArgs>
        fields: Prisma.DriverProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          findFirst: {
            args: Prisma.DriverProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          findMany: {
            args: Prisma.DriverProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>[]
          }
          create: {
            args: Prisma.DriverProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          createMany: {
            args: Prisma.DriverProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>[]
          }
          delete: {
            args: Prisma.DriverProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          update: {
            args: Prisma.DriverProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          deleteMany: {
            args: Prisma.DriverProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriverProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>[]
          }
          upsert: {
            args: Prisma.DriverProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          aggregate: {
            args: Prisma.DriverProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriverProfile>
          }
          groupBy: {
            args: Prisma.DriverProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverProfileCountArgs<ExtArgs>
            result: $Utils.Optional<DriverProfileCountAggregateOutputType> | number
          }
        }
      }
      DriverLicense: {
        payload: Prisma.$DriverLicensePayload<ExtArgs>
        fields: Prisma.DriverLicenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverLicenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverLicenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload>
          }
          findFirst: {
            args: Prisma.DriverLicenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverLicenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload>
          }
          findMany: {
            args: Prisma.DriverLicenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload>[]
          }
          create: {
            args: Prisma.DriverLicenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload>
          }
          createMany: {
            args: Prisma.DriverLicenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverLicenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload>[]
          }
          delete: {
            args: Prisma.DriverLicenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload>
          }
          update: {
            args: Prisma.DriverLicenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload>
          }
          deleteMany: {
            args: Prisma.DriverLicenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverLicenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriverLicenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload>[]
          }
          upsert: {
            args: Prisma.DriverLicenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverLicensePayload>
          }
          aggregate: {
            args: Prisma.DriverLicenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriverLicense>
          }
          groupBy: {
            args: Prisma.DriverLicenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverLicenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverLicenseCountArgs<ExtArgs>
            result: $Utils.Optional<DriverLicenseCountAggregateOutputType> | number
          }
        }
      }
      Children: {
        payload: Prisma.$ChildrenPayload<ExtArgs>
        fields: Prisma.ChildrenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChildrenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChildrenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload>
          }
          findFirst: {
            args: Prisma.ChildrenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChildrenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload>
          }
          findMany: {
            args: Prisma.ChildrenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload>[]
          }
          create: {
            args: Prisma.ChildrenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload>
          }
          createMany: {
            args: Prisma.ChildrenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChildrenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload>[]
          }
          delete: {
            args: Prisma.ChildrenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload>
          }
          update: {
            args: Prisma.ChildrenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload>
          }
          deleteMany: {
            args: Prisma.ChildrenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChildrenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChildrenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload>[]
          }
          upsert: {
            args: Prisma.ChildrenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChildrenPayload>
          }
          aggregate: {
            args: Prisma.ChildrenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChildren>
          }
          groupBy: {
            args: Prisma.ChildrenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChildrenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChildrenCountArgs<ExtArgs>
            result: $Utils.Optional<ChildrenCountAggregateOutputType> | number
          }
        }
      }
      School: {
        payload: Prisma.$SchoolPayload<ExtArgs>
        fields: Prisma.SchoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findFirst: {
            args: Prisma.SchoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findMany: {
            args: Prisma.SchoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          create: {
            args: Prisma.SchoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          createMany: {
            args: Prisma.SchoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          delete: {
            args: Prisma.SchoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          update: {
            args: Prisma.SchoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          deleteMany: {
            args: Prisma.SchoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SchoolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          upsert: {
            args: Prisma.SchoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          aggregate: {
            args: Prisma.SchoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchool>
          }
          groupBy: {
            args: Prisma.SchoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolCountAggregateOutputType> | number
          }
        }
      }
      Image: {
        payload: Prisma.$ImagePayload<ExtArgs>
        fields: Prisma.ImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findFirst: {
            args: Prisma.ImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findMany: {
            args: Prisma.ImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          create: {
            args: Prisma.ImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          createMany: {
            args: Prisma.ImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          delete: {
            args: Prisma.ImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          update: {
            args: Prisma.ImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          deleteMany: {
            args: Prisma.ImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          upsert: {
            args: Prisma.ImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          aggregate: {
            args: Prisma.ImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImage>
          }
          groupBy: {
            args: Prisma.ImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImageCountArgs<ExtArgs>
            result: $Utils.Optional<ImageCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Bus: {
        payload: Prisma.$BusPayload<ExtArgs>
        fields: Prisma.BusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload>
          }
          findFirst: {
            args: Prisma.BusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload>
          }
          findMany: {
            args: Prisma.BusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload>[]
          }
          create: {
            args: Prisma.BusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload>
          }
          createMany: {
            args: Prisma.BusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload>[]
          }
          delete: {
            args: Prisma.BusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload>
          }
          update: {
            args: Prisma.BusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload>
          }
          deleteMany: {
            args: Prisma.BusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload>[]
          }
          upsert: {
            args: Prisma.BusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusPayload>
          }
          aggregate: {
            args: Prisma.BusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBus>
          }
          groupBy: {
            args: Prisma.BusGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusCountArgs<ExtArgs>
            result: $Utils.Optional<BusCountAggregateOutputType> | number
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
    users?: UsersOmit
    driverProfile?: DriverProfileOmit
    driverLicense?: DriverLicenseOmit
    children?: ChildrenOmit
    school?: SchoolOmit
    image?: ImageOmit
    subscription?: SubscriptionOmit
    bus?: BusOmit
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
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    children: number
    subscriptions: number
    buses: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | UsersCountOutputTypeCountChildrenArgs
    subscriptions?: boolean | UsersCountOutputTypeCountSubscriptionsArgs
    buses?: boolean | UsersCountOutputTypeCountBusesArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChildrenWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusWhereInput
  }


  /**
   * Count Type SchoolCountOutputType
   */

  export type SchoolCountOutputType = {
    children: number
  }

  export type SchoolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | SchoolCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolCountOutputType
     */
    select?: SchoolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChildrenWhereInput
  }


  /**
   * Count Type SubscriptionCountOutputType
   */

  export type SubscriptionCountOutputType = {
    children: number
  }

  export type SubscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | SubscriptionCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCountOutputType
     */
    select?: SubscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChildrenWhereInput
  }


  /**
   * Count Type BusCountOutputType
   */

  export type BusCountOutputType = {
    children: number
  }

  export type BusCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | BusCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * BusCountOutputType without action
   */
  export type BusCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusCountOutputType
     */
    select?: BusCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BusCountOutputType without action
   */
  export type BusCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChildrenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    phone: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    phone: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    phone: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
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
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    email: string
    phone: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    children?: boolean | Users$childrenArgs<ExtArgs>
    subscriptions?: boolean | Users$subscriptionsArgs<ExtArgs>
    driverProfile?: boolean | Users$driverProfileArgs<ExtArgs>
    buses?: boolean | Users$busesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type UsersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "phone" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["users"]>
  export type UsersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | Users$childrenArgs<ExtArgs>
    subscriptions?: boolean | Users$subscriptionsArgs<ExtArgs>
    driverProfile?: boolean | Users$driverProfileArgs<ExtArgs>
    buses?: boolean | Users$busesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {
      children: Prisma.$ChildrenPayload<ExtArgs>[]
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      driverProfile: Prisma.$DriverProfilePayload<ExtArgs> | null
      buses: Prisma.$BusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      email: string
      phone: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersFindUniqueArgs>(args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersFindFirstArgs>(args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersFindManyArgs>(args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends UsersCreateArgs>(args: SelectSubset<T, UsersCreateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UsersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersCreateManyArgs>(args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UsersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends UsersDeleteArgs>(args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersUpdateArgs>(args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersDeleteManyArgs>(args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersUpdateManyArgs>(args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UsersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
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
    updateManyAndReturn<T extends UsersUpdateManyAndReturnArgs>(args: SelectSubset<T, UsersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends UsersUpsertArgs>(args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
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
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    children<T extends Users$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Users$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends Users$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Users$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    driverProfile<T extends Users$driverProfileArgs<ExtArgs> = {}>(args?: Subset<T, Users$driverProfileArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    buses<T extends Users$busesArgs<ExtArgs> = {}>(args?: Subset<T, Users$busesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Users model
   */
  interface UsersFieldRefs {
    readonly id: FieldRef<"Users", 'String'>
    readonly nom: FieldRef<"Users", 'String'>
    readonly prenom: FieldRef<"Users", 'String'>
    readonly email: FieldRef<"Users", 'String'>
    readonly phone: FieldRef<"Users", 'String'>
    readonly role: FieldRef<"Users", 'Role'>
    readonly createdAt: FieldRef<"Users", 'DateTime'>
    readonly updatedAt: FieldRef<"Users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
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
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
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
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
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
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }

  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users createManyAndReturn
   */
  export type UsersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users updateManyAndReturn
   */
  export type UsersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }

  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * Users.children
   */
  export type Users$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    where?: ChildrenWhereInput
    orderBy?: ChildrenOrderByWithRelationInput | ChildrenOrderByWithRelationInput[]
    cursor?: ChildrenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * Users.subscriptions
   */
  export type Users$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Users.driverProfile
   */
  export type Users$driverProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    where?: DriverProfileWhereInput
  }

  /**
   * Users.buses
   */
  export type Users$busesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    where?: BusWhereInput
    orderBy?: BusOrderByWithRelationInput | BusOrderByWithRelationInput[]
    cursor?: BusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusScalarFieldEnum | BusScalarFieldEnum[]
  }

  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
  }


  /**
   * Model DriverProfile
   */

  export type AggregateDriverProfile = {
    _count: DriverProfileCountAggregateOutputType | null
    _avg: DriverProfileAvgAggregateOutputType | null
    _sum: DriverProfileSumAggregateOutputType | null
    _min: DriverProfileMinAggregateOutputType | null
    _max: DriverProfileMaxAggregateOutputType | null
  }

  export type DriverProfileAvgAggregateOutputType = {
    currentLat: number | null
    currentLong: number | null
  }

  export type DriverProfileSumAggregateOutputType = {
    currentLat: number | null
    currentLong: number | null
  }

  export type DriverProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    currentLat: number | null
    currentLong: number | null
    imageId: string | null
    licenseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    currentLat: number | null
    currentLong: number | null
    imageId: string | null
    licenseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverProfileCountAggregateOutputType = {
    id: number
    userId: number
    currentLat: number
    currentLong: number
    imageId: number
    licenseId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DriverProfileAvgAggregateInputType = {
    currentLat?: true
    currentLong?: true
  }

  export type DriverProfileSumAggregateInputType = {
    currentLat?: true
    currentLong?: true
  }

  export type DriverProfileMinAggregateInputType = {
    id?: true
    userId?: true
    currentLat?: true
    currentLong?: true
    imageId?: true
    licenseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    currentLat?: true
    currentLong?: true
    imageId?: true
    licenseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverProfileCountAggregateInputType = {
    id?: true
    userId?: true
    currentLat?: true
    currentLong?: true
    imageId?: true
    licenseId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DriverProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriverProfile to aggregate.
     */
    where?: DriverProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverProfiles to fetch.
     */
    orderBy?: DriverProfileOrderByWithRelationInput | DriverProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DriverProfiles
    **/
    _count?: true | DriverProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DriverProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DriverProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverProfileMaxAggregateInputType
  }

  export type GetDriverProfileAggregateType<T extends DriverProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateDriverProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriverProfile[P]>
      : GetScalarType<T[P], AggregateDriverProfile[P]>
  }




  export type DriverProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverProfileWhereInput
    orderBy?: DriverProfileOrderByWithAggregationInput | DriverProfileOrderByWithAggregationInput[]
    by: DriverProfileScalarFieldEnum[] | DriverProfileScalarFieldEnum
    having?: DriverProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverProfileCountAggregateInputType | true
    _avg?: DriverProfileAvgAggregateInputType
    _sum?: DriverProfileSumAggregateInputType
    _min?: DriverProfileMinAggregateInputType
    _max?: DriverProfileMaxAggregateInputType
  }

  export type DriverProfileGroupByOutputType = {
    id: string
    userId: string
    currentLat: number | null
    currentLong: number | null
    imageId: string | null
    licenseId: string | null
    createdAt: Date
    updatedAt: Date
    _count: DriverProfileCountAggregateOutputType | null
    _avg: DriverProfileAvgAggregateOutputType | null
    _sum: DriverProfileSumAggregateOutputType | null
    _min: DriverProfileMinAggregateOutputType | null
    _max: DriverProfileMaxAggregateOutputType | null
  }

  type GetDriverProfileGroupByPayload<T extends DriverProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverProfileGroupByOutputType[P]>
            : GetScalarType<T[P], DriverProfileGroupByOutputType[P]>
        }
      >
    >


  export type DriverProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    currentLat?: boolean
    currentLong?: boolean
    imageId?: boolean
    licenseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    image?: boolean | DriverProfile$imageArgs<ExtArgs>
    license?: boolean | DriverProfile$licenseArgs<ExtArgs>
  }, ExtArgs["result"]["driverProfile"]>

  export type DriverProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    currentLat?: boolean
    currentLong?: boolean
    imageId?: boolean
    licenseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    image?: boolean | DriverProfile$imageArgs<ExtArgs>
    license?: boolean | DriverProfile$licenseArgs<ExtArgs>
  }, ExtArgs["result"]["driverProfile"]>

  export type DriverProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    currentLat?: boolean
    currentLong?: boolean
    imageId?: boolean
    licenseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    image?: boolean | DriverProfile$imageArgs<ExtArgs>
    license?: boolean | DriverProfile$licenseArgs<ExtArgs>
  }, ExtArgs["result"]["driverProfile"]>

  export type DriverProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    currentLat?: boolean
    currentLong?: boolean
    imageId?: boolean
    licenseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DriverProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "currentLat" | "currentLong" | "imageId" | "licenseId" | "createdAt" | "updatedAt", ExtArgs["result"]["driverProfile"]>
  export type DriverProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    image?: boolean | DriverProfile$imageArgs<ExtArgs>
    license?: boolean | DriverProfile$licenseArgs<ExtArgs>
  }
  export type DriverProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    image?: boolean | DriverProfile$imageArgs<ExtArgs>
    license?: boolean | DriverProfile$licenseArgs<ExtArgs>
  }
  export type DriverProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    image?: boolean | DriverProfile$imageArgs<ExtArgs>
    license?: boolean | DriverProfile$licenseArgs<ExtArgs>
  }

  export type $DriverProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DriverProfile"
    objects: {
      user: Prisma.$UsersPayload<ExtArgs>
      image: Prisma.$ImagePayload<ExtArgs> | null
      license: Prisma.$DriverLicensePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      currentLat: number | null
      currentLong: number | null
      imageId: string | null
      licenseId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["driverProfile"]>
    composites: {}
  }

  type DriverProfileGetPayload<S extends boolean | null | undefined | DriverProfileDefaultArgs> = $Result.GetResult<Prisma.$DriverProfilePayload, S>

  type DriverProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriverProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriverProfileCountAggregateInputType | true
    }

  export interface DriverProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DriverProfile'], meta: { name: 'DriverProfile' } }
    /**
     * Find zero or one DriverProfile that matches the filter.
     * @param {DriverProfileFindUniqueArgs} args - Arguments to find a DriverProfile
     * @example
     * // Get one DriverProfile
     * const driverProfile = await prisma.driverProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverProfileFindUniqueArgs>(args: SelectSubset<T, DriverProfileFindUniqueArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DriverProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriverProfileFindUniqueOrThrowArgs} args - Arguments to find a DriverProfile
     * @example
     * // Get one DriverProfile
     * const driverProfile = await prisma.driverProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriverProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileFindFirstArgs} args - Arguments to find a DriverProfile
     * @example
     * // Get one DriverProfile
     * const driverProfile = await prisma.driverProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverProfileFindFirstArgs>(args?: SelectSubset<T, DriverProfileFindFirstArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriverProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileFindFirstOrThrowArgs} args - Arguments to find a DriverProfile
     * @example
     * // Get one DriverProfile
     * const driverProfile = await prisma.driverProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DriverProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DriverProfiles
     * const driverProfiles = await prisma.driverProfile.findMany()
     * 
     * // Get first 10 DriverProfiles
     * const driverProfiles = await prisma.driverProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverProfileWithIdOnly = await prisma.driverProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverProfileFindManyArgs>(args?: SelectSubset<T, DriverProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DriverProfile.
     * @param {DriverProfileCreateArgs} args - Arguments to create a DriverProfile.
     * @example
     * // Create one DriverProfile
     * const DriverProfile = await prisma.driverProfile.create({
     *   data: {
     *     // ... data to create a DriverProfile
     *   }
     * })
     * 
     */
    create<T extends DriverProfileCreateArgs>(args: SelectSubset<T, DriverProfileCreateArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DriverProfiles.
     * @param {DriverProfileCreateManyArgs} args - Arguments to create many DriverProfiles.
     * @example
     * // Create many DriverProfiles
     * const driverProfile = await prisma.driverProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverProfileCreateManyArgs>(args?: SelectSubset<T, DriverProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DriverProfiles and returns the data saved in the database.
     * @param {DriverProfileCreateManyAndReturnArgs} args - Arguments to create many DriverProfiles.
     * @example
     * // Create many DriverProfiles
     * const driverProfile = await prisma.driverProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DriverProfiles and only return the `id`
     * const driverProfileWithIdOnly = await prisma.driverProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DriverProfile.
     * @param {DriverProfileDeleteArgs} args - Arguments to delete one DriverProfile.
     * @example
     * // Delete one DriverProfile
     * const DriverProfile = await prisma.driverProfile.delete({
     *   where: {
     *     // ... filter to delete one DriverProfile
     *   }
     * })
     * 
     */
    delete<T extends DriverProfileDeleteArgs>(args: SelectSubset<T, DriverProfileDeleteArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DriverProfile.
     * @param {DriverProfileUpdateArgs} args - Arguments to update one DriverProfile.
     * @example
     * // Update one DriverProfile
     * const driverProfile = await prisma.driverProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverProfileUpdateArgs>(args: SelectSubset<T, DriverProfileUpdateArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DriverProfiles.
     * @param {DriverProfileDeleteManyArgs} args - Arguments to filter DriverProfiles to delete.
     * @example
     * // Delete a few DriverProfiles
     * const { count } = await prisma.driverProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverProfileDeleteManyArgs>(args?: SelectSubset<T, DriverProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriverProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DriverProfiles
     * const driverProfile = await prisma.driverProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverProfileUpdateManyArgs>(args: SelectSubset<T, DriverProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriverProfiles and returns the data updated in the database.
     * @param {DriverProfileUpdateManyAndReturnArgs} args - Arguments to update many DriverProfiles.
     * @example
     * // Update many DriverProfiles
     * const driverProfile = await prisma.driverProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DriverProfiles and only return the `id`
     * const driverProfileWithIdOnly = await prisma.driverProfile.updateManyAndReturn({
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
    updateManyAndReturn<T extends DriverProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, DriverProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DriverProfile.
     * @param {DriverProfileUpsertArgs} args - Arguments to update or create a DriverProfile.
     * @example
     * // Update or create a DriverProfile
     * const driverProfile = await prisma.driverProfile.upsert({
     *   create: {
     *     // ... data to create a DriverProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DriverProfile we want to update
     *   }
     * })
     */
    upsert<T extends DriverProfileUpsertArgs>(args: SelectSubset<T, DriverProfileUpsertArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DriverProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileCountArgs} args - Arguments to filter DriverProfiles to count.
     * @example
     * // Count the number of DriverProfiles
     * const count = await prisma.driverProfile.count({
     *   where: {
     *     // ... the filter for the DriverProfiles we want to count
     *   }
     * })
    **/
    count<T extends DriverProfileCountArgs>(
      args?: Subset<T, DriverProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DriverProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DriverProfileAggregateArgs>(args: Subset<T, DriverProfileAggregateArgs>): Prisma.PrismaPromise<GetDriverProfileAggregateType<T>>

    /**
     * Group by DriverProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileGroupByArgs} args - Group by arguments.
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
      T extends DriverProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverProfileGroupByArgs['orderBy'] }
        : { orderBy?: DriverProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DriverProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DriverProfile model
   */
  readonly fields: DriverProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DriverProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    image<T extends DriverProfile$imageArgs<ExtArgs> = {}>(args?: Subset<T, DriverProfile$imageArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    license<T extends DriverProfile$licenseArgs<ExtArgs> = {}>(args?: Subset<T, DriverProfile$licenseArgs<ExtArgs>>): Prisma__DriverLicenseClient<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DriverProfile model
   */
  interface DriverProfileFieldRefs {
    readonly id: FieldRef<"DriverProfile", 'String'>
    readonly userId: FieldRef<"DriverProfile", 'String'>
    readonly currentLat: FieldRef<"DriverProfile", 'Float'>
    readonly currentLong: FieldRef<"DriverProfile", 'Float'>
    readonly imageId: FieldRef<"DriverProfile", 'String'>
    readonly licenseId: FieldRef<"DriverProfile", 'String'>
    readonly createdAt: FieldRef<"DriverProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"DriverProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DriverProfile findUnique
   */
  export type DriverProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfile to fetch.
     */
    where: DriverProfileWhereUniqueInput
  }

  /**
   * DriverProfile findUniqueOrThrow
   */
  export type DriverProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfile to fetch.
     */
    where: DriverProfileWhereUniqueInput
  }

  /**
   * DriverProfile findFirst
   */
  export type DriverProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfile to fetch.
     */
    where?: DriverProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverProfiles to fetch.
     */
    orderBy?: DriverProfileOrderByWithRelationInput | DriverProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriverProfiles.
     */
    cursor?: DriverProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriverProfiles.
     */
    distinct?: DriverProfileScalarFieldEnum | DriverProfileScalarFieldEnum[]
  }

  /**
   * DriverProfile findFirstOrThrow
   */
  export type DriverProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfile to fetch.
     */
    where?: DriverProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverProfiles to fetch.
     */
    orderBy?: DriverProfileOrderByWithRelationInput | DriverProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriverProfiles.
     */
    cursor?: DriverProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriverProfiles.
     */
    distinct?: DriverProfileScalarFieldEnum | DriverProfileScalarFieldEnum[]
  }

  /**
   * DriverProfile findMany
   */
  export type DriverProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfiles to fetch.
     */
    where?: DriverProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverProfiles to fetch.
     */
    orderBy?: DriverProfileOrderByWithRelationInput | DriverProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DriverProfiles.
     */
    cursor?: DriverProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverProfiles.
     */
    skip?: number
    distinct?: DriverProfileScalarFieldEnum | DriverProfileScalarFieldEnum[]
  }

  /**
   * DriverProfile create
   */
  export type DriverProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a DriverProfile.
     */
    data: XOR<DriverProfileCreateInput, DriverProfileUncheckedCreateInput>
  }

  /**
   * DriverProfile createMany
   */
  export type DriverProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DriverProfiles.
     */
    data: DriverProfileCreateManyInput | DriverProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DriverProfile createManyAndReturn
   */
  export type DriverProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * The data used to create many DriverProfiles.
     */
    data: DriverProfileCreateManyInput | DriverProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DriverProfile update
   */
  export type DriverProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a DriverProfile.
     */
    data: XOR<DriverProfileUpdateInput, DriverProfileUncheckedUpdateInput>
    /**
     * Choose, which DriverProfile to update.
     */
    where: DriverProfileWhereUniqueInput
  }

  /**
   * DriverProfile updateMany
   */
  export type DriverProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DriverProfiles.
     */
    data: XOR<DriverProfileUpdateManyMutationInput, DriverProfileUncheckedUpdateManyInput>
    /**
     * Filter which DriverProfiles to update
     */
    where?: DriverProfileWhereInput
    /**
     * Limit how many DriverProfiles to update.
     */
    limit?: number
  }

  /**
   * DriverProfile updateManyAndReturn
   */
  export type DriverProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * The data used to update DriverProfiles.
     */
    data: XOR<DriverProfileUpdateManyMutationInput, DriverProfileUncheckedUpdateManyInput>
    /**
     * Filter which DriverProfiles to update
     */
    where?: DriverProfileWhereInput
    /**
     * Limit how many DriverProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DriverProfile upsert
   */
  export type DriverProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the DriverProfile to update in case it exists.
     */
    where: DriverProfileWhereUniqueInput
    /**
     * In case the DriverProfile found by the `where` argument doesn't exist, create a new DriverProfile with this data.
     */
    create: XOR<DriverProfileCreateInput, DriverProfileUncheckedCreateInput>
    /**
     * In case the DriverProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverProfileUpdateInput, DriverProfileUncheckedUpdateInput>
  }

  /**
   * DriverProfile delete
   */
  export type DriverProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter which DriverProfile to delete.
     */
    where: DriverProfileWhereUniqueInput
  }

  /**
   * DriverProfile deleteMany
   */
  export type DriverProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriverProfiles to delete
     */
    where?: DriverProfileWhereInput
    /**
     * Limit how many DriverProfiles to delete.
     */
    limit?: number
  }

  /**
   * DriverProfile.image
   */
  export type DriverProfile$imageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    where?: ImageWhereInput
  }

  /**
   * DriverProfile.license
   */
  export type DriverProfile$licenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    where?: DriverLicenseWhereInput
  }

  /**
   * DriverProfile without action
   */
  export type DriverProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
  }


  /**
   * Model DriverLicense
   */

  export type AggregateDriverLicense = {
    _count: DriverLicenseCountAggregateOutputType | null
    _min: DriverLicenseMinAggregateOutputType | null
    _max: DriverLicenseMaxAggregateOutputType | null
  }

  export type DriverLicenseMinAggregateOutputType = {
    id: string | null
    licenseNumber: string | null
    licenseType: $Enums.LicenseType | null
    licenseExpiration: Date | null
    photoFront: string | null
    photoBack: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverLicenseMaxAggregateOutputType = {
    id: string | null
    licenseNumber: string | null
    licenseType: $Enums.LicenseType | null
    licenseExpiration: Date | null
    photoFront: string | null
    photoBack: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverLicenseCountAggregateOutputType = {
    id: number
    licenseNumber: number
    licenseType: number
    licenseExpiration: number
    photoFront: number
    photoBack: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DriverLicenseMinAggregateInputType = {
    id?: true
    licenseNumber?: true
    licenseType?: true
    licenseExpiration?: true
    photoFront?: true
    photoBack?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverLicenseMaxAggregateInputType = {
    id?: true
    licenseNumber?: true
    licenseType?: true
    licenseExpiration?: true
    photoFront?: true
    photoBack?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverLicenseCountAggregateInputType = {
    id?: true
    licenseNumber?: true
    licenseType?: true
    licenseExpiration?: true
    photoFront?: true
    photoBack?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DriverLicenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriverLicense to aggregate.
     */
    where?: DriverLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverLicenses to fetch.
     */
    orderBy?: DriverLicenseOrderByWithRelationInput | DriverLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DriverLicenses
    **/
    _count?: true | DriverLicenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverLicenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverLicenseMaxAggregateInputType
  }

  export type GetDriverLicenseAggregateType<T extends DriverLicenseAggregateArgs> = {
        [P in keyof T & keyof AggregateDriverLicense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriverLicense[P]>
      : GetScalarType<T[P], AggregateDriverLicense[P]>
  }




  export type DriverLicenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverLicenseWhereInput
    orderBy?: DriverLicenseOrderByWithAggregationInput | DriverLicenseOrderByWithAggregationInput[]
    by: DriverLicenseScalarFieldEnum[] | DriverLicenseScalarFieldEnum
    having?: DriverLicenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverLicenseCountAggregateInputType | true
    _min?: DriverLicenseMinAggregateInputType
    _max?: DriverLicenseMaxAggregateInputType
  }

  export type DriverLicenseGroupByOutputType = {
    id: string
    licenseNumber: string
    licenseType: $Enums.LicenseType
    licenseExpiration: Date
    photoFront: string | null
    photoBack: string | null
    createdAt: Date
    updatedAt: Date
    _count: DriverLicenseCountAggregateOutputType | null
    _min: DriverLicenseMinAggregateOutputType | null
    _max: DriverLicenseMaxAggregateOutputType | null
  }

  type GetDriverLicenseGroupByPayload<T extends DriverLicenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverLicenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverLicenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverLicenseGroupByOutputType[P]>
            : GetScalarType<T[P], DriverLicenseGroupByOutputType[P]>
        }
      >
    >


  export type DriverLicenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    licenseNumber?: boolean
    licenseType?: boolean
    licenseExpiration?: boolean
    photoFront?: boolean
    photoBack?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driverProfile?: boolean | DriverLicense$driverProfileArgs<ExtArgs>
  }, ExtArgs["result"]["driverLicense"]>

  export type DriverLicenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    licenseNumber?: boolean
    licenseType?: boolean
    licenseExpiration?: boolean
    photoFront?: boolean
    photoBack?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["driverLicense"]>

  export type DriverLicenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    licenseNumber?: boolean
    licenseType?: boolean
    licenseExpiration?: boolean
    photoFront?: boolean
    photoBack?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["driverLicense"]>

  export type DriverLicenseSelectScalar = {
    id?: boolean
    licenseNumber?: boolean
    licenseType?: boolean
    licenseExpiration?: boolean
    photoFront?: boolean
    photoBack?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DriverLicenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "licenseNumber" | "licenseType" | "licenseExpiration" | "photoFront" | "photoBack" | "createdAt" | "updatedAt", ExtArgs["result"]["driverLicense"]>
  export type DriverLicenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driverProfile?: boolean | DriverLicense$driverProfileArgs<ExtArgs>
  }
  export type DriverLicenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DriverLicenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DriverLicensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DriverLicense"
    objects: {
      driverProfile: Prisma.$DriverProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      licenseNumber: string
      licenseType: $Enums.LicenseType
      licenseExpiration: Date
      photoFront: string | null
      photoBack: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["driverLicense"]>
    composites: {}
  }

  type DriverLicenseGetPayload<S extends boolean | null | undefined | DriverLicenseDefaultArgs> = $Result.GetResult<Prisma.$DriverLicensePayload, S>

  type DriverLicenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriverLicenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriverLicenseCountAggregateInputType | true
    }

  export interface DriverLicenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DriverLicense'], meta: { name: 'DriverLicense' } }
    /**
     * Find zero or one DriverLicense that matches the filter.
     * @param {DriverLicenseFindUniqueArgs} args - Arguments to find a DriverLicense
     * @example
     * // Get one DriverLicense
     * const driverLicense = await prisma.driverLicense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverLicenseFindUniqueArgs>(args: SelectSubset<T, DriverLicenseFindUniqueArgs<ExtArgs>>): Prisma__DriverLicenseClient<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DriverLicense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriverLicenseFindUniqueOrThrowArgs} args - Arguments to find a DriverLicense
     * @example
     * // Get one DriverLicense
     * const driverLicense = await prisma.driverLicense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverLicenseFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverLicenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverLicenseClient<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriverLicense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverLicenseFindFirstArgs} args - Arguments to find a DriverLicense
     * @example
     * // Get one DriverLicense
     * const driverLicense = await prisma.driverLicense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverLicenseFindFirstArgs>(args?: SelectSubset<T, DriverLicenseFindFirstArgs<ExtArgs>>): Prisma__DriverLicenseClient<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriverLicense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverLicenseFindFirstOrThrowArgs} args - Arguments to find a DriverLicense
     * @example
     * // Get one DriverLicense
     * const driverLicense = await prisma.driverLicense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverLicenseFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverLicenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverLicenseClient<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DriverLicenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverLicenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DriverLicenses
     * const driverLicenses = await prisma.driverLicense.findMany()
     * 
     * // Get first 10 DriverLicenses
     * const driverLicenses = await prisma.driverLicense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverLicenseWithIdOnly = await prisma.driverLicense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverLicenseFindManyArgs>(args?: SelectSubset<T, DriverLicenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DriverLicense.
     * @param {DriverLicenseCreateArgs} args - Arguments to create a DriverLicense.
     * @example
     * // Create one DriverLicense
     * const DriverLicense = await prisma.driverLicense.create({
     *   data: {
     *     // ... data to create a DriverLicense
     *   }
     * })
     * 
     */
    create<T extends DriverLicenseCreateArgs>(args: SelectSubset<T, DriverLicenseCreateArgs<ExtArgs>>): Prisma__DriverLicenseClient<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DriverLicenses.
     * @param {DriverLicenseCreateManyArgs} args - Arguments to create many DriverLicenses.
     * @example
     * // Create many DriverLicenses
     * const driverLicense = await prisma.driverLicense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverLicenseCreateManyArgs>(args?: SelectSubset<T, DriverLicenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DriverLicenses and returns the data saved in the database.
     * @param {DriverLicenseCreateManyAndReturnArgs} args - Arguments to create many DriverLicenses.
     * @example
     * // Create many DriverLicenses
     * const driverLicense = await prisma.driverLicense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DriverLicenses and only return the `id`
     * const driverLicenseWithIdOnly = await prisma.driverLicense.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverLicenseCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverLicenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DriverLicense.
     * @param {DriverLicenseDeleteArgs} args - Arguments to delete one DriverLicense.
     * @example
     * // Delete one DriverLicense
     * const DriverLicense = await prisma.driverLicense.delete({
     *   where: {
     *     // ... filter to delete one DriverLicense
     *   }
     * })
     * 
     */
    delete<T extends DriverLicenseDeleteArgs>(args: SelectSubset<T, DriverLicenseDeleteArgs<ExtArgs>>): Prisma__DriverLicenseClient<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DriverLicense.
     * @param {DriverLicenseUpdateArgs} args - Arguments to update one DriverLicense.
     * @example
     * // Update one DriverLicense
     * const driverLicense = await prisma.driverLicense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverLicenseUpdateArgs>(args: SelectSubset<T, DriverLicenseUpdateArgs<ExtArgs>>): Prisma__DriverLicenseClient<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DriverLicenses.
     * @param {DriverLicenseDeleteManyArgs} args - Arguments to filter DriverLicenses to delete.
     * @example
     * // Delete a few DriverLicenses
     * const { count } = await prisma.driverLicense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverLicenseDeleteManyArgs>(args?: SelectSubset<T, DriverLicenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriverLicenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverLicenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DriverLicenses
     * const driverLicense = await prisma.driverLicense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverLicenseUpdateManyArgs>(args: SelectSubset<T, DriverLicenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriverLicenses and returns the data updated in the database.
     * @param {DriverLicenseUpdateManyAndReturnArgs} args - Arguments to update many DriverLicenses.
     * @example
     * // Update many DriverLicenses
     * const driverLicense = await prisma.driverLicense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DriverLicenses and only return the `id`
     * const driverLicenseWithIdOnly = await prisma.driverLicense.updateManyAndReturn({
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
    updateManyAndReturn<T extends DriverLicenseUpdateManyAndReturnArgs>(args: SelectSubset<T, DriverLicenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DriverLicense.
     * @param {DriverLicenseUpsertArgs} args - Arguments to update or create a DriverLicense.
     * @example
     * // Update or create a DriverLicense
     * const driverLicense = await prisma.driverLicense.upsert({
     *   create: {
     *     // ... data to create a DriverLicense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DriverLicense we want to update
     *   }
     * })
     */
    upsert<T extends DriverLicenseUpsertArgs>(args: SelectSubset<T, DriverLicenseUpsertArgs<ExtArgs>>): Prisma__DriverLicenseClient<$Result.GetResult<Prisma.$DriverLicensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DriverLicenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverLicenseCountArgs} args - Arguments to filter DriverLicenses to count.
     * @example
     * // Count the number of DriverLicenses
     * const count = await prisma.driverLicense.count({
     *   where: {
     *     // ... the filter for the DriverLicenses we want to count
     *   }
     * })
    **/
    count<T extends DriverLicenseCountArgs>(
      args?: Subset<T, DriverLicenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverLicenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DriverLicense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverLicenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DriverLicenseAggregateArgs>(args: Subset<T, DriverLicenseAggregateArgs>): Prisma.PrismaPromise<GetDriverLicenseAggregateType<T>>

    /**
     * Group by DriverLicense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverLicenseGroupByArgs} args - Group by arguments.
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
      T extends DriverLicenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverLicenseGroupByArgs['orderBy'] }
        : { orderBy?: DriverLicenseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DriverLicenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverLicenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DriverLicense model
   */
  readonly fields: DriverLicenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DriverLicense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverLicenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driverProfile<T extends DriverLicense$driverProfileArgs<ExtArgs> = {}>(args?: Subset<T, DriverLicense$driverProfileArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DriverLicense model
   */
  interface DriverLicenseFieldRefs {
    readonly id: FieldRef<"DriverLicense", 'String'>
    readonly licenseNumber: FieldRef<"DriverLicense", 'String'>
    readonly licenseType: FieldRef<"DriverLicense", 'LicenseType'>
    readonly licenseExpiration: FieldRef<"DriverLicense", 'DateTime'>
    readonly photoFront: FieldRef<"DriverLicense", 'String'>
    readonly photoBack: FieldRef<"DriverLicense", 'String'>
    readonly createdAt: FieldRef<"DriverLicense", 'DateTime'>
    readonly updatedAt: FieldRef<"DriverLicense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DriverLicense findUnique
   */
  export type DriverLicenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DriverLicense to fetch.
     */
    where: DriverLicenseWhereUniqueInput
  }

  /**
   * DriverLicense findUniqueOrThrow
   */
  export type DriverLicenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DriverLicense to fetch.
     */
    where: DriverLicenseWhereUniqueInput
  }

  /**
   * DriverLicense findFirst
   */
  export type DriverLicenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DriverLicense to fetch.
     */
    where?: DriverLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverLicenses to fetch.
     */
    orderBy?: DriverLicenseOrderByWithRelationInput | DriverLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriverLicenses.
     */
    cursor?: DriverLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriverLicenses.
     */
    distinct?: DriverLicenseScalarFieldEnum | DriverLicenseScalarFieldEnum[]
  }

  /**
   * DriverLicense findFirstOrThrow
   */
  export type DriverLicenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DriverLicense to fetch.
     */
    where?: DriverLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverLicenses to fetch.
     */
    orderBy?: DriverLicenseOrderByWithRelationInput | DriverLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriverLicenses.
     */
    cursor?: DriverLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriverLicenses.
     */
    distinct?: DriverLicenseScalarFieldEnum | DriverLicenseScalarFieldEnum[]
  }

  /**
   * DriverLicense findMany
   */
  export type DriverLicenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DriverLicenses to fetch.
     */
    where?: DriverLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverLicenses to fetch.
     */
    orderBy?: DriverLicenseOrderByWithRelationInput | DriverLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DriverLicenses.
     */
    cursor?: DriverLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverLicenses.
     */
    skip?: number
    distinct?: DriverLicenseScalarFieldEnum | DriverLicenseScalarFieldEnum[]
  }

  /**
   * DriverLicense create
   */
  export type DriverLicenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    /**
     * The data needed to create a DriverLicense.
     */
    data: XOR<DriverLicenseCreateInput, DriverLicenseUncheckedCreateInput>
  }

  /**
   * DriverLicense createMany
   */
  export type DriverLicenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DriverLicenses.
     */
    data: DriverLicenseCreateManyInput | DriverLicenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DriverLicense createManyAndReturn
   */
  export type DriverLicenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * The data used to create many DriverLicenses.
     */
    data: DriverLicenseCreateManyInput | DriverLicenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DriverLicense update
   */
  export type DriverLicenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    /**
     * The data needed to update a DriverLicense.
     */
    data: XOR<DriverLicenseUpdateInput, DriverLicenseUncheckedUpdateInput>
    /**
     * Choose, which DriverLicense to update.
     */
    where: DriverLicenseWhereUniqueInput
  }

  /**
   * DriverLicense updateMany
   */
  export type DriverLicenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DriverLicenses.
     */
    data: XOR<DriverLicenseUpdateManyMutationInput, DriverLicenseUncheckedUpdateManyInput>
    /**
     * Filter which DriverLicenses to update
     */
    where?: DriverLicenseWhereInput
    /**
     * Limit how many DriverLicenses to update.
     */
    limit?: number
  }

  /**
   * DriverLicense updateManyAndReturn
   */
  export type DriverLicenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * The data used to update DriverLicenses.
     */
    data: XOR<DriverLicenseUpdateManyMutationInput, DriverLicenseUncheckedUpdateManyInput>
    /**
     * Filter which DriverLicenses to update
     */
    where?: DriverLicenseWhereInput
    /**
     * Limit how many DriverLicenses to update.
     */
    limit?: number
  }

  /**
   * DriverLicense upsert
   */
  export type DriverLicenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    /**
     * The filter to search for the DriverLicense to update in case it exists.
     */
    where: DriverLicenseWhereUniqueInput
    /**
     * In case the DriverLicense found by the `where` argument doesn't exist, create a new DriverLicense with this data.
     */
    create: XOR<DriverLicenseCreateInput, DriverLicenseUncheckedCreateInput>
    /**
     * In case the DriverLicense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverLicenseUpdateInput, DriverLicenseUncheckedUpdateInput>
  }

  /**
   * DriverLicense delete
   */
  export type DriverLicenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
    /**
     * Filter which DriverLicense to delete.
     */
    where: DriverLicenseWhereUniqueInput
  }

  /**
   * DriverLicense deleteMany
   */
  export type DriverLicenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriverLicenses to delete
     */
    where?: DriverLicenseWhereInput
    /**
     * Limit how many DriverLicenses to delete.
     */
    limit?: number
  }

  /**
   * DriverLicense.driverProfile
   */
  export type DriverLicense$driverProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    where?: DriverProfileWhereInput
  }

  /**
   * DriverLicense without action
   */
  export type DriverLicenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverLicense
     */
    select?: DriverLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverLicense
     */
    omit?: DriverLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverLicenseInclude<ExtArgs> | null
  }


  /**
   * Model Children
   */

  export type AggregateChildren = {
    _count: ChildrenCountAggregateOutputType | null
    _avg: ChildrenAvgAggregateOutputType | null
    _sum: ChildrenSumAggregateOutputType | null
    _min: ChildrenMinAggregateOutputType | null
    _max: ChildrenMaxAggregateOutputType | null
  }

  export type ChildrenAvgAggregateOutputType = {
    homeLat: number | null
    homeLong: number | null
  }

  export type ChildrenSumAggregateOutputType = {
    homeLat: number | null
    homeLong: number | null
  }

  export type ChildrenMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    adresse: string | null
    homeLat: number | null
    homeLong: number | null
    arrivalTime: string | null
    departureTime: string | null
    schoolId: string | null
    imageprofileId: string | null
    parentId: string | null
    subscriptionId: string | null
    busId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChildrenMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    adresse: string | null
    homeLat: number | null
    homeLong: number | null
    arrivalTime: string | null
    departureTime: string | null
    schoolId: string | null
    imageprofileId: string | null
    parentId: string | null
    subscriptionId: string | null
    busId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChildrenCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    adresse: number
    homeLat: number
    homeLong: number
    arrivalTime: number
    departureTime: number
    schoolId: number
    imageprofileId: number
    parentId: number
    subscriptionId: number
    busId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChildrenAvgAggregateInputType = {
    homeLat?: true
    homeLong?: true
  }

  export type ChildrenSumAggregateInputType = {
    homeLat?: true
    homeLong?: true
  }

  export type ChildrenMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    adresse?: true
    homeLat?: true
    homeLong?: true
    arrivalTime?: true
    departureTime?: true
    schoolId?: true
    imageprofileId?: true
    parentId?: true
    subscriptionId?: true
    busId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChildrenMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    adresse?: true
    homeLat?: true
    homeLong?: true
    arrivalTime?: true
    departureTime?: true
    schoolId?: true
    imageprofileId?: true
    parentId?: true
    subscriptionId?: true
    busId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChildrenCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    adresse?: true
    homeLat?: true
    homeLong?: true
    arrivalTime?: true
    departureTime?: true
    schoolId?: true
    imageprofileId?: true
    parentId?: true
    subscriptionId?: true
    busId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChildrenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Children to aggregate.
     */
    where?: ChildrenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildrenOrderByWithRelationInput | ChildrenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChildrenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Children
    **/
    _count?: true | ChildrenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChildrenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChildrenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChildrenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChildrenMaxAggregateInputType
  }

  export type GetChildrenAggregateType<T extends ChildrenAggregateArgs> = {
        [P in keyof T & keyof AggregateChildren]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChildren[P]>
      : GetScalarType<T[P], AggregateChildren[P]>
  }




  export type ChildrenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChildrenWhereInput
    orderBy?: ChildrenOrderByWithAggregationInput | ChildrenOrderByWithAggregationInput[]
    by: ChildrenScalarFieldEnum[] | ChildrenScalarFieldEnum
    having?: ChildrenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChildrenCountAggregateInputType | true
    _avg?: ChildrenAvgAggregateInputType
    _sum?: ChildrenSumAggregateInputType
    _min?: ChildrenMinAggregateInputType
    _max?: ChildrenMaxAggregateInputType
  }

  export type ChildrenGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    imageprofileId: string
    parentId: string
    subscriptionId: string | null
    busId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ChildrenCountAggregateOutputType | null
    _avg: ChildrenAvgAggregateOutputType | null
    _sum: ChildrenSumAggregateOutputType | null
    _min: ChildrenMinAggregateOutputType | null
    _max: ChildrenMaxAggregateOutputType | null
  }

  type GetChildrenGroupByPayload<T extends ChildrenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChildrenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChildrenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChildrenGroupByOutputType[P]>
            : GetScalarType<T[P], ChildrenGroupByOutputType[P]>
        }
      >
    >


  export type ChildrenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    adresse?: boolean
    homeLat?: boolean
    homeLong?: boolean
    arrivalTime?: boolean
    departureTime?: boolean
    schoolId?: boolean
    imageprofileId?: boolean
    parentId?: boolean
    subscriptionId?: boolean
    busId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    imageprofile?: boolean | ImageDefaultArgs<ExtArgs>
    parent?: boolean | UsersDefaultArgs<ExtArgs>
    subscription?: boolean | Children$subscriptionArgs<ExtArgs>
    bus?: boolean | Children$busArgs<ExtArgs>
  }, ExtArgs["result"]["children"]>

  export type ChildrenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    adresse?: boolean
    homeLat?: boolean
    homeLong?: boolean
    arrivalTime?: boolean
    departureTime?: boolean
    schoolId?: boolean
    imageprofileId?: boolean
    parentId?: boolean
    subscriptionId?: boolean
    busId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    imageprofile?: boolean | ImageDefaultArgs<ExtArgs>
    parent?: boolean | UsersDefaultArgs<ExtArgs>
    subscription?: boolean | Children$subscriptionArgs<ExtArgs>
    bus?: boolean | Children$busArgs<ExtArgs>
  }, ExtArgs["result"]["children"]>

  export type ChildrenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    adresse?: boolean
    homeLat?: boolean
    homeLong?: boolean
    arrivalTime?: boolean
    departureTime?: boolean
    schoolId?: boolean
    imageprofileId?: boolean
    parentId?: boolean
    subscriptionId?: boolean
    busId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    imageprofile?: boolean | ImageDefaultArgs<ExtArgs>
    parent?: boolean | UsersDefaultArgs<ExtArgs>
    subscription?: boolean | Children$subscriptionArgs<ExtArgs>
    bus?: boolean | Children$busArgs<ExtArgs>
  }, ExtArgs["result"]["children"]>

  export type ChildrenSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    adresse?: boolean
    homeLat?: boolean
    homeLong?: boolean
    arrivalTime?: boolean
    departureTime?: boolean
    schoolId?: boolean
    imageprofileId?: boolean
    parentId?: boolean
    subscriptionId?: boolean
    busId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChildrenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "adresse" | "homeLat" | "homeLong" | "arrivalTime" | "departureTime" | "schoolId" | "imageprofileId" | "parentId" | "subscriptionId" | "busId" | "createdAt" | "updatedAt", ExtArgs["result"]["children"]>
  export type ChildrenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    imageprofile?: boolean | ImageDefaultArgs<ExtArgs>
    parent?: boolean | UsersDefaultArgs<ExtArgs>
    subscription?: boolean | Children$subscriptionArgs<ExtArgs>
    bus?: boolean | Children$busArgs<ExtArgs>
  }
  export type ChildrenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    imageprofile?: boolean | ImageDefaultArgs<ExtArgs>
    parent?: boolean | UsersDefaultArgs<ExtArgs>
    subscription?: boolean | Children$subscriptionArgs<ExtArgs>
    bus?: boolean | Children$busArgs<ExtArgs>
  }
  export type ChildrenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
    imageprofile?: boolean | ImageDefaultArgs<ExtArgs>
    parent?: boolean | UsersDefaultArgs<ExtArgs>
    subscription?: boolean | Children$subscriptionArgs<ExtArgs>
    bus?: boolean | Children$busArgs<ExtArgs>
  }

  export type $ChildrenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Children"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs>
      imageprofile: Prisma.$ImagePayload<ExtArgs>
      parent: Prisma.$UsersPayload<ExtArgs>
      subscription: Prisma.$SubscriptionPayload<ExtArgs> | null
      bus: Prisma.$BusPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      adresse: string
      homeLat: number
      homeLong: number
      arrivalTime: string
      departureTime: string
      schoolId: string
      imageprofileId: string
      parentId: string
      subscriptionId: string | null
      busId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["children"]>
    composites: {}
  }

  type ChildrenGetPayload<S extends boolean | null | undefined | ChildrenDefaultArgs> = $Result.GetResult<Prisma.$ChildrenPayload, S>

  type ChildrenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChildrenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChildrenCountAggregateInputType | true
    }

  export interface ChildrenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Children'], meta: { name: 'Children' } }
    /**
     * Find zero or one Children that matches the filter.
     * @param {ChildrenFindUniqueArgs} args - Arguments to find a Children
     * @example
     * // Get one Children
     * const children = await prisma.children.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChildrenFindUniqueArgs>(args: SelectSubset<T, ChildrenFindUniqueArgs<ExtArgs>>): Prisma__ChildrenClient<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Children that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChildrenFindUniqueOrThrowArgs} args - Arguments to find a Children
     * @example
     * // Get one Children
     * const children = await prisma.children.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChildrenFindUniqueOrThrowArgs>(args: SelectSubset<T, ChildrenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChildrenClient<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Children that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildrenFindFirstArgs} args - Arguments to find a Children
     * @example
     * // Get one Children
     * const children = await prisma.children.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChildrenFindFirstArgs>(args?: SelectSubset<T, ChildrenFindFirstArgs<ExtArgs>>): Prisma__ChildrenClient<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Children that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildrenFindFirstOrThrowArgs} args - Arguments to find a Children
     * @example
     * // Get one Children
     * const children = await prisma.children.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChildrenFindFirstOrThrowArgs>(args?: SelectSubset<T, ChildrenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChildrenClient<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Children that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildrenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Children
     * const children = await prisma.children.findMany()
     * 
     * // Get first 10 Children
     * const children = await prisma.children.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const childrenWithIdOnly = await prisma.children.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChildrenFindManyArgs>(args?: SelectSubset<T, ChildrenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Children.
     * @param {ChildrenCreateArgs} args - Arguments to create a Children.
     * @example
     * // Create one Children
     * const Children = await prisma.children.create({
     *   data: {
     *     // ... data to create a Children
     *   }
     * })
     * 
     */
    create<T extends ChildrenCreateArgs>(args: SelectSubset<T, ChildrenCreateArgs<ExtArgs>>): Prisma__ChildrenClient<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Children.
     * @param {ChildrenCreateManyArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const children = await prisma.children.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChildrenCreateManyArgs>(args?: SelectSubset<T, ChildrenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Children and returns the data saved in the database.
     * @param {ChildrenCreateManyAndReturnArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const children = await prisma.children.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Children and only return the `id`
     * const childrenWithIdOnly = await prisma.children.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChildrenCreateManyAndReturnArgs>(args?: SelectSubset<T, ChildrenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Children.
     * @param {ChildrenDeleteArgs} args - Arguments to delete one Children.
     * @example
     * // Delete one Children
     * const Children = await prisma.children.delete({
     *   where: {
     *     // ... filter to delete one Children
     *   }
     * })
     * 
     */
    delete<T extends ChildrenDeleteArgs>(args: SelectSubset<T, ChildrenDeleteArgs<ExtArgs>>): Prisma__ChildrenClient<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Children.
     * @param {ChildrenUpdateArgs} args - Arguments to update one Children.
     * @example
     * // Update one Children
     * const children = await prisma.children.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChildrenUpdateArgs>(args: SelectSubset<T, ChildrenUpdateArgs<ExtArgs>>): Prisma__ChildrenClient<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Children.
     * @param {ChildrenDeleteManyArgs} args - Arguments to filter Children to delete.
     * @example
     * // Delete a few Children
     * const { count } = await prisma.children.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChildrenDeleteManyArgs>(args?: SelectSubset<T, ChildrenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildrenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Children
     * const children = await prisma.children.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChildrenUpdateManyArgs>(args: SelectSubset<T, ChildrenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Children and returns the data updated in the database.
     * @param {ChildrenUpdateManyAndReturnArgs} args - Arguments to update many Children.
     * @example
     * // Update many Children
     * const children = await prisma.children.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Children and only return the `id`
     * const childrenWithIdOnly = await prisma.children.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChildrenUpdateManyAndReturnArgs>(args: SelectSubset<T, ChildrenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Children.
     * @param {ChildrenUpsertArgs} args - Arguments to update or create a Children.
     * @example
     * // Update or create a Children
     * const children = await prisma.children.upsert({
     *   create: {
     *     // ... data to create a Children
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Children we want to update
     *   }
     * })
     */
    upsert<T extends ChildrenUpsertArgs>(args: SelectSubset<T, ChildrenUpsertArgs<ExtArgs>>): Prisma__ChildrenClient<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildrenCountArgs} args - Arguments to filter Children to count.
     * @example
     * // Count the number of Children
     * const count = await prisma.children.count({
     *   where: {
     *     // ... the filter for the Children we want to count
     *   }
     * })
    **/
    count<T extends ChildrenCountArgs>(
      args?: Subset<T, ChildrenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChildrenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildrenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChildrenAggregateArgs>(args: Subset<T, ChildrenAggregateArgs>): Prisma.PrismaPromise<GetChildrenAggregateType<T>>

    /**
     * Group by Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildrenGroupByArgs} args - Group by arguments.
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
      T extends ChildrenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChildrenGroupByArgs['orderBy'] }
        : { orderBy?: ChildrenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChildrenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChildrenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Children model
   */
  readonly fields: ChildrenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Children.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChildrenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    imageprofile<T extends ImageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImageDefaultArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subscription<T extends Children$subscriptionArgs<ExtArgs> = {}>(args?: Subset<T, Children$subscriptionArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bus<T extends Children$busArgs<ExtArgs> = {}>(args?: Subset<T, Children$busArgs<ExtArgs>>): Prisma__BusClient<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Children model
   */
  interface ChildrenFieldRefs {
    readonly id: FieldRef<"Children", 'String'>
    readonly nom: FieldRef<"Children", 'String'>
    readonly prenom: FieldRef<"Children", 'String'>
    readonly adresse: FieldRef<"Children", 'String'>
    readonly homeLat: FieldRef<"Children", 'Float'>
    readonly homeLong: FieldRef<"Children", 'Float'>
    readonly arrivalTime: FieldRef<"Children", 'String'>
    readonly departureTime: FieldRef<"Children", 'String'>
    readonly schoolId: FieldRef<"Children", 'String'>
    readonly imageprofileId: FieldRef<"Children", 'String'>
    readonly parentId: FieldRef<"Children", 'String'>
    readonly subscriptionId: FieldRef<"Children", 'String'>
    readonly busId: FieldRef<"Children", 'String'>
    readonly createdAt: FieldRef<"Children", 'DateTime'>
    readonly updatedAt: FieldRef<"Children", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Children findUnique
   */
  export type ChildrenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    /**
     * Filter, which Children to fetch.
     */
    where: ChildrenWhereUniqueInput
  }

  /**
   * Children findUniqueOrThrow
   */
  export type ChildrenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    /**
     * Filter, which Children to fetch.
     */
    where: ChildrenWhereUniqueInput
  }

  /**
   * Children findFirst
   */
  export type ChildrenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    /**
     * Filter, which Children to fetch.
     */
    where?: ChildrenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildrenOrderByWithRelationInput | ChildrenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildrenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * Children findFirstOrThrow
   */
  export type ChildrenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    /**
     * Filter, which Children to fetch.
     */
    where?: ChildrenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildrenOrderByWithRelationInput | ChildrenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildrenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * Children findMany
   */
  export type ChildrenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    /**
     * Filter, which Children to fetch.
     */
    where?: ChildrenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildrenOrderByWithRelationInput | ChildrenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Children.
     */
    cursor?: ChildrenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * Children create
   */
  export type ChildrenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    /**
     * The data needed to create a Children.
     */
    data: XOR<ChildrenCreateInput, ChildrenUncheckedCreateInput>
  }

  /**
   * Children createMany
   */
  export type ChildrenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Children.
     */
    data: ChildrenCreateManyInput | ChildrenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Children createManyAndReturn
   */
  export type ChildrenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * The data used to create many Children.
     */
    data: ChildrenCreateManyInput | ChildrenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Children update
   */
  export type ChildrenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    /**
     * The data needed to update a Children.
     */
    data: XOR<ChildrenUpdateInput, ChildrenUncheckedUpdateInput>
    /**
     * Choose, which Children to update.
     */
    where: ChildrenWhereUniqueInput
  }

  /**
   * Children updateMany
   */
  export type ChildrenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Children.
     */
    data: XOR<ChildrenUpdateManyMutationInput, ChildrenUncheckedUpdateManyInput>
    /**
     * Filter which Children to update
     */
    where?: ChildrenWhereInput
    /**
     * Limit how many Children to update.
     */
    limit?: number
  }

  /**
   * Children updateManyAndReturn
   */
  export type ChildrenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * The data used to update Children.
     */
    data: XOR<ChildrenUpdateManyMutationInput, ChildrenUncheckedUpdateManyInput>
    /**
     * Filter which Children to update
     */
    where?: ChildrenWhereInput
    /**
     * Limit how many Children to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Children upsert
   */
  export type ChildrenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    /**
     * The filter to search for the Children to update in case it exists.
     */
    where: ChildrenWhereUniqueInput
    /**
     * In case the Children found by the `where` argument doesn't exist, create a new Children with this data.
     */
    create: XOR<ChildrenCreateInput, ChildrenUncheckedCreateInput>
    /**
     * In case the Children was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChildrenUpdateInput, ChildrenUncheckedUpdateInput>
  }

  /**
   * Children delete
   */
  export type ChildrenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    /**
     * Filter which Children to delete.
     */
    where: ChildrenWhereUniqueInput
  }

  /**
   * Children deleteMany
   */
  export type ChildrenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Children to delete
     */
    where?: ChildrenWhereInput
    /**
     * Limit how many Children to delete.
     */
    limit?: number
  }

  /**
   * Children.subscription
   */
  export type Children$subscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
  }

  /**
   * Children.bus
   */
  export type Children$busArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    where?: BusWhereInput
  }

  /**
   * Children without action
   */
  export type ChildrenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
  }


  /**
   * Model School
   */

  export type AggregateSchool = {
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  export type SchoolAvgAggregateOutputType = {
    schoolLat: number | null
    schoolLong: number | null
  }

  export type SchoolSumAggregateOutputType = {
    schoolLat: number | null
    schoolLong: number | null
  }

  export type SchoolMinAggregateOutputType = {
    id: string | null
    nom: string | null
    adresse: string | null
    schoolLat: number | null
    schoolLong: number | null
  }

  export type SchoolMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    adresse: string | null
    schoolLat: number | null
    schoolLong: number | null
  }

  export type SchoolCountAggregateOutputType = {
    id: number
    nom: number
    adresse: number
    schoolLat: number
    schoolLong: number
    _all: number
  }


  export type SchoolAvgAggregateInputType = {
    schoolLat?: true
    schoolLong?: true
  }

  export type SchoolSumAggregateInputType = {
    schoolLat?: true
    schoolLong?: true
  }

  export type SchoolMinAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    schoolLat?: true
    schoolLong?: true
  }

  export type SchoolMaxAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    schoolLat?: true
    schoolLong?: true
  }

  export type SchoolCountAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    schoolLat?: true
    schoolLong?: true
    _all?: true
  }

  export type SchoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which School to aggregate.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schools
    **/
    _count?: true | SchoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolMaxAggregateInputType
  }

  export type GetSchoolAggregateType<T extends SchoolAggregateArgs> = {
        [P in keyof T & keyof AggregateSchool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchool[P]>
      : GetScalarType<T[P], AggregateSchool[P]>
  }




  export type SchoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithAggregationInput | SchoolOrderByWithAggregationInput[]
    by: SchoolScalarFieldEnum[] | SchoolScalarFieldEnum
    having?: SchoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolCountAggregateInputType | true
    _avg?: SchoolAvgAggregateInputType
    _sum?: SchoolSumAggregateInputType
    _min?: SchoolMinAggregateInputType
    _max?: SchoolMaxAggregateInputType
  }

  export type SchoolGroupByOutputType = {
    id: string
    nom: string
    adresse: string
    schoolLat: number
    schoolLong: number
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  type GetSchoolGroupByPayload<T extends SchoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolGroupByOutputType[P]>
        }
      >
    >


  export type SchoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
    schoolLat?: boolean
    schoolLong?: boolean
    children?: boolean | School$childrenArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
    schoolLat?: boolean
    schoolLong?: boolean
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
    schoolLat?: boolean
    schoolLong?: boolean
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectScalar = {
    id?: boolean
    nom?: boolean
    adresse?: boolean
    schoolLat?: boolean
    schoolLong?: boolean
  }

  export type SchoolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "adresse" | "schoolLat" | "schoolLong", ExtArgs["result"]["school"]>
  export type SchoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | School$childrenArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SchoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SchoolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SchoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "School"
    objects: {
      children: Prisma.$ChildrenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      adresse: string
      schoolLat: number
      schoolLong: number
    }, ExtArgs["result"]["school"]>
    composites: {}
  }

  type SchoolGetPayload<S extends boolean | null | undefined | SchoolDefaultArgs> = $Result.GetResult<Prisma.$SchoolPayload, S>

  type SchoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SchoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SchoolCountAggregateInputType | true
    }

  export interface SchoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['School'], meta: { name: 'School' } }
    /**
     * Find zero or one School that matches the filter.
     * @param {SchoolFindUniqueArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolFindUniqueArgs>(args: SelectSubset<T, SchoolFindUniqueArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one School that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SchoolFindUniqueOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first School that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolFindFirstArgs>(args?: SelectSubset<T, SchoolFindFirstArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first School that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schools
     * const schools = await prisma.school.findMany()
     * 
     * // Get first 10 Schools
     * const schools = await prisma.school.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schoolWithIdOnly = await prisma.school.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SchoolFindManyArgs>(args?: SelectSubset<T, SchoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a School.
     * @param {SchoolCreateArgs} args - Arguments to create a School.
     * @example
     * // Create one School
     * const School = await prisma.school.create({
     *   data: {
     *     // ... data to create a School
     *   }
     * })
     * 
     */
    create<T extends SchoolCreateArgs>(args: SelectSubset<T, SchoolCreateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schools.
     * @param {SchoolCreateManyArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolCreateManyArgs>(args?: SelectSubset<T, SchoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schools and returns the data saved in the database.
     * @param {SchoolCreateManyAndReturnArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schools and only return the `id`
     * const schoolWithIdOnly = await prisma.school.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchoolCreateManyAndReturnArgs>(args?: SelectSubset<T, SchoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a School.
     * @param {SchoolDeleteArgs} args - Arguments to delete one School.
     * @example
     * // Delete one School
     * const School = await prisma.school.delete({
     *   where: {
     *     // ... filter to delete one School
     *   }
     * })
     * 
     */
    delete<T extends SchoolDeleteArgs>(args: SelectSubset<T, SchoolDeleteArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one School.
     * @param {SchoolUpdateArgs} args - Arguments to update one School.
     * @example
     * // Update one School
     * const school = await prisma.school.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolUpdateArgs>(args: SelectSubset<T, SchoolUpdateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schools.
     * @param {SchoolDeleteManyArgs} args - Arguments to filter Schools to delete.
     * @example
     * // Delete a few Schools
     * const { count } = await prisma.school.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolDeleteManyArgs>(args?: SelectSubset<T, SchoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolUpdateManyArgs>(args: SelectSubset<T, SchoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools and returns the data updated in the database.
     * @param {SchoolUpdateManyAndReturnArgs} args - Arguments to update many Schools.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schools and only return the `id`
     * const schoolWithIdOnly = await prisma.school.updateManyAndReturn({
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
    updateManyAndReturn<T extends SchoolUpdateManyAndReturnArgs>(args: SelectSubset<T, SchoolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one School.
     * @param {SchoolUpsertArgs} args - Arguments to update or create a School.
     * @example
     * // Update or create a School
     * const school = await prisma.school.upsert({
     *   create: {
     *     // ... data to create a School
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the School we want to update
     *   }
     * })
     */
    upsert<T extends SchoolUpsertArgs>(args: SelectSubset<T, SchoolUpsertArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolCountArgs} args - Arguments to filter Schools to count.
     * @example
     * // Count the number of Schools
     * const count = await prisma.school.count({
     *   where: {
     *     // ... the filter for the Schools we want to count
     *   }
     * })
    **/
    count<T extends SchoolCountArgs>(
      args?: Subset<T, SchoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SchoolAggregateArgs>(args: Subset<T, SchoolAggregateArgs>): Prisma.PrismaPromise<GetSchoolAggregateType<T>>

    /**
     * Group by School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolGroupByArgs} args - Group by arguments.
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
      T extends SchoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolGroupByArgs['orderBy'] }
        : { orderBy?: SchoolGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SchoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the School model
   */
  readonly fields: SchoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for School.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    children<T extends School$childrenArgs<ExtArgs> = {}>(args?: Subset<T, School$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the School model
   */
  interface SchoolFieldRefs {
    readonly id: FieldRef<"School", 'String'>
    readonly nom: FieldRef<"School", 'String'>
    readonly adresse: FieldRef<"School", 'String'>
    readonly schoolLat: FieldRef<"School", 'Float'>
    readonly schoolLong: FieldRef<"School", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * School findUnique
   */
  export type SchoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findUniqueOrThrow
   */
  export type SchoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findFirst
   */
  export type SchoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findFirstOrThrow
   */
  export type SchoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findMany
   */
  export type SchoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Schools to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School create
   */
  export type SchoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to create a School.
     */
    data: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
  }

  /**
   * School createMany
   */
  export type SchoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * School createManyAndReturn
   */
  export type SchoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * School update
   */
  export type SchoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to update a School.
     */
    data: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
    /**
     * Choose, which School to update.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School updateMany
   */
  export type SchoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
    /**
     * Limit how many Schools to update.
     */
    limit?: number
  }

  /**
   * School updateManyAndReturn
   */
  export type SchoolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
    /**
     * Limit how many Schools to update.
     */
    limit?: number
  }

  /**
   * School upsert
   */
  export type SchoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The filter to search for the School to update in case it exists.
     */
    where: SchoolWhereUniqueInput
    /**
     * In case the School found by the `where` argument doesn't exist, create a new School with this data.
     */
    create: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
    /**
     * In case the School was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
  }

  /**
   * School delete
   */
  export type SchoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter which School to delete.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School deleteMany
   */
  export type SchoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schools to delete
     */
    where?: SchoolWhereInput
    /**
     * Limit how many Schools to delete.
     */
    limit?: number
  }

  /**
   * School.children
   */
  export type School$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    where?: ChildrenWhereInput
    orderBy?: ChildrenOrderByWithRelationInput | ChildrenOrderByWithRelationInput[]
    cursor?: ChildrenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * School without action
   */
  export type SchoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
  }


  /**
   * Model Image
   */

  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageMinAggregateOutputType = {
    id: string | null
    url: string | null
  }

  export type ImageMaxAggregateOutputType = {
    id: string | null
    url: string | null
  }

  export type ImageCountAggregateOutputType = {
    id: number
    url: number
    _all: number
  }


  export type ImageMinAggregateInputType = {
    id?: true
    url?: true
  }

  export type ImageMaxAggregateInputType = {
    id?: true
    url?: true
  }

  export type ImageCountAggregateInputType = {
    id?: true
    url?: true
    _all?: true
  }

  export type ImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Image to aggregate.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type ImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithAggregationInput | ImageOrderByWithAggregationInput[]
    by: ImageScalarFieldEnum[] | ImageScalarFieldEnum
    having?: ImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }

  export type ImageGroupByOutputType = {
    id: string
    url: string
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends ImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type ImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    child?: boolean | Image$childArgs<ExtArgs>
    driver?: boolean | Image$driverArgs<ExtArgs>
  }, ExtArgs["result"]["image"]>

  export type ImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
  }, ExtArgs["result"]["image"]>

  export type ImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
  }, ExtArgs["result"]["image"]>

  export type ImageSelectScalar = {
    id?: boolean
    url?: boolean
  }

  export type ImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url", ExtArgs["result"]["image"]>
  export type ImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | Image$childArgs<ExtArgs>
    driver?: boolean | Image$driverArgs<ExtArgs>
  }
  export type ImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Image"
    objects: {
      child: Prisma.$ChildrenPayload<ExtArgs> | null
      driver: Prisma.$DriverProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
    }, ExtArgs["result"]["image"]>
    composites: {}
  }

  type ImageGetPayload<S extends boolean | null | undefined | ImageDefaultArgs> = $Result.GetResult<Prisma.$ImagePayload, S>

  type ImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageCountAggregateInputType | true
    }

  export interface ImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Image'], meta: { name: 'Image' } }
    /**
     * Find zero or one Image that matches the filter.
     * @param {ImageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImageFindUniqueArgs>(args: SelectSubset<T, ImageFindUniqueArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Image that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImageFindFirstArgs>(args?: SelectSubset<T, ImageFindFirstArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImageFindManyArgs>(args?: SelectSubset<T, ImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Image.
     * @param {ImageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
     */
    create<T extends ImageCreateArgs>(args: SelectSubset<T, ImageCreateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Images.
     * @param {ImageCreateManyArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImageCreateManyArgs>(args?: SelectSubset<T, ImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Images and returns the data saved in the database.
     * @param {ImageCreateManyAndReturnArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Image.
     * @param {ImageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
     */
    delete<T extends ImageDeleteArgs>(args: SelectSubset<T, ImageDeleteArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Image.
     * @param {ImageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImageUpdateArgs>(args: SelectSubset<T, ImageUpdateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Images.
     * @param {ImageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImageDeleteManyArgs>(args?: SelectSubset<T, ImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImageUpdateManyArgs>(args: SelectSubset<T, ImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images and returns the data updated in the database.
     * @param {ImageUpdateManyAndReturnArgs} args - Arguments to update many Images.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.updateManyAndReturn({
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
    updateManyAndReturn<T extends ImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Image.
     * @param {ImageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
     */
    upsert<T extends ImageUpsertArgs>(args: SelectSubset<T, ImageUpsertArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends ImageCountArgs>(
      args?: Subset<T, ImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGroupByArgs} args - Group by arguments.
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
      T extends ImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageGroupByArgs['orderBy'] }
        : { orderBy?: ImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Image model
   */
  readonly fields: ImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends Image$childArgs<ExtArgs> = {}>(args?: Subset<T, Image$childArgs<ExtArgs>>): Prisma__ChildrenClient<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    driver<T extends Image$driverArgs<ExtArgs> = {}>(args?: Subset<T, Image$driverArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Image model
   */
  interface ImageFieldRefs {
    readonly id: FieldRef<"Image", 'String'>
    readonly url: FieldRef<"Image", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Image findUnique
   */
  export type ImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findUniqueOrThrow
   */
  export type ImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findFirst
   */
  export type ImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findFirstOrThrow
   */
  export type ImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findMany
   */
  export type ImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Images to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image create
   */
  export type ImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The data needed to create a Image.
     */
    data: XOR<ImageCreateInput, ImageUncheckedCreateInput>
  }

  /**
   * Image createMany
   */
  export type ImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Image createManyAndReturn
   */
  export type ImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Image update
   */
  export type ImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The data needed to update a Image.
     */
    data: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
    /**
     * Choose, which Image to update.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image updateMany
   */
  export type ImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
  }

  /**
   * Image updateManyAndReturn
   */
  export type ImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
  }

  /**
   * Image upsert
   */
  export type ImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The filter to search for the Image to update in case it exists.
     */
    where: ImageWhereUniqueInput
    /**
     * In case the Image found by the `where` argument doesn't exist, create a new Image with this data.
     */
    create: XOR<ImageCreateInput, ImageUncheckedCreateInput>
    /**
     * In case the Image was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
  }

  /**
   * Image delete
   */
  export type ImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter which Image to delete.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image deleteMany
   */
  export type ImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Images to delete
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to delete.
     */
    limit?: number
  }

  /**
   * Image.child
   */
  export type Image$childArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    where?: ChildrenWhereInput
  }

  /**
   * Image.driver
   */
  export type Image$driverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    where?: DriverProfileWhereInput
  }

  /**
   * Image without action
   */
  export type ImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    stripeSubId: string | null
    plan: $Enums.Plan | null
    status: string | null
    emailSent: boolean | null
    cancelAtPeriodEnd: boolean | null
    createdAt: Date | null
    parentId: string | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    stripeSubId: string | null
    plan: $Enums.Plan | null
    status: string | null
    emailSent: boolean | null
    cancelAtPeriodEnd: boolean | null
    createdAt: Date | null
    parentId: string | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    stripeSubId: number
    plan: number
    status: number
    emailSent: number
    cancelAtPeriodEnd: number
    createdAt: number
    parentId: number
    _all: number
  }


  export type SubscriptionMinAggregateInputType = {
    id?: true
    stripeSubId?: true
    plan?: true
    status?: true
    emailSent?: true
    cancelAtPeriodEnd?: true
    createdAt?: true
    parentId?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    stripeSubId?: true
    plan?: true
    status?: true
    emailSent?: true
    cancelAtPeriodEnd?: true
    createdAt?: true
    parentId?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    stripeSubId?: true
    plan?: true
    status?: true
    emailSent?: true
    cancelAtPeriodEnd?: true
    createdAt?: true
    parentId?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    stripeSubId: string | null
    plan: $Enums.Plan
    status: string
    emailSent: boolean
    cancelAtPeriodEnd: boolean
    createdAt: Date
    parentId: string
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stripeSubId?: boolean
    plan?: boolean
    status?: boolean
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: boolean
    parentId?: boolean
    parent?: boolean | UsersDefaultArgs<ExtArgs>
    children?: boolean | Subscription$childrenArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stripeSubId?: boolean
    plan?: boolean
    status?: boolean
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: boolean
    parentId?: boolean
    parent?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stripeSubId?: boolean
    plan?: boolean
    status?: boolean
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: boolean
    parentId?: boolean
    parent?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    stripeSubId?: boolean
    plan?: boolean
    status?: boolean
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: boolean
    parentId?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stripeSubId" | "plan" | "status" | "emailSent" | "cancelAtPeriodEnd" | "createdAt" | "parentId", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | UsersDefaultArgs<ExtArgs>
    children?: boolean | Subscription$childrenArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | UsersDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | UsersDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      parent: Prisma.$UsersPayload<ExtArgs>
      children: Prisma.$ChildrenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stripeSubId: string | null
      plan: $Enums.Plan
      status: string
      emailSent: boolean
      cancelAtPeriodEnd: boolean
      createdAt: Date
      parentId: string
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
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
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    children<T extends Subscription$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly stripeSubId: FieldRef<"Subscription", 'String'>
    readonly plan: FieldRef<"Subscription", 'Plan'>
    readonly status: FieldRef<"Subscription", 'String'>
    readonly emailSent: FieldRef<"Subscription", 'Boolean'>
    readonly cancelAtPeriodEnd: FieldRef<"Subscription", 'Boolean'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly parentId: FieldRef<"Subscription", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription.children
   */
  export type Subscription$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    where?: ChildrenWhereInput
    orderBy?: ChildrenOrderByWithRelationInput | ChildrenOrderByWithRelationInput[]
    cursor?: ChildrenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Bus
   */

  export type AggregateBus = {
    _count: BusCountAggregateOutputType | null
    _avg: BusAvgAggregateOutputType | null
    _sum: BusSumAggregateOutputType | null
    _min: BusMinAggregateOutputType | null
    _max: BusMaxAggregateOutputType | null
  }

  export type BusAvgAggregateOutputType = {
    seats: number | null
  }

  export type BusSumAggregateOutputType = {
    seats: number | null
  }

  export type BusMinAggregateOutputType = {
    id: string | null
    matricule: string | null
    brand: string | null
    seats: number | null
    status: $Enums.BusStatus | null
    driverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusMaxAggregateOutputType = {
    id: string | null
    matricule: string | null
    brand: string | null
    seats: number | null
    status: $Enums.BusStatus | null
    driverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusCountAggregateOutputType = {
    id: number
    matricule: number
    brand: number
    seats: number
    status: number
    driverId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BusAvgAggregateInputType = {
    seats?: true
  }

  export type BusSumAggregateInputType = {
    seats?: true
  }

  export type BusMinAggregateInputType = {
    id?: true
    matricule?: true
    brand?: true
    seats?: true
    status?: true
    driverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusMaxAggregateInputType = {
    id?: true
    matricule?: true
    brand?: true
    seats?: true
    status?: true
    driverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusCountAggregateInputType = {
    id?: true
    matricule?: true
    brand?: true
    seats?: true
    status?: true
    driverId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bus to aggregate.
     */
    where?: BusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buses to fetch.
     */
    orderBy?: BusOrderByWithRelationInput | BusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Buses
    **/
    _count?: true | BusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusMaxAggregateInputType
  }

  export type GetBusAggregateType<T extends BusAggregateArgs> = {
        [P in keyof T & keyof AggregateBus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBus[P]>
      : GetScalarType<T[P], AggregateBus[P]>
  }




  export type BusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusWhereInput
    orderBy?: BusOrderByWithAggregationInput | BusOrderByWithAggregationInput[]
    by: BusScalarFieldEnum[] | BusScalarFieldEnum
    having?: BusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusCountAggregateInputType | true
    _avg?: BusAvgAggregateInputType
    _sum?: BusSumAggregateInputType
    _min?: BusMinAggregateInputType
    _max?: BusMaxAggregateInputType
  }

  export type BusGroupByOutputType = {
    id: string
    matricule: string
    brand: string
    seats: number
    status: $Enums.BusStatus
    driverId: string
    createdAt: Date
    updatedAt: Date
    _count: BusCountAggregateOutputType | null
    _avg: BusAvgAggregateOutputType | null
    _sum: BusSumAggregateOutputType | null
    _min: BusMinAggregateOutputType | null
    _max: BusMaxAggregateOutputType | null
  }

  type GetBusGroupByPayload<T extends BusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusGroupByOutputType[P]>
            : GetScalarType<T[P], BusGroupByOutputType[P]>
        }
      >
    >


  export type BusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matricule?: boolean
    brand?: boolean
    seats?: boolean
    status?: boolean
    driverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driver?: boolean | UsersDefaultArgs<ExtArgs>
    children?: boolean | Bus$childrenArgs<ExtArgs>
    _count?: boolean | BusCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bus"]>

  export type BusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matricule?: boolean
    brand?: boolean
    seats?: boolean
    status?: boolean
    driverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driver?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bus"]>

  export type BusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matricule?: boolean
    brand?: boolean
    seats?: boolean
    status?: boolean
    driverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driver?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bus"]>

  export type BusSelectScalar = {
    id?: boolean
    matricule?: boolean
    brand?: boolean
    seats?: boolean
    status?: boolean
    driverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matricule" | "brand" | "seats" | "status" | "driverId" | "createdAt" | "updatedAt", ExtArgs["result"]["bus"]>
  export type BusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | UsersDefaultArgs<ExtArgs>
    children?: boolean | Bus$childrenArgs<ExtArgs>
    _count?: boolean | BusCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | UsersDefaultArgs<ExtArgs>
  }
  export type BusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | UsersDefaultArgs<ExtArgs>
  }

  export type $BusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bus"
    objects: {
      driver: Prisma.$UsersPayload<ExtArgs>
      children: Prisma.$ChildrenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matricule: string
      brand: string
      seats: number
      status: $Enums.BusStatus
      driverId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bus"]>
    composites: {}
  }

  type BusGetPayload<S extends boolean | null | undefined | BusDefaultArgs> = $Result.GetResult<Prisma.$BusPayload, S>

  type BusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusCountAggregateInputType | true
    }

  export interface BusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bus'], meta: { name: 'Bus' } }
    /**
     * Find zero or one Bus that matches the filter.
     * @param {BusFindUniqueArgs} args - Arguments to find a Bus
     * @example
     * // Get one Bus
     * const bus = await prisma.bus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusFindUniqueArgs>(args: SelectSubset<T, BusFindUniqueArgs<ExtArgs>>): Prisma__BusClient<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusFindUniqueOrThrowArgs} args - Arguments to find a Bus
     * @example
     * // Get one Bus
     * const bus = await prisma.bus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusFindUniqueOrThrowArgs>(args: SelectSubset<T, BusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusClient<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusFindFirstArgs} args - Arguments to find a Bus
     * @example
     * // Get one Bus
     * const bus = await prisma.bus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusFindFirstArgs>(args?: SelectSubset<T, BusFindFirstArgs<ExtArgs>>): Prisma__BusClient<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusFindFirstOrThrowArgs} args - Arguments to find a Bus
     * @example
     * // Get one Bus
     * const bus = await prisma.bus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusFindFirstOrThrowArgs>(args?: SelectSubset<T, BusFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusClient<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Buses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Buses
     * const buses = await prisma.bus.findMany()
     * 
     * // Get first 10 Buses
     * const buses = await prisma.bus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const busWithIdOnly = await prisma.bus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusFindManyArgs>(args?: SelectSubset<T, BusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bus.
     * @param {BusCreateArgs} args - Arguments to create a Bus.
     * @example
     * // Create one Bus
     * const Bus = await prisma.bus.create({
     *   data: {
     *     // ... data to create a Bus
     *   }
     * })
     * 
     */
    create<T extends BusCreateArgs>(args: SelectSubset<T, BusCreateArgs<ExtArgs>>): Prisma__BusClient<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Buses.
     * @param {BusCreateManyArgs} args - Arguments to create many Buses.
     * @example
     * // Create many Buses
     * const bus = await prisma.bus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusCreateManyArgs>(args?: SelectSubset<T, BusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Buses and returns the data saved in the database.
     * @param {BusCreateManyAndReturnArgs} args - Arguments to create many Buses.
     * @example
     * // Create many Buses
     * const bus = await prisma.bus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Buses and only return the `id`
     * const busWithIdOnly = await prisma.bus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusCreateManyAndReturnArgs>(args?: SelectSubset<T, BusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bus.
     * @param {BusDeleteArgs} args - Arguments to delete one Bus.
     * @example
     * // Delete one Bus
     * const Bus = await prisma.bus.delete({
     *   where: {
     *     // ... filter to delete one Bus
     *   }
     * })
     * 
     */
    delete<T extends BusDeleteArgs>(args: SelectSubset<T, BusDeleteArgs<ExtArgs>>): Prisma__BusClient<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bus.
     * @param {BusUpdateArgs} args - Arguments to update one Bus.
     * @example
     * // Update one Bus
     * const bus = await prisma.bus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusUpdateArgs>(args: SelectSubset<T, BusUpdateArgs<ExtArgs>>): Prisma__BusClient<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Buses.
     * @param {BusDeleteManyArgs} args - Arguments to filter Buses to delete.
     * @example
     * // Delete a few Buses
     * const { count } = await prisma.bus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusDeleteManyArgs>(args?: SelectSubset<T, BusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Buses
     * const bus = await prisma.bus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusUpdateManyArgs>(args: SelectSubset<T, BusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buses and returns the data updated in the database.
     * @param {BusUpdateManyAndReturnArgs} args - Arguments to update many Buses.
     * @example
     * // Update many Buses
     * const bus = await prisma.bus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Buses and only return the `id`
     * const busWithIdOnly = await prisma.bus.updateManyAndReturn({
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
    updateManyAndReturn<T extends BusUpdateManyAndReturnArgs>(args: SelectSubset<T, BusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bus.
     * @param {BusUpsertArgs} args - Arguments to update or create a Bus.
     * @example
     * // Update or create a Bus
     * const bus = await prisma.bus.upsert({
     *   create: {
     *     // ... data to create a Bus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bus we want to update
     *   }
     * })
     */
    upsert<T extends BusUpsertArgs>(args: SelectSubset<T, BusUpsertArgs<ExtArgs>>): Prisma__BusClient<$Result.GetResult<Prisma.$BusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Buses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusCountArgs} args - Arguments to filter Buses to count.
     * @example
     * // Count the number of Buses
     * const count = await prisma.bus.count({
     *   where: {
     *     // ... the filter for the Buses we want to count
     *   }
     * })
    **/
    count<T extends BusCountArgs>(
      args?: Subset<T, BusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BusAggregateArgs>(args: Subset<T, BusAggregateArgs>): Prisma.PrismaPromise<GetBusAggregateType<T>>

    /**
     * Group by Bus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusGroupByArgs} args - Group by arguments.
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
      T extends BusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusGroupByArgs['orderBy'] }
        : { orderBy?: BusGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bus model
   */
  readonly fields: BusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    children<T extends Bus$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Bus$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildrenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Bus model
   */
  interface BusFieldRefs {
    readonly id: FieldRef<"Bus", 'String'>
    readonly matricule: FieldRef<"Bus", 'String'>
    readonly brand: FieldRef<"Bus", 'String'>
    readonly seats: FieldRef<"Bus", 'Int'>
    readonly status: FieldRef<"Bus", 'BusStatus'>
    readonly driverId: FieldRef<"Bus", 'String'>
    readonly createdAt: FieldRef<"Bus", 'DateTime'>
    readonly updatedAt: FieldRef<"Bus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bus findUnique
   */
  export type BusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    /**
     * Filter, which Bus to fetch.
     */
    where: BusWhereUniqueInput
  }

  /**
   * Bus findUniqueOrThrow
   */
  export type BusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    /**
     * Filter, which Bus to fetch.
     */
    where: BusWhereUniqueInput
  }

  /**
   * Bus findFirst
   */
  export type BusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    /**
     * Filter, which Bus to fetch.
     */
    where?: BusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buses to fetch.
     */
    orderBy?: BusOrderByWithRelationInput | BusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buses.
     */
    cursor?: BusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buses.
     */
    distinct?: BusScalarFieldEnum | BusScalarFieldEnum[]
  }

  /**
   * Bus findFirstOrThrow
   */
  export type BusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    /**
     * Filter, which Bus to fetch.
     */
    where?: BusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buses to fetch.
     */
    orderBy?: BusOrderByWithRelationInput | BusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buses.
     */
    cursor?: BusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buses.
     */
    distinct?: BusScalarFieldEnum | BusScalarFieldEnum[]
  }

  /**
   * Bus findMany
   */
  export type BusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    /**
     * Filter, which Buses to fetch.
     */
    where?: BusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buses to fetch.
     */
    orderBy?: BusOrderByWithRelationInput | BusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Buses.
     */
    cursor?: BusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buses.
     */
    skip?: number
    distinct?: BusScalarFieldEnum | BusScalarFieldEnum[]
  }

  /**
   * Bus create
   */
  export type BusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    /**
     * The data needed to create a Bus.
     */
    data: XOR<BusCreateInput, BusUncheckedCreateInput>
  }

  /**
   * Bus createMany
   */
  export type BusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Buses.
     */
    data: BusCreateManyInput | BusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bus createManyAndReturn
   */
  export type BusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * The data used to create many Buses.
     */
    data: BusCreateManyInput | BusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bus update
   */
  export type BusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    /**
     * The data needed to update a Bus.
     */
    data: XOR<BusUpdateInput, BusUncheckedUpdateInput>
    /**
     * Choose, which Bus to update.
     */
    where: BusWhereUniqueInput
  }

  /**
   * Bus updateMany
   */
  export type BusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Buses.
     */
    data: XOR<BusUpdateManyMutationInput, BusUncheckedUpdateManyInput>
    /**
     * Filter which Buses to update
     */
    where?: BusWhereInput
    /**
     * Limit how many Buses to update.
     */
    limit?: number
  }

  /**
   * Bus updateManyAndReturn
   */
  export type BusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * The data used to update Buses.
     */
    data: XOR<BusUpdateManyMutationInput, BusUncheckedUpdateManyInput>
    /**
     * Filter which Buses to update
     */
    where?: BusWhereInput
    /**
     * Limit how many Buses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bus upsert
   */
  export type BusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    /**
     * The filter to search for the Bus to update in case it exists.
     */
    where: BusWhereUniqueInput
    /**
     * In case the Bus found by the `where` argument doesn't exist, create a new Bus with this data.
     */
    create: XOR<BusCreateInput, BusUncheckedCreateInput>
    /**
     * In case the Bus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusUpdateInput, BusUncheckedUpdateInput>
  }

  /**
   * Bus delete
   */
  export type BusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
    /**
     * Filter which Bus to delete.
     */
    where: BusWhereUniqueInput
  }

  /**
   * Bus deleteMany
   */
  export type BusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buses to delete
     */
    where?: BusWhereInput
    /**
     * Limit how many Buses to delete.
     */
    limit?: number
  }

  /**
   * Bus.children
   */
  export type Bus$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Children
     */
    select?: ChildrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Children
     */
    omit?: ChildrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChildrenInclude<ExtArgs> | null
    where?: ChildrenWhereInput
    orderBy?: ChildrenOrderByWithRelationInput | ChildrenOrderByWithRelationInput[]
    cursor?: ChildrenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * Bus without action
   */
  export type BusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bus
     */
    select?: BusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bus
     */
    omit?: BusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusInclude<ExtArgs> | null
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


  export const UsersScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    email: 'email',
    phone: 'phone',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const DriverProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    currentLat: 'currentLat',
    currentLong: 'currentLong',
    imageId: 'imageId',
    licenseId: 'licenseId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DriverProfileScalarFieldEnum = (typeof DriverProfileScalarFieldEnum)[keyof typeof DriverProfileScalarFieldEnum]


  export const DriverLicenseScalarFieldEnum: {
    id: 'id',
    licenseNumber: 'licenseNumber',
    licenseType: 'licenseType',
    licenseExpiration: 'licenseExpiration',
    photoFront: 'photoFront',
    photoBack: 'photoBack',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DriverLicenseScalarFieldEnum = (typeof DriverLicenseScalarFieldEnum)[keyof typeof DriverLicenseScalarFieldEnum]


  export const ChildrenScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    adresse: 'adresse',
    homeLat: 'homeLat',
    homeLong: 'homeLong',
    arrivalTime: 'arrivalTime',
    departureTime: 'departureTime',
    schoolId: 'schoolId',
    imageprofileId: 'imageprofileId',
    parentId: 'parentId',
    subscriptionId: 'subscriptionId',
    busId: 'busId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChildrenScalarFieldEnum = (typeof ChildrenScalarFieldEnum)[keyof typeof ChildrenScalarFieldEnum]


  export const SchoolScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    adresse: 'adresse',
    schoolLat: 'schoolLat',
    schoolLong: 'schoolLong'
  };

  export type SchoolScalarFieldEnum = (typeof SchoolScalarFieldEnum)[keyof typeof SchoolScalarFieldEnum]


  export const ImageScalarFieldEnum: {
    id: 'id',
    url: 'url'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    stripeSubId: 'stripeSubId',
    plan: 'plan',
    status: 'status',
    emailSent: 'emailSent',
    cancelAtPeriodEnd: 'cancelAtPeriodEnd',
    createdAt: 'createdAt',
    parentId: 'parentId'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const BusScalarFieldEnum: {
    id: 'id',
    matricule: 'matricule',
    brand: 'brand',
    seats: 'seats',
    status: 'status',
    driverId: 'driverId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BusScalarFieldEnum = (typeof BusScalarFieldEnum)[keyof typeof BusScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'LicenseType'
   */
  export type EnumLicenseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LicenseType'>
    


  /**
   * Reference to a field of type 'LicenseType[]'
   */
  export type ListEnumLicenseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LicenseType[]'>
    


  /**
   * Reference to a field of type 'Plan'
   */
  export type EnumPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Plan'>
    


  /**
   * Reference to a field of type 'Plan[]'
   */
  export type ListEnumPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Plan[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BusStatus'
   */
  export type EnumBusStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusStatus'>
    


  /**
   * Reference to a field of type 'BusStatus[]'
   */
  export type ListEnumBusStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    id?: StringFilter<"Users"> | string
    nom?: StringFilter<"Users"> | string
    prenom?: StringFilter<"Users"> | string
    email?: StringFilter<"Users"> | string
    phone?: StringFilter<"Users"> | string
    role?: EnumRoleFilter<"Users"> | $Enums.Role
    createdAt?: DateTimeFilter<"Users"> | Date | string
    updatedAt?: DateTimeFilter<"Users"> | Date | string
    children?: ChildrenListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    driverProfile?: XOR<DriverProfileNullableScalarRelationFilter, DriverProfileWhereInput> | null
    buses?: BusListRelationFilter
  }

  export type UsersOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    children?: ChildrenOrderByRelationAggregateInput
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    driverProfile?: DriverProfileOrderByWithRelationInput
    buses?: BusOrderByRelationAggregateInput
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    nom?: StringFilter<"Users"> | string
    prenom?: StringFilter<"Users"> | string
    role?: EnumRoleFilter<"Users"> | $Enums.Role
    createdAt?: DateTimeFilter<"Users"> | Date | string
    updatedAt?: DateTimeFilter<"Users"> | Date | string
    children?: ChildrenListRelationFilter
    subscriptions?: SubscriptionListRelationFilter
    driverProfile?: XOR<DriverProfileNullableScalarRelationFilter, DriverProfileWhereInput> | null
    buses?: BusListRelationFilter
  }, "id" | "email" | "phone">

  export type UsersOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsersCountOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Users"> | string
    nom?: StringWithAggregatesFilter<"Users"> | string
    prenom?: StringWithAggregatesFilter<"Users"> | string
    email?: StringWithAggregatesFilter<"Users"> | string
    phone?: StringWithAggregatesFilter<"Users"> | string
    role?: EnumRoleWithAggregatesFilter<"Users"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"Users"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Users"> | Date | string
  }

  export type DriverProfileWhereInput = {
    AND?: DriverProfileWhereInput | DriverProfileWhereInput[]
    OR?: DriverProfileWhereInput[]
    NOT?: DriverProfileWhereInput | DriverProfileWhereInput[]
    id?: StringFilter<"DriverProfile"> | string
    userId?: StringFilter<"DriverProfile"> | string
    currentLat?: FloatNullableFilter<"DriverProfile"> | number | null
    currentLong?: FloatNullableFilter<"DriverProfile"> | number | null
    imageId?: StringNullableFilter<"DriverProfile"> | string | null
    licenseId?: StringNullableFilter<"DriverProfile"> | string | null
    createdAt?: DateTimeFilter<"DriverProfile"> | Date | string
    updatedAt?: DateTimeFilter<"DriverProfile"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    image?: XOR<ImageNullableScalarRelationFilter, ImageWhereInput> | null
    license?: XOR<DriverLicenseNullableScalarRelationFilter, DriverLicenseWhereInput> | null
  }

  export type DriverProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    currentLat?: SortOrderInput | SortOrder
    currentLong?: SortOrderInput | SortOrder
    imageId?: SortOrderInput | SortOrder
    licenseId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UsersOrderByWithRelationInput
    image?: ImageOrderByWithRelationInput
    license?: DriverLicenseOrderByWithRelationInput
  }

  export type DriverProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    imageId?: string
    licenseId?: string
    AND?: DriverProfileWhereInput | DriverProfileWhereInput[]
    OR?: DriverProfileWhereInput[]
    NOT?: DriverProfileWhereInput | DriverProfileWhereInput[]
    currentLat?: FloatNullableFilter<"DriverProfile"> | number | null
    currentLong?: FloatNullableFilter<"DriverProfile"> | number | null
    createdAt?: DateTimeFilter<"DriverProfile"> | Date | string
    updatedAt?: DateTimeFilter<"DriverProfile"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    image?: XOR<ImageNullableScalarRelationFilter, ImageWhereInput> | null
    license?: XOR<DriverLicenseNullableScalarRelationFilter, DriverLicenseWhereInput> | null
  }, "id" | "userId" | "imageId" | "licenseId">

  export type DriverProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    currentLat?: SortOrderInput | SortOrder
    currentLong?: SortOrderInput | SortOrder
    imageId?: SortOrderInput | SortOrder
    licenseId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DriverProfileCountOrderByAggregateInput
    _avg?: DriverProfileAvgOrderByAggregateInput
    _max?: DriverProfileMaxOrderByAggregateInput
    _min?: DriverProfileMinOrderByAggregateInput
    _sum?: DriverProfileSumOrderByAggregateInput
  }

  export type DriverProfileScalarWhereWithAggregatesInput = {
    AND?: DriverProfileScalarWhereWithAggregatesInput | DriverProfileScalarWhereWithAggregatesInput[]
    OR?: DriverProfileScalarWhereWithAggregatesInput[]
    NOT?: DriverProfileScalarWhereWithAggregatesInput | DriverProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DriverProfile"> | string
    userId?: StringWithAggregatesFilter<"DriverProfile"> | string
    currentLat?: FloatNullableWithAggregatesFilter<"DriverProfile"> | number | null
    currentLong?: FloatNullableWithAggregatesFilter<"DriverProfile"> | number | null
    imageId?: StringNullableWithAggregatesFilter<"DriverProfile"> | string | null
    licenseId?: StringNullableWithAggregatesFilter<"DriverProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DriverProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DriverProfile"> | Date | string
  }

  export type DriverLicenseWhereInput = {
    AND?: DriverLicenseWhereInput | DriverLicenseWhereInput[]
    OR?: DriverLicenseWhereInput[]
    NOT?: DriverLicenseWhereInput | DriverLicenseWhereInput[]
    id?: StringFilter<"DriverLicense"> | string
    licenseNumber?: StringFilter<"DriverLicense"> | string
    licenseType?: EnumLicenseTypeFilter<"DriverLicense"> | $Enums.LicenseType
    licenseExpiration?: DateTimeFilter<"DriverLicense"> | Date | string
    photoFront?: StringNullableFilter<"DriverLicense"> | string | null
    photoBack?: StringNullableFilter<"DriverLicense"> | string | null
    createdAt?: DateTimeFilter<"DriverLicense"> | Date | string
    updatedAt?: DateTimeFilter<"DriverLicense"> | Date | string
    driverProfile?: XOR<DriverProfileNullableScalarRelationFilter, DriverProfileWhereInput> | null
  }

  export type DriverLicenseOrderByWithRelationInput = {
    id?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    licenseExpiration?: SortOrder
    photoFront?: SortOrderInput | SortOrder
    photoBack?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    driverProfile?: DriverProfileOrderByWithRelationInput
  }

  export type DriverLicenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DriverLicenseWhereInput | DriverLicenseWhereInput[]
    OR?: DriverLicenseWhereInput[]
    NOT?: DriverLicenseWhereInput | DriverLicenseWhereInput[]
    licenseNumber?: StringFilter<"DriverLicense"> | string
    licenseType?: EnumLicenseTypeFilter<"DriverLicense"> | $Enums.LicenseType
    licenseExpiration?: DateTimeFilter<"DriverLicense"> | Date | string
    photoFront?: StringNullableFilter<"DriverLicense"> | string | null
    photoBack?: StringNullableFilter<"DriverLicense"> | string | null
    createdAt?: DateTimeFilter<"DriverLicense"> | Date | string
    updatedAt?: DateTimeFilter<"DriverLicense"> | Date | string
    driverProfile?: XOR<DriverProfileNullableScalarRelationFilter, DriverProfileWhereInput> | null
  }, "id">

  export type DriverLicenseOrderByWithAggregationInput = {
    id?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    licenseExpiration?: SortOrder
    photoFront?: SortOrderInput | SortOrder
    photoBack?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DriverLicenseCountOrderByAggregateInput
    _max?: DriverLicenseMaxOrderByAggregateInput
    _min?: DriverLicenseMinOrderByAggregateInput
  }

  export type DriverLicenseScalarWhereWithAggregatesInput = {
    AND?: DriverLicenseScalarWhereWithAggregatesInput | DriverLicenseScalarWhereWithAggregatesInput[]
    OR?: DriverLicenseScalarWhereWithAggregatesInput[]
    NOT?: DriverLicenseScalarWhereWithAggregatesInput | DriverLicenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DriverLicense"> | string
    licenseNumber?: StringWithAggregatesFilter<"DriverLicense"> | string
    licenseType?: EnumLicenseTypeWithAggregatesFilter<"DriverLicense"> | $Enums.LicenseType
    licenseExpiration?: DateTimeWithAggregatesFilter<"DriverLicense"> | Date | string
    photoFront?: StringNullableWithAggregatesFilter<"DriverLicense"> | string | null
    photoBack?: StringNullableWithAggregatesFilter<"DriverLicense"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DriverLicense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DriverLicense"> | Date | string
  }

  export type ChildrenWhereInput = {
    AND?: ChildrenWhereInput | ChildrenWhereInput[]
    OR?: ChildrenWhereInput[]
    NOT?: ChildrenWhereInput | ChildrenWhereInput[]
    id?: StringFilter<"Children"> | string
    nom?: StringFilter<"Children"> | string
    prenom?: StringFilter<"Children"> | string
    adresse?: StringFilter<"Children"> | string
    homeLat?: FloatFilter<"Children"> | number
    homeLong?: FloatFilter<"Children"> | number
    arrivalTime?: StringFilter<"Children"> | string
    departureTime?: StringFilter<"Children"> | string
    schoolId?: StringFilter<"Children"> | string
    imageprofileId?: StringFilter<"Children"> | string
    parentId?: StringFilter<"Children"> | string
    subscriptionId?: StringNullableFilter<"Children"> | string | null
    busId?: StringNullableFilter<"Children"> | string | null
    createdAt?: DateTimeFilter<"Children"> | Date | string
    updatedAt?: DateTimeFilter<"Children"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
    imageprofile?: XOR<ImageScalarRelationFilter, ImageWhereInput>
    parent?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    bus?: XOR<BusNullableScalarRelationFilter, BusWhereInput> | null
  }

  export type ChildrenOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    adresse?: SortOrder
    homeLat?: SortOrder
    homeLong?: SortOrder
    arrivalTime?: SortOrder
    departureTime?: SortOrder
    schoolId?: SortOrder
    imageprofileId?: SortOrder
    parentId?: SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    busId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
    imageprofile?: ImageOrderByWithRelationInput
    parent?: UsersOrderByWithRelationInput
    subscription?: SubscriptionOrderByWithRelationInput
    bus?: BusOrderByWithRelationInput
  }

  export type ChildrenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    imageprofileId?: string
    AND?: ChildrenWhereInput | ChildrenWhereInput[]
    OR?: ChildrenWhereInput[]
    NOT?: ChildrenWhereInput | ChildrenWhereInput[]
    nom?: StringFilter<"Children"> | string
    prenom?: StringFilter<"Children"> | string
    adresse?: StringFilter<"Children"> | string
    homeLat?: FloatFilter<"Children"> | number
    homeLong?: FloatFilter<"Children"> | number
    arrivalTime?: StringFilter<"Children"> | string
    departureTime?: StringFilter<"Children"> | string
    schoolId?: StringFilter<"Children"> | string
    parentId?: StringFilter<"Children"> | string
    subscriptionId?: StringNullableFilter<"Children"> | string | null
    busId?: StringNullableFilter<"Children"> | string | null
    createdAt?: DateTimeFilter<"Children"> | Date | string
    updatedAt?: DateTimeFilter<"Children"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
    imageprofile?: XOR<ImageScalarRelationFilter, ImageWhereInput>
    parent?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    bus?: XOR<BusNullableScalarRelationFilter, BusWhereInput> | null
  }, "id" | "imageprofileId">

  export type ChildrenOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    adresse?: SortOrder
    homeLat?: SortOrder
    homeLong?: SortOrder
    arrivalTime?: SortOrder
    departureTime?: SortOrder
    schoolId?: SortOrder
    imageprofileId?: SortOrder
    parentId?: SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    busId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChildrenCountOrderByAggregateInput
    _avg?: ChildrenAvgOrderByAggregateInput
    _max?: ChildrenMaxOrderByAggregateInput
    _min?: ChildrenMinOrderByAggregateInput
    _sum?: ChildrenSumOrderByAggregateInput
  }

  export type ChildrenScalarWhereWithAggregatesInput = {
    AND?: ChildrenScalarWhereWithAggregatesInput | ChildrenScalarWhereWithAggregatesInput[]
    OR?: ChildrenScalarWhereWithAggregatesInput[]
    NOT?: ChildrenScalarWhereWithAggregatesInput | ChildrenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Children"> | string
    nom?: StringWithAggregatesFilter<"Children"> | string
    prenom?: StringWithAggregatesFilter<"Children"> | string
    adresse?: StringWithAggregatesFilter<"Children"> | string
    homeLat?: FloatWithAggregatesFilter<"Children"> | number
    homeLong?: FloatWithAggregatesFilter<"Children"> | number
    arrivalTime?: StringWithAggregatesFilter<"Children"> | string
    departureTime?: StringWithAggregatesFilter<"Children"> | string
    schoolId?: StringWithAggregatesFilter<"Children"> | string
    imageprofileId?: StringWithAggregatesFilter<"Children"> | string
    parentId?: StringWithAggregatesFilter<"Children"> | string
    subscriptionId?: StringNullableWithAggregatesFilter<"Children"> | string | null
    busId?: StringNullableWithAggregatesFilter<"Children"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Children"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Children"> | Date | string
  }

  export type SchoolWhereInput = {
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    id?: StringFilter<"School"> | string
    nom?: StringFilter<"School"> | string
    adresse?: StringFilter<"School"> | string
    schoolLat?: FloatFilter<"School"> | number
    schoolLong?: FloatFilter<"School"> | number
    children?: ChildrenListRelationFilter
  }

  export type SchoolOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    schoolLat?: SortOrder
    schoolLong?: SortOrder
    children?: ChildrenOrderByRelationAggregateInput
  }

  export type SchoolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    nom?: StringFilter<"School"> | string
    adresse?: StringFilter<"School"> | string
    schoolLat?: FloatFilter<"School"> | number
    schoolLong?: FloatFilter<"School"> | number
    children?: ChildrenListRelationFilter
  }, "id">

  export type SchoolOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    schoolLat?: SortOrder
    schoolLong?: SortOrder
    _count?: SchoolCountOrderByAggregateInput
    _avg?: SchoolAvgOrderByAggregateInput
    _max?: SchoolMaxOrderByAggregateInput
    _min?: SchoolMinOrderByAggregateInput
    _sum?: SchoolSumOrderByAggregateInput
  }

  export type SchoolScalarWhereWithAggregatesInput = {
    AND?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    OR?: SchoolScalarWhereWithAggregatesInput[]
    NOT?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"School"> | string
    nom?: StringWithAggregatesFilter<"School"> | string
    adresse?: StringWithAggregatesFilter<"School"> | string
    schoolLat?: FloatWithAggregatesFilter<"School"> | number
    schoolLong?: FloatWithAggregatesFilter<"School"> | number
  }

  export type ImageWhereInput = {
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    id?: StringFilter<"Image"> | string
    url?: StringFilter<"Image"> | string
    child?: XOR<ChildrenNullableScalarRelationFilter, ChildrenWhereInput> | null
    driver?: XOR<DriverProfileNullableScalarRelationFilter, DriverProfileWhereInput> | null
  }

  export type ImageOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    child?: ChildrenOrderByWithRelationInput
    driver?: DriverProfileOrderByWithRelationInput
  }

  export type ImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    url?: StringFilter<"Image"> | string
    child?: XOR<ChildrenNullableScalarRelationFilter, ChildrenWhereInput> | null
    driver?: XOR<DriverProfileNullableScalarRelationFilter, DriverProfileWhereInput> | null
  }, "id">

  export type ImageOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    _count?: ImageCountOrderByAggregateInput
    _max?: ImageMaxOrderByAggregateInput
    _min?: ImageMinOrderByAggregateInput
  }

  export type ImageScalarWhereWithAggregatesInput = {
    AND?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    OR?: ImageScalarWhereWithAggregatesInput[]
    NOT?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Image"> | string
    url?: StringWithAggregatesFilter<"Image"> | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    stripeSubId?: StringNullableFilter<"Subscription"> | string | null
    plan?: EnumPlanFilter<"Subscription"> | $Enums.Plan
    status?: StringFilter<"Subscription"> | string
    emailSent?: BoolFilter<"Subscription"> | boolean
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    parentId?: StringFilter<"Subscription"> | string
    parent?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    children?: ChildrenListRelationFilter
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    stripeSubId?: SortOrderInput | SortOrder
    plan?: SortOrder
    status?: SortOrder
    emailSent?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
    parent?: UsersOrderByWithRelationInput
    children?: ChildrenOrderByRelationAggregateInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stripeSubId?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    plan?: EnumPlanFilter<"Subscription"> | $Enums.Plan
    status?: StringFilter<"Subscription"> | string
    emailSent?: BoolFilter<"Subscription"> | boolean
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    parentId?: StringFilter<"Subscription"> | string
    parent?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    children?: ChildrenListRelationFilter
  }, "id" | "stripeSubId">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    stripeSubId?: SortOrderInput | SortOrder
    plan?: SortOrder
    status?: SortOrder
    emailSent?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    stripeSubId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    plan?: EnumPlanWithAggregatesFilter<"Subscription"> | $Enums.Plan
    status?: StringWithAggregatesFilter<"Subscription"> | string
    emailSent?: BoolWithAggregatesFilter<"Subscription"> | boolean
    cancelAtPeriodEnd?: BoolWithAggregatesFilter<"Subscription"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    parentId?: StringWithAggregatesFilter<"Subscription"> | string
  }

  export type BusWhereInput = {
    AND?: BusWhereInput | BusWhereInput[]
    OR?: BusWhereInput[]
    NOT?: BusWhereInput | BusWhereInput[]
    id?: StringFilter<"Bus"> | string
    matricule?: StringFilter<"Bus"> | string
    brand?: StringFilter<"Bus"> | string
    seats?: IntFilter<"Bus"> | number
    status?: EnumBusStatusFilter<"Bus"> | $Enums.BusStatus
    driverId?: StringFilter<"Bus"> | string
    createdAt?: DateTimeFilter<"Bus"> | Date | string
    updatedAt?: DateTimeFilter<"Bus"> | Date | string
    driver?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    children?: ChildrenListRelationFilter
  }

  export type BusOrderByWithRelationInput = {
    id?: SortOrder
    matricule?: SortOrder
    brand?: SortOrder
    seats?: SortOrder
    status?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    driver?: UsersOrderByWithRelationInput
    children?: ChildrenOrderByRelationAggregateInput
  }

  export type BusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    matricule?: string
    AND?: BusWhereInput | BusWhereInput[]
    OR?: BusWhereInput[]
    NOT?: BusWhereInput | BusWhereInput[]
    brand?: StringFilter<"Bus"> | string
    seats?: IntFilter<"Bus"> | number
    status?: EnumBusStatusFilter<"Bus"> | $Enums.BusStatus
    driverId?: StringFilter<"Bus"> | string
    createdAt?: DateTimeFilter<"Bus"> | Date | string
    updatedAt?: DateTimeFilter<"Bus"> | Date | string
    driver?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    children?: ChildrenListRelationFilter
  }, "id" | "matricule">

  export type BusOrderByWithAggregationInput = {
    id?: SortOrder
    matricule?: SortOrder
    brand?: SortOrder
    seats?: SortOrder
    status?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BusCountOrderByAggregateInput
    _avg?: BusAvgOrderByAggregateInput
    _max?: BusMaxOrderByAggregateInput
    _min?: BusMinOrderByAggregateInput
    _sum?: BusSumOrderByAggregateInput
  }

  export type BusScalarWhereWithAggregatesInput = {
    AND?: BusScalarWhereWithAggregatesInput | BusScalarWhereWithAggregatesInput[]
    OR?: BusScalarWhereWithAggregatesInput[]
    NOT?: BusScalarWhereWithAggregatesInput | BusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bus"> | string
    matricule?: StringWithAggregatesFilter<"Bus"> | string
    brand?: StringWithAggregatesFilter<"Bus"> | string
    seats?: IntWithAggregatesFilter<"Bus"> | number
    status?: EnumBusStatusWithAggregatesFilter<"Bus"> | $Enums.BusStatus
    driverId?: StringWithAggregatesFilter<"Bus"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bus"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bus"> | Date | string
  }

  export type UsersCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenCreateNestedManyWithoutParentInput
    subscriptions?: SubscriptionCreateNestedManyWithoutParentInput
    driverProfile?: DriverProfileCreateNestedOneWithoutUserInput
    buses?: BusCreateNestedManyWithoutDriverInput
  }

  export type UsersUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenUncheckedCreateNestedManyWithoutParentInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutParentInput
    driverProfile?: DriverProfileUncheckedCreateNestedOneWithoutUserInput
    buses?: BusUncheckedCreateNestedManyWithoutDriverInput
  }

  export type UsersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUpdateManyWithoutParentNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutParentNestedInput
    driverProfile?: DriverProfileUpdateOneWithoutUserNestedInput
    buses?: BusUpdateManyWithoutDriverNestedInput
  }

  export type UsersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUncheckedUpdateManyWithoutParentNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutParentNestedInput
    driverProfile?: DriverProfileUncheckedUpdateOneWithoutUserNestedInput
    buses?: BusUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type UsersCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverProfileCreateInput = {
    id?: string
    currentLat?: number | null
    currentLong?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UsersCreateNestedOneWithoutDriverProfileInput
    image?: ImageCreateNestedOneWithoutDriverInput
    license?: DriverLicenseCreateNestedOneWithoutDriverProfileInput
  }

  export type DriverProfileUncheckedCreateInput = {
    id?: string
    userId: string
    currentLat?: number | null
    currentLong?: number | null
    imageId?: string | null
    licenseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutDriverProfileNestedInput
    image?: ImageUpdateOneWithoutDriverNestedInput
    license?: DriverLicenseUpdateOneWithoutDriverProfileNestedInput
  }

  export type DriverProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    licenseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverProfileCreateManyInput = {
    id?: string
    userId: string
    currentLat?: number | null
    currentLong?: number | null
    imageId?: string | null
    licenseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    licenseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverLicenseCreateInput = {
    id?: string
    licenseNumber: string
    licenseType: $Enums.LicenseType
    licenseExpiration: Date | string
    photoFront?: string | null
    photoBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileCreateNestedOneWithoutLicenseInput
  }

  export type DriverLicenseUncheckedCreateInput = {
    id?: string
    licenseNumber: string
    licenseType: $Enums.LicenseType
    licenseExpiration: Date | string
    photoFront?: string | null
    photoBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileUncheckedCreateNestedOneWithoutLicenseInput
  }

  export type DriverLicenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: EnumLicenseTypeFieldUpdateOperationsInput | $Enums.LicenseType
    licenseExpiration?: DateTimeFieldUpdateOperationsInput | Date | string
    photoFront?: NullableStringFieldUpdateOperationsInput | string | null
    photoBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUpdateOneWithoutLicenseNestedInput
  }

  export type DriverLicenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: EnumLicenseTypeFieldUpdateOperationsInput | $Enums.LicenseType
    licenseExpiration?: DateTimeFieldUpdateOperationsInput | Date | string
    photoFront?: NullableStringFieldUpdateOperationsInput | string | null
    photoBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUncheckedUpdateOneWithoutLicenseNestedInput
  }

  export type DriverLicenseCreateManyInput = {
    id?: string
    licenseNumber: string
    licenseType: $Enums.LicenseType
    licenseExpiration: Date | string
    photoFront?: string | null
    photoBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverLicenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: EnumLicenseTypeFieldUpdateOperationsInput | $Enums.LicenseType
    licenseExpiration?: DateTimeFieldUpdateOperationsInput | Date | string
    photoFront?: NullableStringFieldUpdateOperationsInput | string | null
    photoBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverLicenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: EnumLicenseTypeFieldUpdateOperationsInput | $Enums.LicenseType
    licenseExpiration?: DateTimeFieldUpdateOperationsInput | Date | string
    photoFront?: NullableStringFieldUpdateOperationsInput | string | null
    photoBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenCreateInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutChildrenInput
    imageprofile: ImageCreateNestedOneWithoutChildInput
    parent: UsersCreateNestedOneWithoutChildrenInput
    subscription?: SubscriptionCreateNestedOneWithoutChildrenInput
    bus?: BusCreateNestedOneWithoutChildrenInput
  }

  export type ChildrenUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    imageprofileId: string
    parentId: string
    subscriptionId?: string | null
    busId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutChildrenNestedInput
    imageprofile?: ImageUpdateOneRequiredWithoutChildNestedInput
    parent?: UsersUpdateOneRequiredWithoutChildrenNestedInput
    subscription?: SubscriptionUpdateOneWithoutChildrenNestedInput
    bus?: BusUpdateOneWithoutChildrenNestedInput
  }

  export type ChildrenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    busId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    imageprofileId: string
    parentId: string
    subscriptionId?: string | null
    busId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    busId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolCreateInput = {
    id?: string
    nom: string
    adresse: string
    schoolLat: number
    schoolLong: number
    children?: ChildrenCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateInput = {
    id?: string
    nom: string
    adresse: string
    schoolLat: number
    schoolLong: number
    children?: ChildrenUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    schoolLat?: FloatFieldUpdateOperationsInput | number
    schoolLong?: FloatFieldUpdateOperationsInput | number
    children?: ChildrenUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    schoolLat?: FloatFieldUpdateOperationsInput | number
    schoolLong?: FloatFieldUpdateOperationsInput | number
    children?: ChildrenUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateManyInput = {
    id?: string
    nom: string
    adresse: string
    schoolLat: number
    schoolLong: number
  }

  export type SchoolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    schoolLat?: FloatFieldUpdateOperationsInput | number
    schoolLong?: FloatFieldUpdateOperationsInput | number
  }

  export type SchoolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    schoolLat?: FloatFieldUpdateOperationsInput | number
    schoolLong?: FloatFieldUpdateOperationsInput | number
  }

  export type ImageCreateInput = {
    id?: string
    url: string
    child?: ChildrenCreateNestedOneWithoutImageprofileInput
    driver?: DriverProfileCreateNestedOneWithoutImageInput
  }

  export type ImageUncheckedCreateInput = {
    id?: string
    url: string
    child?: ChildrenUncheckedCreateNestedOneWithoutImageprofileInput
    driver?: DriverProfileUncheckedCreateNestedOneWithoutImageInput
  }

  export type ImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    child?: ChildrenUpdateOneWithoutImageprofileNestedInput
    driver?: DriverProfileUpdateOneWithoutImageNestedInput
  }

  export type ImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    child?: ChildrenUncheckedUpdateOneWithoutImageprofileNestedInput
    driver?: DriverProfileUncheckedUpdateOneWithoutImageNestedInput
  }

  export type ImageCreateManyInput = {
    id?: string
    url: string
  }

  export type ImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type ImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    stripeSubId?: string | null
    plan: $Enums.Plan
    status: string
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: Date | string
    parent: UsersCreateNestedOneWithoutSubscriptionsInput
    children?: ChildrenCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    stripeSubId?: string | null
    plan: $Enums.Plan
    status: string
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: Date | string
    parentId: string
    children?: ChildrenUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    status?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UsersUpdateOneRequiredWithoutSubscriptionsNestedInput
    children?: ChildrenUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    status?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
    children?: ChildrenUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    stripeSubId?: string | null
    plan: $Enums.Plan
    status: string
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: Date | string
    parentId: string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    status?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    status?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
  }

  export type BusCreateInput = {
    id?: string
    matricule: string
    brand: string
    seats: number
    status?: $Enums.BusStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    driver: UsersCreateNestedOneWithoutBusesInput
    children?: ChildrenCreateNestedManyWithoutBusInput
  }

  export type BusUncheckedCreateInput = {
    id?: string
    matricule: string
    brand: string
    seats: number
    status?: $Enums.BusStatus
    driverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenUncheckedCreateNestedManyWithoutBusInput
  }

  export type BusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matricule?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    status?: EnumBusStatusFieldUpdateOperationsInput | $Enums.BusStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: UsersUpdateOneRequiredWithoutBusesNestedInput
    children?: ChildrenUpdateManyWithoutBusNestedInput
  }

  export type BusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matricule?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    status?: EnumBusStatusFieldUpdateOperationsInput | $Enums.BusStatus
    driverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUncheckedUpdateManyWithoutBusNestedInput
  }

  export type BusCreateManyInput = {
    id?: string
    matricule: string
    brand: string
    seats: number
    status?: $Enums.BusStatus
    driverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    matricule?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    status?: EnumBusStatusFieldUpdateOperationsInput | $Enums.BusStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matricule?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    status?: EnumBusStatusFieldUpdateOperationsInput | $Enums.BusStatus
    driverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type ChildrenListRelationFilter = {
    every?: ChildrenWhereInput
    some?: ChildrenWhereInput
    none?: ChildrenWhereInput
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type DriverProfileNullableScalarRelationFilter = {
    is?: DriverProfileWhereInput | null
    isNot?: DriverProfileWhereInput | null
  }

  export type BusListRelationFilter = {
    every?: BusWhereInput
    some?: BusWhereInput
    none?: BusWhereInput
  }

  export type ChildrenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsersCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type UsersScalarRelationFilter = {
    is?: UsersWhereInput
    isNot?: UsersWhereInput
  }

  export type ImageNullableScalarRelationFilter = {
    is?: ImageWhereInput | null
    isNot?: ImageWhereInput | null
  }

  export type DriverLicenseNullableScalarRelationFilter = {
    is?: DriverLicenseWhereInput | null
    isNot?: DriverLicenseWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DriverProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    currentLat?: SortOrder
    currentLong?: SortOrder
    imageId?: SortOrder
    licenseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverProfileAvgOrderByAggregateInput = {
    currentLat?: SortOrder
    currentLong?: SortOrder
  }

  export type DriverProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    currentLat?: SortOrder
    currentLong?: SortOrder
    imageId?: SortOrder
    licenseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    currentLat?: SortOrder
    currentLong?: SortOrder
    imageId?: SortOrder
    licenseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverProfileSumOrderByAggregateInput = {
    currentLat?: SortOrder
    currentLong?: SortOrder
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

  export type EnumLicenseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LicenseType | EnumLicenseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LicenseType[] | ListEnumLicenseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LicenseType[] | ListEnumLicenseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLicenseTypeFilter<$PrismaModel> | $Enums.LicenseType
  }

  export type DriverLicenseCountOrderByAggregateInput = {
    id?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    licenseExpiration?: SortOrder
    photoFront?: SortOrder
    photoBack?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverLicenseMaxOrderByAggregateInput = {
    id?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    licenseExpiration?: SortOrder
    photoFront?: SortOrder
    photoBack?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverLicenseMinOrderByAggregateInput = {
    id?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    licenseExpiration?: SortOrder
    photoFront?: SortOrder
    photoBack?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumLicenseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LicenseType | EnumLicenseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LicenseType[] | ListEnumLicenseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LicenseType[] | ListEnumLicenseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLicenseTypeWithAggregatesFilter<$PrismaModel> | $Enums.LicenseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLicenseTypeFilter<$PrismaModel>
    _max?: NestedEnumLicenseTypeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SchoolScalarRelationFilter = {
    is?: SchoolWhereInput
    isNot?: SchoolWhereInput
  }

  export type ImageScalarRelationFilter = {
    is?: ImageWhereInput
    isNot?: ImageWhereInput
  }

  export type SubscriptionNullableScalarRelationFilter = {
    is?: SubscriptionWhereInput | null
    isNot?: SubscriptionWhereInput | null
  }

  export type BusNullableScalarRelationFilter = {
    is?: BusWhereInput | null
    isNot?: BusWhereInput | null
  }

  export type ChildrenCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    adresse?: SortOrder
    homeLat?: SortOrder
    homeLong?: SortOrder
    arrivalTime?: SortOrder
    departureTime?: SortOrder
    schoolId?: SortOrder
    imageprofileId?: SortOrder
    parentId?: SortOrder
    subscriptionId?: SortOrder
    busId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChildrenAvgOrderByAggregateInput = {
    homeLat?: SortOrder
    homeLong?: SortOrder
  }

  export type ChildrenMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    adresse?: SortOrder
    homeLat?: SortOrder
    homeLong?: SortOrder
    arrivalTime?: SortOrder
    departureTime?: SortOrder
    schoolId?: SortOrder
    imageprofileId?: SortOrder
    parentId?: SortOrder
    subscriptionId?: SortOrder
    busId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChildrenMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    adresse?: SortOrder
    homeLat?: SortOrder
    homeLong?: SortOrder
    arrivalTime?: SortOrder
    departureTime?: SortOrder
    schoolId?: SortOrder
    imageprofileId?: SortOrder
    parentId?: SortOrder
    subscriptionId?: SortOrder
    busId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChildrenSumOrderByAggregateInput = {
    homeLat?: SortOrder
    homeLong?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SchoolCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    schoolLat?: SortOrder
    schoolLong?: SortOrder
  }

  export type SchoolAvgOrderByAggregateInput = {
    schoolLat?: SortOrder
    schoolLong?: SortOrder
  }

  export type SchoolMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    schoolLat?: SortOrder
    schoolLong?: SortOrder
  }

  export type SchoolMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    schoolLat?: SortOrder
    schoolLong?: SortOrder
  }

  export type SchoolSumOrderByAggregateInput = {
    schoolLat?: SortOrder
    schoolLong?: SortOrder
  }

  export type ChildrenNullableScalarRelationFilter = {
    is?: ChildrenWhereInput | null
    isNot?: ChildrenWhereInput | null
  }

  export type ImageCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
  }

  export type ImageMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
  }

  export type ImageMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
  }

  export type EnumPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanFilter<$PrismaModel> | $Enums.Plan
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    stripeSubId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    emailSent?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    stripeSubId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    emailSent?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    stripeSubId?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    emailSent?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    createdAt?: SortOrder
    parentId?: SortOrder
  }

  export type EnumPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanWithAggregatesFilter<$PrismaModel> | $Enums.Plan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanFilter<$PrismaModel>
    _max?: NestedEnumPlanFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumBusStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BusStatus | EnumBusStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusStatus[] | ListEnumBusStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusStatus[] | ListEnumBusStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusStatusFilter<$PrismaModel> | $Enums.BusStatus
  }

  export type BusCountOrderByAggregateInput = {
    id?: SortOrder
    matricule?: SortOrder
    brand?: SortOrder
    seats?: SortOrder
    status?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusAvgOrderByAggregateInput = {
    seats?: SortOrder
  }

  export type BusMaxOrderByAggregateInput = {
    id?: SortOrder
    matricule?: SortOrder
    brand?: SortOrder
    seats?: SortOrder
    status?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusMinOrderByAggregateInput = {
    id?: SortOrder
    matricule?: SortOrder
    brand?: SortOrder
    seats?: SortOrder
    status?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusSumOrderByAggregateInput = {
    seats?: SortOrder
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

  export type EnumBusStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusStatus | EnumBusStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusStatus[] | ListEnumBusStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusStatus[] | ListEnumBusStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusStatusWithAggregatesFilter<$PrismaModel> | $Enums.BusStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusStatusFilter<$PrismaModel>
    _max?: NestedEnumBusStatusFilter<$PrismaModel>
  }

  export type ChildrenCreateNestedManyWithoutParentInput = {
    create?: XOR<ChildrenCreateWithoutParentInput, ChildrenUncheckedCreateWithoutParentInput> | ChildrenCreateWithoutParentInput[] | ChildrenUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutParentInput | ChildrenCreateOrConnectWithoutParentInput[]
    createMany?: ChildrenCreateManyParentInputEnvelope
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedManyWithoutParentInput = {
    create?: XOR<SubscriptionCreateWithoutParentInput, SubscriptionUncheckedCreateWithoutParentInput> | SubscriptionCreateWithoutParentInput[] | SubscriptionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutParentInput | SubscriptionCreateOrConnectWithoutParentInput[]
    createMany?: SubscriptionCreateManyParentInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type DriverProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutUserInput
    connect?: DriverProfileWhereUniqueInput
  }

  export type BusCreateNestedManyWithoutDriverInput = {
    create?: XOR<BusCreateWithoutDriverInput, BusUncheckedCreateWithoutDriverInput> | BusCreateWithoutDriverInput[] | BusUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: BusCreateOrConnectWithoutDriverInput | BusCreateOrConnectWithoutDriverInput[]
    createMany?: BusCreateManyDriverInputEnvelope
    connect?: BusWhereUniqueInput | BusWhereUniqueInput[]
  }

  export type ChildrenUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<ChildrenCreateWithoutParentInput, ChildrenUncheckedCreateWithoutParentInput> | ChildrenCreateWithoutParentInput[] | ChildrenUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutParentInput | ChildrenCreateOrConnectWithoutParentInput[]
    createMany?: ChildrenCreateManyParentInputEnvelope
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<SubscriptionCreateWithoutParentInput, SubscriptionUncheckedCreateWithoutParentInput> | SubscriptionCreateWithoutParentInput[] | SubscriptionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutParentInput | SubscriptionCreateOrConnectWithoutParentInput[]
    createMany?: SubscriptionCreateManyParentInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type DriverProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutUserInput
    connect?: DriverProfileWhereUniqueInput
  }

  export type BusUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<BusCreateWithoutDriverInput, BusUncheckedCreateWithoutDriverInput> | BusCreateWithoutDriverInput[] | BusUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: BusCreateOrConnectWithoutDriverInput | BusCreateOrConnectWithoutDriverInput[]
    createMany?: BusCreateManyDriverInputEnvelope
    connect?: BusWhereUniqueInput | BusWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ChildrenUpdateManyWithoutParentNestedInput = {
    create?: XOR<ChildrenCreateWithoutParentInput, ChildrenUncheckedCreateWithoutParentInput> | ChildrenCreateWithoutParentInput[] | ChildrenUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutParentInput | ChildrenCreateOrConnectWithoutParentInput[]
    upsert?: ChildrenUpsertWithWhereUniqueWithoutParentInput | ChildrenUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ChildrenCreateManyParentInputEnvelope
    set?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    disconnect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    delete?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    update?: ChildrenUpdateWithWhereUniqueWithoutParentInput | ChildrenUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ChildrenUpdateManyWithWhereWithoutParentInput | ChildrenUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
  }

  export type SubscriptionUpdateManyWithoutParentNestedInput = {
    create?: XOR<SubscriptionCreateWithoutParentInput, SubscriptionUncheckedCreateWithoutParentInput> | SubscriptionCreateWithoutParentInput[] | SubscriptionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutParentInput | SubscriptionCreateOrConnectWithoutParentInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutParentInput | SubscriptionUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: SubscriptionCreateManyParentInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutParentInput | SubscriptionUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutParentInput | SubscriptionUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type DriverProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutUserInput
    upsert?: DriverProfileUpsertWithoutUserInput
    disconnect?: DriverProfileWhereInput | boolean
    delete?: DriverProfileWhereInput | boolean
    connect?: DriverProfileWhereUniqueInput
    update?: XOR<XOR<DriverProfileUpdateToOneWithWhereWithoutUserInput, DriverProfileUpdateWithoutUserInput>, DriverProfileUncheckedUpdateWithoutUserInput>
  }

  export type BusUpdateManyWithoutDriverNestedInput = {
    create?: XOR<BusCreateWithoutDriverInput, BusUncheckedCreateWithoutDriverInput> | BusCreateWithoutDriverInput[] | BusUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: BusCreateOrConnectWithoutDriverInput | BusCreateOrConnectWithoutDriverInput[]
    upsert?: BusUpsertWithWhereUniqueWithoutDriverInput | BusUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: BusCreateManyDriverInputEnvelope
    set?: BusWhereUniqueInput | BusWhereUniqueInput[]
    disconnect?: BusWhereUniqueInput | BusWhereUniqueInput[]
    delete?: BusWhereUniqueInput | BusWhereUniqueInput[]
    connect?: BusWhereUniqueInput | BusWhereUniqueInput[]
    update?: BusUpdateWithWhereUniqueWithoutDriverInput | BusUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: BusUpdateManyWithWhereWithoutDriverInput | BusUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: BusScalarWhereInput | BusScalarWhereInput[]
  }

  export type ChildrenUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<ChildrenCreateWithoutParentInput, ChildrenUncheckedCreateWithoutParentInput> | ChildrenCreateWithoutParentInput[] | ChildrenUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutParentInput | ChildrenCreateOrConnectWithoutParentInput[]
    upsert?: ChildrenUpsertWithWhereUniqueWithoutParentInput | ChildrenUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ChildrenCreateManyParentInputEnvelope
    set?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    disconnect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    delete?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    update?: ChildrenUpdateWithWhereUniqueWithoutParentInput | ChildrenUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ChildrenUpdateManyWithWhereWithoutParentInput | ChildrenUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<SubscriptionCreateWithoutParentInput, SubscriptionUncheckedCreateWithoutParentInput> | SubscriptionCreateWithoutParentInput[] | SubscriptionUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutParentInput | SubscriptionCreateOrConnectWithoutParentInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutParentInput | SubscriptionUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: SubscriptionCreateManyParentInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutParentInput | SubscriptionUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutParentInput | SubscriptionUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type DriverProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutUserInput
    upsert?: DriverProfileUpsertWithoutUserInput
    disconnect?: DriverProfileWhereInput | boolean
    delete?: DriverProfileWhereInput | boolean
    connect?: DriverProfileWhereUniqueInput
    update?: XOR<XOR<DriverProfileUpdateToOneWithWhereWithoutUserInput, DriverProfileUpdateWithoutUserInput>, DriverProfileUncheckedUpdateWithoutUserInput>
  }

  export type BusUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<BusCreateWithoutDriverInput, BusUncheckedCreateWithoutDriverInput> | BusCreateWithoutDriverInput[] | BusUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: BusCreateOrConnectWithoutDriverInput | BusCreateOrConnectWithoutDriverInput[]
    upsert?: BusUpsertWithWhereUniqueWithoutDriverInput | BusUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: BusCreateManyDriverInputEnvelope
    set?: BusWhereUniqueInput | BusWhereUniqueInput[]
    disconnect?: BusWhereUniqueInput | BusWhereUniqueInput[]
    delete?: BusWhereUniqueInput | BusWhereUniqueInput[]
    connect?: BusWhereUniqueInput | BusWhereUniqueInput[]
    update?: BusUpdateWithWhereUniqueWithoutDriverInput | BusUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: BusUpdateManyWithWhereWithoutDriverInput | BusUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: BusScalarWhereInput | BusScalarWhereInput[]
  }

  export type UsersCreateNestedOneWithoutDriverProfileInput = {
    create?: XOR<UsersCreateWithoutDriverProfileInput, UsersUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: UsersCreateOrConnectWithoutDriverProfileInput
    connect?: UsersWhereUniqueInput
  }

  export type ImageCreateNestedOneWithoutDriverInput = {
    create?: XOR<ImageCreateWithoutDriverInput, ImageUncheckedCreateWithoutDriverInput>
    connectOrCreate?: ImageCreateOrConnectWithoutDriverInput
    connect?: ImageWhereUniqueInput
  }

  export type DriverLicenseCreateNestedOneWithoutDriverProfileInput = {
    create?: XOR<DriverLicenseCreateWithoutDriverProfileInput, DriverLicenseUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: DriverLicenseCreateOrConnectWithoutDriverProfileInput
    connect?: DriverLicenseWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UsersUpdateOneRequiredWithoutDriverProfileNestedInput = {
    create?: XOR<UsersCreateWithoutDriverProfileInput, UsersUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: UsersCreateOrConnectWithoutDriverProfileInput
    upsert?: UsersUpsertWithoutDriverProfileInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutDriverProfileInput, UsersUpdateWithoutDriverProfileInput>, UsersUncheckedUpdateWithoutDriverProfileInput>
  }

  export type ImageUpdateOneWithoutDriverNestedInput = {
    create?: XOR<ImageCreateWithoutDriverInput, ImageUncheckedCreateWithoutDriverInput>
    connectOrCreate?: ImageCreateOrConnectWithoutDriverInput
    upsert?: ImageUpsertWithoutDriverInput
    disconnect?: ImageWhereInput | boolean
    delete?: ImageWhereInput | boolean
    connect?: ImageWhereUniqueInput
    update?: XOR<XOR<ImageUpdateToOneWithWhereWithoutDriverInput, ImageUpdateWithoutDriverInput>, ImageUncheckedUpdateWithoutDriverInput>
  }

  export type DriverLicenseUpdateOneWithoutDriverProfileNestedInput = {
    create?: XOR<DriverLicenseCreateWithoutDriverProfileInput, DriverLicenseUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: DriverLicenseCreateOrConnectWithoutDriverProfileInput
    upsert?: DriverLicenseUpsertWithoutDriverProfileInput
    disconnect?: DriverLicenseWhereInput | boolean
    delete?: DriverLicenseWhereInput | boolean
    connect?: DriverLicenseWhereUniqueInput
    update?: XOR<XOR<DriverLicenseUpdateToOneWithWhereWithoutDriverProfileInput, DriverLicenseUpdateWithoutDriverProfileInput>, DriverLicenseUncheckedUpdateWithoutDriverProfileInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DriverProfileCreateNestedOneWithoutLicenseInput = {
    create?: XOR<DriverProfileCreateWithoutLicenseInput, DriverProfileUncheckedCreateWithoutLicenseInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutLicenseInput
    connect?: DriverProfileWhereUniqueInput
  }

  export type DriverProfileUncheckedCreateNestedOneWithoutLicenseInput = {
    create?: XOR<DriverProfileCreateWithoutLicenseInput, DriverProfileUncheckedCreateWithoutLicenseInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutLicenseInput
    connect?: DriverProfileWhereUniqueInput
  }

  export type EnumLicenseTypeFieldUpdateOperationsInput = {
    set?: $Enums.LicenseType
  }

  export type DriverProfileUpdateOneWithoutLicenseNestedInput = {
    create?: XOR<DriverProfileCreateWithoutLicenseInput, DriverProfileUncheckedCreateWithoutLicenseInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutLicenseInput
    upsert?: DriverProfileUpsertWithoutLicenseInput
    disconnect?: DriverProfileWhereInput | boolean
    delete?: DriverProfileWhereInput | boolean
    connect?: DriverProfileWhereUniqueInput
    update?: XOR<XOR<DriverProfileUpdateToOneWithWhereWithoutLicenseInput, DriverProfileUpdateWithoutLicenseInput>, DriverProfileUncheckedUpdateWithoutLicenseInput>
  }

  export type DriverProfileUncheckedUpdateOneWithoutLicenseNestedInput = {
    create?: XOR<DriverProfileCreateWithoutLicenseInput, DriverProfileUncheckedCreateWithoutLicenseInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutLicenseInput
    upsert?: DriverProfileUpsertWithoutLicenseInput
    disconnect?: DriverProfileWhereInput | boolean
    delete?: DriverProfileWhereInput | boolean
    connect?: DriverProfileWhereUniqueInput
    update?: XOR<XOR<DriverProfileUpdateToOneWithWhereWithoutLicenseInput, DriverProfileUpdateWithoutLicenseInput>, DriverProfileUncheckedUpdateWithoutLicenseInput>
  }

  export type SchoolCreateNestedOneWithoutChildrenInput = {
    create?: XOR<SchoolCreateWithoutChildrenInput, SchoolUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutChildrenInput
    connect?: SchoolWhereUniqueInput
  }

  export type ImageCreateNestedOneWithoutChildInput = {
    create?: XOR<ImageCreateWithoutChildInput, ImageUncheckedCreateWithoutChildInput>
    connectOrCreate?: ImageCreateOrConnectWithoutChildInput
    connect?: ImageWhereUniqueInput
  }

  export type UsersCreateNestedOneWithoutChildrenInput = {
    create?: XOR<UsersCreateWithoutChildrenInput, UsersUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: UsersCreateOrConnectWithoutChildrenInput
    connect?: UsersWhereUniqueInput
  }

  export type SubscriptionCreateNestedOneWithoutChildrenInput = {
    create?: XOR<SubscriptionCreateWithoutChildrenInput, SubscriptionUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutChildrenInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type BusCreateNestedOneWithoutChildrenInput = {
    create?: XOR<BusCreateWithoutChildrenInput, BusUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: BusCreateOrConnectWithoutChildrenInput
    connect?: BusWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SchoolUpdateOneRequiredWithoutChildrenNestedInput = {
    create?: XOR<SchoolCreateWithoutChildrenInput, SchoolUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutChildrenInput
    upsert?: SchoolUpsertWithoutChildrenInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutChildrenInput, SchoolUpdateWithoutChildrenInput>, SchoolUncheckedUpdateWithoutChildrenInput>
  }

  export type ImageUpdateOneRequiredWithoutChildNestedInput = {
    create?: XOR<ImageCreateWithoutChildInput, ImageUncheckedCreateWithoutChildInput>
    connectOrCreate?: ImageCreateOrConnectWithoutChildInput
    upsert?: ImageUpsertWithoutChildInput
    connect?: ImageWhereUniqueInput
    update?: XOR<XOR<ImageUpdateToOneWithWhereWithoutChildInput, ImageUpdateWithoutChildInput>, ImageUncheckedUpdateWithoutChildInput>
  }

  export type UsersUpdateOneRequiredWithoutChildrenNestedInput = {
    create?: XOR<UsersCreateWithoutChildrenInput, UsersUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: UsersCreateOrConnectWithoutChildrenInput
    upsert?: UsersUpsertWithoutChildrenInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutChildrenInput, UsersUpdateWithoutChildrenInput>, UsersUncheckedUpdateWithoutChildrenInput>
  }

  export type SubscriptionUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<SubscriptionCreateWithoutChildrenInput, SubscriptionUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutChildrenInput
    upsert?: SubscriptionUpsertWithoutChildrenInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutChildrenInput, SubscriptionUpdateWithoutChildrenInput>, SubscriptionUncheckedUpdateWithoutChildrenInput>
  }

  export type BusUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<BusCreateWithoutChildrenInput, BusUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: BusCreateOrConnectWithoutChildrenInput
    upsert?: BusUpsertWithoutChildrenInput
    disconnect?: BusWhereInput | boolean
    delete?: BusWhereInput | boolean
    connect?: BusWhereUniqueInput
    update?: XOR<XOR<BusUpdateToOneWithWhereWithoutChildrenInput, BusUpdateWithoutChildrenInput>, BusUncheckedUpdateWithoutChildrenInput>
  }

  export type ChildrenCreateNestedManyWithoutSchoolInput = {
    create?: XOR<ChildrenCreateWithoutSchoolInput, ChildrenUncheckedCreateWithoutSchoolInput> | ChildrenCreateWithoutSchoolInput[] | ChildrenUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutSchoolInput | ChildrenCreateOrConnectWithoutSchoolInput[]
    createMany?: ChildrenCreateManySchoolInputEnvelope
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
  }

  export type ChildrenUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<ChildrenCreateWithoutSchoolInput, ChildrenUncheckedCreateWithoutSchoolInput> | ChildrenCreateWithoutSchoolInput[] | ChildrenUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutSchoolInput | ChildrenCreateOrConnectWithoutSchoolInput[]
    createMany?: ChildrenCreateManySchoolInputEnvelope
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
  }

  export type ChildrenUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<ChildrenCreateWithoutSchoolInput, ChildrenUncheckedCreateWithoutSchoolInput> | ChildrenCreateWithoutSchoolInput[] | ChildrenUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutSchoolInput | ChildrenCreateOrConnectWithoutSchoolInput[]
    upsert?: ChildrenUpsertWithWhereUniqueWithoutSchoolInput | ChildrenUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: ChildrenCreateManySchoolInputEnvelope
    set?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    disconnect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    delete?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    update?: ChildrenUpdateWithWhereUniqueWithoutSchoolInput | ChildrenUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: ChildrenUpdateManyWithWhereWithoutSchoolInput | ChildrenUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
  }

  export type ChildrenUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<ChildrenCreateWithoutSchoolInput, ChildrenUncheckedCreateWithoutSchoolInput> | ChildrenCreateWithoutSchoolInput[] | ChildrenUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutSchoolInput | ChildrenCreateOrConnectWithoutSchoolInput[]
    upsert?: ChildrenUpsertWithWhereUniqueWithoutSchoolInput | ChildrenUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: ChildrenCreateManySchoolInputEnvelope
    set?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    disconnect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    delete?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    update?: ChildrenUpdateWithWhereUniqueWithoutSchoolInput | ChildrenUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: ChildrenUpdateManyWithWhereWithoutSchoolInput | ChildrenUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
  }

  export type ChildrenCreateNestedOneWithoutImageprofileInput = {
    create?: XOR<ChildrenCreateWithoutImageprofileInput, ChildrenUncheckedCreateWithoutImageprofileInput>
    connectOrCreate?: ChildrenCreateOrConnectWithoutImageprofileInput
    connect?: ChildrenWhereUniqueInput
  }

  export type DriverProfileCreateNestedOneWithoutImageInput = {
    create?: XOR<DriverProfileCreateWithoutImageInput, DriverProfileUncheckedCreateWithoutImageInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutImageInput
    connect?: DriverProfileWhereUniqueInput
  }

  export type ChildrenUncheckedCreateNestedOneWithoutImageprofileInput = {
    create?: XOR<ChildrenCreateWithoutImageprofileInput, ChildrenUncheckedCreateWithoutImageprofileInput>
    connectOrCreate?: ChildrenCreateOrConnectWithoutImageprofileInput
    connect?: ChildrenWhereUniqueInput
  }

  export type DriverProfileUncheckedCreateNestedOneWithoutImageInput = {
    create?: XOR<DriverProfileCreateWithoutImageInput, DriverProfileUncheckedCreateWithoutImageInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutImageInput
    connect?: DriverProfileWhereUniqueInput
  }

  export type ChildrenUpdateOneWithoutImageprofileNestedInput = {
    create?: XOR<ChildrenCreateWithoutImageprofileInput, ChildrenUncheckedCreateWithoutImageprofileInput>
    connectOrCreate?: ChildrenCreateOrConnectWithoutImageprofileInput
    upsert?: ChildrenUpsertWithoutImageprofileInput
    disconnect?: ChildrenWhereInput | boolean
    delete?: ChildrenWhereInput | boolean
    connect?: ChildrenWhereUniqueInput
    update?: XOR<XOR<ChildrenUpdateToOneWithWhereWithoutImageprofileInput, ChildrenUpdateWithoutImageprofileInput>, ChildrenUncheckedUpdateWithoutImageprofileInput>
  }

  export type DriverProfileUpdateOneWithoutImageNestedInput = {
    create?: XOR<DriverProfileCreateWithoutImageInput, DriverProfileUncheckedCreateWithoutImageInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutImageInput
    upsert?: DriverProfileUpsertWithoutImageInput
    disconnect?: DriverProfileWhereInput | boolean
    delete?: DriverProfileWhereInput | boolean
    connect?: DriverProfileWhereUniqueInput
    update?: XOR<XOR<DriverProfileUpdateToOneWithWhereWithoutImageInput, DriverProfileUpdateWithoutImageInput>, DriverProfileUncheckedUpdateWithoutImageInput>
  }

  export type ChildrenUncheckedUpdateOneWithoutImageprofileNestedInput = {
    create?: XOR<ChildrenCreateWithoutImageprofileInput, ChildrenUncheckedCreateWithoutImageprofileInput>
    connectOrCreate?: ChildrenCreateOrConnectWithoutImageprofileInput
    upsert?: ChildrenUpsertWithoutImageprofileInput
    disconnect?: ChildrenWhereInput | boolean
    delete?: ChildrenWhereInput | boolean
    connect?: ChildrenWhereUniqueInput
    update?: XOR<XOR<ChildrenUpdateToOneWithWhereWithoutImageprofileInput, ChildrenUpdateWithoutImageprofileInput>, ChildrenUncheckedUpdateWithoutImageprofileInput>
  }

  export type DriverProfileUncheckedUpdateOneWithoutImageNestedInput = {
    create?: XOR<DriverProfileCreateWithoutImageInput, DriverProfileUncheckedCreateWithoutImageInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutImageInput
    upsert?: DriverProfileUpsertWithoutImageInput
    disconnect?: DriverProfileWhereInput | boolean
    delete?: DriverProfileWhereInput | boolean
    connect?: DriverProfileWhereUniqueInput
    update?: XOR<XOR<DriverProfileUpdateToOneWithWhereWithoutImageInput, DriverProfileUpdateWithoutImageInput>, DriverProfileUncheckedUpdateWithoutImageInput>
  }

  export type UsersCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<UsersCreateWithoutSubscriptionsInput, UsersUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutSubscriptionsInput
    connect?: UsersWhereUniqueInput
  }

  export type ChildrenCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<ChildrenCreateWithoutSubscriptionInput, ChildrenUncheckedCreateWithoutSubscriptionInput> | ChildrenCreateWithoutSubscriptionInput[] | ChildrenUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutSubscriptionInput | ChildrenCreateOrConnectWithoutSubscriptionInput[]
    createMany?: ChildrenCreateManySubscriptionInputEnvelope
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
  }

  export type ChildrenUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<ChildrenCreateWithoutSubscriptionInput, ChildrenUncheckedCreateWithoutSubscriptionInput> | ChildrenCreateWithoutSubscriptionInput[] | ChildrenUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutSubscriptionInput | ChildrenCreateOrConnectWithoutSubscriptionInput[]
    createMany?: ChildrenCreateManySubscriptionInputEnvelope
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
  }

  export type EnumPlanFieldUpdateOperationsInput = {
    set?: $Enums.Plan
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UsersUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<UsersCreateWithoutSubscriptionsInput, UsersUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutSubscriptionsInput
    upsert?: UsersUpsertWithoutSubscriptionsInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutSubscriptionsInput, UsersUpdateWithoutSubscriptionsInput>, UsersUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type ChildrenUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<ChildrenCreateWithoutSubscriptionInput, ChildrenUncheckedCreateWithoutSubscriptionInput> | ChildrenCreateWithoutSubscriptionInput[] | ChildrenUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutSubscriptionInput | ChildrenCreateOrConnectWithoutSubscriptionInput[]
    upsert?: ChildrenUpsertWithWhereUniqueWithoutSubscriptionInput | ChildrenUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: ChildrenCreateManySubscriptionInputEnvelope
    set?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    disconnect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    delete?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    update?: ChildrenUpdateWithWhereUniqueWithoutSubscriptionInput | ChildrenUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: ChildrenUpdateManyWithWhereWithoutSubscriptionInput | ChildrenUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
  }

  export type ChildrenUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<ChildrenCreateWithoutSubscriptionInput, ChildrenUncheckedCreateWithoutSubscriptionInput> | ChildrenCreateWithoutSubscriptionInput[] | ChildrenUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutSubscriptionInput | ChildrenCreateOrConnectWithoutSubscriptionInput[]
    upsert?: ChildrenUpsertWithWhereUniqueWithoutSubscriptionInput | ChildrenUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: ChildrenCreateManySubscriptionInputEnvelope
    set?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    disconnect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    delete?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    update?: ChildrenUpdateWithWhereUniqueWithoutSubscriptionInput | ChildrenUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: ChildrenUpdateManyWithWhereWithoutSubscriptionInput | ChildrenUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
  }

  export type UsersCreateNestedOneWithoutBusesInput = {
    create?: XOR<UsersCreateWithoutBusesInput, UsersUncheckedCreateWithoutBusesInput>
    connectOrCreate?: UsersCreateOrConnectWithoutBusesInput
    connect?: UsersWhereUniqueInput
  }

  export type ChildrenCreateNestedManyWithoutBusInput = {
    create?: XOR<ChildrenCreateWithoutBusInput, ChildrenUncheckedCreateWithoutBusInput> | ChildrenCreateWithoutBusInput[] | ChildrenUncheckedCreateWithoutBusInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutBusInput | ChildrenCreateOrConnectWithoutBusInput[]
    createMany?: ChildrenCreateManyBusInputEnvelope
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
  }

  export type ChildrenUncheckedCreateNestedManyWithoutBusInput = {
    create?: XOR<ChildrenCreateWithoutBusInput, ChildrenUncheckedCreateWithoutBusInput> | ChildrenCreateWithoutBusInput[] | ChildrenUncheckedCreateWithoutBusInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutBusInput | ChildrenCreateOrConnectWithoutBusInput[]
    createMany?: ChildrenCreateManyBusInputEnvelope
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumBusStatusFieldUpdateOperationsInput = {
    set?: $Enums.BusStatus
  }

  export type UsersUpdateOneRequiredWithoutBusesNestedInput = {
    create?: XOR<UsersCreateWithoutBusesInput, UsersUncheckedCreateWithoutBusesInput>
    connectOrCreate?: UsersCreateOrConnectWithoutBusesInput
    upsert?: UsersUpsertWithoutBusesInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutBusesInput, UsersUpdateWithoutBusesInput>, UsersUncheckedUpdateWithoutBusesInput>
  }

  export type ChildrenUpdateManyWithoutBusNestedInput = {
    create?: XOR<ChildrenCreateWithoutBusInput, ChildrenUncheckedCreateWithoutBusInput> | ChildrenCreateWithoutBusInput[] | ChildrenUncheckedCreateWithoutBusInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutBusInput | ChildrenCreateOrConnectWithoutBusInput[]
    upsert?: ChildrenUpsertWithWhereUniqueWithoutBusInput | ChildrenUpsertWithWhereUniqueWithoutBusInput[]
    createMany?: ChildrenCreateManyBusInputEnvelope
    set?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    disconnect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    delete?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    update?: ChildrenUpdateWithWhereUniqueWithoutBusInput | ChildrenUpdateWithWhereUniqueWithoutBusInput[]
    updateMany?: ChildrenUpdateManyWithWhereWithoutBusInput | ChildrenUpdateManyWithWhereWithoutBusInput[]
    deleteMany?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
  }

  export type ChildrenUncheckedUpdateManyWithoutBusNestedInput = {
    create?: XOR<ChildrenCreateWithoutBusInput, ChildrenUncheckedCreateWithoutBusInput> | ChildrenCreateWithoutBusInput[] | ChildrenUncheckedCreateWithoutBusInput[]
    connectOrCreate?: ChildrenCreateOrConnectWithoutBusInput | ChildrenCreateOrConnectWithoutBusInput[]
    upsert?: ChildrenUpsertWithWhereUniqueWithoutBusInput | ChildrenUpsertWithWhereUniqueWithoutBusInput[]
    createMany?: ChildrenCreateManyBusInputEnvelope
    set?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    disconnect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    delete?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    connect?: ChildrenWhereUniqueInput | ChildrenWhereUniqueInput[]
    update?: ChildrenUpdateWithWhereUniqueWithoutBusInput | ChildrenUpdateWithWhereUniqueWithoutBusInput[]
    updateMany?: ChildrenUpdateManyWithWhereWithoutBusInput | ChildrenUpdateManyWithWhereWithoutBusInput[]
    deleteMany?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedEnumLicenseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LicenseType | EnumLicenseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LicenseType[] | ListEnumLicenseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LicenseType[] | ListEnumLicenseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLicenseTypeFilter<$PrismaModel> | $Enums.LicenseType
  }

  export type NestedEnumLicenseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LicenseType | EnumLicenseTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LicenseType[] | ListEnumLicenseTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LicenseType[] | ListEnumLicenseTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLicenseTypeWithAggregatesFilter<$PrismaModel> | $Enums.LicenseType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLicenseTypeFilter<$PrismaModel>
    _max?: NestedEnumLicenseTypeFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanFilter<$PrismaModel> | $Enums.Plan
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanWithAggregatesFilter<$PrismaModel> | $Enums.Plan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanFilter<$PrismaModel>
    _max?: NestedEnumPlanFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumBusStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BusStatus | EnumBusStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusStatus[] | ListEnumBusStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusStatus[] | ListEnumBusStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusStatusFilter<$PrismaModel> | $Enums.BusStatus
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

  export type NestedEnumBusStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusStatus | EnumBusStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BusStatus[] | ListEnumBusStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusStatus[] | ListEnumBusStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBusStatusWithAggregatesFilter<$PrismaModel> | $Enums.BusStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusStatusFilter<$PrismaModel>
    _max?: NestedEnumBusStatusFilter<$PrismaModel>
  }

  export type ChildrenCreateWithoutParentInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutChildrenInput
    imageprofile: ImageCreateNestedOneWithoutChildInput
    subscription?: SubscriptionCreateNestedOneWithoutChildrenInput
    bus?: BusCreateNestedOneWithoutChildrenInput
  }

  export type ChildrenUncheckedCreateWithoutParentInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    imageprofileId: string
    subscriptionId?: string | null
    busId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenCreateOrConnectWithoutParentInput = {
    where: ChildrenWhereUniqueInput
    create: XOR<ChildrenCreateWithoutParentInput, ChildrenUncheckedCreateWithoutParentInput>
  }

  export type ChildrenCreateManyParentInputEnvelope = {
    data: ChildrenCreateManyParentInput | ChildrenCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutParentInput = {
    id?: string
    stripeSubId?: string | null
    plan: $Enums.Plan
    status: string
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: Date | string
    children?: ChildrenCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutParentInput = {
    id?: string
    stripeSubId?: string | null
    plan: $Enums.Plan
    status: string
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: Date | string
    children?: ChildrenUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionCreateOrConnectWithoutParentInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutParentInput, SubscriptionUncheckedCreateWithoutParentInput>
  }

  export type SubscriptionCreateManyParentInputEnvelope = {
    data: SubscriptionCreateManyParentInput | SubscriptionCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type DriverProfileCreateWithoutUserInput = {
    id?: string
    currentLat?: number | null
    currentLong?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: ImageCreateNestedOneWithoutDriverInput
    license?: DriverLicenseCreateNestedOneWithoutDriverProfileInput
  }

  export type DriverProfileUncheckedCreateWithoutUserInput = {
    id?: string
    currentLat?: number | null
    currentLong?: number | null
    imageId?: string | null
    licenseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverProfileCreateOrConnectWithoutUserInput = {
    where: DriverProfileWhereUniqueInput
    create: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
  }

  export type BusCreateWithoutDriverInput = {
    id?: string
    matricule: string
    brand: string
    seats: number
    status?: $Enums.BusStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenCreateNestedManyWithoutBusInput
  }

  export type BusUncheckedCreateWithoutDriverInput = {
    id?: string
    matricule: string
    brand: string
    seats: number
    status?: $Enums.BusStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenUncheckedCreateNestedManyWithoutBusInput
  }

  export type BusCreateOrConnectWithoutDriverInput = {
    where: BusWhereUniqueInput
    create: XOR<BusCreateWithoutDriverInput, BusUncheckedCreateWithoutDriverInput>
  }

  export type BusCreateManyDriverInputEnvelope = {
    data: BusCreateManyDriverInput | BusCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type ChildrenUpsertWithWhereUniqueWithoutParentInput = {
    where: ChildrenWhereUniqueInput
    update: XOR<ChildrenUpdateWithoutParentInput, ChildrenUncheckedUpdateWithoutParentInput>
    create: XOR<ChildrenCreateWithoutParentInput, ChildrenUncheckedCreateWithoutParentInput>
  }

  export type ChildrenUpdateWithWhereUniqueWithoutParentInput = {
    where: ChildrenWhereUniqueInput
    data: XOR<ChildrenUpdateWithoutParentInput, ChildrenUncheckedUpdateWithoutParentInput>
  }

  export type ChildrenUpdateManyWithWhereWithoutParentInput = {
    where: ChildrenScalarWhereInput
    data: XOR<ChildrenUpdateManyMutationInput, ChildrenUncheckedUpdateManyWithoutParentInput>
  }

  export type ChildrenScalarWhereInput = {
    AND?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
    OR?: ChildrenScalarWhereInput[]
    NOT?: ChildrenScalarWhereInput | ChildrenScalarWhereInput[]
    id?: StringFilter<"Children"> | string
    nom?: StringFilter<"Children"> | string
    prenom?: StringFilter<"Children"> | string
    adresse?: StringFilter<"Children"> | string
    homeLat?: FloatFilter<"Children"> | number
    homeLong?: FloatFilter<"Children"> | number
    arrivalTime?: StringFilter<"Children"> | string
    departureTime?: StringFilter<"Children"> | string
    schoolId?: StringFilter<"Children"> | string
    imageprofileId?: StringFilter<"Children"> | string
    parentId?: StringFilter<"Children"> | string
    subscriptionId?: StringNullableFilter<"Children"> | string | null
    busId?: StringNullableFilter<"Children"> | string | null
    createdAt?: DateTimeFilter<"Children"> | Date | string
    updatedAt?: DateTimeFilter<"Children"> | Date | string
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutParentInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutParentInput, SubscriptionUncheckedUpdateWithoutParentInput>
    create: XOR<SubscriptionCreateWithoutParentInput, SubscriptionUncheckedCreateWithoutParentInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutParentInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutParentInput, SubscriptionUncheckedUpdateWithoutParentInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutParentInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutParentInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<"Subscription"> | string
    stripeSubId?: StringNullableFilter<"Subscription"> | string | null
    plan?: EnumPlanFilter<"Subscription"> | $Enums.Plan
    status?: StringFilter<"Subscription"> | string
    emailSent?: BoolFilter<"Subscription"> | boolean
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    parentId?: StringFilter<"Subscription"> | string
  }

  export type DriverProfileUpsertWithoutUserInput = {
    update: XOR<DriverProfileUpdateWithoutUserInput, DriverProfileUncheckedUpdateWithoutUserInput>
    create: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    where?: DriverProfileWhereInput
  }

  export type DriverProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: DriverProfileWhereInput
    data: XOR<DriverProfileUpdateWithoutUserInput, DriverProfileUncheckedUpdateWithoutUserInput>
  }

  export type DriverProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ImageUpdateOneWithoutDriverNestedInput
    license?: DriverLicenseUpdateOneWithoutDriverProfileNestedInput
  }

  export type DriverProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    licenseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusUpsertWithWhereUniqueWithoutDriverInput = {
    where: BusWhereUniqueInput
    update: XOR<BusUpdateWithoutDriverInput, BusUncheckedUpdateWithoutDriverInput>
    create: XOR<BusCreateWithoutDriverInput, BusUncheckedCreateWithoutDriverInput>
  }

  export type BusUpdateWithWhereUniqueWithoutDriverInput = {
    where: BusWhereUniqueInput
    data: XOR<BusUpdateWithoutDriverInput, BusUncheckedUpdateWithoutDriverInput>
  }

  export type BusUpdateManyWithWhereWithoutDriverInput = {
    where: BusScalarWhereInput
    data: XOR<BusUpdateManyMutationInput, BusUncheckedUpdateManyWithoutDriverInput>
  }

  export type BusScalarWhereInput = {
    AND?: BusScalarWhereInput | BusScalarWhereInput[]
    OR?: BusScalarWhereInput[]
    NOT?: BusScalarWhereInput | BusScalarWhereInput[]
    id?: StringFilter<"Bus"> | string
    matricule?: StringFilter<"Bus"> | string
    brand?: StringFilter<"Bus"> | string
    seats?: IntFilter<"Bus"> | number
    status?: EnumBusStatusFilter<"Bus"> | $Enums.BusStatus
    driverId?: StringFilter<"Bus"> | string
    createdAt?: DateTimeFilter<"Bus"> | Date | string
    updatedAt?: DateTimeFilter<"Bus"> | Date | string
  }

  export type UsersCreateWithoutDriverProfileInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenCreateNestedManyWithoutParentInput
    subscriptions?: SubscriptionCreateNestedManyWithoutParentInput
    buses?: BusCreateNestedManyWithoutDriverInput
  }

  export type UsersUncheckedCreateWithoutDriverProfileInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenUncheckedCreateNestedManyWithoutParentInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutParentInput
    buses?: BusUncheckedCreateNestedManyWithoutDriverInput
  }

  export type UsersCreateOrConnectWithoutDriverProfileInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutDriverProfileInput, UsersUncheckedCreateWithoutDriverProfileInput>
  }

  export type ImageCreateWithoutDriverInput = {
    id?: string
    url: string
    child?: ChildrenCreateNestedOneWithoutImageprofileInput
  }

  export type ImageUncheckedCreateWithoutDriverInput = {
    id?: string
    url: string
    child?: ChildrenUncheckedCreateNestedOneWithoutImageprofileInput
  }

  export type ImageCreateOrConnectWithoutDriverInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutDriverInput, ImageUncheckedCreateWithoutDriverInput>
  }

  export type DriverLicenseCreateWithoutDriverProfileInput = {
    id?: string
    licenseNumber: string
    licenseType: $Enums.LicenseType
    licenseExpiration: Date | string
    photoFront?: string | null
    photoBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverLicenseUncheckedCreateWithoutDriverProfileInput = {
    id?: string
    licenseNumber: string
    licenseType: $Enums.LicenseType
    licenseExpiration: Date | string
    photoFront?: string | null
    photoBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverLicenseCreateOrConnectWithoutDriverProfileInput = {
    where: DriverLicenseWhereUniqueInput
    create: XOR<DriverLicenseCreateWithoutDriverProfileInput, DriverLicenseUncheckedCreateWithoutDriverProfileInput>
  }

  export type UsersUpsertWithoutDriverProfileInput = {
    update: XOR<UsersUpdateWithoutDriverProfileInput, UsersUncheckedUpdateWithoutDriverProfileInput>
    create: XOR<UsersCreateWithoutDriverProfileInput, UsersUncheckedCreateWithoutDriverProfileInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutDriverProfileInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutDriverProfileInput, UsersUncheckedUpdateWithoutDriverProfileInput>
  }

  export type UsersUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUpdateManyWithoutParentNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutParentNestedInput
    buses?: BusUpdateManyWithoutDriverNestedInput
  }

  export type UsersUncheckedUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUncheckedUpdateManyWithoutParentNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutParentNestedInput
    buses?: BusUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type ImageUpsertWithoutDriverInput = {
    update: XOR<ImageUpdateWithoutDriverInput, ImageUncheckedUpdateWithoutDriverInput>
    create: XOR<ImageCreateWithoutDriverInput, ImageUncheckedCreateWithoutDriverInput>
    where?: ImageWhereInput
  }

  export type ImageUpdateToOneWithWhereWithoutDriverInput = {
    where?: ImageWhereInput
    data: XOR<ImageUpdateWithoutDriverInput, ImageUncheckedUpdateWithoutDriverInput>
  }

  export type ImageUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    child?: ChildrenUpdateOneWithoutImageprofileNestedInput
  }

  export type ImageUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    child?: ChildrenUncheckedUpdateOneWithoutImageprofileNestedInput
  }

  export type DriverLicenseUpsertWithoutDriverProfileInput = {
    update: XOR<DriverLicenseUpdateWithoutDriverProfileInput, DriverLicenseUncheckedUpdateWithoutDriverProfileInput>
    create: XOR<DriverLicenseCreateWithoutDriverProfileInput, DriverLicenseUncheckedCreateWithoutDriverProfileInput>
    where?: DriverLicenseWhereInput
  }

  export type DriverLicenseUpdateToOneWithWhereWithoutDriverProfileInput = {
    where?: DriverLicenseWhereInput
    data: XOR<DriverLicenseUpdateWithoutDriverProfileInput, DriverLicenseUncheckedUpdateWithoutDriverProfileInput>
  }

  export type DriverLicenseUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: EnumLicenseTypeFieldUpdateOperationsInput | $Enums.LicenseType
    licenseExpiration?: DateTimeFieldUpdateOperationsInput | Date | string
    photoFront?: NullableStringFieldUpdateOperationsInput | string | null
    photoBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverLicenseUncheckedUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: EnumLicenseTypeFieldUpdateOperationsInput | $Enums.LicenseType
    licenseExpiration?: DateTimeFieldUpdateOperationsInput | Date | string
    photoFront?: NullableStringFieldUpdateOperationsInput | string | null
    photoBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverProfileCreateWithoutLicenseInput = {
    id?: string
    currentLat?: number | null
    currentLong?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UsersCreateNestedOneWithoutDriverProfileInput
    image?: ImageCreateNestedOneWithoutDriverInput
  }

  export type DriverProfileUncheckedCreateWithoutLicenseInput = {
    id?: string
    userId: string
    currentLat?: number | null
    currentLong?: number | null
    imageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverProfileCreateOrConnectWithoutLicenseInput = {
    where: DriverProfileWhereUniqueInput
    create: XOR<DriverProfileCreateWithoutLicenseInput, DriverProfileUncheckedCreateWithoutLicenseInput>
  }

  export type DriverProfileUpsertWithoutLicenseInput = {
    update: XOR<DriverProfileUpdateWithoutLicenseInput, DriverProfileUncheckedUpdateWithoutLicenseInput>
    create: XOR<DriverProfileCreateWithoutLicenseInput, DriverProfileUncheckedCreateWithoutLicenseInput>
    where?: DriverProfileWhereInput
  }

  export type DriverProfileUpdateToOneWithWhereWithoutLicenseInput = {
    where?: DriverProfileWhereInput
    data: XOR<DriverProfileUpdateWithoutLicenseInput, DriverProfileUncheckedUpdateWithoutLicenseInput>
  }

  export type DriverProfileUpdateWithoutLicenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutDriverProfileNestedInput
    image?: ImageUpdateOneWithoutDriverNestedInput
  }

  export type DriverProfileUncheckedUpdateWithoutLicenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolCreateWithoutChildrenInput = {
    id?: string
    nom: string
    adresse: string
    schoolLat: number
    schoolLong: number
  }

  export type SchoolUncheckedCreateWithoutChildrenInput = {
    id?: string
    nom: string
    adresse: string
    schoolLat: number
    schoolLong: number
  }

  export type SchoolCreateOrConnectWithoutChildrenInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutChildrenInput, SchoolUncheckedCreateWithoutChildrenInput>
  }

  export type ImageCreateWithoutChildInput = {
    id?: string
    url: string
    driver?: DriverProfileCreateNestedOneWithoutImageInput
  }

  export type ImageUncheckedCreateWithoutChildInput = {
    id?: string
    url: string
    driver?: DriverProfileUncheckedCreateNestedOneWithoutImageInput
  }

  export type ImageCreateOrConnectWithoutChildInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutChildInput, ImageUncheckedCreateWithoutChildInput>
  }

  export type UsersCreateWithoutChildrenInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutParentInput
    driverProfile?: DriverProfileCreateNestedOneWithoutUserInput
    buses?: BusCreateNestedManyWithoutDriverInput
  }

  export type UsersUncheckedCreateWithoutChildrenInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutParentInput
    driverProfile?: DriverProfileUncheckedCreateNestedOneWithoutUserInput
    buses?: BusUncheckedCreateNestedManyWithoutDriverInput
  }

  export type UsersCreateOrConnectWithoutChildrenInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutChildrenInput, UsersUncheckedCreateWithoutChildrenInput>
  }

  export type SubscriptionCreateWithoutChildrenInput = {
    id?: string
    stripeSubId?: string | null
    plan: $Enums.Plan
    status: string
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: Date | string
    parent: UsersCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutChildrenInput = {
    id?: string
    stripeSubId?: string | null
    plan: $Enums.Plan
    status: string
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: Date | string
    parentId: string
  }

  export type SubscriptionCreateOrConnectWithoutChildrenInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutChildrenInput, SubscriptionUncheckedCreateWithoutChildrenInput>
  }

  export type BusCreateWithoutChildrenInput = {
    id?: string
    matricule: string
    brand: string
    seats: number
    status?: $Enums.BusStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    driver: UsersCreateNestedOneWithoutBusesInput
  }

  export type BusUncheckedCreateWithoutChildrenInput = {
    id?: string
    matricule: string
    brand: string
    seats: number
    status?: $Enums.BusStatus
    driverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusCreateOrConnectWithoutChildrenInput = {
    where: BusWhereUniqueInput
    create: XOR<BusCreateWithoutChildrenInput, BusUncheckedCreateWithoutChildrenInput>
  }

  export type SchoolUpsertWithoutChildrenInput = {
    update: XOR<SchoolUpdateWithoutChildrenInput, SchoolUncheckedUpdateWithoutChildrenInput>
    create: XOR<SchoolCreateWithoutChildrenInput, SchoolUncheckedCreateWithoutChildrenInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutChildrenInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutChildrenInput, SchoolUncheckedUpdateWithoutChildrenInput>
  }

  export type SchoolUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    schoolLat?: FloatFieldUpdateOperationsInput | number
    schoolLong?: FloatFieldUpdateOperationsInput | number
  }

  export type SchoolUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    schoolLat?: FloatFieldUpdateOperationsInput | number
    schoolLong?: FloatFieldUpdateOperationsInput | number
  }

  export type ImageUpsertWithoutChildInput = {
    update: XOR<ImageUpdateWithoutChildInput, ImageUncheckedUpdateWithoutChildInput>
    create: XOR<ImageCreateWithoutChildInput, ImageUncheckedCreateWithoutChildInput>
    where?: ImageWhereInput
  }

  export type ImageUpdateToOneWithWhereWithoutChildInput = {
    where?: ImageWhereInput
    data: XOR<ImageUpdateWithoutChildInput, ImageUncheckedUpdateWithoutChildInput>
  }

  export type ImageUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    driver?: DriverProfileUpdateOneWithoutImageNestedInput
  }

  export type ImageUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    driver?: DriverProfileUncheckedUpdateOneWithoutImageNestedInput
  }

  export type UsersUpsertWithoutChildrenInput = {
    update: XOR<UsersUpdateWithoutChildrenInput, UsersUncheckedUpdateWithoutChildrenInput>
    create: XOR<UsersCreateWithoutChildrenInput, UsersUncheckedCreateWithoutChildrenInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutChildrenInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutChildrenInput, UsersUncheckedUpdateWithoutChildrenInput>
  }

  export type UsersUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutParentNestedInput
    driverProfile?: DriverProfileUpdateOneWithoutUserNestedInput
    buses?: BusUpdateManyWithoutDriverNestedInput
  }

  export type UsersUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutParentNestedInput
    driverProfile?: DriverProfileUncheckedUpdateOneWithoutUserNestedInput
    buses?: BusUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type SubscriptionUpsertWithoutChildrenInput = {
    update: XOR<SubscriptionUpdateWithoutChildrenInput, SubscriptionUncheckedUpdateWithoutChildrenInput>
    create: XOR<SubscriptionCreateWithoutChildrenInput, SubscriptionUncheckedCreateWithoutChildrenInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutChildrenInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutChildrenInput, SubscriptionUncheckedUpdateWithoutChildrenInput>
  }

  export type SubscriptionUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    status?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UsersUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    status?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentId?: StringFieldUpdateOperationsInput | string
  }

  export type BusUpsertWithoutChildrenInput = {
    update: XOR<BusUpdateWithoutChildrenInput, BusUncheckedUpdateWithoutChildrenInput>
    create: XOR<BusCreateWithoutChildrenInput, BusUncheckedCreateWithoutChildrenInput>
    where?: BusWhereInput
  }

  export type BusUpdateToOneWithWhereWithoutChildrenInput = {
    where?: BusWhereInput
    data: XOR<BusUpdateWithoutChildrenInput, BusUncheckedUpdateWithoutChildrenInput>
  }

  export type BusUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    matricule?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    status?: EnumBusStatusFieldUpdateOperationsInput | $Enums.BusStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: UsersUpdateOneRequiredWithoutBusesNestedInput
  }

  export type BusUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    matricule?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    status?: EnumBusStatusFieldUpdateOperationsInput | $Enums.BusStatus
    driverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenCreateWithoutSchoolInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    imageprofile: ImageCreateNestedOneWithoutChildInput
    parent: UsersCreateNestedOneWithoutChildrenInput
    subscription?: SubscriptionCreateNestedOneWithoutChildrenInput
    bus?: BusCreateNestedOneWithoutChildrenInput
  }

  export type ChildrenUncheckedCreateWithoutSchoolInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    imageprofileId: string
    parentId: string
    subscriptionId?: string | null
    busId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenCreateOrConnectWithoutSchoolInput = {
    where: ChildrenWhereUniqueInput
    create: XOR<ChildrenCreateWithoutSchoolInput, ChildrenUncheckedCreateWithoutSchoolInput>
  }

  export type ChildrenCreateManySchoolInputEnvelope = {
    data: ChildrenCreateManySchoolInput | ChildrenCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type ChildrenUpsertWithWhereUniqueWithoutSchoolInput = {
    where: ChildrenWhereUniqueInput
    update: XOR<ChildrenUpdateWithoutSchoolInput, ChildrenUncheckedUpdateWithoutSchoolInput>
    create: XOR<ChildrenCreateWithoutSchoolInput, ChildrenUncheckedCreateWithoutSchoolInput>
  }

  export type ChildrenUpdateWithWhereUniqueWithoutSchoolInput = {
    where: ChildrenWhereUniqueInput
    data: XOR<ChildrenUpdateWithoutSchoolInput, ChildrenUncheckedUpdateWithoutSchoolInput>
  }

  export type ChildrenUpdateManyWithWhereWithoutSchoolInput = {
    where: ChildrenScalarWhereInput
    data: XOR<ChildrenUpdateManyMutationInput, ChildrenUncheckedUpdateManyWithoutSchoolInput>
  }

  export type ChildrenCreateWithoutImageprofileInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutChildrenInput
    parent: UsersCreateNestedOneWithoutChildrenInput
    subscription?: SubscriptionCreateNestedOneWithoutChildrenInput
    bus?: BusCreateNestedOneWithoutChildrenInput
  }

  export type ChildrenUncheckedCreateWithoutImageprofileInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    parentId: string
    subscriptionId?: string | null
    busId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenCreateOrConnectWithoutImageprofileInput = {
    where: ChildrenWhereUniqueInput
    create: XOR<ChildrenCreateWithoutImageprofileInput, ChildrenUncheckedCreateWithoutImageprofileInput>
  }

  export type DriverProfileCreateWithoutImageInput = {
    id?: string
    currentLat?: number | null
    currentLong?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UsersCreateNestedOneWithoutDriverProfileInput
    license?: DriverLicenseCreateNestedOneWithoutDriverProfileInput
  }

  export type DriverProfileUncheckedCreateWithoutImageInput = {
    id?: string
    userId: string
    currentLat?: number | null
    currentLong?: number | null
    licenseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverProfileCreateOrConnectWithoutImageInput = {
    where: DriverProfileWhereUniqueInput
    create: XOR<DriverProfileCreateWithoutImageInput, DriverProfileUncheckedCreateWithoutImageInput>
  }

  export type ChildrenUpsertWithoutImageprofileInput = {
    update: XOR<ChildrenUpdateWithoutImageprofileInput, ChildrenUncheckedUpdateWithoutImageprofileInput>
    create: XOR<ChildrenCreateWithoutImageprofileInput, ChildrenUncheckedCreateWithoutImageprofileInput>
    where?: ChildrenWhereInput
  }

  export type ChildrenUpdateToOneWithWhereWithoutImageprofileInput = {
    where?: ChildrenWhereInput
    data: XOR<ChildrenUpdateWithoutImageprofileInput, ChildrenUncheckedUpdateWithoutImageprofileInput>
  }

  export type ChildrenUpdateWithoutImageprofileInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutChildrenNestedInput
    parent?: UsersUpdateOneRequiredWithoutChildrenNestedInput
    subscription?: SubscriptionUpdateOneWithoutChildrenNestedInput
    bus?: BusUpdateOneWithoutChildrenNestedInput
  }

  export type ChildrenUncheckedUpdateWithoutImageprofileInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    busId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverProfileUpsertWithoutImageInput = {
    update: XOR<DriverProfileUpdateWithoutImageInput, DriverProfileUncheckedUpdateWithoutImageInput>
    create: XOR<DriverProfileCreateWithoutImageInput, DriverProfileUncheckedCreateWithoutImageInput>
    where?: DriverProfileWhereInput
  }

  export type DriverProfileUpdateToOneWithWhereWithoutImageInput = {
    where?: DriverProfileWhereInput
    data: XOR<DriverProfileUpdateWithoutImageInput, DriverProfileUncheckedUpdateWithoutImageInput>
  }

  export type DriverProfileUpdateWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutDriverProfileNestedInput
    license?: DriverLicenseUpdateOneWithoutDriverProfileNestedInput
  }

  export type DriverProfileUncheckedUpdateWithoutImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLong?: NullableFloatFieldUpdateOperationsInput | number | null
    licenseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersCreateWithoutSubscriptionsInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenCreateNestedManyWithoutParentInput
    driverProfile?: DriverProfileCreateNestedOneWithoutUserInput
    buses?: BusCreateNestedManyWithoutDriverInput
  }

  export type UsersUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenUncheckedCreateNestedManyWithoutParentInput
    driverProfile?: DriverProfileUncheckedCreateNestedOneWithoutUserInput
    buses?: BusUncheckedCreateNestedManyWithoutDriverInput
  }

  export type UsersCreateOrConnectWithoutSubscriptionsInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutSubscriptionsInput, UsersUncheckedCreateWithoutSubscriptionsInput>
  }

  export type ChildrenCreateWithoutSubscriptionInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutChildrenInput
    imageprofile: ImageCreateNestedOneWithoutChildInput
    parent: UsersCreateNestedOneWithoutChildrenInput
    bus?: BusCreateNestedOneWithoutChildrenInput
  }

  export type ChildrenUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    imageprofileId: string
    parentId: string
    busId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenCreateOrConnectWithoutSubscriptionInput = {
    where: ChildrenWhereUniqueInput
    create: XOR<ChildrenCreateWithoutSubscriptionInput, ChildrenUncheckedCreateWithoutSubscriptionInput>
  }

  export type ChildrenCreateManySubscriptionInputEnvelope = {
    data: ChildrenCreateManySubscriptionInput | ChildrenCreateManySubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type UsersUpsertWithoutSubscriptionsInput = {
    update: XOR<UsersUpdateWithoutSubscriptionsInput, UsersUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<UsersCreateWithoutSubscriptionsInput, UsersUncheckedCreateWithoutSubscriptionsInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutSubscriptionsInput, UsersUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type UsersUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUpdateManyWithoutParentNestedInput
    driverProfile?: DriverProfileUpdateOneWithoutUserNestedInput
    buses?: BusUpdateManyWithoutDriverNestedInput
  }

  export type UsersUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUncheckedUpdateManyWithoutParentNestedInput
    driverProfile?: DriverProfileUncheckedUpdateOneWithoutUserNestedInput
    buses?: BusUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type ChildrenUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: ChildrenWhereUniqueInput
    update: XOR<ChildrenUpdateWithoutSubscriptionInput, ChildrenUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<ChildrenCreateWithoutSubscriptionInput, ChildrenUncheckedCreateWithoutSubscriptionInput>
  }

  export type ChildrenUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: ChildrenWhereUniqueInput
    data: XOR<ChildrenUpdateWithoutSubscriptionInput, ChildrenUncheckedUpdateWithoutSubscriptionInput>
  }

  export type ChildrenUpdateManyWithWhereWithoutSubscriptionInput = {
    where: ChildrenScalarWhereInput
    data: XOR<ChildrenUpdateManyMutationInput, ChildrenUncheckedUpdateManyWithoutSubscriptionInput>
  }

  export type UsersCreateWithoutBusesInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenCreateNestedManyWithoutParentInput
    subscriptions?: SubscriptionCreateNestedManyWithoutParentInput
    driverProfile?: DriverProfileCreateNestedOneWithoutUserInput
  }

  export type UsersUncheckedCreateWithoutBusesInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    phone: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: ChildrenUncheckedCreateNestedManyWithoutParentInput
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutParentInput
    driverProfile?: DriverProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UsersCreateOrConnectWithoutBusesInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutBusesInput, UsersUncheckedCreateWithoutBusesInput>
  }

  export type ChildrenCreateWithoutBusInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutChildrenInput
    imageprofile: ImageCreateNestedOneWithoutChildInput
    parent: UsersCreateNestedOneWithoutChildrenInput
    subscription?: SubscriptionCreateNestedOneWithoutChildrenInput
  }

  export type ChildrenUncheckedCreateWithoutBusInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    imageprofileId: string
    parentId: string
    subscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenCreateOrConnectWithoutBusInput = {
    where: ChildrenWhereUniqueInput
    create: XOR<ChildrenCreateWithoutBusInput, ChildrenUncheckedCreateWithoutBusInput>
  }

  export type ChildrenCreateManyBusInputEnvelope = {
    data: ChildrenCreateManyBusInput | ChildrenCreateManyBusInput[]
    skipDuplicates?: boolean
  }

  export type UsersUpsertWithoutBusesInput = {
    update: XOR<UsersUpdateWithoutBusesInput, UsersUncheckedUpdateWithoutBusesInput>
    create: XOR<UsersCreateWithoutBusesInput, UsersUncheckedCreateWithoutBusesInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutBusesInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutBusesInput, UsersUncheckedUpdateWithoutBusesInput>
  }

  export type UsersUpdateWithoutBusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUpdateManyWithoutParentNestedInput
    subscriptions?: SubscriptionUpdateManyWithoutParentNestedInput
    driverProfile?: DriverProfileUpdateOneWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateWithoutBusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUncheckedUpdateManyWithoutParentNestedInput
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutParentNestedInput
    driverProfile?: DriverProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ChildrenUpsertWithWhereUniqueWithoutBusInput = {
    where: ChildrenWhereUniqueInput
    update: XOR<ChildrenUpdateWithoutBusInput, ChildrenUncheckedUpdateWithoutBusInput>
    create: XOR<ChildrenCreateWithoutBusInput, ChildrenUncheckedCreateWithoutBusInput>
  }

  export type ChildrenUpdateWithWhereUniqueWithoutBusInput = {
    where: ChildrenWhereUniqueInput
    data: XOR<ChildrenUpdateWithoutBusInput, ChildrenUncheckedUpdateWithoutBusInput>
  }

  export type ChildrenUpdateManyWithWhereWithoutBusInput = {
    where: ChildrenScalarWhereInput
    data: XOR<ChildrenUpdateManyMutationInput, ChildrenUncheckedUpdateManyWithoutBusInput>
  }

  export type ChildrenCreateManyParentInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    imageprofileId: string
    subscriptionId?: string | null
    busId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateManyParentInput = {
    id?: string
    stripeSubId?: string | null
    plan: $Enums.Plan
    status: string
    emailSent?: boolean
    cancelAtPeriodEnd?: boolean
    createdAt?: Date | string
  }

  export type BusCreateManyDriverInput = {
    id?: string
    matricule: string
    brand: string
    seats: number
    status?: $Enums.BusStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutChildrenNestedInput
    imageprofile?: ImageUpdateOneRequiredWithoutChildNestedInput
    subscription?: SubscriptionUpdateOneWithoutChildrenNestedInput
    bus?: BusUpdateOneWithoutChildrenNestedInput
  }

  export type ChildrenUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    busId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    busId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    status?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    status?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSubId?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    status?: StringFieldUpdateOperationsInput | string
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    matricule?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    status?: EnumBusStatusFieldUpdateOperationsInput | $Enums.BusStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUpdateManyWithoutBusNestedInput
  }

  export type BusUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    matricule?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    status?: EnumBusStatusFieldUpdateOperationsInput | $Enums.BusStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: ChildrenUncheckedUpdateManyWithoutBusNestedInput
  }

  export type BusUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    matricule?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    seats?: IntFieldUpdateOperationsInput | number
    status?: EnumBusStatusFieldUpdateOperationsInput | $Enums.BusStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenCreateManySchoolInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    imageprofileId: string
    parentId: string
    subscriptionId?: string | null
    busId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageprofile?: ImageUpdateOneRequiredWithoutChildNestedInput
    parent?: UsersUpdateOneRequiredWithoutChildrenNestedInput
    subscription?: SubscriptionUpdateOneWithoutChildrenNestedInput
    bus?: BusUpdateOneWithoutChildrenNestedInput
  }

  export type ChildrenUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    busId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenUncheckedUpdateManyWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    busId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenCreateManySubscriptionInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    imageprofileId: string
    parentId: string
    busId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutChildrenNestedInput
    imageprofile?: ImageUpdateOneRequiredWithoutChildNestedInput
    parent?: UsersUpdateOneRequiredWithoutChildrenNestedInput
    bus?: BusUpdateOneWithoutChildrenNestedInput
  }

  export type ChildrenUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    busId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    busId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenCreateManyBusInput = {
    id?: string
    nom: string
    prenom: string
    adresse: string
    homeLat: number
    homeLong: number
    arrivalTime: string
    departureTime: string
    schoolId: string
    imageprofileId: string
    parentId: string
    subscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildrenUpdateWithoutBusInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutChildrenNestedInput
    imageprofile?: ImageUpdateOneRequiredWithoutChildNestedInput
    parent?: UsersUpdateOneRequiredWithoutChildrenNestedInput
    subscription?: SubscriptionUpdateOneWithoutChildrenNestedInput
  }

  export type ChildrenUncheckedUpdateWithoutBusInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildrenUncheckedUpdateManyWithoutBusInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    adresse?: StringFieldUpdateOperationsInput | string
    homeLat?: FloatFieldUpdateOperationsInput | number
    homeLong?: FloatFieldUpdateOperationsInput | number
    arrivalTime?: StringFieldUpdateOperationsInput | string
    departureTime?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    imageprofileId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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